import { useResumeData } from "../../context/ResumeContext";

export default function ExperienceForm() {
  const { resume, setResume, loading } = useResumeData();

  if (loading) {
    return <p className="text-sm text-gray-500">Loading experience...</p>;
  }

  const experience = resume?.experience || [];

  const getOldDescription = (desc: any) =>
  typeof desc === "object" ? desc.old_description : "";

const getNewDescription = (desc: any) =>
  typeof desc === "object"
    ? desc.improved_description || desc.old_description || ""
    : desc || "";

    const updateExperienceDescription = (index: number, value: string) => {
  setResume((prev: any) => {
    const updated = [...prev.experience];
    const currentDesc = updated[index].description;

    updated[index] = {
      ...updated[index],
      description:
        typeof currentDesc === "object"
          ? {
              ...currentDesc,
              improved_description: value,
            }
          : {
              old_description: currentDesc || "",
              improved_description: value,
            },
    };

    return { ...prev, experience: updated };
  });
};


  const updateExperience = (
    index: number,
    field: string,
    value: string
  ) => {
    setResume((prev: any) => {
      const updated = [...(prev?.experience || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, experience: updated };
    });
  };

  const removeExperience = (id: string) => {
    setResume((prev: any) => ({
      ...prev,
      experience: prev.experience.filter((exp: any) => exp.id !== id),
    }));
  };

  return (
    <div className="mt-6">
      {experience.map((exp: any, index: number) => (
        <div key={exp.id ?? index} className="border rounded p-4 mb-6">

          <input
            placeholder="Company Name"
            value={exp.company || ""}
            onChange={(e) =>
              updateExperience(index, "company", e.target.value)
            }
            className="w-full border p-2 mb-2"
          />

          <input
            placeholder="Duration"
            value={exp.duration || ""}
            onChange={(e) =>
              updateExperience(index, "duration", e.target.value)
            }
            className="w-full border p-2 mb-2"
          />

          <input
            placeholder="Role"
            value={exp.role || ""}
            onChange={(e) =>
              updateExperience(index, "role", e.target.value)
            }
            className="w-full border p-2 mb-2"
          />

          <input
            placeholder="Technologies Used"
            value={exp.technologies || ""}
            onChange={(e) =>
              updateExperience(index, "technologies", e.target.value)
            }
            className="w-full border p-2 mb-2"
          />

         {/* 🔵 OLD DESCRIPTION */}
{getOldDescription(exp.description) && (
  <p className=" text-gray-600 bg-gray-50 p-2 rounded mb-2">
    <strong>Previous Description:</strong>{" "}
    {getOldDescription(exp.description)}
  </p>
)}

{/* 🟢 NEW / IMPROVED DESCRIPTION */}
<textarea
  value={getNewDescription(exp.description)}
  onChange={(e) =>
    updateExperienceDescription(index, e.target.value)
  }
  className="w-full border p-2"
  placeholder="Experience Description"
/>

          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={() => removeExperience(exp.id)}
              className="text-sm text-red-600"
            >
              Delete
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}
