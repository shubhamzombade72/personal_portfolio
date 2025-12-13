import React, { useState } from 'react';
import { Send, CheckCircle, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const Contact: React.FC = () => {
  const { userInfo, addMessage } = useData();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API network delay then save
    setTimeout(() => {
      addMessage({
          id: Date.now().toString(),
          name: formState.name,
          email: formState.email,
          message: formState.message,
          date: new Date().toISOString(),
          read: false
      });
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 py-12 sm:py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Contact Info */}
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Let's Talk</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg text-primary dark:text-blue-400">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Email</h3>
                  <a href={`mailto:${userInfo.email}`} className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400 transition-colors">
                    {userInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                 <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg text-green-600 dark:text-green-400">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Socials</h3>
                  <div className="flex space-x-4 mt-1">
                      <a href={userInfo.socials.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400">LinkedIn</a>
                      <a href={userInfo.socials.twitter} target="_blank" rel="noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-blue-400">Twitter</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg text-purple-600 dark:text-purple-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Location</h3>
                  <p className="text-slate-600 dark:text-slate-400">{userInfo.location}</p>
                  <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Remote Available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 dark:border-slate-700">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in-up">
                <div className="bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 p-4 rounded-full mb-6">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-8">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white dark:bg-slate-700 dark:text-white placeholder-slate-400"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white dark:bg-slate-700 dark:text-white placeholder-slate-400"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white dark:bg-slate-700 dark:text-white placeholder-slate-400 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {status === 'submitting' ? (
                    <span className="flex items-center">
                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                    </span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;