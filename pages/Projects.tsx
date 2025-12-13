import React, { useState } from 'react';
import { Project, ProjectCategory } from '../types';
import { useData } from '../context/DataContext';
import ProjectModal from '../components/ProjectModal';
import { Filter, Monitor, Smartphone, AppWindow } from 'lucide-react';

const Projects: React.FC = () => {
  const { projects } = useData();
  const [filter, setFilter] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(p => 
    filter === 'All' ? true : p.category === filter
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 sm:py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">My Projects</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A selection of my recent work in web, mobile, and software development.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex justify-center mb-12">
            <div className="inline-flex flex-wrap justify-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                {(['All', 'Web', 'Mobile', 'Software'] as const).map((category) => (
                    <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`
                            px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
                            ${filter === category 
                                ? 'bg-slate-900 dark:bg-primary text-white shadow-md' 
                                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                            }
                        `}
                    >
                        {category === 'All' && <Filter size={16} />}
                        {category === 'Web' && <Monitor size={16} />}
                        {category === 'Mobile' && <Smartphone size={16} />}
                        {category === 'Software' && <AppWindow size={16} />}
                        {category === 'All' ? 'All Projects' : category}
                    </button>
                ))}
            </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer flex flex-col h-full"
              onClick={() => setSelectedProject(project)}
            >
              {/* Thumbnail */}
              <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-200 dark:bg-slate-800">
                <img 
                  src={project.thumbnailUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute top-4 left-4">
                     <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                         project.category === 'Web' ? 'bg-white/90 dark:bg-slate-900/90 text-blue-700 dark:text-blue-400' : 
                         project.category === 'Mobile' ? 'bg-white/90 dark:bg-slate-900/90 text-green-700 dark:text-green-400' :
                         'bg-white/90 dark:bg-slate-900/90 text-purple-700 dark:text-purple-400'
                     } shadow-sm backdrop-blur-sm`}>
                         {project.category}
                     </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-50 dark:border-slate-800">
                  {project.techStack.slice(0, 3).map(tech => (
                    <span key={tech} className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                      +{project.techStack.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-slate-500 dark:text-slate-400">
                No projects found in this category.
            </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          isOpen={!!selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};

export default Projects;