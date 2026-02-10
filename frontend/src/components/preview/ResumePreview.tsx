import { useResumeData } from "../../context/ResumeContext";

export default function ResumePreview() {
  const { resume, loading } = useResumeData();

  if (loading) {
    return <p className="text-sm text-gray-500">Loading preview...</p>;
  }

  const p = resume.personalInfo || {};

  return (
    <div className="p-6 bg-white shadow overflow-visible text-sm">

      {/* ===== HEADER ===== */}
      <section>
        <h1 className="text-2xl font-bold">
          {p.fullName || "Your Name"}
        </h1>

        <p className="text-gray-600">
          {p.email}
          {p.email && p.phone && " | "}
          {p.phone}
        </p>

        <p className="text-gray-600">
          {p.location}
          {p.website && ` | ${p.website}`}
          {p.linkedin && ` | ${p.linkedin}`}
        </p>
      </section>

      {/* ===== SUMMARY ===== */}
      {p.summary && (
        <section className="mt-4">
          <h2 className="font-semibold text-base">
            Professional Summary
          </h2>
          <p className="text-gray-800">
            {typeof p.summary === "string"
              ? p.summary
              : p.summary?.improved_summary ||
                p.summary?.old_summary ||
                ""}
          </p>
        </section>
      )}

      {/* ===== SKILLS ===== */}
      {resume.skills?.length > 0 && (
        <section className="mt-4">
          <h2 className="font-semibold text-base">Skills</h2>
          <ul className="list-disc list-inside">
            {resume.skills.map((skill: string, i: number) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {/* ===== EDUCATION ===== */}
      {resume.education?.length > 0 && (
        <section className="mt-4">
          <h2 className="font-semibold text-base mb-2">
            Education
          </h2>

          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1 pr-2">Qualification</th>
                <th className="text-left py-1 pr-2">Institution</th>
                <th className="text-left py-1 pr-2">Branch</th>
                <th className="text-left py-1 pr-2">Year</th>
                <th className="text-left py-1">Percentage / CGPA</th>
              </tr>
            </thead>

            <tbody>
              {resume.education.map((ed: any, index: number) => (
                <tr
                  key={ed.id || index}
                  className="border-b last:border-b-0"
                >
                  <td className="py-1 pr-2 font-medium">
                    {ed.qualification}
                  </td>
                  <td className="py-1 pr-2">
                    {ed.institution}
                  </td>
                  <td className="py-1 pr-2">
                    {ed.branch || "-"}
                  </td>
                  <td className="py-1 pr-2">
                    {ed.yearOfPassing}
                  </td>
                  <td className="py-1">
                    {ed.percentage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* ===== EXPERIENCE ===== */}
      {resume.experience?.length > 0 && (
        <section className="mt-6">
          <h2 className="font-bold text-lg border-b-2 border-black inline-block">
            Experience
          </h2>

          {resume.experience.map((ex: any, index: number) => (
            <div key={ex.id || index} className="mt-3">
              <ul className="list-disc list-inside">
                <li><strong>Company Name:</strong> {ex.company}</li>
                <li><strong>Duration:</strong> {ex.duration}</li>
                <li><strong>Role:</strong> {ex.role}</li>
                <li><strong>Technologies Used:</strong> {ex.technologies}</li>
                <li>
                  <strong>Description:</strong>{" "}
                  {typeof ex.description === "string"
                    ? ex.description
                    : ex.description?.improved_description ||
                      ex.description?.old_description ||
                      ""}
                </li>
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* ===== PROJECTS ===== */}
      {resume.projects?.length > 0 && (
        <section className="mt-6">
          <h2 className="font-bold text-lg border-b-2 border-black inline-block">
            Projects
          </h2>

          {resume.projects.map((pj: any, index: number) => (
            <div key={pj.id || index} className="mt-3">
              <ul className="list-disc list-inside">
                <li><strong>Project Name:</strong> {pj.name}</li>
                <li><strong>Role:</strong> {pj.role}</li>
                <li><strong>Technologies Used:</strong> {pj.technologies}</li>
                <li>
                  <strong>Description:</strong>{" "}
                  {typeof pj.description === "string"
                    ? pj.description
                    : pj.description?.improved_description ||
                      pj.description?.old_description ||
                      ""}
                </li>
              </ul>
            </div>
          ))}
        </section>
      )}

    </div>
  );
}
