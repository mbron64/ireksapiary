const config = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  thankYouTemplateId: process.env.REACT_APP_EMAILJS_THANKYOU_TEMPLATE_ID,
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
  toEmail: process.env.REACT_APP_TO_EMAIL
};

// Add more detailed logging
console.log('Email Config Loading:', {
  serviceId: config.serviceId,
  templateId: config.templateId,
  thankYouTemplateId: config.thankYouTemplateId,
  publicKey: config.publicKey ? 'Present' : 'Missing',
  toEmail: config.toEmail
});

// Verify all required values are present
if (!config.serviceId || !config.templateId || !config.thankYouTemplateId || !config.publicKey) {
  console.error('Missing required email configuration!', {
    serviceId: !!config.serviceId,
    templateId: !!config.templateId,
    thankYouTemplateId: !!config.thankYouTemplateId,
    publicKey: !!config.publicKey
  });
}

export const EMAIL_CONFIG = config; 