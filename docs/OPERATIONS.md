# Bring Me Back — launch operations

## Dedicated email
Recommended address: **hello@bringmeback.org** (proposal only; domain ownership and mailbox are NOT verified).
Use a dedicated mailbox with SPF, DKIM and DMARC. Never use an unverified sender address. Stripe receipts can initially use the account's verified sender. Configure support, privacy, and abuse routing before go-live.

## Product differentiation
- Free: portable JSON/text declaration; user owns the copy.
- Forever ($9 proposed): verifiable opt-in declaration, downloadable certificate, revision and revocation.
- Legacy ($29 proposed): encrypted personal archive, clear retention and recovery policies.
- Publish open versioned schema and independently verifiable document hashes.
- Explicitly distinguish intent to be restored from identity, subjective continuity and actual restoration.
- Avoid promises of perpetual storage or resurrection.

## Required before launch
- Implement authenticated registration and verified emails.
- Complete secure declaration storage, consent revocation and account deletion.
- Wire Stripe Checkout and idempotent webhook reconciliation to orders.
- Add privacy policy, GDPR rights handling, terms and retention schedule.
- Verify Vercel database credentials, Stripe test credentials and webhook secret.
- Run automated end-to-end tests; keep paid plans unavailable until passing.
