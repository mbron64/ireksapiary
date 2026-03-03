import React from 'react';
import LegalPage from './LegalPage';

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy">
      <h2>What We Collect</h2>
      <p>
        When you place an order or sign up for updates, we collect your name, email address,
        shipping address, and payment information. Payment details are processed securely by
        Stripe and are never stored on our servers.
      </p>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To process and fulfill your orders</li>
        <li>To send order confirmations and shipping updates</li>
        <li>To send product updates if you've opted in (you can unsubscribe anytime)</li>
        <li>To respond to your questions via our contact form</li>
      </ul>

      <h2>Third Parties</h2>
      <p>
        We share your information only with services necessary to run our business:
        Stripe for payment processing, Firebase for hosting, and EmailJS for email notifications.
        We do not sell or rent your personal information.
      </p>

      <h2>Cookies</h2>
      <p>
        We use minimal cookies for essential site functionality (e.g., your shopping cart).
        We do not use tracking cookies or third-party advertising cookies.
      </p>

      <h2>Your Rights</h2>
      <p>
        You can request access to, correction of, or deletion of your personal data at any time
        by emailing us at <a href="mailto:admin@ireksapiary.com">admin@ireksapiary.com</a>.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email us at{' '}
        <a href="mailto:admin@ireksapiary.com">admin@ireksapiary.com</a>.
      </p>
    </LegalPage>
  );
}
