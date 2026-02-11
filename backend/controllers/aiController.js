// const { rewriteWithAI } = require("../services/geminiService");
// const { calculateATSScore } = require("../utils/atsScore");

// async function improveBulletPoint(req, res) {
//   try {
//     const { text, keywords } = req.body;

//     if (!text || !keywords) {
//       return res.status(400).json({ message: "Text and keywords are required" });
//     }

//     const prompt = `
// You are a resume writing assistant.

// Rewrite the following text into a PROFESSIONAL SUMMARY suitable for a resume.

// Rules:
// - Output ONLY plain text (no headings, no bullet points, no symbols)
// - Maximum 3 to 4 lines
// - No explanations, no options, no markdown
// - Use professional resume language
// - Do NOT use first-person words (I, me, my)
// - Keep it concise, clean, and ATS-friendly
// - Include these keywords: ${keywords.join(", ")}

// Original:
// "${text}"
// `;

//     const startTime = Date.now();
//     const improvedText = await rewriteWithAI(prompt);
//     const latency = Date.now() - startTime;

//     const atsScore = calculateATSScore(improvedText, keywords);

//     res.json({
//       improvedText,
//       atsScore,
//       latency
//     });
//   } catch (error) {
//   console.error(
//     "GM Error:",
//     error.response?.data || error.message
//   );

//   res.status(500).json({
//     message: "AI processing failed",
//     details: error.response?.data || "Gemini error"
//   });
// }

// }

// module.exports = { improveBulletPoint };


const { rewriteWithAI } = require("../services/geminiService");
const { calculateATSScore } = require("../utils/atsScore");

// function buildPrompt(type, text, keywords) {
function buildPrompt(type, data, keywords = []) {
  const keywordLine =
    keywords.length > 0
      ? `Naturally include these keywords if relevant: ${keywords.join(", ")}.`
      : "";

  /* ---------- EXPERIENCE ---------- */
  if (type === "experience") {
    const { company, role, technologies, description } = data;

    return `
You are a professional resume writer.

TASK:
Write ONE concise EXPERIENCE DESCRIPTION for a resume using the details below.

DETAILS:
Company: ${company}
Role: ${role}
Technologies: ${technologies}
User Input: ${description}

STRICT RULES:
- Output ONLY plain text
- ONE version only
- 3 to 4 lines maximum
- No bullet points, no headings, no markdown
- No explanations or questions
- No first-person words
- Professional and ATS-friendly
${keywordLine}

IMPORTANT:
Return ONLY the final rewritten description.
`;
  }

  /* ---------- PROJECT ---------- */
  if (type === "project") {
    const { name, role, technologies, description } = data;

    return `
You are a professional resume writer.

TASK:
Write ONE concise PROJECT DESCRIPTION for a resume using the details below.

DETAILS:
Project Name: ${name}
Role: ${role}
Technologies: ${technologies}
User Input: ${description}

STRICT RULES:
- Output ONLY plain text
- ONE version only
- 2 to 3 lines maximum
- No bullet points, no headings, no markdown
- No explanations or questions
- No first-person words
${keywordLine}

IMPORTANT:
Return ONLY the final rewritten description.
`;
  }

  /* ---------- SUMMARY ---------- */
  return `
You are a professional resume writer.

TASK:
Rewrite the PROFESSIONAL SUMMARY below into ONE clean resume summary.

TEXT:
${data.summary}

STRICT RULES:
- Output ONLY plain text
- ONE version only
- 3 to 4 lines maximum
- No bullet points, no headings, no markdown
- No explanations or questions
- No first-person words
${keywordLine}

IMPORTANT:
Return ONLY the final rewritten summary.
`;
}

const PDFDocument = require("pdfkit");
// const { rewriteWithAI } = require("../services/geminiService");

/* ===============================
   PROMPT BUILDER
   =============================== */
