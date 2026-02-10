// import React, { createContext, useContext, useState } from "react";
// import type {
//   ResumeData,
//   Education,
//   Experience,
//   PersonalInfo,
//   Project,
// } from "../types/ResumeTypes";

// /* -------------------- INITIAL STATE -------------------- */

// const initialResume: ResumeData = {
//   personalInfo: {
//     fullName: "",
//     email: "",
//     phone: "",
//     location: "",
//     website: "",
//     linkedin: "",
//     summary: "",
//   },
//   education: [],
//   experience: [],
//   skills: [],
//   projects: [],
// };

// /* -------------------- CONTEXT TYPE -------------------- */

// type ResumeContextType = {
//   resume: ResumeData;

//   // Personal Info
//   updatePersonalInfo: (key: keyof PersonalInfo, value: string) => void;

//   // Education
//   addEducation: () => void;
//   updateEducation: (
//     index: number,
//     field: keyof Education,
//     value: string
//   ) => void;
//   removeEducation: (id: string) => void;

//   // Experience
//   addExperience: () => void;
//   updateExperience: (
//     index: number,
//     field: keyof Experience,
//     value: any
//   ) => void;
//   removeExperience: (id: string) => void;

  
//   // Projects
//     addProjects: () => void;
//   updateProject: (
//     index: number,
//     field: keyof Project,
//     value: any
//   ) => void;
//   removeProject: (id: string) => void;

//   // Skills
//   addSkill: (skill: string) => void;
//   removeSkill: (index: number) => void;
// };

// /* -------------------- CONTEXT -------------------- */

// const ResumeContext = createContext<ResumeContextType | null>(null);

// /* -------------------- PROVIDER -------------------- */

// export const ResumeProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [resume, setResume] = useState<ResumeData>(initialResume);

//   /* -------- Personal Info -------- */

//   const updatePersonalInfo = (key: keyof PersonalInfo, value: string) => {
//     setResume((prev) => ({
//       ...prev,
//       personalInfo: {
//         ...prev.personalInfo,
//         [key]: value,
//       },
//     }));
//   };

//   /* -------- Education -------- */

//   const addEducation = () => {
//     const newEdu: Education = {
//       id: Date.now().toString(),
//       qualification: "",
//       institution: "",
//       percentage: "",
//       yearOfPassing: "",
//       branch: "",
//     };

//     setResume((prev) => ({
//       ...prev,
//       education: [...prev.education, newEdu],
//     }));
//   };

//   const updateEducation = (
//     index: number,
//     field: keyof Education,
//     value: string
//   ) => {
//     setResume((prev) => {
//       const updated = [...prev.education];
//       updated[index] = { ...updated[index], [field]: value };
//       return { ...prev, education: updated };
//     });
//   };

//   const removeEducation = (id: string) => {
//     setResume((prev) => ({
//       ...prev,
//       education: prev.education.filter((e) => e.id !== id),
//     }));
//   };

//   /* -------- Experience -------- */

//   const addExperience = () => {
//     const newExp: Experience = {
//       id: Date.now().toString(),
//      company: "",
//      role: "",
//       description: "",
//       duration: "",
//       technologies: "",
//     };

//     setResume((prev) => ({
//       ...prev,
//       experience: [...prev.experience, newExp],
//     }));
//   };

//   const updateExperience = (
//     index: number,
//     field: keyof Experience,
//     value: any
//   ) => {
//     setResume((prev) => {
//       const updated = [...prev.experience];
//       updated[index] = { ...updated[index], [field]: value };
//       return { ...prev, experience: updated };
//     });
//   };

//   const removeExperience = (id: string) => {
//     setResume((prev) => ({
//       ...prev,
//       experience: prev.experience.filter((ex) => ex.id !== id),
//     }));
//   };


//   /* -------- Add Project -------- */

//   const addProjects = () => {
//     const newProj: Project = {
//       id: Date.now().toString(),
//       name: "",
//       description: "",
//       role: "",   
//       technologies: "",
//     };

//     setResume((prev) => ({
//       ...prev,
//       projects: [...prev.projects, newProj],
//     }));
//   };

//   const updateProject = (
//     index: number,
//     field: keyof Project,
//     value: any
//   ) => {
//     setResume((prev) => {
//       const updated = [...prev.projects];
//       updated[index] = { ...updated[index], [field]: value };
//       return { ...prev, projects: updated };
//     });
//   };

//   const removeProject = (id: string) => {
//     setResume((prev) => ({
//       ...prev,
//       projects: prev.projects.filter((pj) => pj.id !== id),
//     }));
//   };



//   /* -------- Skills -------- */

//   const addSkill = (skill: string) => {
//     const s = skill.trim();
//     if (!s) return;
//     setResume((prev) => ({
//       ...prev,
//       skills: [...prev.skills, s],
//     }));
//   };

