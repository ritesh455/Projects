import PersonalInfoForm from "../components/form/PersonalInfoForm";
import SkillsForm from "../components/form/SkillsForm";
import ResumePreview from "../components/preview/ResumePreview";


export default function ResumeBuilder() {
  
  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      <div>
        <PersonalInfoForm />
        <SkillsForm />
      </div>
      <ResumePreview />
    </div>
  );
}
