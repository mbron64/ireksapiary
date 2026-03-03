import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../../../config/email';

if (EMAIL_CONFIG.publicKey) {
  emailjs.init(EMAIL_CONFIG.publicKey);
}

const SUBSCRIBE_URL = process.env.REACT_APP_CHECKOUT_URL
  ? process.env.REACT_APP_CHECKOUT_URL.replace('createCheckoutSession', 'subscribeEmail')
  : '/api/subscribe';

async function saveToList(email, source) {
  try {
    await fetch(SUBSCRIBE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source }),
    });
  } catch {
    // List save is best-effort; don't block the signup flow
  }
}

export const submitEmail = async (email, source = 'website') => {
  try {
    if (!EMAIL_CONFIG.serviceId || !EMAIL_CONFIG.templateId || !EMAIL_CONFIG.publicKey) {
      throw new Error('Email service not configured.');
    }

    // Save to Firestore list
    await saveToList(email, source);

    // Send admin notification
    await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      {
        from_name: 'Website Visitor',
        to_name: 'Irek\'s Apiary',
        visitor_email: email,
        message: `New signup from: ${email} (${source})`,
        reply_to: email,
        to_email: EMAIL_CONFIG.toEmail
      }
    );

    // Send thank you email
    await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.thankYouTemplateId,
      {
        to_name: email.split('@')[0],
        visitor_email: email,
        from_name: 'irek\'s apiary',
        message: 'thanks for signing up. we\'ll let you know when new honey drops or nucs are available.',
        reply_to: EMAIL_CONFIG.toEmail,
        to_email: email
      }
    );

    return { success: true };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Email submission failed:', error);
    }
    return {
      success: false,
      error: error.text || error.message || 'Failed to send email. Please try again.'
    };
  }
}; 