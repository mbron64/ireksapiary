const config = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
  toEmail: process.env.REACT_APP_TO_EMAIL
};

// Debug log
console.log('Loading email config:', {
  serviceId: config.serviceId,
  templateId: config.templateId,
  publicKey: config.publicKey ? '[PRESENT]' : '[MISSING]',
  toEmail: config.toEmail
});

// Verify all required values are present
if (!config.serviceId || !config.templateId || !config.publicKey) {
  console.error('Missing required email configuration!', {
    serviceId: !!config.serviceId,
    templateId: !!config.templateId,
    publicKey: !!config.publicKey
  });
}

export const EMAIL_CONFIG = config; 