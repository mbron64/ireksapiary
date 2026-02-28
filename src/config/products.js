/**
 * Product Configuration
 * 
 * This file contains all product information including Shopify variant IDs.
 * Update these with your actual Shopify product and variant IDs from your Shopify admin.
 * 
 * To find your Shopify IDs:
 * 1. Go to Shopify Admin > Products
 * 2. Click on a product
 * 3. The product ID is in the URL: /admin/products/{PRODUCT_ID}
 * 4. Click on a variant to see variant ID
 * 
 * Note: Shopify Storefront API uses base64 encoded GIDs
 * Format: gid://shopify/Product/{ID} or gid://shopify/ProductVariant/{ID}
 */

export const PRODUCTS = {
  wildflower: {
    id: 'wildflower-honey',
    name: '"Wildflower" Premium Honey',
    type: 'Raw & Unfiltered Honey',
    description: 'A naturally sourced, floral-flavored honey made from 100% wildflowers. Perfect for drizzling, baking, and sweetening your favorite foods.',
    basePrice: 18,
    shopifyProductId: process.env.REACT_APP_SHOPIFY_WILDFLOWER_PRODUCT_ID || 'gid://shopify/Product/YOUR_PRODUCT_ID',
    variants: {
      jar: {
        id: 'jar',
        name: 'Jar',
        size: '8oz',
        shopifyVariantId: process.env.REACT_APP_SHOPIFY_WILDFLOWER_JAR_ID || 'gid://shopify/ProductVariant/YOUR_JAR_VARIANT_ID'
      },
      bottle: {
        id: 'bottle',
        name: 'Bottle',
        size: '16oz',
        shopifyVariantId: process.env.REACT_APP_SHOPIFY_WILDFLOWER_BOTTLE_ID || 'gid://shopify/ProductVariant/YOUR_BOTTLE_VARIANT_ID'
      },
      jug: {
        id: 'jug',
        name: 'Jug',
        size: '32oz',
        shopifyVariantId: process.env.REACT_APP_SHOPIFY_WILDFLOWER_JUG_ID || 'gid://shopify/ProductVariant/YOUR_JUG_VARIANT_ID'
      }
    },
    quantities: [
      { id: 1, label: 'Jar', discount: 0.05, freeShipping: false },
      { id: 2, label: 'Jars', discount: 0.10, freeShipping: false },
      { id: 6, label: 'Jars', discount: 0.15, freeShipping: true },
      { id: 12, label: 'Jars', discount: 0.17, freeShipping: true }
    ]
  },
  
  // Add more products here as you create them
  clover: {
    id: 'clover-honey',
    name: '"Clover" Everyday Honey',
    type: 'Mild & Sweet',
    description: 'Light and versatile, perfect for cooking and baking.',
    basePrice: 14,
    shopifyProductId: process.env.REACT_APP_SHOPIFY_CLOVER_PRODUCT_ID || 'gid://shopify/Product/YOUR_CLOVER_PRODUCT_ID',
    variants: {
      jar: {
        id: 'jar',
        name: 'Jar',
        size: '8oz',
        shopifyVariantId: process.env.REACT_APP_SHOPIFY_CLOVER_JAR_ID || 'gid://shopify/ProductVariant/YOUR_CLOVER_JAR_VARIANT_ID'
      }
    }
  }
};

// Subscription discount rate (additional discount for subscriptions)
export const SUBSCRIPTION_DISCOUNT = 0.05;

// Helper function to get product by ID
export const getProduct = (productId) => {
  return PRODUCTS[productId];
};

// Helper function to get variant by product and variant ID
export const getVariant = (productId, variantId) => {
  const product = PRODUCTS[productId];
  return product?.variants[variantId];
};

// Helper function to calculate price with discounts
export const calculatePrice = (basePrice, quantity, isSubscription = false) => {
  const product = PRODUCTS.wildflower; // You can make this dynamic
  const quantityConfig = product.quantities.find(q => q.id === quantity);
  const discountRate = quantityConfig?.discount || 0;
  
  const subtotal = basePrice * quantity;
  const quantityDiscount = subtotal * discountRate;
  const subscriptionDiscount = isSubscription ? subtotal * SUBSCRIPTION_DISCOUNT : 0;
  
  return {
    subtotal,
    quantityDiscount,
    subscriptionDiscount,
    total: subtotal - quantityDiscount - subscriptionDiscount,
    freeShipping: quantityConfig?.freeShipping || false
  };
};

