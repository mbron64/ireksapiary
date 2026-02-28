# 🍯 Irek's Apiary - Setup Guide

Complete setup instructions for getting the Irek's Apiary e-commerce site up and running.

---

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Shopify Store** with Storefront API access
- **EmailJS Account** (for email functionality)
- **(Optional)** Firebase account for hosting
- **(Optional)** Stripe account for payment processing

---

## 🚀 Quick Start

### 1. Clone and Install

```bash
cd ireksapiary
npm install
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your actual credentials:

```env
# Required: Shopify Configuration
REACT_APP_SHOPIFY_API_URL=https://your-store.myshopify.com/api/2024-01/graphql.json
REACT_APP_SHOPIFY_STOREFRONT_TOKEN=your-actual-storefront-token

# Required: EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=your-service-id
REACT_APP_EMAILJS_TEMPLATE_ID=your-admin-template-id
REACT_APP_EMAILJS_THANKYOU_TEMPLATE_ID=your-thankyou-template-id
REACT_APP_EMAILJS_PUBLIC_KEY=your-public-key
REACT_APP_TO_EMAIL=admin@ireksapiary.com

# Optional: Additional Services
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your-key
REACT_APP_BACKEND_URL=http://localhost:5000
```

### 3. Configure Shopify Products

1. **Create Products in Shopify:**
   - Go to Shopify Admin > Products > Add Product
   - Create "Wildflower Honey" product with 3 variants:
     - Jar (8oz)
     - Bottle (16oz)
     - Jug (32oz)

2. **Get Product/Variant IDs:**
   - Product ID is in the URL when editing: `/admin/products/{PRODUCT_ID}`
   - Click on each variant to get variant IDs
   - Convert to GID format: `gid://shopify/ProductVariant/{VARIANT_ID}`

3. **Update Product Configuration:**
   - Edit `src/config/products.js`
   - Replace placeholder IDs with your actual Shopify IDs
   - OR add them to your `.env` file (recommended for security)

### 4. Set Up EmailJS

1. **Create EmailJS Account:**
   - Go to [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
   - Sign up and verify your email

2. **Create Email Service:**
   - Add your email service (Gmail, Outlook, etc.)
   - Get your Service ID

3. **Create Email Templates:**
   
   **Admin Notification Template:**
   - Template name: "New Signup Notification"
   - Subject: `New Signup: {{visitor_email}}`
   - Body:
     ```
     New signup from: {{visitor_email}}
     Timestamp: {{timestamp}}
     ```

   **Thank You Template:**
   - Template name: "Thank You for Signing Up"
   - Subject: `Welcome to irek's apiary!`
   - Body:
     ```
     Hi {{to_name}},
     
     {{message}}
     
     Best regards,
     irek's apiary
     ```

4. **Get Public Key:**
   - Go to Account > API Keys
   - Copy your Public Key

5. **Update .env with all EmailJS credentials**

### 5. Run Development Server

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

---

## 🔧 Shopify Setup Details

### Creating a Custom App (Storefront API)

1. **Enable Custom App Development:**
   - Shopify Admin > Settings > Apps and sales channels
   - Click "Develop apps"
   - Allow custom app development

2. **Create New App:**
   - Click "Create an app"
   - Name it "Custom Storefront"

3. **Configure API Scopes:**
   - Go to "Configuration" tab
   - Under "Storefront API", select these scopes:
     - `unauthenticated_read_product_listings`
     - `unauthenticated_write_checkouts`
     - `unauthenticated_read_checkouts`

4. **Install App and Get Token:**
   - Install the app to your store
   - Go to "API credentials" tab
   - Copy the "Storefront API access token"

5. **Get Your Store URL:**
   - Format: `https://your-store-name.myshopify.com`

---

## 🧪 Testing the Setup

### Test Email Signup:
1. Go to [http://localhost:3000](http://localhost:3000)
2. Enter an email address
3. Click "Sign Up"
4. Check:
   - You should receive a thank you email
   - Admin email should receive notification

### Test Product Page:
1. Go to [http://localhost:3000/home](http://localhost:3000/home)
2. Click "Enter Website" or navigate to `/products/wildflower`
3. Select product variant and quantity
4. Click "Add to Cart"
5. Verify cart drawer opens with correct items

### Test Checkout (requires valid Shopify setup):
1. Add items to cart
2. Click "Proceed to Checkout"
3. Should redirect to Shopify checkout page

---

## 📦 Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

---

## 🚀 Deployment

### Option 1: Firebase Hosting

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```

3. **Initialize Firebase:**
   ```bash
   firebase init hosting
   ```
   - Choose "Use an existing project" or create new
   - Set public directory to `build`
   - Configure as single-page app: Yes
   - Don't overwrite index.html

4. **Deploy:**
   ```bash
   npm run build
   firebase deploy
   ```

### Option 2: Vercel

```bash
npm install -g vercel
vercel
```

### Option 3: Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

---

## 🐛 Troubleshooting

### "Shopify configuration missing" error:
- Verify `.env` file exists and has correct values
- Restart development server after changing `.env`
- Check that variables start with `REACT_APP_`

### Email not sending:
- Verify EmailJS credentials in `.env`
- Check EmailJS dashboard for email limits
- Ensure templates are published and active

### Cart checkout fails:
- Verify Shopify product/variant IDs are correct
- Check Shopify API scopes are properly configured
- Look at browser console for detailed error messages

### GraphQL errors:
- Verify Shopify Storefront API token is valid
- Check that API version matches (2024-01 or later)
- Ensure products are published to "Online Store" sales channel

---

## 📚 Additional Resources

- [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [React Documentation](https://react.dev/)
- [Create React App Deployment](https://create-react-app.dev/docs/deployment/)

---

## 🔐 Security Notes

- **Never commit `.env` file** to git (already in `.gitignore`)
- Use environment variables for production deployments
- Rotate API keys regularly
- Monitor Shopify API usage to prevent rate limiting

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Review this setup guide
3. Check Shopify admin for API logs
4. Review EmailJS dashboard for email logs

---

## ✅ Setup Checklist

- [ ] Node.js and npm installed
- [ ] Repository cloned and dependencies installed
- [ ] `.env` file created with all required variables
- [ ] Shopify store created with custom app
- [ ] Shopify Storefront API token obtained
- [ ] Products created in Shopify with variants
- [ ] Product IDs configured in `src/config/products.js`
- [ ] EmailJS account created and configured
- [ ] Email templates created in EmailJS
- [ ] Development server runs without errors
- [ ] Email signup tested successfully
- [ ] Cart functionality tested
- [ ] Checkout flow tested (redirects to Shopify)
- [ ] Production build created
- [ ] Site deployed to hosting platform

---

**You're ready to sell honey! 🐝🍯**

