import React, { useState } from 'react';
import styled from 'styled-components';
import AnnouncementBar from '../shared/AnnouncementBar';
import SharedHeader from '../shared/SharedHeader';
import NewsletterFooter from '../shared/NewsletterFooter';
import Footer from '../shared/Footer';

const PageContainer = styled.div`
  background-color: #f4e8c4;
  min-height: 100vh;
  color: #3b2f20;
  font-family: 'Crimson Text', 'Times New Roman', serif;
`;

const Content = styled.main`
  max-width: 600px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Title = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 3rem;
  margin-bottom: 2rem;
  font-weight: 500;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: rgba(255, 255, 255, 0.3);
  padding: 2rem;
  border-radius: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #3b2f20;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.5);
  font-family: 'Crimson Text', serif;
  font-size: 1rem;
  color: #3b2f20;
  
  &:focus {
    outline: none;
    border: 2px solid #3b2f20;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #3b2f20;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.5);
  font-family: 'Crimson Text', serif;
  font-size: 1rem;
  color: #3b2f20;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border: 2px solid #3b2f20;
  }
`;

const SubmitButton = styled.button`
  background: #3b2f20;
  color: #f4e8c4;
  border: none;
  padding: 1rem;
  border-radius: 2rem;
  font-family: 'Crimson Text', serif;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  text-align: center;
  font-weight: 500;
  color: ${props => props.error ? '#cc0000' : '#3b2f20'};
`;

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Thank you! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <PageContainer>
      <AnnouncementBar message="📧 WE TYPICALLY RESPOND WITHIN 24 HOURS" />
      <SharedHeader />

      <Content>
        <Title>Get in Touch</Title>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="subject">Subject</Label>
            <Input 
              type="text" 
              id="subject" 
              name="subject" 
              value={formData.subject}
              onChange={handleChange}
              required 
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea 
              id="message" 
              name="message" 
              value={formData.message}
              onChange={handleChange}
              required 
            />
          </FormGroup>

          <SubmitButton type="submit">Send Message</SubmitButton>
          
          {status && <Message>{status}</Message>}
        </Form>
      </Content>

      <NewsletterFooter />
      <Footer />
    </PageContainer>
  );
}

export default Contact;
