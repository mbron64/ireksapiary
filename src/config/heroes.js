import { PRODUCTS } from './products';

export const HEROES = {
  honey: {
    tagline: 'Raw & Unfiltered · Vestal, NY · Est. 2012',
    headline: "Don't Just Smell\nthe Flowers,\n*Taste Them*",
    cta: { label: 'Shop Honey', to: '/shop' },
    image: {
      type: 'carousel',
      images: PRODUCTS.spring.images,
      alt: "Irek's Raw Honey",
    },
  },

  nucs: {
    tagline: 'Spring 2026 · Limited Availability',
    headline: 'Start Your\nOwn Hive',
    cta: { label: 'Reserve a Nuc', to: '/nucs' },
    image: {
      type: 'static',
      src: '/assets/nucs/nucsFrame.jpg',
      alt: 'Honeybee Nuc Frame',
    },
  },
};

// Change this one line to swap the homepage hero
export const ACTIVE_HERO = HEROES.nucs;
