// Stripe Checkout integration. Fail closed until storage/fulfillment is implemented.
const PLANS = Object.freeze({forever: 900, legacy: 2900});
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  if (process.env.PAYMENTS_ENABLED !== 'true') return res.status(503).json({error:'Paid registration is not available yet'});
  if (!process.env.STRIPE_SECRET_KEY || !process.env.REGISTRY_DATABASE_URL) return res.status(503).json({error:'Payment service not ready'});
  // A durable registration must be created before enabling checkout; never use untrusted client IDs.
  return res.status(503).json({error:'Registration and payment reconciliation are not yet implemented'});
};
