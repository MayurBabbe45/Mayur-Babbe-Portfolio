import React, { useState } from "react";
import { ProjectCaseStudy } from "../types";
import { X, Copy, Check, Terminal, ExternalLink, Cpu, ShieldCheck, Zap, Activity } from "lucide-react";

interface ProjectDetailsModalProps {
  id: string;
  project: ProjectCaseStudy;
  onClose: () => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ id, project, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"narrative" | "guide">("narrative");

  // Simulator state
  const [simulatorInput, setSimulatorInput] = useState("Write a blog post about AI.");
  const [simulatorOutput, setSimulatorOutput] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatorCopied, setSimulatorCopied] = useState(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimulatorOutput("");
    setTimeout(() => {
      const output = `Act as an experienced technology writer and Prompt Engineer.
Refine the user's raw idea into a highly structured prompt.

[OBJECTIVE]
Draft a highly detailed and thoroughly structured response addressing the core theme: "${simulatorInput}".

[CONTEXT]
Target an advanced professional audience looking for actionable insights. Avoid generic fillers or robotic AI templates.

[STYLE & TONE]
Write with high authority and tech-zen clarity. Utilize precise nomenclature and spacing.

[STRUCTURE & FORMAT]
Deliver the content using clean Markdown, leveraging bold headers and lists to optimize readability.`;
      setSimulatorOutput(output);
      setIsSimulating(false);
    }, 800);
  };

  const handleCopySimulatorOutput = async () => {
    if (simulatorOutput) {
      await navigator.clipboard.writeText(simulatorOutput);
      setSimulatorCopied(true);
      setTimeout(() => setSimulatorCopied(false), 2000);
    }
  };

  const handleCopyCode = async () => {
    if (project.codeSnippet?.code) {
      await navigator.clipboard.writeText(project.codeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const hasGuide = !!project.installationSteps;

  return (
    <div
      id={id}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in"
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#050505] overflow-y-auto rounded-none border border-[#18181B] text-[#FAFAFA] shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with Close */}
        <button
          onClick={onClose}
          id="btn-close-project-modal"
          className="absolute top-4 right-4 p-2 text-[#A1A1AA] hover:text-white bg-[#09090B] border border-[#18181B] rounded-none transition-all duration-200 z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Container */}
        <div className="w-full flex flex-col md:flex-row h-full">
          {/* Left Column - Core Narrative / Guide */}
          <div className="md:w-3/5 p-6 md:p-8 border-b md:border-b-0 md:border-r border-[#18181B] bg-[#050505]">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-[#3B82F6] uppercase tracking-[0.2em] mb-2 font-bold">
              <span>{project.category}</span>
              <span className="text-[#27272A]">•</span>
              <span>{project.duration}</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tighter mb-2 uppercase">
              {project.title}
            </h3>
            
            <p className="text-[#A1A1AA] text-xs mb-6 font-mono border-l border-[#3B82F6] pl-3 italic">
              {project.subtitle}
            </p>

            {/* Direct Project Links */}
            <div className="flex flex-wrap gap-3 mb-6">
              {project.githubLink && (
                <a 
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 px-3 py-1.5 bg-[#09090B] hover:bg-[#18181B] border border-[#18181B] hover:border-[#3B82F6]/60 rounded-none text-[10px] font-mono uppercase tracking-[0.1em] text-white transition-all cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.579 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>Source Code</span>
                </a>
              )}
              {project.liveLink && (
                <a 
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 px-3 py-1.5 bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 border border-[#3B82F6]/20 hover:border-[#3B82F6]/50 rounded-none text-[10px] font-mono uppercase tracking-[0.1em] text-[#3B82F6] transition-all cursor-pointer font-bold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Launch Live Demo</span>
                </a>
              )}
            </div>

            {hasGuide && (
              <div className="flex border-b border-[#18181B] mb-6">
                <button
                  onClick={() => setActiveTab("narrative")}
                  className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                    activeTab === "narrative"
                      ? "border-[#3B82F6] text-white bg-[#09090B]"
                      : "border-transparent text-[#71717A] hover:text-white"
                  }`}
                >
                  System Architecture
                </button>
                <button
                  onClick={() => setActiveTab("guide")}
                  className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                    activeTab === "guide"
                      ? "border-[#3B82F6] text-white bg-[#09090B]"
                      : "border-transparent text-[#71717A] hover:text-white"
                  }`}
                >
                  Setup & Manual Guide
                </button>
              </div>
            )}

            {(!hasGuide || activeTab === "narrative") ? (
              <div className="space-y-6">
                {/* Problem */}
                <div>
                  <h4 className="flex items-center text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717A] mb-2">
                    <ShieldCheck className="w-4 h-4 text-rose-500 mr-2" />
                    The Critical Bottleneck
                  </h4>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed bg-[#09090B] p-3 rounded-none border border-rose-950/20">
                    {project.problem}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h4 className="flex items-center text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717A] mb-2">
                    <Zap className="w-4 h-4 text-[#3B82F6] mr-2" />
                    Engineered Intervention
                  </h4>
                  <p className="text-xs text-zinc-200 leading-relaxed bg-[#09090B] p-3 rounded-none border border-[#3B82F6]/10">
                    {project.solution}
                  </p>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="text-center p-3 bg-[#09090B] border border-[#18181B]">
                      <span className="block text-base font-bold text-[#3B82F6] font-mono tracking-tighter">
                        {metric.value}
                      </span>
                      <span className="block text-[8px] text-[#71717A] uppercase tracking-wider mt-1">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Impact Outcomes */}
                <div>
                  <h4 className="flex items-center text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717A] mb-3">
                    <Activity className="w-4 h-4 text-[#3B82F6] mr-2" />
                    Measurable System Impact
                  </h4>
                  <ul className="space-y-2 text-xs text-[#A1A1AA]">
                    {project.impact.map((bullet, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-[#3B82F6] mt-1 select-none">■</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Features */}
                {project.features && (
                  <div>
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717A] mb-2">
                      ✦ Key Capabilities
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-center space-x-2 bg-[#09090B] p-2 border border-[#18181B]">
                          <span className="text-[#3B82F6]">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {project.requirements && (
                  <div>
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717A] mb-2">
                      ⚙ System Requirements
                    </h4>
                    <ul className="space-y-1 text-xs text-zinc-400 bg-[#09090B]/50 p-3 border border-[#18181B]">
                      {project.requirements.map((req, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-[#3B82F6] mt-0.5">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Installation steps */}
                {project.installationSteps && (
                  <div>
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717A] mb-2">
                      📥 Step-by-Step Installation
                    </h4>
                    <ol className="space-y-2 text-xs text-zinc-300 bg-[#09090B] p-4 border border-[#18181B]">
                      {project.installationSteps.map((step, i) => (
                        <li key={i} className="flex items-start space-x-2.5">
                          <span className="text-[10px] font-mono bg-[#18181B] text-[#3B82F6] border border-[#27272A] w-5 h-5 flex items-center justify-center font-bold">
                            {i + 1}
                          </span>
                          <span className="flex-1 pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Setup */}
                {project.setupSteps && (
                  <div>
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717A] mb-2">
                      ⚙ Extension Configuration
                    </h4>
                    <ol className="space-y-1.5 text-xs text-zinc-400">
                      {project.setupSteps.map((step, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-[#3B82F6] mt-0.5">✦</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* How to use */}
                {project.howToUseSteps && (
                  <div>
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717A] mb-2">
                      🚀 Execution Protocol
                    </h4>
                    <ol className="space-y-1.5 text-xs text-zinc-400">
                      {project.howToUseSteps.map((step, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-[#3B82F6] mt-0.5">▪</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Example / Interactive Simulator */}
                <div>
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717A] mb-2">
                    🛠 Prompt Refiner Simulator
                  </h4>
                  <div className="bg-[#09090B] border border-[#18181B] p-4 space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-[#71717A] uppercase">Input Prompt Idea</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={simulatorInput}
                          onChange={(e) => setSimulatorInput(e.target.value)}
                          placeholder="Write a blog post about AI."
                          className="flex-1 bg-[#050505] border border-[#18181B] px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#3B82F6]"
                        />
                        <button
                          onClick={handleSimulate}
                          disabled={isSimulating}
                          className="px-4 py-1.5 bg-[#3B82F6] hover:bg-blue-600 disabled:bg-blue-800 text-black font-mono text-xs font-bold uppercase rounded-none transition-all flex items-center space-x-1 cursor-pointer"
                        >
                          {isSimulating ? (
                            <span>Refining...</span>
                          ) : (
                            <>
                              <Zap className="w-3.5 h-3.5 fill-black" />
                              <span>Refine</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {simulatorOutput ? (
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-mono text-emerald-400 uppercase">Refined Output Framework</label>
                          <button
                            onClick={handleCopySimulatorOutput}
                            className="text-zinc-500 hover:text-white transition-colors duration-200 cursor-pointer flex items-center space-x-1 text-[10px]"
                          >
                            {simulatorCopied ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Refined</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-3 bg-[#050505] text-[#D4D4D8] font-mono text-[10px] rounded-none border border-[#18181B] overflow-x-auto max-h-[160px] whitespace-pre-wrap">
                          <code>{simulatorOutput}</code>
                        </pre>
                      </div>
                    ) : (
                      <div className="p-3 bg-[#050505] text-[#71717A] font-mono text-[10px] rounded-none border border-[#18181B] italic text-center">
                        Click "Refine" to generate a high-fidelity prompt.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Architecture & Technical Code Proof */}
          <div className="md:w-2/5 p-6 md:p-8 bg-[#09090B] flex flex-col justify-between border-t md:border-t-0 border-[#18181B]">
            <div>
              <h4 className="flex items-center text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717A] mb-3">
                <Cpu className="w-4 h-4 text-[#3B82F6] mr-2" />
                Architectural Milestones
              </h4>
              <ul className="space-y-3 mb-6">
                {project.architecture.map((arch, i) => (
                  <li key={i} className="text-[11px] text-[#A1A1AA] leading-relaxed bg-[#050505] p-3 rounded-none border border-[#18181B] font-mono">
                    <span className="text-white mr-2 font-bold">{i + 1}.</span>
                    {arch}
                  </li>
                ))}
              </ul>

              {project.codeSnippet && (
                <div>
                  <div className="flex items-center justify-between bg-[#050505] border-t border-x border-[#18181B] px-3 py-2 rounded-t-none">
                    <div className="flex items-center space-x-2">
                      <Terminal className="w-3.5 h-3.5 text-[#71717A]" />
                      <span className="text-[10px] font-mono text-[#A1A1AA]">
                        {project.codeSnippet.filename}
                      </span>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="text-zinc-500 hover:text-white transition-colors duration-200 cursor-pointer"
                      title="Copy code snippet"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <pre className="p-3 bg-[#050505] text-[#D4D4D8] font-mono text-[10px] rounded-b-none border-b border-x border-[#18181B] overflow-x-auto max-h-[250px]">
                    <code>{project.codeSnippet.code}</code>
                  </pre>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-[#18181B] mt-6 md:mt-0 flex flex-wrap gap-1.5">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-[#18181B] text-[#A1A1AA] border border-[#27272A] text-[9px] rounded-none font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
