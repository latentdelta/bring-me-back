module.exports = (_req,res) => {
  res.setHeader('Cache-Control','no-store');
  res.status(200).json({checkout_enabled:false,registration_enabled:false,reason:'Persistent registration and payment reconciliation are pending'});
};
