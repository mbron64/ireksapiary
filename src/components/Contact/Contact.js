import React, { useState } from 'react';
import styled from 'styled-components';
import PageWrapper from '../Layout/PageWrapper';
import SEO from '../shared/SEO';
import { submitEmail } from '../ComingSoon/EmailSignup/emailService';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.message.trim()) return;

    setStatus('sending');
    try {
      await submitEmail(form.email);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <PageWrapper>
      <SEO
        title="Contact | Vestal, NY"
        description="Questions about honey, nucs, or orders? Reach out to Irek's Apiary in Vestal, NY. We'd love to hear from you."
        path="/contact"
      />
      <Header>
        <Label>Get in Touch</Label>
        <Title>Contact Us</Title>
        <Subtitle>
          Questions about our honey, wholesale inquiries, or just want to say hello?
          We'd love to hear from you.
        </Subtitle>
      </Header>

      <FormWrapper>
        {status === 'success' ? (
          <SuccessMsg>
            <h2>Thanks for reaching out!</h2>
            <p>We'll get back to you within 24 hours.</p>
          </SuccessMsg>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email *</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                />
              </Field>
            </Row>

            <Field>
              <FieldLabel htmlFor="subject">Subject</FieldLabel>
              <Input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What's this about?"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="message">Message *</FieldLabel>
              <Textarea
                id="message"
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us what's on your mind..."
                rows={6}
              />
            </Field>

            {status === 'error' && (
              <ErrorMsg>Something went wrong. Please try again.</ErrorMsg>
            )}

            <SubmitBtn type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </SubmitBtn>
          </Form>
        )}
      </FormWrapper>
    </PageWrapper>
  );
}

const Header = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.space['3xl']} ${({ theme }) => theme.space.xl}
           ${({ theme }) => theme.space.xl};
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
`;

const Label = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, ${({ theme }) => theme.fontSizes['4xl']});
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  opacity: 0.7;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.5;
`;

const FormWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space['4xl']};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.space.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div``;

const FieldLabel = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.brownMedium};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.space.md};
  border: 1px solid ${({ theme }) => theme.colors.brownLight};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.brown};
  font-size: ${({ theme }) => theme.fontSizes.base};
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &::placeholder { color: ${({ theme }) => theme.colors.brownLight}; }
  &:focus { border-color: ${({ theme }) => theme.colors.gold}; outline: none; }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.space.md};
  border: 1px solid ${({ theme }) => theme.colors.brownLight};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.brown};
  font-size: ${({ theme }) => theme.fontSizes.base};
  resize: vertical;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &::placeholder { color: ${({ theme }) => theme.colors.brownLight}; }
  &:focus { border-color: ${({ theme }) => theme.colors.gold}; outline: none; }
`;

const ErrorMsg = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.error};
`;

const SubmitBtn = styled.button`
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
  background: ${({ theme }) => theme.colors.brown};
  color: ${({ theme }) => theme.colors.cream};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.md};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: opacity ${({ theme }) => theme.transitions.fast};
  align-self: flex-start;
  &:hover { opacity: 0.85; }
  &:disabled { opacity: 0.5; }
`;

const SuccessMsg = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.space['3xl']} 0;

  h2 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    margin-bottom: ${({ theme }) => theme.space.md};
  }
  p {
    font-size: ${({ theme }) => theme.fontSizes.md};
    opacity: 0.7;
  }
`;
