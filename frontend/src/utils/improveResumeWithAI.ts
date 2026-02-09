type ImproveType = "summary" | "experience" | "project";

async function improveText(
  text: string,
  type: ImproveType
): Promise<string | null> {
  if (!text || !text.trim()) return null;

  // Keywords based on section type
  let keywords: string[] = [];

  if (type === "summary") {
    keywords = ["Java", "Backend", "Spring Boot", "Problem Solving"];
  } else if (type === "experience") {
    keywords = ["Teamwork", "Development", "Technologies"];
  } else if (type === "project") {
    keywords = ["Project", "Implementation", "Technology"];
  }

  const response = await fetch("http://localhost:5000/api/ai/improve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    // ✅ THIS IS THE IMPORTANT PART
    body: JSON.stringify({
      text,
      keywords,
      type, // <-- backend needs this
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("AI Error:", error);
    return null;
  }

  const data = await response.json();
  return data.improvedText || null;
}

export default improveText;
