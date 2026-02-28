# 🍯 Irek's Apiary - E-Commerce Website

A beautiful, modern e-commerce platform for selling artisanal honey products. Built with React, integrated with Shopify for checkout, and designed with a focus on user experience.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![React](https://img.shields.io/badge/React-18.3.1-61dafb)
![License](https://img.shields.io/badge/license-Private-red)

---

## ✨ Features

### 🎨 **Beautiful Design**
- Minimalist, honey-themed aesthetic
- Smooth animations and transitions
- Fully responsive design
- Custom styled components

### 🛒 **E-Commerce Functionality**
- Shopping cart with persistent storage
- Multiple product variants (8oz, 16oz, 32oz)
- Quantity-based discounts
- Subscription options with additional savings
- Seamless Shopify checkout integration

### 📧 **Email Integration**
- Coming soon page with email signup
- Automated admin notifications
- Thank you emails for new signups
- EmailJS integration

### 🎯 **Product Features**
- Interactive product pages
- Scroll-activated animations
- Product comparison sections
- Detailed flavor profiles
- Usage illustrations

### 🛡️ **Production Ready**
- Error boundaries for graceful error handling
- Environment-based logging
- Proper error messages for users
- Input validation
- Security best practices

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Shopify store with Storefront API access
- EmailJS account

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Configure your .env file with actual credentials
# See SETUP.md for detailed instructions

# Start development server
npm start
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Complete setup and configuration guide
- **[.env.example](./.env.example)** - Environment variables template

---

## 🏗️ Project Structure

```
ireksapiary/
├── public/              # Static assets
│   ├── index.html
│   └── assets/         # Product images
├── src/
│   ├── components/
│   │   ├── Cart/       # Shopping cart components
│   │   ├── ComingSoon/ # Landing page
│   │   ├── Home/       # Homepage
│   │   ├── Products/   # Product pages
│   │   └── ErrorBoundary.js
│   ├── context/
│   │   └── CartContext.js  # Global cart state
│   ├── utils/
│   │   ├── shopify.js      # Shopify API integration
│   │   └── validation.js   # Form validation
│   ├── config/
│   │   ├── email.js        # Email configuration
│   │   └── products.js     # Product definitions
│   ├── App.js
│   └── index.js
├── .env.example        # Environment template
├── .gitignore
├── package.json
├── README.md           # This file
└── SETUP.md           # Setup guide
```

---

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - UI framework
- **React Router 7.3.0** - Routing
- **Styled Components 6.1.13** - Styling
- **Apollo Client 3.13.4** - GraphQL client

### Backend Integration
- **Shopify Storefront API** - E-commerce backend
- **EmailJS** - Email service
- **Stripe** - Payment processing (optional)

### Development
- **Create React App** - Build tooling
- **ESLint** - Code linting
- **Jest** - Testing framework

---

## 📦 Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (one-way operation)
npm run eject
```

---

## 🎨 Key Components

### Coming Soon Page
Landing page with email signup form and animated marquee.

**Route:** `/`  
**Component:** `src/components/ComingSoon/ComingSoon.js`

### Home Page
Main website homepage with product showcase.

**Route:** `/home`  
**Component:** `src/components/Home/Home.js`

### Product Page
Detailed product page with interactive features.

**Route:** `/products/wildflower`  
**Component:** `src/components/Products/WildflowerProduct.js`

### Shopping Cart
Slide-out cart drawer with full cart management.

**Component:** `src/components/Cart/CartDrawer.js`

---

## 🔒 Environment Variables

All sensitive configuration is stored in `.env`:

```env
# Shopify
REACT_APP_SHOPIFY_API_URL=
REACT_APP_SHOPIFY_STOREFRONT_TOKEN=

# EmailJS
REACT_APP_EMAILJS_SERVICE_ID=
REACT_APP_EMAILJS_TEMPLATE_ID=
REACT_APP_EMAILJS_THANKYOU_TEMPLATE_ID=
REACT_APP_EMAILJS_PUBLIC_KEY=
REACT_APP_TO_EMAIL=

# Optional
REACT_APP_STRIPE_PUBLISHABLE_KEY=
```

**⚠️ Never commit `.env` to version control!**

---

## 🚢 Deployment

### Firebase Hosting

```bash
npm run build
firebase deploy
```

### Vercel

```bash
vercel
```

### Netlify

```bash
netlify deploy --prod
```

See [SETUP.md](./SETUP.md) for detailed deployment instructions.

---

## 🧪 Testing

Currently includes:
- Unit tests for validation functions
- Component rendering tests
- Cart functionality tests (to be expanded)

Run tests:
```bash
npm test
```

---

## 🐛 Known Issues & Limitations

- Mobile hamburger menu not yet implemented
- Product images are placeholders (need professional photos)
- Only Wildflower product fully implemented
- Subscription management needs Shopify app integration
- No admin dashboard for managing products

---

## 🔜 Roadmap

### Phase 1 - MVP (Current)
- [x] Coming soon page
- [x] Email signup
- [x] Product page (Wildflower)
- [x] Shopping cart
- [x] Shopify checkout integration
- [x] Error handling

### Phase 2 - Enhancement
- [ ] Add Clover and Forest honey products
- [ ] Mobile navigation menu
- [ ] Product image gallery
- [ ] Customer reviews
- [ ] Blog section
- [ ] About page

### Phase 3 - Advanced
- [ ] Customer accounts
- [ ] Order history
- [ ] Subscription management dashboard
- [ ] Gift card system
- [ ] Loyalty program
- [ ] Analytics dashboard

---

## 🤝 Contributing

This is a private project. For bugs or feature requests, please contact the development team.

---

## 📄 License

Private - All Rights Reserved

---

## 🙏 Acknowledgments

- Design inspired by modern e-commerce best practices
- Icons from React Icons
- Fonts from Google Fonts (EB Garamond, Crimson Text)

---

## 📞 Support

For setup help or questions:
1. Review [SETUP.md](./SETUP.md)
2. Check browser console for errors
3. Verify `.env` configuration
4. Check Shopify admin for API logs

---

**Built with 🐝 and ❤️ for honey lovers everywhere**