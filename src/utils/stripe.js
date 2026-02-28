const CHECKOUT_URL = process.env.REACT_APP_STRIPE_CHECKOUT_URL || '/api/create-checkout-session';

export async function createCheckoutSession(cartItems) {
  const lineItems = cartItems.map(item => ({
    price: item.stripePriceId,
    quantity: item.quantity,
  }));

  const response = await fetch(CHECKOUT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      lineItems,
      successUrl: `${window.location.origin}/shop?checkout=success`,
      cancelUrl: `${window.location.origin}/shop?checkout=cancelled`,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Unable to create checkout session');
  }

  const { url } = await response.json();
  return url;
}

export function redirectToCheckout(url) {
  window.location.href = url;
}

export function isStripeConfigured() {
  return Boolean(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
}
