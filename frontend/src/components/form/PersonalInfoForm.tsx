import Input from "../common/Input";
import { useResume } from "../../context/ResumeContext";

export default function PersonalInfoForm() {
  const { resume, updatePersonalInfo } = useResume();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Resume Form</h1>
      <h2 className="font-bold mb-2">Personal Information</h2>
      <Input
        label="Full Name"
        value={resume.personalInfo.fullName}
        onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
      />
      <Input
        label="Email"
        value={resume.personalInfo.email}
        onChange={(e) => updatePersonalInfo("email", e.target.value)}
      />
      <Input
        label="Phone"
        value={resume.personalInfo.phone}
        onChange={(e) => updatePersonalInfo("phone", e.target.value)}
      />
      <Input
        label="Location"
        value={resume.personalInfo.location}
        onChange={(e) => updatePersonalInfo("location", e.target.value)}
      />
      <Input
        label="Website"
        value={resume.personalInfo.website}
        onChange={(e) => updatePersonalInfo("website", e.target.value)}
      />
      <Input
        label="LinkedIn URL"
        value={resume.personalInfo.linkedin}
        onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
      />

      <div className="mb-3">
        <label className="block text-sm font-medium">Professional Summary</label>
        <textarea
          value={resume.personalInfo.summary}
          onChange={(e) => updatePersonalInfo("summary", e.target.value)}
          className="w-full border px-3 py-2 rounded h-24"
          placeholder="Professional Summary"
        />
      </div>
    </div>
  );
}
