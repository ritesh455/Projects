import React, { createContext, useContext, useState } from "react";
import { ResumeData } from "../types/ResumeTypes";

const initialResume: ResumeData = {
  name: "",
  email: "",
  phone: "",
  education: [],
  experience: [],
  skills: [],
};

const ResumeContext = createContext<any>(null);

export const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
  const [resume, setResume] = useState<ResumeData>(initialResume);

  const updateField = (field: string, value: any) => {
    setResume(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ResumeContext.Provider value={{ resume, updateField }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