//   const removeSkill = (index: number) => {
//     setResume((prev) => ({
//       ...prev,
//       skills: prev.skills.filter((_, i) => i !== index),
//     }));
//   };

//   /* -------- PROVIDER -------- */

//   return (
//     <ResumeContext.Provider
//       value={{
//         resume,
//        updatePersonalInfo,

//         addEducation,
//         updateEducation,
//         removeEducation,

//         addExperience,
//         updateExperience,
//         removeExperience,

//         addProjects,
//         updateProject,
//         removeProject,

//         addSkill,
//         removeSkill,
//       }}
//     >
//       {children}
//     </ResumeContext.Provider>
//   );
// };

// /* -------------------- HOOK -------------------- */

// export const useResume = () => {
//   const context = useContext(ResumeContext);
//   if (!context) {
//     throw new Error("useResume must be used inside ResumeProvider");
//   }
//   return context;
// };



import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchUserResume,generateCoverLetterApi } from "../api/api";
import { useAuth } from "./AuthContext";

const ResumeDataContext = createContext<any>(null);

/* 🔹 SINGLE SOURCE OF EMPTY RESUME */
const emptyResume = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    summary: "", // string OR { old_summary, improved_summary }
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
};

/* 🔹 SAFE NORMALIZATION (DO NOT FLATTEN SUMMARY OBJECT) */
const normalizeResume = (resume: any) => ({
  ...emptyResume,
  ...resume,
  personalInfo: {
    ...emptyResume.personalInfo,
    ...resume?.personalInfo,
    summary: resume?.personalInfo?.summary || "",
  },
});

export const ResumeDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth(); // 🔥 reacts to login / logout / payment refresh

  const [resume, setResume] = useState<any>(emptyResume);
  const [loading, setLoading] = useState(true);
  const [coverLetterLoading, setCoverLetterLoading] = useState(false);
  // useEffect(() => {
  //   async function loadResume() {
  //     // 🔥 USER LOGGED OUT → RESET STATE
  //     if (!user) {
  //       setResume(emptyResume);
  //       setLoading(false);
  //       return;
  //     }

  //     setLoading(true);

  //     try {
  //       const result = await fetchUserResume();

  //       /**
  //        * fetchUserResume() may return:
  //        * 1️⃣ resume object
  //        * 2️⃣ null (404 → new user)
  //        * 3️⃣ { message, data }
  //        */

  //       const resumeData =
  //         result && typeof result === "object" && "data" in result
  //           ? result.data
  //           : result;

  //       if (!resumeData) {
  //         // 🔥 NEW USER → EMPTY RESUME
  //         setResume(emptyResume);
  //       } else {
  //         setResume(normalizeResume(resumeData));
  //       }
  //     } catch (error) {
  //       // 🔥 SAFETY FALLBACK
  //       setResume(emptyResume);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   loadResume();
  // }, [user?.id]); // 🔥 CRITICAL: refetch on user change
const loadResume = async () => {
  // 🔥 USER LOGGED OUT → RESET STATE
  if (!user) {
    setResume(emptyResume);
    setLoading(false);
    return;
  }

  setLoading(true);

  try {
    const result = await fetchUserResume();

    const resumeData =
      result && typeof result === "object" && "data" in result
        ? result.data
        : result;

    if (!resumeData) {
      setResume(emptyResume);
    } else {
      setResume(normalizeResume(resumeData));
    }
  } catch (error) {
    setResume(emptyResume);
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  loadResume();
}, [user?.id]);
// om paste
const generateCoverLetter = async (payload: any) => {
  try {
    setCoverLetterLoading(true);

    const pdfBlob = await generateCoverLetterApi(payload);

    const proceed = window.confirm(
      "Your cover letter PDF is ready and will start downloading. Click OK to continue."
    );

    if (!proceed) return;

    const url = window.URL.createObjectURL(
      new Blob([pdfBlob], { type: "application/pdf" })
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = "cover_letter.pdf";
    link.click();

    window.URL.revokeObjectURL(url);
  } catch (error: any) {
    if (error.response?.status === 403) {
      throw new Error("NOT_PRO");
    }
    if (error.response?.status === 401) {
      throw new Error("UNAUTHORIZED");
    }
    throw new Error("FAILED");
  } finally {
    setCoverLetterLoading(false);
  }
};
//om end
  return (
    <ResumeDataContext.Provider
      value={{
        resume,
        setResume,
        loading,
        refreshResume: loadResume,generateCoverLetter,coverLetterLoading,
      }}
    >
      {children}
    </ResumeDataContext.Provider>
  );
};

export const useResumeData = () => {
  const context = useContext(ResumeDataContext);
  if (!context) {
    throw new Error(
      "useResumeData must be used inside ResumeDataProvider"
    );
  }
  return context;
};
