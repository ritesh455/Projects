import type { Project } from "../../types/ResumeTypes";
import { useResume } from "../../context/ResumeContext";

interface AddProjectsProps {
  experienceIndex: number;
}

export default function AddProjects({ experienceIndex }: AddProjectsProps) {
  const { resume, updateProject, removeProject } = useResume();

  const projects: Project[] =
    resume.experience[experienceIndex]?.projects ?? [];

  const update = (projectIndex: number, field: keyof Project, value: string) => {
    updateProject(experienceIndex, projectIndex, field, value);
  };

  return (
    <div className="mt-4">
      {projects.map((project, index) => (
        <div key={project.id ?? index} className="border rounded p-4 mb-4 bg-white shadow-sm">
          <input
            placeholder="Project Name"
            value={project.name}
            onChange={(e) => update(index, "name", e.target.value)}
            className="w-full border p-2 mb-2 rounded"
          />

          <textarea
            placeholder="Project Description"
            value={project.description}
            onChange={(e) => update(index, "description", e.target.value)}
            className="w-full border p-2 mb-2 rounded"
          />

          <div className="grid grid-cols-2 gap-2 mb-2">
            <input
              placeholder="Role"
              value={project.role}
              onChange={(e) => update(index, "role", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              placeholder="Technologies Used"
              value={project.technologies}
              onChange={(e) => update(index, "technologies", e.target.value)}
              className="border p-2 rounded"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => removeProject(experienceIndex, index)}
              className="text-sm text-red-600 hover:underline"
            >
              Delete Project
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}