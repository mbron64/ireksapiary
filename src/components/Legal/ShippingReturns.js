import React from 'react';
import LegalPage from './LegalPage';

export default function ShippingReturns() {
  return (
    <LegalPage title="Shipping & Returns" path="/shipping">
      <h2>Honey Shipping</h2>
      <p>
        We ship honey orders within the contiguous United States. Orders over $50 qualify
        for free shipping. Orders under $50 are charged a flat-rate shipping fee at checkout.
      </p>
      <p>
        Orders are typically shipped within 3 to 5 business days. You'll receive a confirmation
        email with tracking information once your order ships.
      </p>

      <h2>Honeybee Nucs</h2>
      <p>
        Nucs are pickup only in Vestal, NY. They are not shipped. We will coordinate a pickup
        time with you after your order is placed. Pickups happen at dawn or dusk when the
        bees are calmest.
      </p>

      <h2>Returns and Refunds</h2>
      <p>
        Due to the perishable and natural nature of our products, we generally do not accept
        returns. However, if your order arrives damaged or incorrect, please contact us within
        48 hours at <a href="mailto:admin@ireksapiary.com">admin@ireksapiary.com</a> with
        photos and we'll make it right.
      </p>

      <h2>Nuc Refunds</h2>
      <p>
        Nuc reservations may be cancelled for a full refund up to 14 days before your
        scheduled pickup. After that, refunds are at our discretion. Once a nuc has been
        picked up, all sales are final.
      </p>

      <h2>Questions?</h2>
      <p>
        Reach out at <a href="mailto:admin@ireksapiary.com">admin@ireksapiary.com</a> and
        we'll be happy to help.
      </p>
    </LegalPage>
  );
}
