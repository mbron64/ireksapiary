const HONEY_IMAGES = [
  '/assets/products/honey1.png',
  '/assets/products/honey2.png',
  '/assets/products/honey3.png',
  '/assets/products/honey4.png',
  '/assets/products/honey5.png',
  '/assets/products/honey6.png',
  '/assets/products/honey7.png',
  '/assets/products/honey8.png',
  '/assets/products/honey9.png',
  '/assets/products/honey10.png',
  '/assets/products/honey11.png',
  '/assets/products/honey12.png',
];

export const PRODUCTS = {
  spring: {
    id: 'spring-honey',
    slug: 'spring',
    name: 'Spring Honey',
    tagline: 'Light & Floral',
    description: 'Harvested from early blossoms: apple, cherry, and wildflower. A bright, delicate honey with a clean finish. The lightest of our three harvests.',
    basePrice: 18,
    images: HONEY_IMAGES,
    heroImage: '/assets/products/special-reserve.jpg',
    variants: {
      '8oz': {
        id: '8oz',
        size: '8oz',
        price: 18,
        stripePriceId: process.env.REACT_APP_STRIPE_SPRING_8OZ_PRICE_ID || '',
      },
      '16oz': {
        id: '16oz',
        size: '16oz',
        price: 32,
        stripePriceId: process.env.REACT_APP_STRIPE_SPRING_16OZ_PRICE_ID || '',
      },
      '32oz': {
        id: '32oz',
        size: '32oz',
        price: 56,
        stripePriceId: process.env.REACT_APP_STRIPE_SPRING_32OZ_PRICE_ID || '',
      },
    },
    quantities: [
      { qty: 1,  label: '1 Jar',   discount: 0 },
      { qty: 2,  label: '2 Jars',  discount: 0.05 },
      { qty: 6,  label: '6 Jars',  discount: 0.15, freeShipping: true },
      { qty: 12, label: '12 Jars', discount: 0.17, freeShipping: true },
    ],
    flavor: {
      sweetness: 5,
      floral: 5,
      earthy: 1,
      bold: 2,
    },
    origin: 'Vestal, NY',
    harvest: 'Spring 2025',
  },

  summer: {
    id: 'summer-honey',
    slug: 'summer',
    name: 'Summer Honey',
    tagline: 'Rich & Complex',
    description: 'Peak-season honey from goldenrod, clover, and black-eyed Susans. Fuller body, deeper color, and a warm floral complexity that develops as the hive works through the longest days.',
    basePrice: 18,
    images: HONEY_IMAGES,
    heroImage: '/assets/products/special-reserve.jpg',
    variants: {
      '8oz': {
        id: '8oz',
        size: '8oz',
        price: 18,
        stripePriceId: process.env.REACT_APP_STRIPE_SUMMER_8OZ_PRICE_ID || '',
      },
      '16oz': {
        id: '16oz',
        size: '16oz',
        price: 32,
        stripePriceId: process.env.REACT_APP_STRIPE_SUMMER_16OZ_PRICE_ID || '',
      },
      '32oz': {
        id: '32oz',
        size: '32oz',
        price: 56,
        stripePriceId: process.env.REACT_APP_STRIPE_SUMMER_32OZ_PRICE_ID || '',
      },
    },
    quantities: [
      { qty: 1,  label: '1 Jar',   discount: 0 },
      { qty: 2,  label: '2 Jars',  discount: 0.05 },
      { qty: 6,  label: '6 Jars',  discount: 0.15, freeShipping: true },
      { qty: 12, label: '12 Jars', discount: 0.17, freeShipping: true },
    ],
    flavor: {
      sweetness: 4,
      floral: 4,
      earthy: 3,
      bold: 3,
    },
    origin: 'Vestal, NY',
    harvest: 'Summer 2025',
  },

  fall: {
    id: 'fall-honey',
    slug: 'fall',
    name: 'Fall Honey',
    tagline: 'Dark & Bold',
    description: 'The last harvest of the year. Dark amber with notes of molasses and dried fruit. Our boldest, most sought-after honey. Limited quantities each season.',
    basePrice: 18,
    images: HONEY_IMAGES,
    heroImage: '/assets/products/special-reserve.jpg',
    variants: {
      '8oz': {
        id: '8oz',
        size: '8oz',
        price: 18,
        stripePriceId: process.env.REACT_APP_STRIPE_FALL_8OZ_PRICE_ID || '',
      },
      '16oz': {
        id: '16oz',
        size: '16oz',
        price: 32,
        stripePriceId: process.env.REACT_APP_STRIPE_FALL_16OZ_PRICE_ID || '',
      },
      '32oz': {
        id: '32oz',
        size: '32oz',
        price: 56,
        stripePriceId: process.env.REACT_APP_STRIPE_FALL_32OZ_PRICE_ID || '',
      },
    },
    quantities: [
      { qty: 1,  label: '1 Jar',   discount: 0 },
      { qty: 2,  label: '2 Jars',  discount: 0.05 },
      { qty: 6,  label: '6 Jars',  discount: 0.15, freeShipping: true },
      { qty: 12, label: '12 Jars', discount: 0.17, freeShipping: true },
    ],
    flavor: {
      sweetness: 3,
      floral: 2,
      earthy: 5,
      bold: 5,
    },
    origin: 'Vestal, NY',
    harvest: 'Fall 2024',
  },
};

export const SUBSCRIPTION_DISCOUNT = 0.05;
export const FREE_SHIPPING_THRESHOLD = 50;

export const BUNDLE = {
  id: 'honey-trio',
  name: 'The Honey Trio',
  description: 'One jar of each: Spring, Summer, and Fall. The complete Irek\'s Apiary experience, from first blossom to last harvest.',
  products: ['spring', 'summer', 'fall'],
  discount: 0.15,
  get price() {
    const fullPrice = this.products.reduce(
      (sum, key) => sum + PRODUCTS[key].basePrice, 0
    );
    return +(fullPrice * (1 - this.discount)).toFixed(2);
  },
  get fullPrice() {
    return this.products.reduce((sum, key) => sum + PRODUCTS[key].basePrice, 0);
  },
  stripePriceId: process.env.REACT_APP_STRIPE_TRIO_PRICE_ID || '',
};

export function getProduct(slug) {
  return PRODUCTS[slug];
}

export function getVariant(slug, variantId) {
  return PRODUCTS[slug]?.variants[variantId];
}

export function calculatePrice(product, variantId, quantity, isSubscription = false) {
  const variant = product.variants[variantId];
  if (!variant) return null;

  const qtyConfig = product.quantities?.find(q => q.qty === quantity);
  const discountRate = qtyConfig?.discount || 0;

  const subtotal = variant.price * quantity;
  const quantityDiscount = subtotal * discountRate;
  const subscriptionDiscount = isSubscription ? subtotal * SUBSCRIPTION_DISCOUNT : 0;

  return {
    unitPrice: variant.price,
    subtotal,
    quantityDiscount,
    subscriptionDiscount,
    total: +(subtotal - quantityDiscount - subscriptionDiscount).toFixed(2),
    freeShipping: qtyConfig?.freeShipping || subtotal >= FREE_SHIPPING_THRESHOLD,
    savings: +(quantityDiscount + subscriptionDiscount).toFixed(2),
  };
}

export function getAllProducts() {
  return Object.values(PRODUCTS);
}
