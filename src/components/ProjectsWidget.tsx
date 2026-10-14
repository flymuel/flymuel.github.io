import React, { useState } from 'react';
import { FaHeart, FaMusic, FaTerminal, FaFolderOpen } from 'react-icons/fa';
import { MdOutlineLaunch, MdLayers, MdCheckCircle, MdClose } from 'react-icons/md';
import { aeroAudio } from '../utils/audio';

interface Project {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  category: string;
  icon: React.ReactNode;
  accent: 'blue' | 'emerald' | 'cyan' | 'indigo';
  summary: string;
  architecture: string[];
  metrics: { label: string; value: string }[];
  tools: string[];
  githubUrl?: string;
  demoUrl?: string;
}

interface ProjectsWidgetProps {
  onModalChange?: (isOpen: boolean) => void;
}

export const ProjectsWidget: React.FC<ProjectsWidgetProps> = ({ onModalChange }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'synxplay',
      title: 'Synxplay',
      badge: 'Music Company',
      subtitle: 'Official Website for Synxplay Music',
      category: 'Web Development',
      icon: <FaMusic className="w-5 h-5 text-emerald-600" />,
      accent: 'emerald',
      summary: 'The official digital web presence for Synxplay, a music company. The platform is designed to showcase artists, releases, and company information with a modern, responsive, and engaging user interface tailored specifically for the digital music industry.',
      architecture: [
        'Modern and responsive front-end architecture for optimal user experience',
        'Integration with Spotify API for seamless music metadata synchronization',
        'Optimized for high performance, accessibility, and fast loading times',
        'Professional UI/UX design tailored for the music entertainment sector'
      ],
      metrics: [
        { label: 'Status', value: 'Active' },
        { label: 'Domain', value: 'synxplay.web.id' },
        { label: 'Industry', value: 'Digital Music' },
        { label: 'Role', value: 'Web Developer' }
      ],
      tools: ['Laravel', 'JavaScript', 'Spotify API', 'Vite', 'PHP', 'Tailwind CSS'],
      demoUrl: 'https://synxplay.web.id',
    },
    {
      id: 'surat-untukmu',
      title: 'Surat Untukmu',
      badge: 'Personal Website',
      subtitle: 'A Web-Based Romantic Surprise',
      category: 'Web Development',
      icon: <FaHeart className="w-5 h-5 text-rose-500" />,
      accent: 'blue',
      summary: 'A simple yet meaningful interactive web application created as a digital romantic surprise. Instead of a traditional physical card, this project utilizes web technologies to express feelings through a clean user interface and smooth interactive elements.',
      architecture: [
        'Clean, responsive, and interactive user interface design',
        'Semantic HTML structure combined with custom CSS styling',
        'Interactive DOM manipulation using vanilla JavaScript',
        'Fully deployed and hosted on GitHub Pages for high availability'
      ],
      metrics: [
        { label: 'Status', value: 'Completed' },
        { label: 'Type', value: 'Digital Gift' },
        { label: 'Hosting', value: 'GitHub Pages' },
        { label: 'Platform', value: 'Web Browser' }
      ],
      tools: ['React.js', 'Vite', 'Tailwind CSS', 'JavaScript', 'HTML5 Audio API', 'GitHub Pages'],
      demoUrl: 'https://flymuel.github.io/surat-untukmu/',
      githubUrl: 'https://github.com/flymuel/surat-untukmu'
    }
  ];

  const handleOpenProject = (p: Project) => {
    aeroAudio.playGlassChime();
    setSelectedProject(p);
    if (onModalChange) onModalChange(true);
  };

  const handleClose = () => {
    aeroAudio.playWaterClick();
    setSelectedProject(null);
    if (onModalChange) onModalChange(false);
  };

  return (
    <section id="projects" className="relative">
      {/* Section Header */}
      <div className="aero-glass-panel rounded-2xl p-4 sm:p-5 mb-6 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/80 shadow-md">
        <div className="glass-reflection pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-sm" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-sky-950 tracking-tight drop-shadow-sm">
              Featured Projects
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-sky-900/90 ml-4.5">
            Project that i have worked on, showcasing my skills in web development.
          </p>
        </div>
        
        <div className="relative z-10 shrink-0">
          <span className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-white/70 border border-white/90 text-sky-900 shadow-sm inline-flex items-center gap-1.5">
            <FaFolderOpen className="w-3.5 h-3.5 text-sky-600" />
            2 Highlighted Projects
          </span>
        </div>
      </div>

      {/* Responsive Bento Grid: Single Column on Mobile, 2-Column Desktop Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="aero-glass-panel p-6 sm:p-7 flex flex-col justify-between group cursor-pointer"
            onClick={() => handleOpenProject(project)}
          >
            <div className="glass-reflection" />

            <div className="relative z-10">
              {/* Card Top Pill & Icon */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-white/80 border border-white shadow-md group-hover:scale-105 transition-transform">
                    {project.icon}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700/80">
                      {project.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-sky-950 group-hover:text-sky-600 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-sky-100/80 border border-sky-200/80 text-sky-900 shadow-xs shrink-0">
                  {project.badge}
                </span>
              </div>

              {/* Subtitle & Summary */}
              <p className="text-xs font-semibold text-sky-800 mb-2 drop-shadow-sm">
                {project.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-sky-950 leading-relaxed mb-4 line-clamp-3 drop-shadow-sm">
                {project.summary}
              </p>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-white/50 border border-white/75 shadow-xs">
                {project.metrics.slice(0, 2).map((m, idx) => (
                  <div key={idx} className="text-center">
                    <span className="text-[10px] uppercase font-semibold text-sky-800/70 block">
                      {m.label}
                    </span>
                    <span className="font-extrabold text-sky-950 text-sm">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tools.slice(0, 4).map((tool, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/60 border border-white/80 text-sky-800"
                  >
                    {tool}
                  </span>
                ))}
                {project.tools.length > 4 && (
                  <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-white/40 text-sky-700">
                    +{project.tools.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Card Footer 3D Action */}
            <div className="relative z-10 pt-3 border-t border-sky-100/60 flex items-center justify-end">
              <button
                type="button"
                className="btn-gel-silver px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <div className="gel-highlight" />
                <MdLayers className="w-3.5 h-3.5 text-sky-700" />
                <span>Inspect</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-950/40 backdrop-blur-md animate-fadeIn">
          <div className="aero-glass-panel max-w-2xl w-full relative shadow-2xl border-2 border-white flex flex-col max-h-[90vh]">
            <div className="glass-reflection pointer-events-none rounded-2xl" />

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-white/80 border border-sky-200 text-sky-900 hover:bg-white transition-colors cursor-pointer"
              title="Close Modal"
            >
              <MdClose className="w-5 h-5" />
            </button>

            <div className="relative z-10 p-6 sm:p-8 overflow-y-auto custom-scrollbar">
              
              <div className="flex items-start gap-4 mb-4 pr-10">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-white/90 border border-white shadow-md shrink-0">
                    {selectedProject.icon}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                      {selectedProject.badge}
                    </span>
                    <h3 className="text-2xl font-extrabold text-sky-950">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="text-sm font-semibold text-sky-800 mb-4 pb-3 border-b border-sky-100">
                {selectedProject.subtitle}
              </div>

              <p className="text-sm text-sky-950 leading-relaxed mb-5 drop-shadow-sm">
                {selectedProject.summary}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                {selectedProject.metrics.map((metric, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/80 border border-white shadow-sm flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800/90 block mb-1">
                      {metric.label}
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-sky-950 wrap-break-word w-full leading-tight">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold text-sky-950 flex items-center gap-1.5 mb-3">
                  <FaTerminal className="w-4 h-4 text-sky-700" />
                  Engineering Architecture & Implementation
                </h4>
                <ul className="space-y-2">
                  {selectedProject.architecture.map((item, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-sky-950 flex items-start gap-2 bg-white/40 p-2 rounded-lg border border-white/80 shadow-xs">
                      <MdCheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-sky-950 mb-2">
                  Technologies & Frameworks
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tools.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/80 border border-sky-200/80 text-sky-900 shadow-2xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-sky-100 mt-2">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => aeroAudio.playWaterClick()}
                    className="btn-gel-silver px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-sm"
                  >
                    <div className="gel-highlight" />
                    <FaFolderOpen className="w-4 h-4 text-sky-800" />
                    <span>View Repository</span>
                    <MdOutlineLaunch className="w-3 h-3 opacity-80" />
                  </a>
                )}

                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => aeroAudio.playWaterClick()}
                    className="btn-gel-aqua px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-sm"
                  >
                    <div className="gel-highlight" />
                    <MdOutlineLaunch className="w-4 h-4" />
                    <span>Visit Live Platform</span>
                  </a>
                )}

                <button
                  onClick={handleClose}
                  className="btn-gel-green px-5 py-2 rounded-xl text-xs font-bold shadow-sm cursor-pointer"
                >
                  <div className="gel-highlight" />
                  <span>Done</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};