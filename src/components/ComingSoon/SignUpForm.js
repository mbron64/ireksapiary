import { Form, Input, Button } from './styles';

export function SignUpForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input 
        type="email" 
        placeholder="Enter your email"
        aria-label="Email address"
        required
      />
      <Button type="submit">Sign Up</Button>
    </Form>
  );
} 