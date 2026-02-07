import { useResume } from "../../context/ResumeContext";

export default function ResumePreview() {
  const { resume } = useResume();

  const p = resume.personalInfo;

  return (
  <div className="p-6 bg-white shadow overflow-visible">
      <h1 className="text-2xl font-bold">{p.fullName || "Your Name"}</h1>
      <p className="text-sm text-gray-600">
        {p.email} {p.email && p.phone ? " | " : ""} {p.phone}
      </p>
      <p className="text-sm text-gray-600">{p.location} {p.website ? ` | ${p.website}` : ""}</p>

      {p.summary && (
        <div className="mt-4">
          <h2 className="font-semibold">Professional Summary</h2>
          <p className="text-sm text-gray-800">{p.summary}</p>
        </div>
      )}

      <h2 className="mt-4 font-semibold">Skills</h2>
      <ul className="list-disc list-inside">
        {resume.skills.map((s: string, i: number) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      {resume.education.length > 0 && (
        <div className="mt-4">
          <h2 className="font-semibold">Education</h2>
          <ul>
            {resume.education.map((ed) => (
              <li key={ed.id} className="text-sm">
                <strong>{ed.institution}</strong> — {ed.degree} {ed.fieldOfStudy && `, ${ed.fieldOfStudy}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {resume.experience.length > 0 && (
        <div className="mt-4">
          <h2 className="font-semibold">Experience</h2>
          <ul>
            {resume.experience.map((ex) => (
              <li key={ex.id} className="text-sm">
                <strong>{ex.role}</strong> — {ex.company}
                <p className="text-xs text-gray-700">{ex.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
