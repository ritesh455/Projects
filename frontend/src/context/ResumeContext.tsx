import React, { createContext, useContext, useState } from "react";
import type {  ResumeData, Education, Experience } from "../types/ResumeTypes";

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

  return (
    <ResumeContext.Provider value={{ resume, updateField }}>
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
