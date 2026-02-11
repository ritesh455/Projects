import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRef } from "react";
import { downloadResumePdf } from "../api/api";
import { triggerPdfDownload } from "../utils/downloadPdf";
import { useAuth } from "../context/AuthContext";

import { createCheckoutSession } from "../api/api";

import { useTemplate } from "../context/TemplateContext";
import TemplateOne from "../components/templates/TemplateOne";
import TemplateTwo from "../components/templates/TemplateTwo";
import TemplateThree from "../components/templates/TemplateThree";

import PersonalInfoForm from "../components/form/PersonalInfoForm";
import SkillsForm from "../components/form/SkillsForm";
import EducationForm from "../components/form/EducationForm";
import ExperienceForm from "../components/form/ExperienceForm";
import Projects from "../components/form/Projects";

import { useResumeData } from "../context/ResumeContext";
import { improveAndSaveResume, saveResumeOnly } from "../api/api";
import { saveResumeVersion } from "../api/api";

export default function ResumeBuilder() {
  const { resume, setResume, loading } = useResumeData();
  const [improving, setImproving] = useState(false);

  const navigate = useNavigate();

const [showSaveModal, setShowSaveModal] = useState(false);
const [saveName, setSaveName] = useState("");
const [saveDescription, setSaveDescription] = useState("");


  const { template } = useTemplate();

  const previewRef = useRef<HTMLDivElement>(null);
const { user } = useAuth();

const handleTemplateNavigation = () => {
  // Not logged in
  if (!user) {
    alert("Please login first");
    return;
  }

  // Not Pro user
  if (!user.isPro) {
    alert("Please activate Pro mode to access Templates");
    return;
  }

  // Pro user
  navigate("/templates");
};


//download PDF handler with pro check
const handleDownloadPdf = async () => {
  try {
    if (!user?.isPro) {
      // ✅ Save ONLY (no AI)
      await saveResumeOnly(resume);

      localStorage.setItem("downloadAfterPayment", "true");

      const data = await createCheckoutSession();
      window.location.href = data.url;
      return;
    }

    // ✅ Pro user → download
    const html = previewRef.current?.innerHTML;
    if (!html) {
      alert("Resume preview not found");
      return;
    }

    const pdfBlob = await downloadResumePdf(html);
    triggerPdfDownload(pdfBlob);

  } catch (error: any) {
    alert(
      error?.response?.data?.message ||
      "Failed to process PDF download"
    );
  }
};





  if (loading) {
    return <p className="text-sm text-gray-500">Loading resume builder...</p>;
  }

  if (!resume) {
    return <p className="text-sm text-gray-500">No resume data found</p>;
  }

  /* ---------------- ADD HELPERS ---------------- */

  const handleSaveResume = async () => {
  if (!saveName.trim()) {
    alert("Please enter a resume name");
    return;
  }

  try {
    // 🔥 ONLY snapshot save (NO AI, NO overwrite)
    await saveResumeOnly(resume);
    await saveResumeVersion({
      name: saveName,
      description: saveDescription,
      template,
    });

    alert("Resume saved successfully");

    // reset
    setShowSaveModal(false);
    setSaveName("");
    setSaveDescription("");
  } catch (err: any) {
    alert(
      err?.response?.data?.message ||
      "Failed to save resume"
    );
  }
};




  const addEducation = () => {
    setResume((prev: any) => ({
      ...prev,
      education: [
        ...(prev.education || []),
        {
          id: Date.now().toString(),
          qualification: "",
          institution: "",
          branch: "",
          yearOfPassing: "",
          percentage: "",
        },
      ],
    }));
  };

  const addExperience = () => {
    setResume((prev: any) => ({
      ...prev,
      experience: [
        ...(prev.experience || []),
        {
          id: Date.now().toString(),
          company: "",
          role: "",
          duration: "",
          technologies: "",
          description: "",
          improvedDescription: "",
        },
      ],
    }));
  };

  const addProjects = () => {
    setResume((prev: any) => ({
      ...prev,
      projects: [
        ...(prev.projects || []),
        {
          id: Date.now().toString(),
          name: "",
          role: "",
          technologies: "",
          description: "",
          improvedDescription: "",
        },
      ],
    }));
  };

  /* ---------------- AI IMPROVEMENT ---------------- */

  const handleImproveResume = async () => {
    setImproving(true);

    try {
      // Use backend bulk improve & save endpoint which handles summary,
      // experiences and projects in one request and persists the improved
      // version. This endpoint is protected, so ensure the user is logged in.

      const result = await improveAndSaveResume(resume);

      // API returns { message, data: record }
      if (result && result.data) {
        setResume(result.data);
      } else {
        // fallback: alert user
        alert("AI improvement completed but no data returned from server.");
      }
    } catch (err) {
      console.error("Improve resume failed:", err);
      alert("AI improvement failed. Please try again.");
    } finally {
      setImproving(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="grid grid-cols-2 gap-6 p-6 items-start">

      {/* LEFT SIDE – FORMS */}
      <div
        style={{
          maxHeight: "calc(100vh - 48px)",
          overflow: "auto",
          paddingRight: "1rem",
        }}
      >
        <button
          onClick={handleImproveResume}
          disabled={improving}
          className="mb-4 px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
        >
          {improving ? "✨ Improving Resume..." : "✨ Improve Resume with AI"}
        </button>

        <button
  onClick={handleDownloadPdf}
  className="mb-4 ml-2 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
>
  📄 Download PDF
</button>

 <button
        onClick={() => navigate("/cover-letter")}
        style={{
          marginTop: "16px",
          marginLeft: "8px",
          padding: "8px 16px",
          background: "#111",
          color: "#fff",
          borderRadius: "6px",
        }}
      >
        Generate Cover Letter
      </button>


     <button
  onClick={() => setShowSaveModal(true)}
  className="mb-4 ml-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
>
  💾 Save Resume
</button>


{showSaveModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded w-96">
      <h2 className="text-lg font-bold mb-3">
        Save Resume
      </h2>

      <input
        type="text"
        placeholder="Resume Name"
        value={saveName}
        onChange={(e) => setSaveName(e.target.value)}
        className="w-full border p-2 mb-3"
      />

      <textarea
        placeholder="Description (optional)"
        value={saveDescription}
        onChange={(e) => setSaveDescription(e.target.value)}
        className="w-full border p-2 mb-3"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowSaveModal(false)}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveResume}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}



<button
 onClick={handleTemplateNavigation}
  className="ml-2 mb-4 px-4 py-2 border rounded bg-gray-50"
>
  🎨 Templates
</button>


        <PersonalInfoForm />

        {/* Education */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Education</h2>
            <button
              onClick={addEducation}
              className="px-4 py-2 border rounded bg-gray-50"
            >
              + Add Education
            </button>
          </div>
          <EducationForm />
        </div>

        <SkillsForm />

        {/* Experience */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Experience</h2>
            <button
              onClick={addExperience}
              className="px-4 py-2 border rounded bg-gray-50"
            >
              + Add Experience
            </button>
          </div>
          <ExperienceForm />
        </div>

        {/* Projects */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Projects</h2>
            <button
              onClick={addProjects}
              className="px-4 py-2 border rounded bg-gray-50"
            >
              + Add Project
            </button>
          </div>
          <Projects />
        </div>
      </div>

      {/* RIGHT SIDE – PREVIEW */}
      <div className="self-start">
        <div className="sticky top-6">
          {/* <div ref={previewRef}>
  <ResumePreview />
</div> */}
{template === "template1" && <TemplateOne />}
{template === "template2" && <TemplateTwo />}
{template === "template3" && <TemplateThree />}

        </div>
      </div>
    </div>
  );
}
