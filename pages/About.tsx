import React from 'react';
import { Award, BookOpen, Coffee, Briefcase } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
    const { userInfo, experiences, certifications } = useData();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 sm:py-20 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                    {/* Header Image */}
                    <div className="h-48 sm:h-64 bg-slate-900 relative">
                        <div className="absolute inset-0 bg-[url('https://picsum.photos/id/180/1200/400')] bg-cover bg-center opacity-40"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                    </div>

                    <div className="px-6 sm:px-12 pb-12">
                        {/* Profile Picture (overlapping) */}
                        <div className="-mt-16 sm:-mt-20 mb-8 relative">
                            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white dark:border-slate-800 shadow-lg overflow-hidden bg-slate-200">
                                <img
                                    src="/images/profile.png"
                                    alt={userInfo.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="space-y-12">

                            {/* Intro */}
                            <section>
                                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">{userInfo.name}</h1>
                                <p className="text-xl text-primary font-medium mb-6">{userInfo.title}</p>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                                    {userInfo.shortIntro}
                                </p>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mt-4">
                                    I thrive in collaborative environments and love solving complex architectural challenges.
                                    When I'm not coding, you can find me hiking, reading sci-fi novels, or experimenting with new cooking recipes.
                                </p>
                            </section>

                            {/* Stats/Highlights */}
                            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl text-center border border-slate-100 dark:border-slate-700">
                                    <Briefcase className="mx-auto text-blue-500 mb-2" size={24} />
                                    <span className="block font-bold text-2xl text-slate-900 dark:text-white">20+</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Projects</span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl text-center border border-slate-100 dark:border-slate-700">
                                    <Award className="mx-auto text-orange-500 mb-2" size={24} />
                                    <span className="block font-bold text-2xl text-slate-900 dark:text-white">{certifications.length}</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Certifications</span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl text-center border border-slate-100 dark:border-slate-700">
                                    <BookOpen className="mx-auto text-green-500 mb-2" size={24} />
                                    <span className="block font-bold text-2xl text-slate-900 dark:text-white">100+</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Articles Read</span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl text-center border border-slate-100 dark:border-slate-700">
                                    <Coffee className="mx-auto text-amber-700 mb-2" size={24} />
                                    <span className="block font-bold text-2xl text-slate-900 dark:text-white">∞</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Coffee Cups</span>
                                </div>
                            </section>

                            {/* Timeline / Journey */}
                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Experience</h2>
                                <div className="border-l-2 border-slate-200 dark:border-slate-700 ml-3 space-y-8 pl-8 relative">
                                    {experiences.map((exp) => (
                                        <div key={exp.id} className="relative">
                                            <span className="absolute -left-[41px] top-1 h-6 w-6 rounded-full bg-primary border-4 border-white dark:border-slate-900 shadow-sm"></span>
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{exp.company} | {exp.period}</p>
                                            <p className="text-slate-600 dark:text-slate-300">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Certifications */}
                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Certifications</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {certifications.map((cert) => (
                                        <div key={cert.id} className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 flex items-start space-x-4">
                                            <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg text-orange-600 dark:text-orange-400">
                                                <Award size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 dark:text-white">{cert.name}</h3>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">{cert.issuer} • {cert.year}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* CTA */}
                            <section className="pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                                <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">Interested in working together?</p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a
                                        href={userInfo.resumeLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        download="Resume.pdf"
                                        className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                                    >
                                        Download Resume
                                    </a>
                                    <Link
                                        to="/contact"
                                        className="px-8 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        Contact Me
                                    </Link>
                                </div>
                            </section>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;