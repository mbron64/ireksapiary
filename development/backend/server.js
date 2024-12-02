const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const SHOPIFY_STORE = process.env.SHOPIFY_STORE_DOMAIN;
const ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

app.post('/create-checkout', async (req, res) => {
    const { line_items } = req.body;

    try {
        const response = await axios.post(
            `https://${SHOPIFY_STORE}/admin/api/2023-10/checkouts.json`,
            {
                checkout: { line_items },
            },
            {
                headers: {
                    'X-Shopify-Access-Token': ACCESS_TOKEN,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.json({ checkoutUrl: response.data.checkout.web_url });
    } catch (error) {
        console.error('Shopify Checkout API Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to create checkout' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
