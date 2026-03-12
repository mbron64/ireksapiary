import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../../../config/email';

if (EMAIL_CONFIG.publicKey) {
  emailjs.init(EMAIL_CONFIG.publicKey);
}

const SUBSCRIBE_URL = '/api/subscribe';

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
    if (!EMAIL_CONFIG.serviceId || !EMAIL_CONFIG.publicKey) {
      throw new Error('Email service not configured.');
    }

    await saveToList(email, source);

    await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      {
        to_name: email.split('@')[0],
        visitor_email: email,
        from_name: 'irek\'s apiary',
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