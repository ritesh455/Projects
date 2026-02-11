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
