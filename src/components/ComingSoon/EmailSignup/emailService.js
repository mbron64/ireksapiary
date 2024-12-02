import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../../../config/email';

// Initialize EmailJS
emailjs.init(EMAIL_CONFIG.publicKey);

export const submitEmail = async (email) => {
  try {
    console.log('Starting email submission...');
    
    // Create template parameters
    const templateParams = {
      from_name: 'Website Visitor',
      to_name: 'Irek\'s Apiary',
      visitor_email: email,
      message: `New signup from: ${email}`,
      reply_to: email
    };

    console.log('Template params:', templateParams);
    console.log('Config being used:', {
      serviceId: EMAIL_CONFIG.serviceId,
      templateId: EMAIL_CONFIG.templateId
    });

    const response = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      templateParams
    );

    console.log('Success:', response);
    return { success: true };
  } catch (error) {
    console.error('Failed:', error);
    return { success: false, error: error.message };
  }
}; 