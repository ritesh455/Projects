const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/User");

exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("⚡ Stripe webhook received:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // console.log("Metadata:", session.metadata);

    if (!session.metadata?.userId) {
      console.log(" Missing userId in metadata");
      return res.json({ received: true });
    }

    const userId = session.metadata.userId;
    const user = await User.findById(userId);

    if (!user) {
      // console.log(" User not found:", userId);
      return res.json({ received: true });
    }

    user.isPro = true;
    user.proExpiresAt = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    );

    await user.save();
    console.log("✅ User upgraded to Pro:", user.email);
  }

  res.json({ received: true });
};
