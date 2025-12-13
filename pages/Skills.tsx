import React from 'react';
import { useData } from '../context/DataContext';
import { CheckCircle2 } from 'lucide-react';

const Skills: React.FC = () => {
  const { skills } = useData();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 py-12 sm:py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Technical Skills</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A comprehensive list of the technologies, tools, and methodologies I use to bring products to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {skills.map((category, idx) => (
            <div
              key={idx}
              className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 hover:border-blue-100 dark:hover:border-blue-900 transition-colors duration-300"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <span className="w-2 h-8 bg-primary rounded-full mr-4"></span>
                {category.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.skills.map((skill) => (
                  <div key={skill.id} className="flex items-center space-x-3 group">
                    <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Experience / Learning Journey Snippet */}
        <div className="mt-20 bg-slate-900 dark:bg-slate-800 rounded-3xl p-8 sm:p-12 text-center sm:text-left text-white overflow-hidden relative">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Always Learning</h2>
              <p className="text-slate-300 max-w-2xl text-lg">
                I am constantly exploring new technologies. Currently, I am diving deep into
                <span className="text-white font-semibold"> Artificial Intelligence integrations </span>
                and <span className="text-white font-semibold"> WebGL </span> for immersive web experiences.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <span className="text-4xl font-bold">3+</span>
                <span className="block text-sm text-slate-400 uppercase tracking-wider mt-1">Years Exp.</span>
              </div>
            </div>
          </div>

          {/* Decorative blob */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
        </div>

      </div>
    </div>
  );
};

export default Skills;