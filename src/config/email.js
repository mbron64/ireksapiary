const config = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  thankYouTemplateId: process.env.REACT_APP_EMAILJS_THANKYOU_TEMPLATE_ID,
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
  toEmail: process.env.REACT_APP_TO_EMAIL
};

// Only log in development
if (process.env.NODE_ENV === 'development') {
  console.log('Email Config Loading:', {
    serviceId: config.serviceId ? '✓' : '✗',
    templateId: config.templateId ? '✓' : '✗',
    thankYouTemplateId: config.thankYouTemplateId ? '✓' : '✗',
    publicKey: config.publicKey ? '✓' : '✗',
    toEmail: config.toEmail ? '✓' : '✗'
  });
}

// Verify all required values are present
if (!config.serviceId || !config.templateId || !config.thankYouTemplateId || !config.publicKey) {
  const error = new Error('Missing required email configuration. Please check your .env file.');
  if (process.env.NODE_ENV === 'development') {
    console.error('Missing email config:', {
      serviceId: !!config.serviceId,
      templateId: !!config.templateId,
      thankYouTemplateId: !!config.thankYouTemplateId,
      publicKey: !!config.publicKey
    });
  }
  // Don't throw in production to avoid breaking the app
  if (process.env.NODE_ENV !== 'production') {
    console.warn(error.message);
  }
}

export const EMAIL_CONFIG = config; 