import { useResume } from "../../context/ResumeContext";

export default function SkillsForm() {
  const { resume, updateField } = useResume();

  return (
    <div>
      <h2 className="font-bold mb-2">Skills</h2>
      <input
        className="border w-full p-2"
        placeholder="Comma separated skills"
        value={resume.skills.join(",")}
        onChange={e =>
          updateField("skills", e.target.value.split(","))
        }
      />
    </div>
  );
}
