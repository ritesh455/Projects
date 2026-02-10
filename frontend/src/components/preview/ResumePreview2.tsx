import { useResumeData } from "../../context/ResumeContext";

export default function ResumePreview() {
  const { resume, loading } = useResumeData(); // Using your context hook

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-sm text-gray-500 animate-pulse">Loading preview...</p>
      </div>
    );
  }

  const p = resume.personalInfo || {};

  return (
    <div className="max-w-[800px] mx-auto p-12 bg-white shadow-2xl text-[#333] font-serif leading-tight min-h-[1056px] overflow-visible border border-gray-200">
      
      {/* ===== DECORATIVE TOP BAR (Gerald Green Style) ===== */}
      <div className="h-3 w-full bg-[#3b557b] mb-8"></div>

      {/* ===== HEADER ===== */}
      <header className="text-center mb-6">
        <h1 className="text-4xl font-normal tracking-widest uppercase text-[#3b557b] mb-2">
          {p.fullName || "YOUR NAME"}
        </h1>
        <div className="text-[12px] uppercase tracking-widest text-gray-600 space-y-1">
          <p>{p.location || "City, State, Zip"}</p>
          <p>
            {p.phone} 
            {p.phone && p.email && " | "} 
            {p.email}
          </p>
          {(p.website || p.linkedin) && (
            <p>
               {p.website} {p.website && p.linkedin && " | "} {p.linkedin}
            </p>
          )}
        </div>
      </header>

      <hr className="border-t border-dotted border-gray-400 mb-6" />

      {/* ===== PROFESSIONAL SUMMARY ===== */}
      {p.summary && (
        <section className="mb-6">
          <p className="text-[13px] text-justify leading-relaxed italic">
            {typeof p.summary === "string"
              ? p.summary
              : p.summary?.improved_summary || p.summary?.old_summary || ""}
          </p>
        </section>
      )}

      <hr className="border-t border-dotted border-gray-400 mb-6" />

      {/* ===== SKILLS (Two-Column Grid) ===== */}
      {resume.skills?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-[14px] font-bold uppercase tracking-[0.2em] mb-4 text-[#3b557b]">
            SKILLS
          </h2>
          <ul className="grid grid-cols-2 gap-x-12 gap-y-2 list-disc ml-5 text-[13px]">
            {resume.skills.map((skill: string, i: number) => (
              <li key={i} className="pl-1">{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {/* ===== WORK HISTORY (Experience) ===== */}
      {resume.experience?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-[14px] font-bold uppercase tracking-[0.2em] mb-4 text-[#3b557b]">
            WORK HISTORY
          </h2>
          {resume.experience.map((ex: any, index: number) => (
            <div key={ex.id || index} className="mb-6">
              <div className="flex justify-between font-bold text-[13px] uppercase">
                <span>{ex.company || "Company Name"}</span>
              </div>
              <div className="flex justify-between italic text-[13px] mb-2 text-gray-700">
                <span>{ex.role || "Job Title"}</span>
                <span>{ex.duration || "Dates"}</span>
              </div>
              {ex.technologies && (
                <p className="text-[12px] mb-1 font-semibold text-gray-600">
                  Tech: {ex.technologies}
                </p>
              )}
              <p className="text-[13px] text-gray-800 text-justify leading-normal">
                {typeof ex.description === "string"
                  ? ex.description
                  : ex.description?.improved_description || ex.description?.old_description || ""}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* ===== PROJECTS ===== */}
      {resume.projects?.length > 0 && (
        <section className="mb-8 border-t border-gray-100 pt-6">
          <h2 className="text-[14px] font-bold uppercase tracking-[0.2em] mb-4 text-[#3b557b]">
            PROJECTS
          </h2>
          {resume.projects.map((pj: any, index: number) => (
            <div key={pj.id || index} className="mb-5">
              <div className="flex justify-between font-bold text-[13px]">
                <span>{pj.name || "Project Name"}</span>
                <span className="font-normal italic text-gray-600">{pj.role}</span>
              </div>
              <p className="text-[12px] text-gray-500 italic mb-1">{pj.technologies}</p>
              <p className="text-[13px] text-gray-800 leading-normal">
                {typeof pj.description === "string"
                  ? pj.description
                  : pj.description?.improved_description || pj.description?.old_description || ""}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* ===== EDUCATION ===== */}
      {resume.education?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[14px] font-bold uppercase tracking-[0.2em] mb-4 text-[#3b557b]">
            EDUCATION
          </h2>
          {resume.education.map((ed: any, index: number) => (
            <div key={ed.id || index} className="mb-4 text-[13px]">
              <div className="flex justify-between font-bold">
                <span>{ed.qualification} {ed.branch && `- ${ed.branch}`}</span>
                <span>{ed.yearOfPassing}</span>
              </div>
              <p className="italic text-gray-700">{ed.institution}</p>
              {ed.percentage && (
                <p className="text-[12px] text-gray-600">Result: {ed.percentage}</p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}