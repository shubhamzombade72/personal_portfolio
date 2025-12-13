import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { userInfo } = useData();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{userInfo.name}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4 max-w-sm">
              {userInfo.shortIntro}
            </p>
            <div className="flex space-x-4">
              <a href={userInfo.socials.github} target="_blank" rel="noreferrer" className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href={userInfo.socials.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={userInfo.socials.twitter} target="_blank" rel="noreferrer" className="text-slate-400 dark:text-slate-500 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href={`mailto:${userInfo.email}`} className="text-slate-400 dark:text-slate-500 hover:text-red-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/projects" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400 transition-colors">Projects</Link></li>
              <li><Link to="/skills" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400 transition-colors">Skills</Link></li>
              <li><Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400 transition-colors">About Me</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>{userInfo.email}</li>
              <li>{userInfo.location}</li>
              <li>
                  <Link to="/contact" className="text-primary dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">Get in touch &rarr;</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 dark:text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} {userInfo.name}. All rights reserved.
          </p>
          <p className="text-slate-400 dark:text-slate-600 text-xs mt-2 md:mt-0">
            Designed with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;