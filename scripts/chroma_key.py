#!/usr/bin/env python3
"""
Remove a green-screen background via chroma keying.

Usage:
    python chroma_key.py input.jpg output.png [--downscale 2400]

Approach:
  - Honour EXIF orientation first.
  - Work in a green-dominance space: how much green exceeds max(red, blue).
  - Soft alpha ramp between two thresholds to feather edges (no jaggies).
  - Green-spill suppression: clamp the green channel on edge pixels so no
    green fringe survives around hair / shoulders.
  - Keep only the largest opaque region so stray keyed specks in the
    background don't leave floating dots.
  - Crop to the subject's bounding box.
"""
import sys
import numpy as np
from PIL import Image, ImageOps, ImageFilter


def chroma_key(in_path, out_path, low=8.0, high=42.0, max_dim=2600):
    img = Image.open(in_path)
    img = ImageOps.exif_transpose(img).convert("RGB")

    # Downscale very large source for a reasonable web asset.
    if max(img.size) > max_dim:
        scale = max_dim / max(img.size)
        img = img.resize(
            (round(img.width * scale), round(img.height * scale)),
            Image.LANCZOS,
        )

    arr = np.asarray(img).astype(np.float32)
    r, g, b = arr[..., 0], arr[..., 1], arr[..., 2]

    # Greenness = how far green sits above the stronger of red/blue.
    greenness = g - np.maximum(r, b)

    # Alpha: 1 keep (below low) -> 0 drop (above high), linear ramp between.
    alpha = 1.0 - np.clip((greenness - low) / (high - low), 0.0, 1.0)

    # Green-spill suppression on edge pixels: pull green toward avg(r, b).
    spill = g > (np.maximum(r, b) + 4)
    g_fixed = np.where(spill, np.minimum(g, (r + b) / 2.0 + 6), g)
    arr[..., 1] = g_fixed

    # Build a solid foreground mask, clean it morphologically, keep only the
    # largest connected component (the person), fill holes, then use that as
    # the authoritative region. Outside the region -> fully transparent;
    # inside -> keep the soft keyed alpha (so hair/edges stay feathered).
    try:
        from scipy import ndimage

        solid = alpha > 0.55
        # Remove small keyed background specks / close small gaps.
        solid = ndimage.binary_opening(solid, iterations=2)
        solid = ndimage.binary_closing(solid, iterations=4)

        labels, n = ndimage.label(solid)
        if n >= 1:
            sizes = ndimage.sum(np.ones_like(labels), labels, range(1, n + 1))
            keep = int(np.argmax(sizes)) + 1
            person = labels == keep
            person = ndimage.binary_fill_holes(person)
            # Dilate slightly so we don't clip the soft hair edge.
            region = ndimage.binary_dilation(person, iterations=3)
            alpha = np.where(region, alpha, 0.0)
    except Exception:
        pass

    out = np.dstack([arr, alpha * 255.0]).astype(np.uint8)
    result = Image.fromarray(out, mode="RGBA")

    # Light edge smoothing on the alpha channel only.
    a = result.getchannel("A").filter(ImageFilter.GaussianBlur(0.6))
    result.putalpha(a)

    # Trim fully-transparent margins.
    bbox = result.getbbox()
    if bbox:
        result = result.crop(bbox)

    result.save(out_path)
    print(f"wrote {out_path}  size={result.size}")


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    max_dim = 2600
    for a in sys.argv[1:]:
        if a.startswith("--downscale"):
            max_dim = int(a.split("=")[1]) if "=" in a else 2600
    if len(args) < 2:
        print(__doc__)
        sys.exit(1)
    chroma_key(args[0], args[1], max_dim=max_dim)
