const config = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
  toEmail: process.env.REACT_APP_TO_EMAIL
};

if (process.env.NODE_ENV === 'development') {
  console.log('Email Config Loading:', {
    serviceId: config.serviceId ? '✓' : '✗',
    templateId: config.templateId ? '✓' : '✗',
    publicKey: config.publicKey ? '✓' : '✗',
    toEmail: config.toEmail ? '✓' : '✗'
  });
}

if (!config.serviceId || !config.templateId || !config.publicKey) {
  const msg = 'Missing required email configuration. Please check your .env file.';
  if (process.env.NODE_ENV === 'development') {
    console.error('Missing email config:', {
      serviceId: !!config.serviceId,
      templateId: !!config.templateId,
      publicKey: !!config.publicKey
    });
  }
  if (process.env.NODE_ENV !== 'production') {
    console.warn(msg);
  }
}

export const EMAIL_CONFIG = config; 