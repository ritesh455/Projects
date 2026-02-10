import { useResumeData } from "../../context/ResumeContext";

export default function ResumePreview() {
  const { resume, loading } = useResumeData();

  if (loading) {
    return <p className="text-sm text-gray-500 p-6">Loading preview...</p>;
  }

  const p = resume.personalInfo || {};

  return (
    <div className="max-w-[850px] mx-auto p-10 bg-white shadow-2xl text-[#333] font-sans leading-tight min-h-[1056px] border border-gray-100">
      
      {/* ===== HEADER SECTION ===== */}
      <header className="border-b-2 border-black pb-4 mb-6">
        <h1 className="text-5xl font-black tracking-tighter text-[#2c3e50]">
          {p.fullName || "JANEE ZEDA"}
        </h1>
        <h2 className="text-2xl font-bold text-[#859331] mt-1">
          {/* You can map this to a specific field or use a placeholder */}
          Business Analyst
        </h2>
        
        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-[13px] text-gray-600">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.linkedin && (
            <a href={p.linkedin} className="text-blue-600 underline">LinkedIn</a>
          )}
        </div>
      </header>

      {/* ===== MAIN GRID LAYOUT ===== */}
      <div className="grid grid-cols-[1.8fr_1fr] gap-10">
        
        {/* LEFT COLUMN: Projects & Experience */}
        <div className="space-y-8">
          
          {/* PROJECTS SECTION */}
          {resume.projects?.length > 0 && (
            <section>
              <h3 className="text-xl font-bold border-b-2 border-black mb-4 pb-1">PROJECTS</h3>
              {resume.projects.map((pj: any, index: number) => (
                <div key={pj.id || index} className="mb-6">
                  <h4 className="text-[17px] font-bold text-gray-800">{pj.name}</h4>
                  <p className="text-[13px] text-[#859331] font-semibold italic">{pj.role}</p>
                  <p className="text-[11px] text-gray-500 mb-2 italic">{pj.technologies}</p>
                  <div className="text-[13px] text-gray-700 leading-relaxed text-justify">
                    {typeof pj.description === "string"
                      ? pj.description
                      : pj.description?.improved_description || pj.description?.old_description}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* EXPERIENCE SECTION */}
          {resume.experience?.length > 0 && (
            <section>
              <h3 className="text-xl font-bold border-b-2 border-black mb-4 pb-1">WORK HISTORY</h3>
              {resume.experience.map((ex: any, index: number) => (
                <div key={ex.id || index} className="mb-6">
                  <h4 className="text-[17px] font-bold text-gray-800">{ex.company}</h4>
                  <p className="text-[13px] text-[#859331] font-semibold">{ex.role}</p>
                  <p className="text-[11px] text-gray-500 mb-2">{ex.duration}</p>
                  <div className="text-[13px] text-gray-700 leading-relaxed">
                    {typeof ex.description === "string"
                      ? ex.description
                      : ex.description?.improved_description || ex.description?.old_description}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* RIGHT COLUMN: Sidebar (Objective, Education, Skills) */}
        <div className="space-y-8">
          
          {/* OBJECTIVE / SUMMARY */}
          {p.summary && (
            <section>
              <h3 className="text-xl font-bold border-b-2 border-black mb-3 pb-1">OBJECTIVE</h3>
              <p className="text-[13px] leading-relaxed text-gray-700">
                {typeof p.summary === "string"
                  ? p.summary
                  : p.summary?.improved_summary || p.summary?.old_summary}
              </p>
            </section>
          )}

          {/* EDUCATION SECTION */}
          {resume.education?.length > 0 && (
            <section>
              <h3 className="text-xl font-bold border-b-2 border-black mb-3 pb-1">EDUCATION</h3>
              {resume.education.map((ed: any, index: number) => (
                <div key={ed.id || index} className="mb-4">
                  <h4 className="text-[14px] font-bold leading-tight">{ed.qualification}</h4>
                  <p className="text-[14px] text-[#859331] font-bold">{ed.branch}</p>
                  <p className="text-[13px] font-medium text-gray-700">{ed.institution}</p>
                  <p className="text-[12px] text-gray-500">{ed.yearOfPassing}</p>
                  {ed.percentage && (
                    <p className="text-[12px] italic text-gray-600 mt-1">GPA/Marks: {ed.percentage}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* SKILLS SECTION */}
          {resume.skills?.length > 0 && (
            <section>
              <h3 className="text-xl font-bold border-b-2 border-black mb-3 pb-1">SKILLS</h3>
              <ul className="space-y-2 text-[13px] text-gray-700">
                {resume.skills.map((skill: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-[#859331] shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

      </div>
    </div>
  );
}