import Input from "../common/Input";
// import { useState } from "react";
import { useResume } from "../../context/ResumeContext";
// import { improveWithAI } from "../../utils/aiHelper";

export default function PersonalInfoForm() {
  const { resume, updatePersonalInfo } = useResume();
  // const [loading, setLoading] = useState(false);

  // const improveSummary = async () => {
  //   setLoading(true);
  //   const improved = await improveWithAI(resume.personalInfo.summary, [
  //     "Leadership",
  //     "Problem Solving",
  //     "Teamwork",
  //   ]);
  //   if (improved) updatePersonalInfo("summary", improved);
  //   setLoading(false);
  // };

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

       {/* <button
        onClick={improveSummary}
        disabled={loading}
        className="text-sm px-3 py-1 border rounded bg-purple-50"
      >
        {loading ? "Improving..." : "✨ Improve Summary"}
      </button> */}

      </div>
    </div>
  );
}
