# Payments integration — intentionally disabled

The static MVP creates downloadable declarations only. Paid tiers are **not for sale**.

## Implemented
- Vercel serverless routes under `api/`.
- Stripe webhook signature verification with a five-minute timestamp tolerance.
- Fail-closed checkout endpoint and no-cache status route.
- Webhook refuses successful-payment events (HTTP 503) rather than falsely marking them fulfilled.

## Required before enabling payments
1. Choose and provision a GDPR-aware durable registration database with explicit retention/deletion policy.
2. Implement authenticated registration, email verification, consent history, revocation and export.
3. Create a pending order server-side, with an immutable plan/amount/currency and a registration ID.
4. Create Stripe Checkout Session using a **server-side** secret key; never accept amount from browser.
5. Persist webhook events idempotently by Stripe event ID, verify signatures against raw body, reconcile completed/paid status and deliver entitlements.
6. Test successful payment, duplicate webhook, delayed payment, refunds, cancellations and failed checkout in Stripe test mode.
7. Set `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` and database credentials in Vercel encrypted environment variables, never in Git.
8. Enable only after an end-to-end test and explicit go-live approval.

## Security
The existing Stripe CLI test credentials on the MSI were observed to be expired. Browser login does not renew CLI credentials. Never copy secrets from CLI configuration into source, logs or chat.

The site must not promise permanent preservation, identity verification or resurrection.
