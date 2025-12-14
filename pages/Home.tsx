import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Home: React.FC = () => {
  const { userInfo } = useData();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-900 py-20 sm:py-32 transition-colors duration-300">
        <div className="absolute inset-0 bg-[url('/images/profile.png')] bg-cover bg-center opacity-5 dark:opacity-[0.02]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-blue-100 dark:border-blue-800">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span>Available for freelance work</span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                Hi, I'm {userInfo.name}. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  {userInfo.title}
                </span>
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
                {userInfo.shortIntro} I specialize in building robust applications that solve real-world problems.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/projects"
                  className="inline-flex justify-center items-center px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  View My Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex justify-center items-center px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm hover:shadow-md"
                >
                  Contact Me
                </Link>
              </div>

              <div className="flex items-center space-x-6 pt-4 text-slate-400 dark:text-slate-500">
                <a href={userInfo.socials.github} target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors transform hover:scale-110">
                  <Github size={28} />
                </a>
                <a href={userInfo.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary dark:hover:text-blue-400 transition-colors transform hover:scale-110">
                  <Linkedin size={28} />
                </a>
                <a href={`mailto:${userInfo.email}`} className="hover:text-red-500 transition-colors transform hover:scale-110">
                  <Mail size={28} />
                </a>
              </div>
            </div>

            <div className="relative lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/images/profile.png"
                  alt={userInfo.name}
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Decorative elements / Download Button */}
              <a
                href={userInfo.resumeLink}
                download="Shubham_Zombade_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl z-10 hidden sm:block border border-slate-100 dark:border-slate-700 cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full text-green-600 dark:text-green-400">
                    <Download size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Resume</p>
                    <p className="font-bold text-slate-900 dark:text-white">Available Now</p>
                  </div>
                </div>
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;