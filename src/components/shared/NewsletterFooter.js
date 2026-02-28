import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import { validateEmail } from '../../utils/validation';
import { EMAIL_CONFIG } from '../../config/email';

const NewsletterSection = styled.div`
  background: rgba(59, 47, 32, 0.05);
  padding: 3rem 2rem;
  text-align: center;
  border-top: 1px solid #d0c8b5;
  border-bottom: 1px solid #d0c8b5;
`;

const NewsletterTitle = styled.h3`
  font-family: 'EB Garamond', serif;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #3b2f20;
`;

const NewsletterSubtitle = styled.p`
  font-size: 1rem;
  color: #584a38;
  margin-bottom: 1.5rem;
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 0.75rem;
  max-width: 500px;
  margin: 0 auto;
  
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #3b2f20;
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.5);
  font-family: 'Crimson Text', serif;
  font-size: 1rem;
  color: #3b2f20;
  
  &:focus {
    outline: none;
    border: 2px solid #3b2f20;
  }
  
  &::placeholder {
    color: #6e6655;
  }
`;

const SubmitButton = styled.button`
  background: #3b2f20;
  color: #f4e8c4;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 2rem;
  cursor: pointer;
  font-family: 'Crimson Text', serif;
  font-weight: 500;
  font-size: 1rem;
  white-space: nowrap;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const StatusMessage = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: ${props => props.$error ? '#cc0000' : '#3b2f20'};
  font-weight: 500;
`;

function NewsletterFooter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize EmailJS when component mounts
  useEffect(() => {
    if (EMAIL_CONFIG.publicKey && !emailjs._userID) {
      try {
        emailjs.init(EMAIL_CONFIG.publicKey);
        if (process.env.NODE_ENV === 'development') {
          console.log('EmailJS initialized in newsletter component');
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to initialize EmailJS:', err);
        }
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setStatus('');
    setError('');
    setIsSubmitting(true);
    
    const validation = validateEmail(email);
    if (!validation.isValid) {
      setError(validation.error);
      setIsSubmitting(false);
      return;
    }

    // Validate config
    if (!EMAIL_CONFIG.serviceId || !EMAIL_CONFIG.templateId || !EMAIL_CONFIG.publicKey) {
      setError('Email service not configured. Please contact support.');
      setIsSubmitting(false);
      return;
    }

    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('Sending newsletter signup email for:', email);
      }

      // Send admin notification
      await emailjs.send(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.templateId,
        {
          from_name: 'Website Visitor',
          to_name: 'Irek\'s Apiary',
          visitor_email: email,
          message: `New newsletter signup from: ${email}`,
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
          message: 'thanks for subscribing to our newsletter! we\'ll keep you posted on new harvests, recipes, and all things honey.',
          reply_to: EMAIL_CONFIG.toEmail,
          to_email: email
        }
      );

      setStatus('Thanks for subscribing! Check your email.');
      setEmail('');
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Newsletter signup successful!');
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Newsletter signup error:', error);
      }
      
      const errorMessage = error.text || error.message || 'Unable to send email. Please try again or contact support.';
      setError(errorMessage);
    }
    
    setIsSubmitting(false);
  };

  return (
    <NewsletterSection>
      <NewsletterTitle>Friends let friends know about fresh honey</NewsletterTitle>
      <NewsletterSubtitle>
        Get recipes, honey tips, and exclusive offers delivered to your inbox
      </NewsletterSubtitle>
      <NewsletterForm onSubmit={handleSubmit}>
        <EmailInput
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          required
        />
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </SubmitButton>
      </NewsletterForm>
      {status && <StatusMessage>{status}</StatusMessage>}
      {error && <StatusMessage $error>{error}</StatusMessage>}
    </NewsletterSection>
  );
}

export default NewsletterFooter;
