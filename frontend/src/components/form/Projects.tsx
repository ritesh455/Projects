import { useResume } from "../../context/ResumeContext";

export default function Projects() {
  const { resume, updateProject, removeProject } = useResume();

  return (
    <div className="mt-6">
      {/* <h2 className="font-semibold mb-3">Project</h2> */}

      {resume.projects.map((pj, index) => (
        <div key={pj.id ?? index} className="border rounded p-4 mb-6">
          
          <input
            placeholder="Project Name"
            value={pj.name}
            onChange={(e) =>
              updateProject(index, "name", e.target.value)
            }
            className="w-full border p-2 mb-2"
          />

          <input
            placeholder="Role"
            value={pj.role}
            onChange={(e) =>
              updateProject(index, "role", e.target.value)
            }
            className="w-full border p-2 mb-2"
          />

          <input
            placeholder="Technologies Used"
            value={pj.technologies}
            onChange={(e) =>
              updateProject(index, "technologies", e.target.value)
            }
            className="w-full border p-2 mb-2"
          />

          <textarea
            placeholder="Description"
            value={pj.description}
            onChange={(e) =>
              updateProject(index, "description", e.target.value)
            }
            className="w-full border p-2"
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
