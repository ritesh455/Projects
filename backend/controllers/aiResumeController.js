const AIResumeVersion = require("../models/AIResumeVersion");
const { rewriteWithAI } = require("../services/geminiService");
const { calculateATSScore } = require("../utils/atsScore");

const { buildPrompt } = require("./aiController");

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));


const extractText = (val) => {
  if (typeof val === "string") return val;

  if (typeof val === "object" && val !== null) {
    return (
      val.improved_summary ||
      val.improved_description ||
      val.old_summary ||
      val.old_description ||
      ""
    );
  }

  return "";
};



/* -------------------------------------------
   GET logged-in user's resume
-------------------------------------------- */
async function getMyResume(req, res) {
  try {
    const userId = req.user._id;

    const resume = await AIResumeVersion.findOne({ userId });

    if (!resume) {
      return res.status(404).json({
        message: "No resume found for this user",
        data: null,
      });
    }

    res.status(200).json({
      message: "Resume fetched successfully",
      data: resume,
    });
  } catch (error) {
    console.error("Fetch Resume Error:", error.message);
    res.status(500).json({
      message: "Failed to fetch resume",
    });
  }
}

async function improveAndSaveResume(req, res) {
  try {
    const userId = req.user._id;
    const resume = req.body;

    const startTime = Date.now();

    /* 1️⃣ Professional Summary */
    const summaryPrompt = buildPrompt(
      "summary",
      resume.personalInfo.summary,
      resume.skills
    );

     const improvedSummary = await rewriteWithAI(summaryPrompt);
     await sleep(1500);

      /* 2️⃣ Experience Descriptions */
    const improvedExperience = [];
    for (const exp of resume.experience) {
      const expPrompt = buildPrompt(
  "experience",
  {
    company: exp.company,
    role: exp.role,
    technologies: exp.technologies,
    description: exp.description,
  },
  resume.skills
);


      const improvedDesc = await rewriteWithAI(expPrompt);

      const rawExpDescription =
  typeof exp.description === "object"
    ? exp.description.improved_description ||
      exp.description.old_description
    : exp.description;

      await sleep(1500);

      improvedExperience.push({
        ...exp,
        description: {
  old_description: rawExpDescription,
  improved_description: improvedDesc,
},
      });
    }

    /* 3️⃣ Project Descriptions */
    const improvedProjects = [];
    for (const proj of resume.projects) {
      const projPrompt = buildPrompt(
  "project",
  {
    name: proj.name,
    role: proj.role,
    technologies: proj.technologies,
    description: proj.description,
  },
  resume.skills
);


      const improvedDesc = await rewriteWithAI(projPrompt);
      await sleep(1500);

      const rawProjDescription = extractText(proj.description);

         improvedProjects.push({
        ...proj,
        description: {
  old_description: rawProjDescription,
  improved_description: improvedDesc,
},
      });
    }

    const latency = Date.now() - startTime;
    const atsScore = calculateATSScore(improvedSummary, resume.skills);

    const rawSummary =
  typeof resume.personalInfo.summary === "object"
    ? resume.personalInfo.summary.improved_summary ||
      resume.personalInfo.summary.old_summary
    : resume.personalInfo.summary;


    // 4️⃣ Save Version
    const record = await AIResumeVersion.findOneAndUpdate(
  { userId }, // 🔑 SAME USER
  {
    userId,
    personalInfo: {
      ...resume.personalInfo,
      summary: {
  old_summary: rawSummary,
  improved_summary: improvedSummary,
},
    },
    education: resume.education,
    experience: improvedExperience,
    projects: improvedProjects,
    skills: resume.skills,
    atsScore,
    aiLatencyMs: latency,
  },
  {
    new: true,     // return updated doc
    upsert: true,  // create if not exists
  }
);


    res.status(201).json({
      message: "Resume improved and saved successfully",
      data: record,
    });
  } catch (error) {
    console.error("AI Resume Error:", error.message);
    res.status(500).json({
      message: "AI resume processing failed",
    });
  }
}

module.exports = { improveAndSaveResume, getMyResume };
