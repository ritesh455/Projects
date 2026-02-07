import React, { createContext, useContext, useState } from "react";
import type {
  ResumeData,
  Education,
  Experience,
  PersonalInfo,
} from "../types/ResumeTypes";

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
};

type ResumeContextType = {
  resume: ResumeData;
  updateField: (field: keyof ResumeData, value: any) => void;
  updatePersonalInfo: (key: keyof PersonalInfo, value: string) => void;
  addEducation: () => void;
  removeEducation: (id: string) => void;
  addExperience: () => void;
  removeExperience: (id: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
};

const ResumeContext = createContext<ResumeContextType | null>(null);

export const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
  const [resume, setResume] = useState<ResumeData>(initialResume);

  const updateField = (field: keyof ResumeData, value: any) => {
    setResume((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updatePersonalInfo = (key: keyof PersonalInfo, value: string) => {
    setResume((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [key]: value,
      },
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startYear: "",
      endYear: "",
    };
    setResume((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const removeEducation = (id: string) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      role: "",
      description: "",
      startDate: "",
      endDate: "",
    };
    setResume((prev) => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const removeExperience = (id: string) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((ex) => ex.id !== id),
    }));
  };

  const addSkill = (skill: string) => {
    const s = skill.trim();
    if (!s) return;
    setResume((prev) => ({ ...prev, skills: [...prev.skills, s] }));
  };

  const removeSkill = (index: number) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resume,
        updateField,
        updatePersonalInfo,
        addEducation,
        removeEducation,
        addExperience,
        removeExperience,
        addSkill,
        removeSkill,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used inside ResumeProvider");
  }
  return context;
};
