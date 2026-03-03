const CHECKOUT_URL = process.env.REACT_APP_CHECKOUT_URL || '/api/checkout';

export async function createCheckoutSession(cartItems) {
  const items = cartItems.map(item => ({
    name: item.name,
    size: item.size,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
    pickup: item.pickup || false,
  }));

  const response = await fetch(CHECKOUT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items,
      successUrl: `${window.location.origin}?checkout=success`,
      cancelUrl: `${window.location.origin}?checkout=cancelled`,
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
