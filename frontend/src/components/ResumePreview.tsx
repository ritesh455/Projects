import { useResume } from "../../context/ResumeContext";

export default function ResumePreview() {
  const { resume } = useResume();

  return (
    <div className="p-4 bg-white shadow">
      <h1 className="text-xl font-bold">{resume.name}</h1>
      <p>{resume.email} | {resume.phone}</p>

      <h2 className="mt-4 font-semibold">Skills</h2>
      <ul>
        {resume.skills.map((s: string, i: number) => (
          <li key={i}>• {s}</li>
        ))}
      </ul>
    </div>
  );
}
