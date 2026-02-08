import { useResume } from "../../context/ResumeContext";

export default function EducationForm() {
  const { resume, updateEducation, removeEducation } = useResume();

  return (
    <div className="mt-6">
      <h2 className="font-semibold mb-3">Education</h2>
      {resume.education.map((edu, index) => (
  <div key={edu.id ?? index} className="border rounded p-4 mb-4">
          
          {/* Qualification */}
          <select
            value={edu.qualification}
            onChange={(e) =>
              updateEducation(index, "qualification", e.target.value)
            }
            className="w-full border p-2 mb-2"
          >
            <option value="">Select Qualification</option>
            <option value="SSC">SSC</option>
            <option value="HSC">HSC</option>
            <option value="Diploma">Diploma</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
          </select>

          {/* University / School */}
          <input
            type="text"
            placeholder="University / School"
            value={edu.institution}
            onChange={(e) =>
              updateEducation(index, "institution", e.target.value)
            }
            className="w-full border p-2 mb-2"
          />

          {/* Percentage / CGPA */}
          <input
            type="text"
            placeholder="Percentage / CGPA"
            value={edu.percentage}
            onChange={(e) =>
              updateEducation(index, "percentage", e.target.value)
            }
            className="w-full border p-2 mb-2"
          />

          {/* Year of Passing */}
          <input
            type="text"
            placeholder="Year of Passing"
            value={edu.yearOfPassing}
            onChange={(e) =>
              updateEducation(index, "yearOfPassing", e.target.value)
            }
            className="w-full border p-2 mb-2"
          />

          {/* Branch – NOT for SSC */}
          {edu.qualification !== "SSC" && (
            <input
              type="text"
              placeholder="Branch"
              value={edu.branch}
              onChange={(e) =>
                updateEducation(index, "branch", e.target.value)
              }
              className="w-full border p-2"
            />
          )}

          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={() => removeEducation(edu.id)}
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
