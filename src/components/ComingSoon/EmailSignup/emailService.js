import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../../../config/email';

// Initialize EmailJS only if publicKey is available
if (EMAIL_CONFIG.publicKey) {
  emailjs.init(EMAIL_CONFIG.publicKey);
} else if (process.env.NODE_ENV === 'development') {
  console.warn('EmailJS public key not configured. Email signup will not work.');
}

export const submitEmail = async (email) => {
  try {
    // Validate email config before attempting to send
    if (!EMAIL_CONFIG.serviceId || !EMAIL_CONFIG.templateId || !EMAIL_CONFIG.publicKey) {
      throw new Error('Email service not configured. Please contact support.');
    }

    // Log only in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Starting email submission...');
    }
    
    // Send admin notification
    await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      {
        from_name: 'Website Visitor',
        to_name: 'Irek\'s Apiary',
        visitor_email: email,
        message: `New signup from: ${email}`,
        reply_to: email,
        to_email: EMAIL_CONFIG.toEmail
      }
    );

    if (process.env.NODE_ENV === 'development') {
      console.log('Admin notification sent successfully');
    }

    // Send thank you email
    await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.thankYouTemplateId,
      {
        to_name: email.split('@')[0],
        visitor_email: email,
        from_name: 'irek\'s apiary',
        message: 'thanks for joining the waitlist. we\'re busy getting everything ready for launch. think small-batch honey that\'ll make your morning toast jealous.',
        reply_to: EMAIL_CONFIG.toEmail,
        to_email: email
      }
    );

    if (process.env.NODE_ENV === 'development') {
      console.log('Thank you email sent successfully');
    }

    return { success: true };
  } catch (error) {
    // Log detailed errors only in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Email submission failed:', {
        message: error.message,
        text: error.text,
        status: error.status
      });
    }
    
    return { 
      success: false, 
      error: error.text || error.message || 'Failed to send email. Please try again.'
    };
  }
}; 