# 🚀 Quick Start Guide - Next Steps

Your codebase has been fixed and is ready for production setup! Follow these steps to get your site live.

---

## ⚡ 5-Minute Setup

### Step 1: Create Environment File

```bash
cd "/Users/mbron/Documents/untitled folder/ireksapiary"
cp .env.example .env
```

### Step 2: Get Shopify Credentials

1. **Go to Shopify Admin:**
   - Login to your Shopify store
   - Go to **Settings** > **Apps and sales channels**

2. **Create Custom App:**
   - Click **"Develop apps"**
   - Click **"Allow custom app development"** (if needed)
   - Click **"Create an app"**
   - Name it: "Custom Storefront"

3. **Configure API Access:**
   - Click **"Configuration"** tab
   - Under **Storefront API**, click **"Configure"**
   - Select these permissions:
     - ✅ `unauthenticated_read_product_listings`
     - ✅ `unauthenticated_write_checkouts`
     - ✅ `unauthenticated_read_checkouts`
   - Save

4. **Install App:**
   - Click **"Install app"**
   - Confirm installation

5. **Get API Credentials:**
   - Go to **"API credentials"** tab
   - Copy **Storefront API access token**
   - Your store URL is: `your-store-name.myshopify.com`

6. **Update .env:**
   ```env
   REACT_APP_SHOPIFY_API_URL=https://your-store-name.myshopify.com/api/2024-01/graphql.json
   REACT_APP_SHOPIFY_STOREFRONT_TOKEN=paste-your-token-here
   ```

### Step 3: Get EmailJS Credentials

1. **Sign up at EmailJS:**
   - Go to [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
   - Create account and verify email

2. **Add Email Service:**
   - Click **"Add New Service"**
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow connection steps
   - Copy **Service ID**

3. **Create Admin Template:**
   - Go to **"Email Templates"**
   - Click **"Create New Template"**
   - Subject: `New Signup: {{visitor_email}}`
   - Content:
     ```
     New signup from: {{visitor_email}}
     Time: {{timestamp}}
     ```
   - Copy **Template ID**

4. **Create Thank You Template:**
   - Create another template
   - Subject: `Welcome to irek's apiary!`
   - Content:
     ```
     Hi {{to_name}},
     
     {{message}}
     
     Best,
     irek's apiary
     ```
   - Copy **Template ID**

5. **Get Public Key:**
   - Go to **"Account"** > **"General"**
   - Copy **Public Key**

6. **Update .env:**
   ```env
   REACT_APP_EMAILJS_SERVICE_ID=your-service-id
   REACT_APP_EMAILJS_TEMPLATE_ID=admin-template-id
   REACT_APP_EMAILJS_THANKYOU_TEMPLATE_ID=thankyou-template-id
   REACT_APP_EMAILJS_PUBLIC_KEY=your-public-key
   REACT_APP_TO_EMAIL=your-email@example.com
   ```

### Step 4: Create Products in Shopify

1. **Add "Wildflower" Product:**
   - Shopify Admin > **Products** > **Add product**
   - Title: `Wildflower Premium Honey`
   - Description: Add product description
   - Price: `$18.00`

2. **Add Variants:**
   - Click **"Add variant"** three times
   - Variant 1: **Jar - 8oz** - $18.00
   - Variant 2: **Bottle - 16oz** - $32.00  
   - Variant 3: **Jug - 32oz** - $58.00
   - Save product

3. **Get Product IDs:**
   - Click on the product
   - URL shows: `/admin/products/{PRODUCT_ID}`
   - Click each variant to get variant IDs
   - Format as: `gid://shopify/ProductVariant/{ID}`

4. **Update .env:**
   ```env
   REACT_APP_SHOPIFY_WILDFLOWER_PRODUCT_ID=gid://shopify/Product/YOUR_ID
   REACT_APP_SHOPIFY_WILDFLOWER_JAR_ID=gid://shopify/ProductVariant/JAR_ID
   REACT_APP_SHOPIFY_WILDFLOWER_BOTTLE_ID=gid://shopify/ProductVariant/BOTTLE_ID
   REACT_APP_SHOPIFY_WILDFLOWER_JUG_ID=gid://shopify/ProductVariant/JUG_ID
   ```

### Step 5: Test Locally

```bash
npm install
npm start
```

Visit: [http://localhost:3000](http://localhost:3000)

**Test These:**
- ✅ Email signup works
- ✅ Cart adds items
- ✅ Checkout redirects to Shopify
- ✅ No console errors

### Step 6: Deploy

**Option A: Firebase**
```bash
npm run build
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

**Option B: Vercel**
```bash
npm install -g vercel
vercel
```

**Option C: Netlify**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

---

## 🎯 What Was Fixed

✅ **React Best Practices**
   - Immutable state updates
   - Error boundaries
   - Proper hooks usage

✅ **Production Ready**
   - Environment variables
   - No debug logs in production
   - Error handling

✅ **Shopify Integration**
   - Configuration validation
   - Better error messages
   - Proper checkout flow

✅ **Code Quality**
   - Clean console output
   - User-friendly errors
   - Security improvements

---

## 📋 Pre-Launch Checklist

Before going live:

- [ ] `.env` file configured with real credentials
- [ ] Shopify products created with correct IDs
- [ ] EmailJS templates created and tested
- [ ] Email signup tested successfully
- [ ] Shopping cart tested thoroughly
- [ ] Checkout flow tested end-to-end
- [ ] All product images uploaded (replace placeholders)
- [ ] Mobile navigation working
- [ ] All links working
- [ ] Contact information updated
- [ ] Legal pages added (Privacy, Terms, etc.)
- [ ] Analytics installed (Google Analytics)
- [ ] Domain name configured
- [ ] SSL certificate active
- [ ] Final testing on production URL

---

## 🆘 Common Issues

### "Shopify configuration missing"
→ Check `.env` file has `REACT_APP_SHOPIFY_API_URL` and `REACT_APP_SHOPIFY_STOREFRONT_TOKEN`

### "Email service not configured"
→ Check `.env` file has all EmailJS variables

### Cart checkout fails
→ Verify Shopify product/variant IDs in `.env` match your Shopify products

### Changes to .env not working
→ Stop the dev server (Ctrl+C) and run `npm start` again

---

## 📚 Documentation

- **SETUP.md** - Detailed setup instructions
- **README.md** - Project overview
- **FIXES_SUMMARY.md** - What was fixed
- **.env.example** - Environment variables template

---

## 💡 Tips

1. **Use Test Mode First**
   - Set up Shopify in test mode
   - Use EmailJS free tier initially
   - Test thoroughly before going live

2. **Add Real Images**
   - Replace honey jar icons with real photos
   - Optimize images for web (use tools like TinyPNG)
   - Use consistent image sizes

3. **Monitor After Launch**
   - Check EmailJS dashboard for email delivery
   - Monitor Shopify for orders
   - Check browser console for errors

4. **Incremental Launch**
   - Start with "Coming Soon" page only
   - Collect emails
   - Launch full shop when ready

---

## 🎉 You're Ready!

All the hard technical work is done. Now you just need to:
1. Get your API credentials (15 minutes)
2. Test everything works (10 minutes)
3. Deploy (5 minutes)

**Total time to launch: ~30 minutes** ⏱️

---

**Need help? Check SETUP.md for detailed instructions!**

