import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Menu, X, Download, Mail, Linkedin, Phone, MapPin, 
  ChevronRight, Award, Briefcase, GraduationCap, Code, 
  MessageSquare, ArrowUpRight, Github, ExternalLink,
  Cpu, Layout, Shield, Target, Coffee, Rocket, Zap, Sparkles
} from 'lucide-react';
import { CV_DATA } from './data';

// --- Shared Components ---

const Section = ({ children, title, id, className = "" }: { children: React.ReactNode, title?: string, id?: string, className?: string }) => (
  <section id={id} className={`py-32 px-6 md:px-16 lg:px-24 ${className}`}>
    {title && (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <span className="text-accent-teal text-[10px] font-mono tracking-[0.5em] uppercase block mb-6">Explore</span>
        <h2 className="text-5xl md:text-6xl font-display font-bold tracking-tighter uppercase">{title}</h2>
        <div className="h-[2px] w-16 bg-accent-coral mt-8" />
      </motion.div>
    )}
    {children}
  </section>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-16 py-10 bg-gradient-to-b from-premium-black to-transparent">
      <div className="flex items-center gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-display font-bold tracking-tighter"
        >
          GALLENT<span className="text-accent-coral">.</span>W.P
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="hidden md:flex items-center gap-2 text-[10px] text-white/30 font-mono tracking-widest uppercase"
        >
          {CV_DATA.personal.email}
        </motion.div>
      </div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group p-2"
      >
        <div className="w-8 h-[2px] bg-white mb-2 group-hover:bg-accent-coral transition-colors"></div>
        <div className="w-5 h-[2px] bg-white ml-auto group-hover:bg-accent-teal transition-colors"></div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-premium-black z-40 flex flex-col items-center justify-center gap-12"
          >
            {['Home', 'About', 'Expertise', 'Projects', 'Journey', 'Contact'].map((item) => (
              <a 
                key={item}
                href={item === 'Journey' ? '#journey' : `#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="text-4xl md:text-6xl font-display font-bold hover:text-accent-coral transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="flex gap-8 mt-12">
              <a href={CV_DATA.personal.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="text-white/40 hover:text-white cursor-pointer" />
              </a>
              <a href={`mailto:${CV_DATA.personal.email}`}>
                <MessageSquare className="text-white/40 hover:text-white cursor-pointer" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SocialRail = () => (
  <div className="hidden lg:flex fixed left-12 bottom-0 flex-col items-center gap-8 pb-12 z-10">
    <motion.div 
      initial={{ height: 0 }}
      animate={{ height: 60 }}
      className="w-[1px] bg-accent-teal/30"
    />
    <div className="flex flex-col gap-6 text-white/30">
      <a href={CV_DATA.personal.linkedin} target="_blank" rel="noopener noreferrer">
        <Linkedin size={18} className="hover:text-accent-coral cursor-pointer transition-colors" />
      </a>
      <a href={`mailto:${CV_DATA.personal.email}`}>
        <MessageSquare size={18} className="hover:text-accent-coral cursor-pointer transition-colors" />
      </a>
    </div>
  </div>
);

// --- Main Page Sections ---

const Hero = () => (
  <header id="home" className="min-h-screen editorial-grid items-center relative overflow-hidden bg-[#050505]">
    {/* Background Accents from Theme */}
    <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-accent-coral opacity-[0.08] blur-[120px] rounded-full" />
    <div className="absolute bottom-[-50px] left-[20%] w-64 h-64 bg-accent-teal opacity-[0.05] blur-[100px] rounded-full" />
    
    {/* Left Part: Introduction */}
    <div className="px-8 md:px-16 lg:px-24 z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-accent-coral text-xl font-medium mb-2 tracking-tight">Hi,</p>
        <h1 className="text-7xl md:text-8xl lg:text-[110px] font-display font-bold leading-[0.85] tracking-tighter mb-8 group uppercase">
          {CV_DATA.personal.firstName}<br/>
          <span className="text-accent-coral group-hover:glow-coral transition-all duration-500">
            {CV_DATA.personal.lastName.split(' ')[0]}
          </span>
        </h1>
        <p className="text-white/50 text-lg uppercase tracking-[0.2em] mb-12 font-light max-w-sm">
          Digital Business & Information System
        </p>
        
        <a href={CV_DATA.personal.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block group relative w-fit mb-12">
          <div className="absolute -inset-2 bg-accent-coral rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          <div className="relative px-12 py-5 bg-gradient-to-r from-accent-coral to-[#d6651d] rounded-full text-black font-bold uppercase text-xs tracking-[0.2em] transition-transform active:scale-95">
            Hire Me
          </div>
        </a>
      </motion.div>
    </div>

    {/* Center Part: Profile Portrait */}
    <div className="relative flex justify-center items-end h-full pt-20">
      {/* Floating rings from Theme */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 border border-white/5 rounded-full z-0 animate-[spin_30s_linear_infinite]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] border border-accent-teal/10 rounded-full z-0 animate-[spin_40s_linear_reverse_infinite]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="relative z-10 w-full h-[110%] flex items-end group"
      >
        <div className="w-full h-full bg-cover bg-center grayscale brightness-110 contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100"
             style={{ 
               backgroundImage: "url('/profile.jpg')",
               maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
               WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
             }}>
        </div>
        {/* Subtle Overlay Gradient from Theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-premium-black via-transparent to-transparent opacity-90" />
      </motion.div>
    </div>

    {/* Right Part: Summary */}
    <div className="px-8 md:px-16 flex flex-col justify-center z-20">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="space-y-10"
      >
        <div>
          <p className="text-accent-teal text-[10px] font-mono uppercase tracking-[0.4em] mb-6">Expert on</p>
          <h2 className="text-lg md:text-xl font-light leading-relaxed text-white/90">
            {CV_DATA.personal.location}-based digital specialist focusing on <span className="italic font-display text-white">strategic innovation</span> and design systems.
          </h2>
        </div>
        
        <p className="text-white/40 leading-relaxed text-sm max-w-xs">
          {CV_DATA.personal.summary.split('.')[0]}. Partnering with technology leaders to shape the future of digital business.
        </p>

        <div className="pt-4">
        </div>

        {/* Availability Accent */}
        <div className="pt-20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-accent-coral animate-pulse"></div>
          </div>
          <span className="text-[10px] text-white/30 font-mono tracking-tighter">AVAILABLE FOR HIRE 2026</span>
        </div>
      </motion.div>
    </div>
  </header>
);

const About = () => (
  <Section id="about" title="Philosophy">
    <div className="grid lg:grid-cols-2 gap-20 items-start">
      <div className="space-y-8">
        <p className="text-3xl md:text-4xl font-light leading-snug">
          I believe that <span className="text-accent-coral font-medium">systems</span> are only as good as the <span className="text-accent-teal italic">impact</span> they create.
        </p>
        <p className="text-white/60 text-lg leading-relaxed">
          {CV_DATA.personal.summary}
        </p>
        <div className="grid grid-cols-2 gap-8 pt-8">
          <div>
            <span className="text-accent-teal font-display text-4xl block mb-2 font-bold">3.97</span>
            <span className="text-xs uppercase tracking-widest text-white/40 font-bold">Cumulative GPA</span>
          </div>
          <div>
            <span className="text-accent-coral font-display text-4xl block mb-2 font-bold">700+</span>
            <span className="text-xs uppercase tracking-widest text-white/40 font-bold">People Managed</span>
          </div>
        </div>
      </div>
      
      <div className="relative group">
        <div className="aspect-video bg-white/5 rounded-2xl overflow-hidden ring-1 ring-white/10 group-hover:ring-accent-teal/50 transition-all duration-700">
           {/* Abstract representational image */}
           <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
            alt="Strategic Vision"
            className="w-full h-full object-cover mix-blend-luminosity opacity-40 group-hover:opacity-100 transition-opacity"
            referrerPolicy="no-referrer"
           />
        </div>
        <div className="absolute -bottom-6 -right-6 p-8 bg-premium-black border border-white/5 rounded-xl shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent-teal flex items-center justify-center">
              <Shield className="text-premium-black" size={24} />
            </div>
            <div>
              <p className="font-bold text-lg">System Integrity</p>
              <p className="text-xs text-white/40">Enterprise Security Standard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

const Expertise = () => (
  <Section id="expertise" title="Capabilities">
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Dynamic Skill Cards */}
      {CV_DATA.skills.technical.slice(0, 5).map((skill, idx) => (
        <motion.div 
          key={skill}
          whileHover={{ y: -5 }}
          className="p-8 border border-white/5 bg-white/[0.02] rounded-2xl hover:bg-white/[0.05] transition-all group lg:last:col-span-1 md:last:col-span-2"
        >
          <div className="w-12 h-12 rounded-lg bg-accent-teal/10 flex items-center justify-center mb-6 group-hover:bg-accent-teal transition-colors">
            {idx === 0 && <Code className="text-accent-teal group-hover:text-premium-black" />}
            {idx === 1 && <Target className="text-accent-teal group-hover:text-premium-black" />}
            {idx === 2 && <Cpu className="text-accent-teal group-hover:text-premium-black" />}
            {idx === 3 && <Layout className="text-accent-teal group-hover:text-premium-black" />}
            {idx === 4 && <Briefcase className="text-accent-teal group-hover:text-premium-black" />}
          </div>
          <h3 className="text-xl font-bold mb-4">{skill}</h3>
          <p className="text-sm text-white/40 leading-relaxed">
            Specialized implementation and optimization for enterprise-scale environments.
          </p>
        </motion.div>
      ))}
    </div>

    <div className="mt-20 grid lg:grid-cols-3 gap-12">
      <div>
        <h4 className="text-accent-coral font-mono text-[10px] uppercase tracking-[0.4em] block mb-8">Soft Infrastructure</h4>
        <div className="flex flex-wrap gap-2">
          {CV_DATA.skills.soft.map(skill => (
            <span key={skill} className="px-4 py-2 border border-white/10 rounded-full text-xs font-medium hover:bg-accent-coral hover:border-accent-coral transition-colors">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-accent-teal font-mono text-[10px] uppercase tracking-[0.4em] block mb-8">Languages</h4>
        <div className="space-y-4">
          {CV_DATA.skills.languages.map(lang => (
            <div key={lang.name} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
              <span className="font-bold">{lang.name}</span>
              <span className="text-white/40">{lang.level}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-accent-coral font-mono text-[10px] uppercase tracking-[0.4em] block mb-8">Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {CV_DATA.skills.technical.map(skill => (
            <span key={skill} className="px-4 py-2 border border-white/10 rounded-full text-xs font-medium hover:bg-accent-teal hover:border-accent-teal transition-colors">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

const ProjectCard = ({ project, index }: { project: typeof CV_DATA.projects[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div 
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
        }
      }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="group relative bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:border-accent-coral/30 transition-all duration-500 flex flex-col h-full"
    >
      <div className="aspect-[16/10] overflow-hidden relative isolate">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-[140%] -top-[20%]">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 pointer-events-none"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-premium-black via-transparent to-transparent opacity-60 z-10 pointer-events-none" />
        <div className="absolute top-4 right-4 bg-premium-black/60 z-20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono uppercase tracking-widest text-accent-teal pointer-events-none">
          {project.category}
        </div>
      </div>
      
      <div className="p-8 pb-10 flex flex-col flex-grow z-20 bg-gradient-to-t from-premium-black/90 to-transparent pointer-events-auto">
        <h3 className="text-2xl font-bold mb-4 group-hover:text-accent-coral transition-colors">{project.title}</h3>
        <p className="text-white/40 text-sm leading-relaxed mb-8 flex-grow">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-widest text-white/20 bg-white/5 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => (
  <Section id="projects" title="Featured Projects">
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15
          }
        }
      }}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
    >
      {CV_DATA.projects.map((project, idx) => (
        <ProjectCard key={idx} project={project} index={idx} />
      ))}
    </motion.div>
  </Section>
);

const Experience = () => (
  <Section id="journey" title="Experience">
    <div className="space-y-12">
      {CV_DATA.experience.map((exp, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="group relative grid md:grid-cols-[200px_1fr] gap-8 p-8 border-l border-white/10 hover:border-accent-coral transition-colors"
        >
          <div className="text-white/40 font-mono text-sm group-hover:text-white transition-colors">
            {exp.period}
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-4">
              {exp.role}
              <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all text-accent-coral -translate-y-1" />
            </h3>
            <p className="text-accent-teal font-medium mb-6 uppercase tracking-widest text-xs">{exp.company}</p>
            <ul className="space-y-3">
              {exp.achievements.map((item, i) => (
                <li key={i} className="text-white/60 text-sm leading-relaxed flex gap-4">
                  <div className="mt-1.5 w-1 h-1 rounded-full bg-accent-coral shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
    
    <div className="mt-24">
      <h3 className="text-xl font-mono uppercase tracking-[0.4em] text-white/30 mb-12">Leadership & Projects</h3>
      <div className="grid md:grid-cols-2 gap-8">
        {CV_DATA.leadership.map((lead, idx) => (
          <div key={idx} className="p-8 border border-white/5 bg-white/[0.01] rounded-2xl group hover:border-accent-teal transition-all">
            <span className="text-xs text-white/30 font-mono block mb-4">{lead.period}</span>
            <h4 className="text-lg font-bold mb-2 group-hover:text-accent-teal transition-colors">{lead.role}</h4>
            <p className="text-sm text-white/60 italic mb-4">{lead.organization}</p>
            <p className="text-xs text-white/40 leading-relaxed line-clamp-2">
              {lead.achievements[0]}
            </p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

const Footer = () => (
  <footer id="contact" className="px-16 py-12 flex flex-col gap-24 bg-[#050505]">
    <div className="grid lg:grid-cols-2 gap-24">
      <div>
        <h2 className="text-7xl md:text-9xl font-display font-bold tracking-tighter mb-16 leading-[0.8]">
          Let's <span className="text-accent-coral italic">Chat.</span>
        </h2>
        <div className="grid grid-cols-2 gap-12">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-white/30 font-mono tracking-[0.3em] uppercase">Email</span>
            <p className="text-sm font-medium">{CV_DATA.personal.email}</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-white/30 font-mono tracking-[0.3em] uppercase">Phone</span>
            <p className="text-sm font-medium">{CV_DATA.personal.phone}</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-white/30 font-mono tracking-[0.3em] uppercase">Location</span>
            <p className="text-sm font-medium">{CV_DATA.personal.location}</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col justify-center">
        <div className="p-16 border border-white/5 rounded-3xl bg-white/[0.02] backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-teal/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
          <h4 className="text-3xl font-bold mb-6">Ready to hire?</h4>
          <p className="text-white/40 mb-10 leading-relaxed text-lg">I'm currently seeking full-time opportunities in Digital Business and Information Systems. Let's build something exceptional together.</p>
          <a href={`mailto:${CV_DATA.personal.email}`} className="text-2xl font-display font-bold text-accent-teal flex items-center gap-4 hover:translate-x-4 transition-all duration-500">
            Start a Conversation <ArrowUpRight size={32} />
          </a>
        </div>
      </div>
    </div>

    <div className="flex justify-between items-end pb-8 border-t border-white/5 pt-12">
      <div className="flex gap-6 text-white/30">
        <motion.div whileHover={{ scale: 1.2, color: '#4ade80' }} className="transition-colors cursor-pointer">
          <Coffee size={20} />
        </motion.div>
        <motion.div whileHover={{ scale: 1.2, color: '#facc15' }} className="transition-colors cursor-pointer">
          <Zap size={20} />
        </motion.div>
        <motion.div whileHover={{ scale: 1.2, color: '#38bdf8' }} className="transition-colors cursor-pointer">
          <Rocket size={20} />
        </motion.div>
        <motion.div whileHover={{ scale: 1.2, color: '#ec4899' }} className="transition-colors cursor-pointer">
          <Sparkles size={20} />
        </motion.div>
      </div>
      
      <div className="bg-white/5 backdrop-blur-md px-8 py-5 rounded-tl-3xl flex items-center gap-4 border-t border-l border-white/10 group cursor-pointer hover:bg-white/10 transition-colors">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] group-hover:text-accent-teal transition-colors">Status: Open to Work</span>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-accent-coral selection:text-white">
      <Navbar />
      <SocialRail />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Experience />
        
        <Section title="Credentials" id="credentials">
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CV_DATA.certifications.map((cert, idx) => (
                <div key={idx} className="p-6 border border-white/5 bg-white/[0.02] rounded-xl flex items-start gap-4 group hover:bg-white/[0.05] transition-all">
                  <Award className="text-accent-coral group-hover:scale-110 transition-transform shrink-0" size={24} />
                  <div>
                    <p className="text-sm font-medium leading-relaxed">{cert}</p>
                    <p className="text-[10px] text-white/20 uppercase tracking-widest mt-2">Verified Professional</p>
                  </div>
                </div>
              ))}
           </div>
        </Section>

        <Footer />
      </motion.div>

      {/* Floating Chat Button */}
      <motion.a 
        href={`mailto:${CV_DATA.personal.email}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-12 right-12 w-16 h-16 bg-accent-teal rounded-full flex items-center justify-center shadow-2xl shadow-accent-teal/40 z-30 group"
      >
        <MessageSquare size={28} className="text-premium-black group-hover:scale-110 transition-transform" />
      </motion.a>
    </div>
  );
}
