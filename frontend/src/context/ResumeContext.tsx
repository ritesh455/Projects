import React, { createContext, useContext, useState } from "react";
import type {
  ResumeData,
  Education,
  Experience,
  PersonalInfo,
  Project,
} from "../types/ResumeTypes";

/* -------------------- INITIAL STATE -------------------- */

const initialResume: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    summary: "",
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
};

/* -------------------- CONTEXT TYPE -------------------- */

type ResumeContextType = {
  resume: ResumeData;

  // Personal Info
  updatePersonalInfo: (key: keyof PersonalInfo, value: string) => void;

  // Education
  addEducation: () => void;
  updateEducation: (
    index: number,
    field: keyof Education,
    value: string
  ) => void;
  removeEducation: (id: string) => void;

  // Experience
  addExperience: () => void;
  updateExperience: (
    index: number,
    field: keyof Experience,
    value: any
  ) => void;
  removeExperience: (id: string) => void;

  
  // Projects
    addProjects: () => void;
  updateProject: (
    index: number,
    field: keyof Project,
    value: any
  ) => void;
  removeProject: (id: string) => void;

  // Skills
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
};

/* -------------------- CONTEXT -------------------- */

const ResumeContext = createContext<ResumeContextType | null>(null);

/* -------------------- PROVIDER -------------------- */

export const ResumeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [resume, setResume] = useState<ResumeData>(initialResume);

  /* -------- Personal Info -------- */

  const updatePersonalInfo = (key: keyof PersonalInfo, value: string) => {
    setResume((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [key]: value,
      },
    }));
  };

  /* -------- Education -------- */

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      qualification: "",
      institution: "",
      percentage: "",
      yearOfPassing: "",
      branch: "",
    };

    setResume((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const updateEducation = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    setResume((prev) => {
      const updated = [...prev.education];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, education: updated };
    });
  };

  const removeEducation = (id: string) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  /* -------- Experience -------- */

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
     role: "",
      description: "",
      duration: "",
      technologies: "",
    };

    setResume((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }));
  };

  const updateExperience = (
    index: number,
    field: keyof Experience,
    value: any
  ) => {
    setResume((prev) => {
      const updated = [...prev.experience];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, experience: updated };
    });
  };

  const removeExperience = (id: string) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((ex) => ex.id !== id),
    }));
  };


  /* -------- Add Project -------- */

  const addProjects = () => {
    const newProj: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      role: "",   
      technologies: "",
    };

    setResume((prev) => ({
      ...prev,
      projects: [...prev.projects, newProj],
    }));
  };

  const updateProject = (
    index: number,
    field: keyof Project,
    value: any
  ) => {
    setResume((prev) => {
      const updated = [...prev.projects];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, projects: updated };
    });
  };

  const removeProject = (id: string) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.filter((pj) => pj.id !== id),
    }));
  };



  /* -------- Skills -------- */

  const addSkill = (skill: string) => {
    const s = skill.trim();
    if (!s) return;
    setResume((prev) => ({
      ...prev,
      skills: [...prev.skills, s],
    }));
  };

  const removeSkill = (index: number) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  /* -------- PROVIDER -------- */

  return (
    <ResumeContext.Provider
      value={{
        resume,
       updatePersonalInfo,

        addEducation,
        updateEducation,
        removeEducation,

        addExperience,
        updateExperience,
        removeExperience,

        addProjects,
        updateProject,
        removeProject,

        addSkill,
        removeSkill,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

/* -------------------- HOOK -------------------- */

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used inside ResumeProvider");
  }
  return context;
};
