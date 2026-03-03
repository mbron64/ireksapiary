const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe');
const cors = require('cors')({ origin: true });

admin.initializeApp();

exports.createCheckoutSession = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
      const { items, successUrl, cancelUrl } = req.body;

      if (!items || !items.length) {
        return res.status(400).json({ error: 'No items provided' });
      }

      const lineItems = items.map(item => ({
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(item.price * 100),
          product_data: {
            name: item.name,
            ...(item.size && { description: item.size }),
            ...(item.image && {
              images: [`https://ireksapiary.com${item.image}`],
            }),
          },
        },
        quantity: item.quantity,
      }));

      const sessionParams = {
        line_items: lineItems,
        mode: 'payment',
        success_url: successUrl || 'https://ireksapiary.com?success=true',
        cancel_url: cancelUrl || 'https://ireksapiary.com?canceled=true',
        customer_creation: 'always',
        phone_number_collection: { enabled: true },
      };

      const hasPickupItems = items.some(item => item.pickup);
      if (!hasPickupItems) {
        sessionParams.shipping_address_collection = {
          allowed_countries: ['US'],
        };
      }

      if (hasPickupItems) {
        sessionParams.custom_fields = [
          {
            key: 'pickup_preference',
            label: { type: 'custom', custom: 'Preferred pickup time (dawn or dusk)' },
            type: 'text',
          },
        ];
      }

      const session = await stripeInstance.checkout.sessions.create(sessionParams);
      res.status(200).json({ url: session.url });
    } catch (err) {
      console.error('Checkout session error:', err);
      res.status(500).json({ error: err.message });
    }
  });
});
