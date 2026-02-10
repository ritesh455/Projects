module.exports = async (req, res, next) => {
  const user = req.user; // comes from auth middleware

  // not pro
  if (!user.isPro) {
    return res.status(403).json({
      message: "Upgrade to Pro to access this feature",
    });
  }

  // pro expired
  if (user.proExpiresAt && user.proExpiresAt < new Date()) {
    user.isPro = false;
    user.proExpiresAt = null;
    await user.save();

    return res.status(403).json({
      message: "Pro subscription expired",
    });
  }

  next();
};
