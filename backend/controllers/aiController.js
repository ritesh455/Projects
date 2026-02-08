const { rewriteWithAI } = require("../services/groqService");
const { calculateATSScore } = require("../utils/atsScore");

async function improveBulletPoint(req, res) {
  try {
    const { text, keywords } = req.body;

    if (!text || !keywords) {
      return res.status(400).json({ message: "Text and keywords are required" });
    }

    const prompt = `
You are a professional resume writer.

Rewrite the following resume bullet point to:
- Sound authoritative
- Use strong action verbs
- Be ATS-friendly
- Include these keywords: ${keywords.join(", ")}

Original:
"${text}"
`;

    const startTime = Date.now();
    const improvedText = await rewriteWithAI(prompt);
    const latency = Date.now() - startTime;

    const atsScore = calculateATSScore(improvedText, keywords);

    res.json({
      improvedText,
      atsScore,
      latency
    });
  } catch (error) {
  console.error(
    "HF Error:",
    error.response?.data || error.message
  );

  res.status(500).json({
    message: "AI processing failed",
    details: error.response?.data || "Hugging Face error"
  });
}

}

module.exports = { improveBulletPoint };
