import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, SkillCategory, Experience, Certification, Message, Skill } from '../types';
import api from '../services/api';

interface UserInfo {
  name: string;
  title: string;
  shortIntro: string;
  email: string;
  phone: string;
  location: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
  resumeLink: string;
}

interface DataContextType {
  userInfo: UserInfo;
  projects: Project[];
  skills: SkillCategory[];
  experiences: Experience[];
  certifications: Certification[];
  messages: Message[];
  loading: boolean;
  updateUserInfo: (info: UserInfo) => Promise<void>;
  updateProjects: (projects: Project[]) => void;
  updateSkills: (skills: SkillCategory[]) => void;
  addSkill: (name: string, category: string) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;
  updateExperiences: (experiences: Experience[]) => void;
  updateCertifications: (certs: Certification[]) => void;
  addProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  editProject: (project: Project) => Promise<void>;
  incrementProjectViews: (id: string) => void;
  addMessage: (msg: Message) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  markMessageRead: (id: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  // Initial states
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: 'Admin', title: 'Full Stack Developer', shortIntro: 'Building digital experiences.', email: 'admin@example.com', phone: '', location: '',
    socials: { github: '', linkedin: '', twitter: '', instagram: '' },
    resumeLink: ''
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const mapProjectFromApi = (data: any): Project => ({
    id: data._id || data.id,
    title: data.title,
    category: data.category || 'Web',
    description: data.description,
    fullDescription: data.description,
    problem: '',
    solution: '',
    role: '',
    techStack: data.techStack || [],
    thumbnailUrl: data.imageUrls && data.imageUrls.length > 0 ? data.imageUrls[0] : '',
    screenshotUrls: data.imageUrls || [],
    liveLink: data.liveUrl || '',
    githubLink: data.githubUrl || '',
    views: 0
  });

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await api.get('/admin/messages');
        if (res.data && Array.isArray(res.data)) {
          setMessages(res.data.map((m: any) => ({
            id: m._id || m.id,
            name: m.name,
            email: m.email,
            message: m.message,
            date: m.createdAt,
            read: m.read || false
          })));
        }
      }
    } catch (e) {
      console.error("Failed to fetch messages", e);
    }
  };

  const fetchData = async () => {
    try {
      const [homeRes, aboutRes, projectsRes, skillsRes, expRes] = await Promise.all([
        api.get('/public/home').catch(e => ({ data: [] })),
        api.get('/public/about').catch(e => ({ data: [] })),
        api.get('/public/projects').catch(e => ({ data: [] })),
        api.get('/public/skills').catch(e => ({ data: [] })),
        api.get('/public/experience').catch(e => ({ data: [] }))
      ]);

      // Map User Info
      const homeData = Array.isArray(homeRes.data) ? homeRes.data[0] : homeRes.data;
      const aboutData = Array.isArray(aboutRes.data) ? aboutRes.data[0] : aboutRes.data;

      if (homeData || aboutData) {
        setUserInfo(prev => ({
          ...prev,
          title: homeData?.headline || prev.title,
          shortIntro: homeData?.subtext || prev.shortIntro,
          email: aboutData?.email || prev.email,
          phone: aboutData?.phone || prev.phone,
          location: aboutData?.location || prev.location,
          socials: aboutData?.socials || prev.socials,
          resumeLink: aboutData?.resumeLink || prev.resumeLink
        }));
      }

      // Map Projects
      if (projectsRes.data && Array.isArray(projectsRes.data)) {
        setProjects(projectsRes.data.map(mapProjectFromApi));
      }

      // Map Skills (Group by Category)
      if (skillsRes.data && Array.isArray(skillsRes.data)) {
        const rawSkills: any[] = skillsRes.data;
        const grouped: { [key: string]: Skill[] } = {};

        rawSkills.forEach(s => {
          const cat = s.category || 'Other';
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push({
            id: s._id || s.id,
            name: s.name,
            category: s.category,
            icon: s.iconUrl,
            level: s.level || 0
          });
        });

        const categories: SkillCategory[] = Object.keys(grouped).map(cat => ({
          title: cat,
          skills: grouped[cat]
        }));

        setSkills(categories);
      }

      // Map Experience
      if (expRes.data && Array.isArray(expRes.data)) {
        setExperiences(expRes.data.map((e: any) => ({
          id: e._id || e.id,
          role: e.company,
          company: e.company,
          period: e.duration || '',
          description: e.description
        })));
      }

      // Attempt to fetch admin messages if logged in
      await fetchMessages();

    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = async () => {
    await fetchData();
  };

  // Implement Admin Actions
  const updateUserInfo = async (info: UserInfo) => {
    try {
      // 1. Update Home (Headline, Subtext)
      const homePayload = {
        headline: info.title,
        subtext: info.shortIntro,
        ctaText: 'Contact Me',
        published: true
      };

      const [homeRes, aboutRes] = await Promise.all([
        api.get('/public/home'),
        api.get('/public/about')
      ]);

      const homeData = Array.isArray(homeRes.data) ? homeRes.data[0] : homeRes.data;
      const aboutData = Array.isArray(aboutRes.data) ? aboutRes.data[0] : aboutRes.data;

      // Update Home
      if (homeData && (homeData.id || homeData._id)) {
        await api.put(`/admin/home/${homeData.id || homeData._id}`, homePayload);
      } else {
        await api.post('/admin/home', homePayload);
      }

      // 2. Update About
      const aboutPayload = {
        description: aboutData?.description || "Description",
        summary: info.shortIntro,
        profileImageUrl: aboutData?.profileImageUrl || "https://picsum.photos/200",
        email: info.email,
        phone: info.phone,
        location: info.location,
        socials: info.socials,
        resumeLink: info.resumeLink,
        published: true
      };

      if (aboutData && (aboutData.id || aboutData._id)) {
        await api.put(`/admin/about/${aboutData.id || aboutData._id}`, aboutPayload);
      } else {
        await api.post('/admin/about', aboutPayload);
      }

      setUserInfo(info);
    } catch (e) { console.error("Failed to update profile", e); }
  };

  const addSkill = async (name: string, category: string) => {
    try {
      await api.post('/admin/skills', {
        name,
        category,
        iconUrl: '',
        order: 0,
        published: true
      });
      refreshData();
    } catch (e) { console.error(e); }
  };

  const deleteSkill = async (id: string) => {
    try {
      await api.delete(`/admin/skills/${id}`);
      refreshData();
    } catch (e) { console.error(e); }
  };

  const addProject = async (project: Project) => {
    try {
      const payload = {
        title: project.title,
        category: project.category,
        description: project.description,
        techStack: project.techStack,
        imageUrls: project.screenshotUrls,
        liveUrl: project.liveLink,
        githubUrl: project.githubLink,
        order: 0,
        published: true
      };
      await api.post('/admin/projects', payload);
      refreshData();
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const editProject = async (project: Project) => {
    try {
      const payload = {
        title: project.title,
        category: project.category,
        description: project.description,
        techStack: project.techStack,
        imageUrls: project.screenshotUrls,
        liveUrl: project.liveLink,
        githubUrl: project.githubLink
      };
      await api.put(`/admin/projects/${project.id}`, payload);
      refreshData();
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await api.delete(`/admin/projects/${id}`);
      refreshData();
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const addMessage = async (msg: Message) => {
    try {
      await api.post('/public/contact', {
        name: msg.name,
        email: msg.email,
        message: msg.message
      });
    } catch (e) { console.error(e); }
  };

  const deleteMessage = async (id: string) => {
    try {
      await api.delete(`/admin/messages/${id}`);
      fetchMessages();
    } catch (e) { console.error(e); }
  };

  const markMessageRead = async (id: string) => {
    try {
      await api.patch(`/admin/messages/${id}`, { read: true });
      fetchMessages();
    } catch (e) { console.error(e); }
  };

  const updateSkills = () => console.warn("Use addSkill/deleteSkill");
  const updateProjects = (p: Project[]) => setProjects(p);
  const updateExperiences = (e: Experience[]) => setExperiences(e);
  const updateCertifications = (c: Certification[]) => setCertifications(c);
  const incrementProjectViews = (id: string) => { };

  return (
    <DataContext.Provider value={{
      userInfo, projects, skills, experiences, certifications, messages, loading,
      updateUserInfo, updateProjects, updateSkills, updateExperiences, updateCertifications,
      addProject, deleteProject, editProject, incrementProjectViews,
      addMessage, deleteMessage, markMessageRead, refreshData,
      addSkill, deleteSkill
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};