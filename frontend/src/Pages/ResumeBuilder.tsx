import PersonalInfoForm from "../components/form/PersonalInfoForm";
import SkillsForm from "../components/form/SkillsForm";
import ResumePreview from "../components/preview/ResumePreview";
import { useResume } from "../context/ResumeContext";

export default function ResumeBuilder() {
  const { addEducation, addExperience } = useResume();

  return (
    <div className="grid grid-cols-2 gap-6 p-6 items-start">
  <div style={{ maxHeight: 'calc(100vh - 48px)', overflow: 'auto', paddingRight: '1rem' }}>
        <PersonalInfoForm />
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Education</h2>
          <button
            onClick={addEducation}
            className="px-4 py-2 border rounded bg-gray-50"
          >
            Add Education
          </button>
        </div>

        <SkillsForm />

        <div className="mt-6">
          <h2 className="font-semibold mb-2">Experience</h2>
          <button
            onClick={addExperience}
            className="px-4 py-2 border rounded bg-gray-50"
          >
            Add Experience
          </button>
        </div>
      </div>

      <div className="self-start">
        <div className="sticky top-6">
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}
