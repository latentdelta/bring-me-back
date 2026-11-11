// Fail-closed webhook scaffold. Never acknowledge a completed payment without durable fulfillment.
const crypto = require('node:crypto');
function verify(payload, header, secret) {
  const parts = Object.fromEntries((header || '').split(',').map(p=>p.split('=',2)));
  const timestamp = Number(parts.t);
  if (!Number.isFinite(timestamp) || Math.abs(Date.now()/1000-timestamp)>300) return false;
  const signature = crypto.createHmac('sha256',secret).update(timestamp+'.'+payload).digest('hex');
  const supplied = (header || '').split(',').filter(p=>p.startsWith('v1=')).map(p=>p.slice(3));
  return supplied.some(s=>/^[a-f0-9]{64}$/i.test(s) && crypto.timingSafeEqual(Buffer.from(s,'hex'),Buffer.from(signature,'hex')));
}
module.exports = async function handler(req,res) {
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST') return res.status(405).end();
  if(!process.env.STRIPE_WEBHOOK_SECRET) return res.status(503).json({error:'Webhook not configured'});
  const chunks=[]; for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk));
  const raw=Buffer.concat(chunks).toString('utf8');
  if(!verify(raw,req.headers['stripe-signature'],process.env.STRIPE_WEBHOOK_SECRET)) return res.status(400).json({error:'Invalid signature'});
  let event; try {event=JSON.parse(raw)} catch {return res.status(400).json({error:'Invalid payload'})}
  // Stripe retries 5xx. Do not signal success until event is committed idempotently.
  if(event.type==='checkout.session.completed' || event.type==='checkout.session.async_payment_succeeded')
    return res.status(503).json({error:'Fulfillment store not configured'});
  return res.status(200).json({received:true});
};
