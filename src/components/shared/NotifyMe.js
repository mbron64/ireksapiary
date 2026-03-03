import React, { useState } from 'react';
import styled from 'styled-components';
import { submitEmail } from '../ComingSoon/EmailSignup/emailService';

const STATES = { idle: 'idle', sending: 'sending', success: 'success', error: 'error' };

export default function NotifyMe({ compact = false, label = 'Sold Out' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(STATES.idle);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || status === STATES.sending) return;
    setStatus(STATES.sending);

    const result = await submitEmail(email, 'notify-me');
    if (result.success) {
      setStatus(STATES.success);
      setEmail('');
    } else {
      setStatus(STATES.error);
    }
  };

  if (status === STATES.success) {
    return (
      <Wrap $compact={compact}>
        <SuccessMsg $compact={compact}>You're on the list. We'll let you know.</SuccessMsg>
      </Wrap>
    );
  }

  return (
    <Wrap $compact={compact}>
      <Badge $compact={compact}>{label}</Badge>
      <Prompt $compact={compact}>Get notified when it's back</Prompt>
      <Form onSubmit={handleSubmit} $compact={compact}>
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          $compact={compact}
        />
        <SubmitBtn type="submit" disabled={status === STATES.sending} $compact={compact}>
          {status === STATES.sending ? 'Sending...' : 'Notify Me'}
        </SubmitBtn>
      </Form>
      {status === STATES.error && (
        <ErrorMsg>Something went wrong. Try again.</ErrorMsg>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${({ $compact }) => ($compact ? 'flex-start' : 'center')};
  gap: ${({ theme, $compact }) => ($compact ? theme.space.xs : theme.space.sm)};
`;

const Badge = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme, $compact }) => ($compact ? theme.fontSizes.xs : theme.fontSizes.sm)};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.brownMedium};
  opacity: 0.7;
`;

const Prompt = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme, $compact }) => ($compact ? theme.fontSizes.xs : theme.fontSizes.sm)};
  color: ${({ theme }) => theme.colors.brownLight};
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  max-width: ${({ $compact }) => ($compact ? '100%' : '360px')};
  gap: ${({ theme }) => theme.space.xs};
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  padding: ${({ theme, $compact }) =>
    $compact
      ? `${theme.space.xs} ${theme.space.sm}`
      : `${theme.space.sm} ${theme.space.md}`};
  border: 1px solid ${({ theme }) => theme.colors.brownLight}40;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme, $compact }) => ($compact ? theme.fontSizes.xs : theme.fontSizes.sm)};
  background: transparent;
  color: ${({ theme }) => theme.colors.brown};
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.brownLight};
    opacity: 0.5;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.gold};
  }
`;

const SubmitBtn = styled.button`
  flex-shrink: 0;
  padding: ${({ theme, $compact }) =>
    $compact
      ? `${theme.space.xs} ${theme.space.sm}`
      : `${theme.space.sm} ${theme.space.md}`};
  background: ${({ theme }) => theme.colors.brown};
  color: ${({ theme }) => theme.colors.cream};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme, $compact }) => ($compact ? theme.fontSizes.xs : theme.fontSizes.sm)};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: opacity ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;

  &:hover:not(:disabled) {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SuccessMsg = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme, $compact }) => ($compact ? theme.fontSizes.xs : theme.fontSizes.sm)};
  color: ${({ theme }) => theme.colors.gold};
  margin: 0;
  padding: ${({ theme, $compact }) => ($compact ? theme.space.sm : theme.space.md)} 0;
`;

const ErrorMsg = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: #c44;
  margin: 0;
`;
