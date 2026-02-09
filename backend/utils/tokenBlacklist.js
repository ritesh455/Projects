const blacklistedTokens = new Set();

const normalize = (token) => (typeof token === "string" ? token.trim() : token);

const addToBlacklist = (token) => {
  const t = normalize(token);
  if (!t) return;
  blacklistedTokens.add(t);
};

const isBlacklisted = (token) => {
  const t = normalize(token);
  if (!t) return false;
  return blacklistedTokens.has(t) || blacklistedTokens.has(`Bearer ${t}`);
};

module.exports = {
  addToBlacklist,
  isBlacklisted,
};
