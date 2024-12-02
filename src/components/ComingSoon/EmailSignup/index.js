import { useState } from 'react';
import { submitEmail } from './emailService';
import { validateEmail } from '../../../utils/validation';
import { Form, Input, Button, ErrorMessage, SuccessMessage } from './styles';

export const EmailSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous status/error
    setStatus('');
    setError('');
    
    // Validate email
    const validation = validateEmail(email);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    const result = await submitEmail(email);
    if (result.success) {
      setStatus('Thanks for signing up!');
      setEmail('');
    } else {
      setError('Oops! Something went wrong.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input 
        type="email" 
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
        required
      />
      <Button type="submit">Sign Up</Button>
      {status && <SuccessMessage>{status}</SuccessMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Form>
  );
}; 