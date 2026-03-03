import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageWrapper from '../Layout/PageWrapper';
import SEO from '../shared/SEO';
import { useCart } from '../../context/CartContext';

export default function OrderConfirmation() {
  const { clearCart } = useCart();
  const cleared = useRef(false);

  useEffect(() => {
    if (!cleared.current) {
      clearCart();
      cleared.current = true;
    }
  }, [clearCart]);

  return (
    <PageWrapper>
      <SEO
        title="Order Confirmed"
        path="/order-confirmation"
        description="Your order has been placed successfully."
      >
        <meta name="robots" content="noindex, nofollow" />
      </SEO>

      <Wrap>
        <CheckCircle aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="2" />
            <path d="M14 24l7 7 13-13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </CheckCircle>

        <Title>Thank you for your order</Title>

        <Message>
          You'll receive an email confirmation from Stripe with your order details shortly.
        </Message>

        <PickupNote>
          <strong>Ordering nucs?</strong> We'll reach out to coordinate your pickup.
          Nuc pickups happen at dawn or dusk when the bees are calm.
        </PickupNote>

        <HomeCTA to="/">Back to Home</HomeCTA>
      </Wrap>
    </PageWrapper>
  );
}

const Wrap = styled.div`
  max-width: 560px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space['4xl']} ${({ theme }) => theme.space.xl};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.lg};
`;

const CheckCircle = styled.div`
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  line-height: 1.1;
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.6;
  opacity: 0.8;
`;

const PickupNote = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.6;
  background: ${({ theme }) => theme.colors.creamDark};
  padding: ${({ theme }) => theme.space.lg};
  border-radius: ${({ theme }) => theme.radii.md};
  width: 100%;

  strong {
    display: block;
    margin-bottom: ${({ theme }) => theme.space.xs};
  }
`;

const HomeCTA = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
  background: ${({ theme }) => theme.colors.brown};
  color: ${({ theme }) => theme.colors.cream};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.md};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: opacity ${({ theme }) => theme.transitions.fast};
  margin-top: ${({ theme }) => theme.space.md};

  &:hover {
    opacity: 0.85;
  }
`;
