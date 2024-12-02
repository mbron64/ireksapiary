import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../../../config/email';

// Initialize EmailJS
emailjs.init(EMAIL_CONFIG.publicKey);

export const submitEmail = async (email) => {
  try {
    console.log('Starting email submission process...', {
      serviceId: EMAIL_CONFIG.serviceId,
      templateId: EMAIL_CONFIG.templateId,
      thankYouTemplateId: EMAIL_CONFIG.thankYouTemplateId
    });
    
    // Send admin notification
    console.log('Sending admin notification...');
    const adminNotification = await emailjs.send(
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
    console.log('Admin notification sent:', adminNotification);

    // Send thank you email with modified template parameters
    console.log('Sending thank you email...');
    const thankYouEmail = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.thankYouTemplateId,
      {
        to_name: email.split('@')[0],
        visitor_email: email,
        from_name: 'irek\'s apiary',
        message: 'thanks for joining the waitlist. we\'re busy getting everything ready for launch — think small-batch honey that\'ll make your morning toast jealous.',
        reply_to: EMAIL_CONFIG.toEmail,
        to_email: email
      }
    );
    console.log('Thank you email sent:', thankYouEmail);

    return { success: true };
  } catch (error) {
    // More detailed error logging
    console.error('Email submission failed:', {
      error: error,
      message: error.message,
      text: error.text,
      errorCode: error.code,
      status: error.status,
      name: error.name,
      serviceId: EMAIL_CONFIG.serviceId,
      templateIds: {
        admin: EMAIL_CONFIG.templateId,
        thankYou: EMAIL_CONFIG.thankYouTemplateId
      }
    });
    
    return { 
      success: false, 
      error: error.text || error.message || 'Failed to send email'
    };
  }
}; 