import React from 'react';
import LegalPage from './LegalPage';

export default function Terms() {
  return (
    <LegalPage title="Terms of Service" path="/terms">
      <h2>Overview</h2>
      <p>
        By using ireksapiary.com and placing orders through our site, you agree to these terms.
        Please read them carefully.
      </p>

      <h2>Products</h2>
      <p>
        All honey is raw, unfiltered, and sold as-is. Natural crystallization is normal and does
        not indicate spoilage. Product images are representative; natural variation in color and
        flavor is expected between batches.
      </p>
      <p>
        Honeybee nucs are live animals. By purchasing a nuc, you acknowledge that you have the
        knowledge, equipment, and local permits (if applicable) to care for honeybees.
      </p>

      <h2>Pricing and Payment</h2>
      <p>
        All prices are listed in US dollars. Payment is processed securely through Stripe.
        We reserve the right to update prices at any time, but changes will not affect
        orders already placed.
      </p>

      <h2>Nuc Reservations</h2>
      <p>
        Nuc orders are reservations for pickup in Vestal, NY. Nucs are not shipped. Availability
        is limited and seasonal. We will contact you to coordinate a pickup time at dawn or dusk.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        Irek's Apiary is a small family operation. Our liability is limited to the purchase price
        of your order. We are not liable for allergic reactions, bee stings, hive losses, or any
        indirect damages.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms occasionally. Continued use of the site constitutes acceptance
        of any changes.
      </p>
    </LegalPage>
  );
}
