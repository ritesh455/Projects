function calculateATSScore(text, keywords) {
  let matched = 0;

  keywords.forEach((keyword) => {
    if (text.toLowerCase().includes(keyword.toLowerCase())) {
      matched++;
    }
  });

  return Math.round((matched / keywords.length) * 100);
}

module.exports = { calculateATSScore };
