import { useState } from "react";
import { 
  Terminal, Sparkles, BookOpen, Award, Layers, Code, 
  Mail, MessageSquare, Linkedin, Github, Copy, Check,
  ChevronRight, Calendar, ArrowUpRight, Cpu, UserCheck, Flame, Zap, ExternalLink
} from "lucide-react";
import { PROJECTS, TECHNICAL_SKILLS, WORK_HISTORY, PORTFOLIO_METRIC_SUMMARY } from "./data/portfolioData";
import { MetricCard } from "./components/MetricCard";
import { ProjectDetailsModal } from "./components/ProjectDetailsModal";
import { ProjectCaseStudy } from "./types";
import { motion } from "motion/react";

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState(0);

  const contactEmail = "babbemayur45@gmail.com";

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] flex flex-col selection:bg-[#3B82F6]/20 selection:text-white">
      {/* Dynamic Design Accents */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-[#3B82F6]/5 to-transparent pointer-events-none -z-10" />

      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-[#18181B] px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-[#3B82F6]" />
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase font-bold text-white">MAYUR BABBE // SOLUTIONS ARCHITECT</span>
          </div>

          <div className="flex items-center space-x-6 text-[10px] uppercase font-mono tracking-widest">
            <a href="#projects" className="text-[#A1A1AA] hover:text-white transition-colors">PROJECTS</a>
            <span className="text-[#18181B] select-none">|</span>
            <a href="#skills" className="text-[#A1A1AA] hover:text-white transition-colors">THE ARSENAL</a>
            <span className="text-[#18181B] select-none">|</span>
            <a href="#history" className="text-[#A1A1AA] hover:text-white transition-colors">MILESTONES</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-8 py-12 space-y-16">
        <section id="hero" className="py-6 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#09090B] border border-[#18181B] rounded-none text-[9px] font-mono uppercase tracking-[0.15em] text-[#3B82F6] font-bold">
              <Award className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>ORACLE CERTIFIED GENERATIVE AI PROFESSIONAL</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-none uppercase">
                Mayur Babbe
              </h1>
              <h2 className="text-lg md:text-xl font-medium tracking-tight text-[#A1A1AA]">
                Full-Stack MERN Architect & Generative AI Systems Developer
              </h2>
              
              {/* Personal Contact Metadata bar */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-mono text-[#71717A] uppercase tracking-wider pt-1">
                <span>📍 Pune, Maharashtra</span>
                <span className="text-[#18181B] hidden sm:inline">|</span>
                <span>📞 +91 99602 66260</span>
                <span className="text-[#18181B] hidden sm:inline">|</span>
                <span>✉️ babbemayur45@gmail.com</span>
              </div>
            </div>

            <p className="text-[#71717A] text-xs md:text-sm leading-relaxed max-w-2xl font-mono">
              // Bridging scalable software engineering principles — like double-entry cash flow guarantees, real-time secure stream protection, and verified algorithms — with agentic AI pipelines. Leverages academic credentials and Oracle Generative AI validation to craft resilient production infrastructures.
            </p>

            {/* CTA actions */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#projects"
                className="px-6 py-3 bg-white hover:bg-zinc-200 text-black text-[11px] font-bold uppercase tracking-wider rounded-none transition-all flex items-center shadow-lg"
              >
                <Layers className="w-4 h-4 mr-2 text-black" />
                Explore Projects
              </a>
              <a 
                href="#skills"
                className="px-6 py-3 bg-[#09090B] hover:bg-[#18181B] border border-[#18181B] hover:border-[#27272A] text-white text-[11px] font-bold uppercase tracking-wider rounded-none transition-all flex items-center"
              >
                Technical Arsenal
                <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </motion.div>

          {/* Quick Stats Bento widget column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            <MetricCard
              id="stat-grad"
              label="EDUCATION"
              value={PORTFOLIO_METRIC_SUMMARY.academicYear}
              description="Information Technology Graduate, Savitribai Phule Pune University (SPPU)."
              icon={<BookOpen className="w-5 h-5" />}
            />
            <MetricCard
              id="stat-cgpa"
              label="ACADEMIC MERIT"
              value={PORTFOLIO_METRIC_SUMMARY.cgpa}
              description="Engineered high academic standards mapping data systems & analytical programming."
              icon={<Award className="w-5 h-5" />}
            />
            <MetricCard
              id="stat-leetcode"
              label="DSA PROBLEM SOLVER"
              value={PORTFOLIO_METRIC_SUMMARY.leetcodeCount}
              description="Verified solutions in C++ with advanced logic for high efficiency structures."
              icon={<Code className="w-5 h-5" />}
            />
            <MetricCard
              id="stat-experience"
              label="INDUSTRY VALUE"
              value={PORTFOLIO_METRIC_SUMMARY.experienceMonths}
              description="Hands-on focus via internships at Athams, DevTown & ScruzeMoney production."
              icon={<Layers className="w-5 h-5" />}
            />
          </motion.div>
        </section>

        <hr className="border-[#18181B]" />

        {/* Case Studies Section */}
        <motion.section 
          id="projects" 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8 scroll-mt-24"
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#3B82F6] block font-mono font-bold mb-1">
              THE HARD EVIDENCE
            </span>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tighter text-white uppercase">
              Project Case Studies
            </h3>
            <p className="text-xs text-[#A1A1AA]">
              Compelling proof illustrating transactional consistency, secure real-time broadcasts, and automated agents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((project, i) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                loading="lazy"
                id={`card-${project.id}`}
                className="group relative flex flex-col justify-between p-6 bg-[#09090B] hover:bg-[#09090B]/80 border border-[#18181B] hover:border-[#3B82F6]/40 rounded-none transition-all duration-300 overflow-hidden"
              >
                {/* Background ambient accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/2 rounded-none blur-2xl group-hover:bg-[#3B82F6]/5 transition-all duration-500 pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-mono tracking-widest font-semibold bg-[#050505] border border-[#18181B] text-[#71717A] px-2.5 py-1 rounded-none">
                      CASE STUDY 0{i + 1}
                    </span>
                    <div className="flex items-center space-x-3">
                      <span className="text-[10px] font-mono text-[#71717A]">{project.duration}</span>
                      <div className="flex items-center space-x-1.5 border-l border-[#18181B] pl-2.5">
                        {project.githubLink && (
                          <a 
                            href={project.githubLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[#71717A] hover:text-white transition-colors cursor-pointer"
                            title="Source Code"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.liveLink && (
                          <a 
                            href={project.liveLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[#71717A] hover:text-[#3B82F6] transition-colors cursor-pointer"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-white tracking-tight group-hover:text-[#3B82F6] transition-colors uppercase">
                    {project.title}
                  </h4>
                  <p className="text-[10px] font-mono text-[#3B82F6] uppercase tracking-widest mb-3">
                    {project.category}
                  </p>
                  
                  <p className="text-xs text-[#A1A1AA] leading-relaxed mb-6">
                    {project.subtitle}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#18181B]">
                  <div className="flex items-center space-x-2 overflow-hidden max-w-[200px] md:max-w-[280px]">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-[9px] font-mono text-[#71717A] bg-[#050505] px-1.5 py-0.5 border border-[#18181B]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-[10px] font-mono font-bold text-white hover:text-[#3B82F6] flex items-center space-x-1 border border-[#18181B] bg-[#050505] hover:bg-[#09090B] px-3 py-1.5 rounded-none transition-all cursor-pointer"
                  >
                    <span>Full Deep Dive</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#3B82F6]" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <hr className="border-[#18181B]" />

        {/* Technical Arsenal Block */}
        <motion.section 
          id="skills" 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8 scroll-mt-24"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#3B82F6] block font-mono font-bold mb-1">
                SKILLS & MATRICES
              </span>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tighter text-white uppercase">
                Technical Arsenal
              </h3>
              <p className="text-xs text-[#A1A1AA]">
                Rigorous skill assessment spanning basic algorithms, secure web development, and agent systems.
              </p>
            </div>
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {TECHNICAL_SKILLS.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSkillCategory(idx)}
                  className={`px-3 py-1.5 rounded-none text-[9px] font-mono font-bold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                    activeSkillCategory === idx 
                      ? "bg-[#3B82F6]/10 border-[#3B82F6]/40 text-[#3B82F6] font-bold" 
                      : "bg-[#050505] border-[#18181B] text-[#71717A] hover:text-zinc-300"
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#09090B] border border-[#18181B] rounded-none p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TECHNICAL_SKILLS[activeSkillCategory].skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-zinc-300 font-bold flex items-center">
                      <Zap className="w-3 h-3 text-[#3B82F6] mr-1.5" />
                      {skill.name}
                    </span>
                    <span className="text-[#71717A]">{skill.level}% Proficiency</span>
                  </div>
                  <div className="w-full bg-[#050505] h-1 rounded-none overflow-hidden border border-[#18181B]">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="bg-[#3B82F6] h-1 rounded-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Career Timeline Section */}
        <motion.section 
          id="history" 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8 scroll-mt-24"
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#3B82F6] block font-mono font-bold mb-1">
              CHRONOLOGY
            </span>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tighter text-white uppercase">
              Professional Milestones
            </h3>
            <p className="text-xs text-[#A1A1AA]">
              Practical software engineering exposure across startups and production freelance environments.
            </p>
          </div>

          <div className="space-y-4">
            {WORK_HISTORY.map((work, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                loading="lazy"
                className="p-6 bg-[#09090B]/50 hover:bg-[#09090B] border border-[#18181B] rounded-none flex flex-col md:flex-row justify-between gap-4 transition-all duration-200"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 bg-[#050505] text-[#3B82F6] font-mono text-[9px] rounded-none border border-[#18181B] font-bold uppercase tracking-wider">
                      {work.duration}
                    </span>
                    <span className="text-xs font-semibold font-mono text-[#71717A]">@ {work.company}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-tight uppercase">{work.role}</h4>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed max-w-3xl font-mono">{work.details}</p>
                </div>
                <div className="flex flex-col justify-between items-start md:items-end">
                  <span className="text-[9px] font-mono text-[#71717A] uppercase tracking-wider">FOCUSED WORK</span>
                  <div className="flex items-center text-[10px] text-white bg-[#050505] px-2.5 py-1 rounded-none border border-[#18181B] font-mono mt-2">
                    <Code className="w-3.5 h-3.5 text-[#3B82F6] mr-1.5" />
                    {work.project}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Friction-less footer details (The Conversion Engine) */}
        <motion.section 
          id="contact" 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="py-8"
        >
          <div className="bg-[#09090B] border border-[#18181B] p-8 rounded-none text-center space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/2 via-transparent to-transparent opacity-60 pointer-events-none" />

            <div className="relative z-10 space-y-3 max-w-xl mx-auto">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#3B82F6] font-mono bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2.5 py-1 rounded-none font-bold">
                The Conversion Engine
              </span>
              <h3 className="text-2xl md:text-4xl font-bold tracking-tighter text-white uppercase leading-none">
                Ready to Tackle Complex Systems?
              </h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Whether you need a rock-solid transactional database engine, real-time WebSocket infrastructure, or custom LLM workspace calibrations, I'm fully equipped to integrate MERN with forward-thinking Generative AI.
              </p>
            </div>

            <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Direct secure email with custom coping feedback */}
              <button
                onClick={handleCopyEmail}
                id="btn-copy-email"
                className="w-full sm:w-auto px-6 py-3 bg-[#050505] hover:bg-[#18181B] border border-[#18181B] hover:border-[#27272A] font-bold text-xs uppercase tracking-wider text-[#A1A1AA] hover:text-white rounded-none flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-bold uppercase">Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-[#3B82F6]" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${contactEmail}`}
                id="btn-direct-email"
                className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-zinc-200 font-bold text-black text-xs uppercase tracking-wider rounded-none flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-black" />
                <span>Open Mail Client</span>
              </a>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 text-[#71717A] font-mono text-[10px]">
              <a href="https://linkedin.com/in/mayur-babbe-986a06255" className="hover:text-white transition-colors flex items-center space-x-1" target="_blank" rel="noreferrer">
                <Linkedin className="w-4 h-4 text-[#3B82F6]" />
                <span>LinkedIn</span>
              </a>
              <span className="hidden sm:inline-block text-[#18181B] select-none">•</span>
              <a href="https://github.com/MayurBabbe45" className="hover:text-white transition-colors flex items-center space-x-1" target="_blank" rel="noreferrer">
                <Github className="w-4 h-4 text-white" />
                <span>Github</span>
              </a>
              <span className="hidden sm:inline-block text-[#18181B] select-none">•</span>
              <a href="https://leetcode.com/u/mayur_babbe45/" className="hover:text-white transition-colors flex items-center space-x-1" target="_blank" rel="noreferrer">
                <Code className="w-4 h-4 text-[#EAB308]" />
                <span>LeetCode</span>
              </a>
              <span className="hidden sm:inline-block text-[#18181B] select-none">•</span>
              <a href="https://www.skills.google/public_profiles/00449dc4-2ade-4445-bc4b-23e71cc036b8" className="hover:text-[#3B82F6] transition-colors flex items-center space-x-1" target="_blank" rel="noreferrer">
                <Award className="w-4 h-4 text-[#3B82F6]" />
                <span>Google Skills profile</span>
              </a>
              <span className="hidden sm:inline-block text-[#18181B] select-none">•</span>
              <span>Savitribai Phule Pune University</span>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Slide-over case study modal */}
      {selectedProject && (
        <ProjectDetailsModal
          id="project-deep-dive-modal"
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Footer metadata */}
      <footer className="border-t border-[#18181B] bg-[#050505] py-6 text-center text-[9px] text-[#71717A] font-mono tracking-[0.25em] uppercase">
        © {new Date().getFullYear()} Mayur Babbe // SAVITRIBAI PHULE PUNE UNIVERSITY // ORACLE GENERATIVE AI PROFESSIONAL
      </footer>
    </div>
  );
}
