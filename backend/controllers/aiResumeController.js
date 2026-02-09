const AIResumeVersion = require("../models/AIResumeVersion");
const { rewriteWithAI } = require("../services/geminiService");
const { calculateATSScore } = require("../utils/atsScore");

const { buildPrompt } = require("./aiController");

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));


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
     await sleep(1200);

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
      await sleep(1200);

      improvedExperience.push({
        ...exp,
        description: {
          old_description: exp.description,
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
      await sleep(1200);

         improvedProjects.push({
        ...proj,
        description: {
          old_description: proj.description,
          improved_description: improvedDesc,
        },
      });
    }

    const latency = Date.now() - startTime;
    const atsScore = calculateATSScore(improvedSummary, resume.skills);

    // 4️⃣ Save Version
    const record = await AIResumeVersion.findOneAndUpdate(
  { userId }, // 🔑 SAME USER
  {
    userId,
    personalInfo: {
      ...resume.personalInfo,
      summary: {
        old_summary: resume.personalInfo.summary,
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

module.exports = { improveAndSaveResume };
