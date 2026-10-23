import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CV_DATA } from './data';

/* ----------------------------------------------------------------
   Editorial portfolio — inspired by A24's print-journal aesthetic.
   Paper background, serif display type, rigid grids, one quiet
   accent. No glows, no glass, no gradient theatre.
----------------------------------------------------------------- */

// Prefix a /public asset with Vite's base URL so paths resolve both
// locally ("/") and under a GitHub Pages project subpath ("/Portofolio/").
const asset = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`;

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] as const } },
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
}

const Reveal: React.FC<RevealProps> = ({ children, className = '' }) => {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // On-mount fade-up. Chosen over scroll-triggered whileInView because the
  // latter can leave below-the-fold content stuck invisible if the
  // IntersectionObserver doesn't fire (headless capture, no scroll event,
  // slow JS). Content visibility must never depend on a scroll handler.
  return (
    <motion.div
      variants={fade}
      initial={prefersReduced ? 'show' : 'hidden'}
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SectionHead = ({ idx, title }: { idx: string; title: string }) => (
  <Reveal className="mb-12 flex items-baseline gap-4">
    <span className="font-display text-base text-accent">{idx}</span>
    <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight">{title}</h2>
  </Reveal>
);

/* --- Navigation --- */
const Nav = () => {
  const [open, setOpen] = useState(false);
  const links = [
    ['About', '#about'],
    ['Experience', '#experience'],
    ['Projects', '#projects'],
    ['Skills', '#skills'],
    ['Credentials', '#credentials'],
    ['Contact', '#contact'],
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-ink/15 bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight">
          Gallent W. Purnomo
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([name, href]) => (
            <a key={name} href={href} className="text-[13px] text-muted transition-colors hover:text-accent">
              {name}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Menu"
        >
          <span className="h-[1.5px] w-6 bg-ink" />
          <span className="h-[1.5px] w-6 bg-ink" />
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-ink/10 px-6 py-4 md:hidden">
          {links.map(([name, href]) => (
            <a
              key={name}
              href={href}
              onClick={() => setOpen(false)}
              className="py-2 font-display text-xl"
            >
              {name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

/* --- Hero: magazine-cover split --- */
const Hero = () => (
  <section id="top" className="mx-auto max-w-6xl px-6 pt-12 md:px-8">
    <div className="grid items-end gap-10 md:grid-cols-[1.05fr_0.95fr]">
      <Reveal>
        <span className="label mb-6 block">Portfolio — 2025 · Jakarta, Indonesia</span>
        <h1 className="font-display text-[clamp(44px,8.5vw,108px)] font-semibold leading-[0.92] tracking-[-0.03em]">
          {CV_DATA.personal.firstName}
          <br />
          Wibisono <em className="font-normal italic text-accent">Purnomo</em>
        </h1>
        <p className="mt-7 max-w-[42ch] text-ink">
          Information Systems &amp; Digital Business Innovation student working where technology
          meets business — designing systems, leading programs, and turning plans into outcomes.
        </p>
        <div className="mt-7">
          <span className="label mb-2 block">Currently open to internships &amp; collaboration</span>
          <a
            href="#contact"
            className="border-b border-accent pb-0.5 font-medium text-accent"
          >
            Get in touch →
          </a>
        </div>
      </Reveal>

      <Reveal className="flex justify-center md:justify-end">
        <div className="portrait-frame relative aspect-[3/4] w-full max-w-[420px] border-t border-ink bg-paper-2">
          <span className="absolute -left-8 top-1/2 hidden -translate-y-1/2 rotate-180 text-[11px] tracking-[0.3em] text-muted [writing-mode:vertical-rl] md:block">
            EST. 2023 — JAKARTA
          </span>
          <img
            src={asset('profile.png')}
            alt="Gallent Wibisono Purnomo"
            className="portrait-img absolute bottom-0 left-1/2 h-[116%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
            onError={(e) => {
              // Fallback to the existing jpg if the cut-out PNG is missing
              const img = e.currentTarget;
              if (!img.src.endsWith('profile.jpg')) img.src = asset('profile.jpg');
            }}
          />
        </div>
      </Reveal>
    </div>
  </section>
);

/* --- Keyword marquee --- */
const Strip = () => {
  const words = ['Business Analytics', 'Systems Design', 'Project Management', 'Power BI', 'Mendix', 'UI / UX', 'Leadership'];
  const row = [...words, ...words];
  return (
    <div className="mt-14 overflow-hidden border-y border-ink py-3.5">
      <div className="marquee-track flex gap-11 whitespace-nowrap font-display text-lg italic text-muted">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-11">
            {w}
            <span className="not-italic text-accent">·</span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* --- About + stats --- */
const About = () => {
  const edu = CV_DATA.education[0];
  const stats = [
    ['3.97', 'GPA / 4.00'],
    ['700+', 'Students Led'],
    ['10+', 'Events Managed'],
    ['3', 'Languages'],
  ];
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 md:px-8">
      <SectionHead idx="01" title="About" />
      <div className="grid gap-12 md:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <p className="text-xl leading-relaxed">
            I'm a dual-degree candidate in Information Systems and Business at Bina Nusantara
            University, with a focus on Digital Business Innovation. I believe strong technology
            only matters when it's paired with real business judgement.
          </p>
          <p className="mt-5 leading-relaxed text-muted">
            In practice that's meant directing entrepreneurship events for thousands of attendees,
            mentoring digital-business students one-on-one, and building the information systems
            that keep an organization running — translating messy goals into things that actually ship.
          </p>
        </Reveal>
        <Reveal>
          <div className="border-t-2 border-ink pt-4">
            <span className="label">Education</span>
            <h3 className="mt-3 font-display text-2xl leading-snug">{edu.degree}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              {edu.specialization}
              <br />
              {edu.school} · 2023 – 2027
              <br />
              <span className="text-accent">GPA {edu.gpa}</span>
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-14 grid grid-cols-2 border-l border-t border-ink md:grid-cols-4">
        {stats.map(([n, k]) => (
          <div key={k} className="border-b border-r border-ink px-5 py-7">
            <span className="block font-display text-[clamp(38px,6vw,60px)] font-medium leading-none">
              {n}
            </span>
            <span className="label mt-3 block">{k}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
};

/* --- Experience (merged work + leadership, chronological grid) --- */
const Experience = () => {
  const items = [
    ...CV_DATA.experience.map((e) => ({ when: e.period, role: e.role, org: e.company, points: e.achievements })),
    ...CV_DATA.leadership.map((l) => ({ when: l.period, role: l.role, org: l.organization, points: l.achievements })),
  ];
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24 md:px-8">
      <SectionHead idx="02" title="Experience" />
      <div className="border-t border-ink/20">
        {items.map((it, i) => (
          <Reveal key={i}>
            <div className="grid gap-4 border-b border-ink/20 py-8 md:grid-cols-[180px_1fr] md:gap-9">
              <div className="pt-1 font-display text-[15px] text-muted">{it.when}</div>
              <div>
                <h3 className="font-display text-2xl font-medium">{it.role}</h3>
                <p className="mt-2 mb-4 text-[14px] tracking-wide text-accent">{it.org}</p>
                <ul className="space-y-1.5 text-[15px] text-muted">
                  {it.points.map((p, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="mt-2.5 h-[3px] w-[3px] shrink-0 rounded-full bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

/* --- Projects (real images from /public) --- */
const Projects = () => (
  <section id="projects" className="mx-auto max-w-6xl px-6 py-24 md:px-8">
    <SectionHead idx="03" title="Selected Work" />
    <div className="grid gap-8 md:grid-cols-3">
      {CV_DATA.projects.map((p, i) => (
        <Reveal key={i}>
          <article className="group flex h-full flex-col">
            <div className="relative aspect-[4/5] overflow-hidden border border-ink/20 bg-paper-2">
              <img
                src={asset(p.image)}
                alt={p.title}
                className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <span className="label absolute left-3 top-3 bg-paper px-2 py-1 text-[10px]">
                {p.category}
              </span>
            </div>
            <h3 className="mt-5 font-display text-xl font-medium">{p.title}</h3>
            <p className="mt-2 flex-grow text-[14px] leading-relaxed text-muted">{p.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full border border-ink/25 px-3 py-1 text-[12px]">
                  {t}
                </span>
              ))}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  </section>
);

/* --- Skills --- */
const Skills = () => (
  <section id="skills" className="mx-auto max-w-6xl px-6 py-24 md:px-8">
    <SectionHead idx="04" title="Skills" />
    <div className="grid gap-14 md:grid-cols-2">
      <Reveal>
        <span className="label mb-5 block">Technical</span>
        <ul>
          {CV_DATA.skills.technical.map((s, i) => (
            <li
              key={s}
              className={`flex items-baseline justify-between gap-4 py-3 ${i === 0 ? '' : 'border-t border-ink/15'}`}
            >
              <span className="text-[17px]">{s}</span>
              <span className="font-display text-[13px] text-muted">{String(i + 1).padStart(2, '0')}</span>
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal>
        <span className="label mb-5 block">Methodology &amp; Leadership</span>
        <div className="flex flex-wrap gap-2.5">
          {CV_DATA.skills.soft.map((s) => (
            <span
              key={s}
              className="rounded-full border border-ink px-4 py-1.5 text-[14px] transition-colors hover:bg-ink hover:text-paper"
            >
              {s}
            </span>
          ))}
        </div>

        <span className="label mb-3 mt-9 block">Languages</span>
        <div className="grid grid-cols-3 gap-px border border-ink/20 bg-ink/20">
          {CV_DATA.skills.languages.map((l) => (
            <div key={l.name} className="bg-paper p-4">
              <div className="font-display text-lg">{l.name}</div>
              <div className="label mt-1 text-[11px]">{l.level}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

/* --- Credentials --- */
const Credentials = () => (
  <section id="credentials" className="mx-auto max-w-6xl px-6 py-24 md:px-8">
    <SectionHead idx="05" title="Credentials" />
    <Reveal className="grid border-t border-ink md:grid-cols-2">
      {CV_DATA.certifications.map((c, i) => {
        const m = c.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
        const title = m ? m[1] : c;
        const src = m ? m[2] : 'Mendix';
        return (
          <div
            key={i}
            className={`flex items-baseline gap-4 border-b border-ink/15 py-5 ${i % 2 === 0 ? 'md:border-r md:border-ink/15 md:pr-7' : 'md:pl-7'}`}
          >
            <span className="font-display text-[13px] text-accent">{String(i + 1).padStart(2, '0')}</span>
            <span className="flex-grow font-display text-lg">{title}</span>
            <span className="label text-[11px]">{src}</span>
          </div>
        );
      })}
    </Reveal>
  </section>
);

/* --- Contact --- */
const Contact = () => {
  const links = [
    ['Email', CV_DATA.personal.email, `mailto:${CV_DATA.personal.email}`],
    ['Phone', CV_DATA.personal.phone, `tel:${CV_DATA.personal.phone}`],
    ['LinkedIn', 'in/gallentwibisonop', CV_DATA.personal.linkedin],
    ['Location', CV_DATA.personal.location, null],
  ] as const;
  return (
    <footer id="contact" className="mt-24 bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-8">
        <span className="label text-[#c9c2b0]">06 — Contact</span>
        <h2 className="mt-5 font-display text-[clamp(42px,8vw,92px)] font-semibold leading-[0.95] tracking-[-0.03em]">
          Let's make
          <br />
          something <em className="font-normal italic text-[#e8a79c]">work.</em>
        </h2>

        <div className="mt-12 grid border-t border-paper/25 md:grid-cols-2">
          {links.map(([k, v, href], i) => {
            const inner = (
              <>
                <span className="text-[13px] uppercase tracking-[0.14em] text-[#c9c2b0]">{k}</span>
                <span className="font-display text-xl text-paper">{v}</span>
              </>
            );
            const cls = `flex items-baseline justify-between gap-4 border-b border-paper/18 py-5 ${
              i % 2 === 0 ? 'md:border-r md:border-paper/25 md:pr-7' : 'md:pl-7'
            }`;
            return href ? (
              <a
                key={k}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`${cls} transition-[padding] hover:pl-3`}
              >
                {inner}
              </a>
            ) : (
              <div key={k} className={cls}>
                {inner}
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap justify-between gap-2 text-[12px] tracking-wide text-[#a79f8d]">
          <span>© {new Date().getFullYear()} Gallent Wibisono Purnomo</span>
          <span>Portfolio — Information Systems &amp; Digital Business</span>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <Nav />
      <Hero />
      <Strip />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Credentials />
      <Contact />
    </div>
  );
}