function buildCoverLetterPrompt(data) {
  const {
    name,
    email,
    phone,
    address,
    recipientName,
    companyName,
    companyAddress,
    keywords,
  } = data;

  return `
You are a professional HR assistant.

TASK:
Write a formal, professional cover letter.

FORMAT INSTRUCTIONS:
- Start with applicant details
- Then date
- Then recipient name and company address
- Then body paragraphs

APPLICANT DETAILS:
Name: ${name}
Email: ${email}
Phone: ${phone}
Address: ${address}

RECIPIENT DETAILS:
Recipient Name: ${recipientName}
Company Name: ${companyName}
Company Address: ${companyAddress}

CONTENT GUIDELINES:
${keywords}

RULES:
- Professional tone
- Well-structured paragraphs
- No markdown
- No bullet points
- No placeholders
- Output ONLY the cover letter text
`;
}

/* ===============================
   COVER LETTER GENERATOR
   =============================== */
async function generateCoverLetter(req, res) {
  try {
    const {
      name,
      email,
      phone,
      address,
      recipientName,
      companyName,
      companyAddress,
      keywords,
    } = req.body;

    if (!name || !keywords) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    const prompt = buildCoverLetterPrompt({
      name,
      email,
      phone,
      address,
      recipientName,
      companyName,
      companyAddress,
      keywords,
    });

    const coverLetterText = await rewriteWithAI(prompt);

    if (!coverLetterText) {
      return res.status(500).json({
        message: "AI returned empty response",
      });
    }

    /* ===============================
       PDF GENERATION
       =============================== */
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=cover_letter.pdf"
    );

    doc.pipe(res);

    /* ---------- HEADER BAR ---------- */
    doc
      .rect(0, 0, doc.page.width, 110)
      .fill("#6B3A1E");

    doc
      .fillColor("white")
      .font("Helvetica-Bold")
      .fontSize(26)
      .text(name, 50, 40);

    /* ---------- CONTACT ROW ---------- */
    doc
      .fillColor("#6B3A1E")
      .font("Helvetica")
      .fontSize(10)
      .text(
        `${phone}   |   ${address}   |   ${email}`,
        50,
        125
      );

    doc.moveDown(2);

    /* ---------- DATE ---------- */
    doc
      .fillColor("black")
      .fontSize(11)
      .text(new Date().toDateString());

    doc.moveDown();

    /* ---------- COMPANY DETAILS ---------- */
    if (recipientName) doc.text(recipientName);
    if (companyName) doc.text(companyName);
    if (companyAddress) doc.text(companyAddress);

    doc.moveDown();

    /* ---------- BODY ---------- */
    doc
      .fontSize(11)
      .text(coverLetterText, {
        align: "left",
        lineGap: 6,
      });

    doc.moveDown(2);

    /* ---------- SIGNATURE ---------- */
    doc.text("Sincerely,");
    doc.moveDown(0.5);

    doc
      .fillColor("#6B3A1E")
      .font("Helvetica-Bold")
      .fontSize(14)
      .text(name);

    doc.end();
  } catch (error) {
    console.error("Cover Letter AI Error:", error.message);
    res.status(500).json({
      message: "Cover letter generation failed",
    });
  }
}


async function improveBulletPoint(req, res) {
  try {
    const { text, keywords = [], type = "summary" } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({
        message: "Valid text is required",
      });
    }

    const prompt = buildPrompt(type, text, keywords);

    const startTime = Date.now();
    const improvedText = await rewriteWithAI(prompt);
    const latency = Date.now() - startTime;

    if (!improvedText) {
      return res.status(500).json({
        message: "AI returned empty response",
      });
    }

    const atsScore =
      keywords.length > 0
        ? calculateATSScore(improvedText, keywords)
        : null;

    res.json({
      improvedText,
      atsScore,
      latency,
    });
  } catch (error) {
    console.error(
      "Gemini Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "AI processing failed",
      details: error.response?.data || "Gemini error",
    });
  }
}

module.exports = { improveBulletPoint, buildPrompt, generateCoverLetter };
