import { useEffect, useState } from "react";
import PersonalInfoForm from "../components/form/PersonalInfoForm";
import SkillsForm from "../components/form/SkillsForm";
import EducationForm from "../components/form/EducationForm";
import ExperienceForm from "../components/form/ExperienceForm";
import ResumePreview from "../components/preview/ResumePreview";
import { useResume } from "../context/ResumeContext";

import AddProjects from "../components/form/Projects";

import improveText from "../utils/improveResumeWithAI";


export default function ResumeBuilder() {

  // const { addEducation, addExperience, addProjects, resume } = useResume();
 
const {
  addEducation,
  addExperience,
  addProjects,
  resume,
  updatePersonalInfo,
  updateExperience,
  updateProject,
} = useResume();



const [improving, setImproving] = useState(false);

const handleImproveResume = async () => {
  setImproving(true);

  try {
    /* 1️⃣ Professional Summary */
    if (resume.personalInfo.summary?.trim()) {
      const improvedSummary = await improveText(
        resume.personalInfo.summary,
        "summary"
      );

      if (improvedSummary) {
        updatePersonalInfo("summary", improvedSummary);
      }
    }

    /* 2️⃣ Experience Descriptions (INDEPENDENT) */
    for (let i = 0; i < resume.experience.length; i++) {
      const exp = resume.experience[i];

      if (exp.description?.trim()) {
        const improvedExp = await improveText(
          exp.description,
          "experience"
        );

        if (improvedExp) {
          updateExperience(i, "description", improvedExp);
        }
      }
    }

    /* 3️⃣ Project Descriptions (INDEPENDENT) */
    for (let i = 0; i < resume.projects.length; i++) {
      const project = resume.projects[i];

      if (project.description?.trim()) {
        const improvedProject = await improveText(
          project.description,
          "project"
        );

        if (improvedProject) {
          updateProject(i, "description", improvedProject);
        }
      }
    }
  } catch (error) {
    alert("AI improvement failed. Please try again.");
  } finally {
    setImproving(false);
  }
};



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



        {/* Personal Info */}
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

          {/* 🔥 NEW */}
          <EducationForm />
        </div>

        {/* Skills */}
        <SkillsForm />

        {/* Experience */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Experience</h2>
            <div className="flex gap-2">
              <button
                onClick={addExperience}
                className="px-4 py-2 border rounded bg-gray-50"
              >
                + Add Experience
              </button>
            </div>
          </div>

          {/* 🔥 NEW */}
          <ExperienceForm />
        </div>


         {/* Project */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Projects</h2>
            <div className="flex gap-2">
              <button
                onClick={addProjects}
                className="px-4 py-2 border rounded bg-gray-50"
              >
                + Add Project
              </button>
            </div>
          </div>

          {/* 🔥 NEW */}
          <AddProjects />
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
