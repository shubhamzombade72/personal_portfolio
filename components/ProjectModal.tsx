import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Smartphone, Monitor, AppWindow, Eye } from 'lucide-react';
import { Project } from '../types';
import { useData } from '../context/DataContext';

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const { incrementProjectViews } = useData();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      incrementProjectViews(project.id);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isMobile = project.category === 'Mobile';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col animate-scale-up">
        
        {/* Header Image */}
        <div className="relative h-64 sm:h-80 w-full shrink-0">
            <img 
              src={project.thumbnailUrl} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
             <button 
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 p-2 rounded-full text-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-800 hover:scale-110 transition-all shadow-lg"
              >
                <X size={24} />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-6 sm:p-8">
               <div className="flex items-center gap-4 mb-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.category === 'Web' ? 'bg-blue-100 text-blue-800' : 
                      project.category === 'Mobile' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                  }`}>
                    {project.category === 'Web' ? <Monitor size={12} className="mr-1"/> : 
                     project.category === 'Mobile' ? <Smartphone size={12} className="mr-1"/> :
                     <AppWindow size={12} className="mr-1"/>}
                    {project.category}
                  </span>
                  <span className="flex items-center text-xs text-white/80">
                      <Eye size={12} className="mr-1" /> {project.views || 0} views
                  </span>
               </div>
               <h2 className="text-3xl font-bold text-white">{project.title}</h2>
            </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8">
            
            {/* Links and Role */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                <div>
                   <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide font-semibold mb-1">My Role</p>
                   <p className="font-medium text-slate-900 dark:text-white">{project.role}</p>
                </div>
                <div className="flex gap-3">
                   {project.liveLink && (
                       <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                           <ExternalLink size={16} className="mr-2" /> Live Demo
                       </a>
                   )}
                   {project.githubLink && (
                       <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex items-center px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium text-sm border border-slate-200 dark:border-slate-700">
                           <Github size={16} className="mr-2" /> View Code
                       </a>
                   )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Overview</h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{project.fullDescription}</p>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">The Challenge</h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{project.problem}</p>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">The Solution</h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm">{project.solution}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map(tech => (
                                <span key={tech} className="px-3 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full text-sm text-slate-600 dark:text-slate-200 font-medium shadow-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Screenshots Gallery */}
            <div>
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Screenshots</h3>
                 <div className={`grid gap-4 ${
                     isMobile 
                        ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' 
                        : 'grid-cols-1 sm:grid-cols-2'
                 }`}>
                     {project.screenshotUrls.map((url, idx) => (
                         <div 
                            key={idx} 
                            className={`rounded-xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-800 group relative ${
                                isMobile ? 'aspect-[9/19]' : 'aspect-video'
                            }`}
                         >
                             <img 
                                src={url} 
                                alt={`${project.title} screenshot ${idx + 1}`} 
                                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                         </div>
                     ))}
                 </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectModal;