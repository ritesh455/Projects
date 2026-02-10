import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSavedResumes, loadSavedResume } from "../api/api";
import { useResumeData } from "../context/ResumeContext";


export default function SavedResumes() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
const { refreshResume } = useResumeData();


  useEffect(() => {
    async function fetchResumes() {
      try {
        const res = await getSavedResumes();
        setResumes(res.data || []);
      } catch (err) {
        console.error("Failed to fetch saved resumes");
      } finally {
        setLoading(false);
      }
    }

    fetchResumes();
  }, []);

  const handleLoadResume = async (id: string) => {
    try {
      await loadSavedResume(id);
      await refreshResume(); 
      navigate("/resume-builder"); // active resume replaced
    } catch (err) {
      alert("Failed to load saved resume");
    }
  };

  if (loading) {
    return <p className="p-6">Loading saved resumes...</p>;
  }

  if (resumes.length === 0) {
    return <p className="p-6">No saved resumes found.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Saved Resumes</h1>

      <div className="space-y-4">
        {resumes.map((r) => (
          <div
            key={r._id}
            className="border p-4 rounded hover:shadow cursor-pointer"
            onClick={() => handleLoadResume(r._id)}
          >
            <h2 className="text-lg font-semibold">{r.name}</h2>
            <p className="text-gray-600 text-sm">
              {r.description || "No description"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Template: {r.template} •{" "}
              {new Date(r.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
