import { useResumeData } from "../../context/ResumeContext";

export default function Projects() {
  const { resume, setResume, loading } = useResumeData();

  if (loading) {
    return <p className="text-sm text-gray-500">Loading projects...</p>;
  }

  const projects = resume?.projects || [];

  const getOldProjectDesc = (desc: any) =>
  typeof desc === "object" ? desc.old_description : "";

const getNewProjectDesc = (desc: any) =>
  typeof desc === "object"
    ? desc.improved_description || desc.old_description || ""
    : desc || "";

    const updateProjectDescription = (index: number, value: string) => {
  setResume((prev: any) => {
    const updated = [...prev.projects];
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

    return { ...prev, projects: updated };
  });
};


  const updateProject = (
    index: number,
    field: string,
    value: string
  ) => {
    setResume((prev: any) => {
      const updated = [...(prev?.projects || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, projects: updated };
    });
  };

  const removeProject = (id: string) => {
    setResume((prev: any) => ({
      ...prev,
      projects: prev.projects.filter((pj: any) => pj.id !== id),
    }));
  };

  return (
    <div className="mt-6">
      {projects.map((pj: any, index: number) => (
        <div key={pj.id ?? index} className="border rounded p-4 mb-6">

          <input
            placeholder="Project Name"
            value={pj.name || ""}
            onChange={(e) =>
              updateProject(index, "name", e.target.value)
            }
            className="w-full border p-2 mb-2"
          />

          <input
            placeholder="Role"
            value={pj.role || ""}
            onChange={(e) =>
              updateProject(index, "role", e.target.value)
            }
            className="w-full border p-2 mb-2"
          />

          <input
            placeholder="Technologies Used"
            value={pj.technologies || ""}
            onChange={(e) =>
              updateProject(index, "technologies", e.target.value)
            }
            className="w-full border p-2 mb-2"
          />

          {/* 🔵 OLD PROJECT DESCRIPTION */}
{getOldProjectDesc(pj.description) && (
  <p className=" text-gray-600 bg-gray-50 p-2 rounded mb-2">
    <strong>Previous Description:</strong>{" "}
    {getOldProjectDesc(pj.description)}
  </p>
)}

{/* 🟢 NEW / IMPROVED PROJECT DESCRIPTION */}
<textarea
  value={getNewProjectDesc(pj.description)}
  onChange={(e) =>
    updateProjectDescription(index, e.target.value)
  }
  className="w-full border p-2"
  placeholder="Project Description"
/>


          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={() => removeProject(pj.id)}
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
