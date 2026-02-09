import { useState } from "react";

import PersonalInfoForm from "../components/form/PersonalInfoForm";
import SkillsForm from "../components/form/SkillsForm";
import EducationForm from "../components/form/EducationForm";
import ExperienceForm from "../components/form/ExperienceForm";
import Projects from "../components/form/Projects";
import ResumePreview from "../components/preview/ResumePreview";

import { useResumeData } from "../context/ResumeContext";
import improveText from "../utils/improveResumeWithAI";

export default function ResumeBuilder() {
  const { resume, setResume, loading } = useResumeData();
  const [improving, setImproving] = useState(false);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading resume builder...</p>;
  }

  if (!resume) {
    return <p className="text-sm text-gray-500">No resume data found</p>;
  }

  /* ---------------- ADD HELPERS ---------------- */

  const addEducation = () => {
    setResume((prev: any) => ({
      ...prev,
      education: [
        ...(prev.education || []),
        {
          id: Date.now().toString(),
          qualification: "",
          institution: "",
          branch: "",
          yearOfPassing: "",
          percentage: "",
        },
      ],
    }));
  };

  const addExperience = () => {
    setResume((prev: any) => ({
      ...prev,
      experience: [
        ...(prev.experience || []),
        {
          id: Date.now().toString(),
          company: "",
          role: "",
          duration: "",
          technologies: "",
          description: "",
          improvedDescription: "",
        },
      ],
    }));
  };

  const addProjects = () => {
    setResume((prev: any) => ({
      ...prev,
      projects: [
        ...(prev.projects || []),
        {
          id: Date.now().toString(),
          name: "",
          role: "",
          technologies: "",
          description: "",
          improvedDescription: "",
        },
      ],
    }));
  };

  /* ---------------- AI IMPROVEMENT ---------------- */

  const handleImproveResume = async () => {
    setImproving(true);

    try {
      /* 1️⃣ Professional Summary */
      if (resume.personalInfo?.summary?.trim()) {
        const improvedSummary = await improveText(
          resume.personalInfo.summary,
          "summary"
        );

        if (improvedSummary) {
          setResume((prev: any) => ({
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              improvedSummary,
            },
          }));
        }
      }

      /* 2️⃣ Experience Descriptions */
      for (let i = 0; i < resume.experience.length; i++) {
        const exp = resume.experience[i];
        if (!exp.description?.trim()) continue;

        const improvedExp = await improveText(
          exp.description,
          "experience"
        );

        if (improvedExp) {
          setResume((prev: any) => {
            const updated = [...prev.experience];
            updated[i] = {
              ...updated[i],
              improvedDescription: improvedExp,
            };
            return { ...prev, experience: updated };
          });
        }
      }

      /* 3️⃣ Project Descriptions */
      for (let i = 0; i < resume.projects.length; i++) {
        const pj = resume.projects[i];
        if (!pj.description?.trim()) continue;

        const improvedProject = await improveText(
          pj.description,
          "project"
        );

        if (improvedProject) {
          setResume((prev: any) => {
            const updated = [...prev.projects];
            updated[i] = {
              ...updated[i],
              improvedDescription: improvedProject,
            };
            return { ...prev, projects: updated };
          });
        }
      }
    } catch (err) {
      alert("AI improvement failed. Please try again.");
    } finally {
      setImproving(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="grid grid-cols-2 gap-6 p-6 items-start">

      {/* LEFT SIDE – FORMS */}
      <div
        style={{
          maxHeight: "calc(100vh - 48px)",
          overflow: "auto",
          paddingRight: "1rem",
        }}
      >
        <button
          onClick={handleImproveResume}
          disabled={improving}
          className="mb-4 px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
        >
          {improving ? "✨ Improving Resume..." : "✨ Improve Resume with AI"}
        </button>

        <PersonalInfoForm />

        {/* Education */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Education</h2>
            <button
              onClick={addEducation}
              className="px-4 py-2 border rounded bg-gray-50"
            >
              + Add Education
            </button>
          </div>
          <EducationForm />
        </div>

        <SkillsForm />

        {/* Experience */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Experience</h2>
            <button
              onClick={addExperience}
              className="px-4 py-2 border rounded bg-gray-50"
            >
              + Add Experience
            </button>
          </div>
          <ExperienceForm />
        </div>

        {/* Projects */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Projects</h2>
            <button
              onClick={addProjects}
              className="px-4 py-2 border rounded bg-gray-50"
            >
              + Add Project
            </button>
          </div>
          <Projects />
        </div>
      </div>

      {/* RIGHT SIDE – PREVIEW */}
      <div className="self-start">
        <div className="sticky top-6">
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}
