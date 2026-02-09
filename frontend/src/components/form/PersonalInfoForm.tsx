import Input from "../common/Input";
import { useResumeData } from "../../context/ResumeContext";

export default function PersonalInfoForm() {
  const { resume, setResume, loading } = useResumeData();

  if (loading) {
    return <p className="text-sm text-gray-500">Loading resume data...</p>;
  }

  const personalInfo = resume?.personalInfo || {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    summary: "",
  };

  const updatePersonalInfo = (key: string, value: string) => {
    setResume((prev: any) => ({
      ...prev,
      personalInfo: {
        ...prev?.personalInfo,
        [key]: value,
      },
    }));
  };

  // 🔹 Extract old & new summary safely
const summaryValue = personalInfo.summary;

const oldSummary =
  summaryValue &&
  typeof summaryValue === "object"
    ? summaryValue.old_summary
    : "";

const newSummary =
  summaryValue &&
  typeof summaryValue === "object"
    ? summaryValue.improved_summary
    : summaryValue || "";


    const updateSummary = (value: string) => {
  setResume((prev: any) => {
    const currentSummary = prev.personalInfo.summary;

    return {
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        summary:
          typeof currentSummary === "object"
            ? {
                ...currentSummary,
                improved_summary: value,
              }
            : {
                old_summary: currentSummary || "",
                improved_summary: value,
              },
      },
    };
  });
};



  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Resume Form</h1>
      <h2 className="font-bold mb-2">Personal Information</h2>

      <Input
        label="Full Name"
        value={personalInfo.fullName}
        onChange={(e) =>
          updatePersonalInfo("fullName", e.target.value)
        }
      />

      <Input
        label="Email"
        value={personalInfo.email}
        onChange={(e) =>
          updatePersonalInfo("email", e.target.value)
        }
      />

      <Input
        label="Phone"
        value={personalInfo.phone}
        onChange={(e) =>
          updatePersonalInfo("phone", e.target.value)
        }
      />

      <Input
        label="Location"
        value={personalInfo.location}
        onChange={(e) =>
          updatePersonalInfo("location", e.target.value)
        }
      />

      <Input
        label="Website"
        value={personalInfo.website}
        onChange={(e) =>
          updatePersonalInfo("website", e.target.value)
        }
      />

      <Input
        label="LinkedIn URL"
        value={personalInfo.linkedin}
        onChange={(e) =>
          updatePersonalInfo("linkedin", e.target.value)
        }
      />

      {/* Professional Summary */}
      <div className="mb-3">
        <label className="block text-sm font-medium">
          Professional Summary
        </label>

        {/* OLD SUMMARY (read-only) */}
{oldSummary && (
  <p className=" text-gray-600 bg-gray-50 p-2 rounded mb-2">
    <strong>Previous Summary:</strong> {oldSummary}
  </p>
)}

{/* NEW / IMPROVED SUMMARY (editable) */}
<textarea
  value={newSummary}
  onChange={(e) => updateSummary(e.target.value)}
  className="w-full border px-3 py-2 rounded h-24"
  placeholder="Professional Summary"
/>

      </div>
    </div>
  );
}
