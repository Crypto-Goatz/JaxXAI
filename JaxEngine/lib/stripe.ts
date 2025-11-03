import Stripe from 'stripe';

/**
 * Lazily instantiate the Stripe client so we can surface a helpful error message
 * whenever the secret key has not been provided. Serverless functions call this helper
 * right before invoking the Stripe API.
 */
export function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      'STRIPE_SECRET_KEY is not set. Add your Stripe secret key to the environment (e.g. .env.local or Vercel env vars).'
    );
  }

  return new Stripe(secretKey, {
    apiVersion: '2025-10-29.clover',
  });
}

/**
 * Convenience helper for pulling a publishable key that routes UI logic to a
 * descriptive error if the key has not been configured yet.
 */
export function getStripePublishableKey() {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error(
      'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set. Provide your Stripe publishable key so the client can call Stripe.js.'
    );
  }

  return publishableKey;
}

