import { useResume } from "../../context/ResumeContext";

export default function ExperienceForm() {
  const { resume, updateExperience, removeExperience } = useResume();

  return (
    <div className="mt-6">
      {/* <h2 className="font-semibold mb-3">Experience</h2> */}

      {resume.experience.map((exp, index) => (
        <div key={exp.id ?? index} className="border rounded p-4 mb-6">
          
          <input
            placeholder="Company Name"
            value={exp.company}
            onChange={(e) =>
              updateExperience(index, "company", e.target.value)
            }
            className="w-full border p-2 mb-2"
          />

          <input
            placeholder="Duration"
            value={exp.duration}
            onChange={(e) =>
              updateExperience(index, "duration", e.target.value)
            }
            className="w-full border p-2 mb-2"
          />

          <input
            placeholder="Role"
            value={exp.role}
            onChange={(e) =>
              updateExperience(index, "role", e.target.value)
            }
            className="w-full border p-2 mb-2"
          />

          <input
            placeholder="Technologies Used"
            value={exp.technologies}
            onChange={(e) =>
              updateExperience(index, "technologies", e.target.value)
            }
            className="w-full border p-2 mb-2"
          />

          <textarea
            placeholder="Description"
            value={exp.description}
            onChange={(e) =>
              updateExperience(index, "description", e.target.value)
            }
            className="w-full border p-2"
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
