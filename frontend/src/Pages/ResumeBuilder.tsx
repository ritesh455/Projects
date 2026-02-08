import { useEffect, useState } from "react";
import PersonalInfoForm from "../components/form/PersonalInfoForm";
import SkillsForm from "../components/form/SkillsForm";
import EducationForm from "../components/form/EducationForm";
import ExperienceForm from "../components/form/ExperienceForm";
import ResumePreview from "../components/preview/ResumePreview";
import { useResume } from "../context/ResumeContext";

// import AddProjects from "../components/form/AddProjects";


export default function ResumeBuilder() {

  const { addEducation, addExperience, resume } = useResume();
  const [selectedExp, setSelectedExp] = useState<number>(
    resume.experience.length > 0 ? resume.experience.length - 1 : -1
  );

  useEffect(() => {
    // keep selection in range when experiences change
    if (resume.experience.length === 0) setSelectedExp(-1);
    else if (selectedExp >= resume.experience.length)
      setSelectedExp(resume.experience.length - 1);
  }, [resume.experience.length, selectedExp]);

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
