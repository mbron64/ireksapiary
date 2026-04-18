import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PageWrapper from '../Layout/PageWrapper';
import SEO from '../shared/SEO';
import { useCart } from '../../context/CartContext';

const NUC_PRICE = 185;
const BOX_DEPOSIT = 50;
const TOTAL_PER_NUC = NUC_PRICE + BOX_DEPOSIT;
const MIN_QTY = 5;
const MAX_QTY = 50;

export default function BulkNucs() {
  const { addToCart } = useCart();
  const [payNow, setPayNow] = useState(false);
  const [quantity, setQuantity] = useState(MIN_QTY);

  const increment = () => setQuantity(q => Math.min(q + 1, MAX_QTY));
  const decrement = () => setQuantity(q => Math.max(q - 1, MIN_QTY));

  const handleAddToCart = () => {
    addToCart({
      id: 'nuc-box-deposit',
      name: 'Nuc Box Deposit',
      size: 'Refundable',
      price: BOX_DEPOSIT,
      image: '/assets/nucs/nucs2.jpg',
      pickup: true,
    }, quantity);
    if (payNow) {
      addToCart({
        id: 'nuc',
        name: '5-Frame Nuc',
        size: '5-frame',
        price: NUC_PRICE,
        image: '/assets/nucs/nucsFrame.jpg',
        pickup: true,
      }, quantity);
    }
  };

  const depositTotal = BOX_DEPOSIT * quantity;
  const fullTotal = TOTAL_PER_NUC * quantity;

  return (
    <PageWrapper announcement="Spring 2026 Nucs · Limited Availability · Reserve Yours" announcementLink="/nucs">
      <SEO
        title="Bulk Nuc Orders | Bee Clubs & Multiple Hives | Irek's Apiary"
        description="Order 5-50 honeybee nucs for your bee club, apiary, or multi-hive setup. Locally adapted queens, pickup in Vestal, NY. $190 per nuc + refundable box deposit."
        path="/nucs/bulk"
        image="/assets/nucs/nucsFrame.jpg"
      />
      <HeroGrid>
        <ImageCol>
          <HeroImg src="/assets/nucs/nucs2.jpg" alt="Nuc boxes ready for pickup" />
        </ImageCol>

        <PurchaseCol>
          <Tag>Spring 2026 · Local Pickup</Tag>
          <ProductName>Bulk Nuc Orders</ProductName>
          <PriceMain>${NUC_PRICE}<PriceUnit> / nuc</PriceUnit></PriceMain>
          <PriceSub>+ $50 refundable box deposit each</PriceSub>
          <Description>
            Starting multiple hives, supplying a bee club, or expanding your
            operation? Order 5 to 50 nucs in one go. Same locally adapted bees,
            same quality, same pickup in Vestal, NY.
          </Description>

          <OptionLabel>Payment</OptionLabel>
          <ToggleRow>
            <ToggleBtn $active={!payNow} onClick={() => setPayNow(false)}>
              <span>${BOX_DEPOSIT} deposit / nuc</span>
              <small>Pay ${NUC_PRICE} each at pickup</small>
            </ToggleBtn>
            <ToggleBtn $active={payNow} onClick={() => setPayNow(true)}>
              <span>${TOTAL_PER_NUC} per nuc in full</span>
              <small>Nothing due at pickup</small>
            </ToggleBtn>
          </ToggleRow>

          <OptionLabel>Quantity</OptionLabel>
          <StepperRow>
            <StepperBtn onClick={decrement} disabled={quantity <= MIN_QTY}>−</StepperBtn>
            <StepperValue>{quantity}</StepperValue>
            <StepperBtn onClick={increment} disabled={quantity >= MAX_QTY}>+</StepperBtn>
          </StepperRow>

          <OrderTotal>
            {payNow
              ? `Total: $${fullTotal.toLocaleString()}`
              : `Deposit today: $${depositTotal.toLocaleString()}`
            }
          </OrderTotal>

          <AddToCartBtn onClick={handleAddToCart}>
            Reserve {quantity} Nucs
          </AddToCartBtn>

          <Fine>
            {payNow
              ? `$${fullTotal.toLocaleString()} total for ${quantity} nucs. Non-refundable. Return boxes before Dec 31 and the $${depositTotal.toLocaleString()} deposit portion is yours again.`
              : `$${depositTotal.toLocaleString()} secures ${quantity} nucs. $${NUC_PRICE} per nuc due at pickup. Return boxes before Dec 31 and the deposit is yours again.`
            }
          </Fine>
          <Fine>
            All sales are final once the nuc leaves our apiary. Any concerns
            must be raised within 3 days of pickup. We guarantee healthy
            colonies with a laying queen at the time of handoff, but we cannot
            guarantee survival, productivity, or temperament after pickup.
            Transport and hive management are the customer's responsibility.
          </Fine>

          <SingleLink to="/nucs">Looking for just 1 or 2? Order here.</SingleLink>
        </PurchaseCol>
      </HeroGrid>

      <PickupSection>
        <SectionTitle>Pickup Day</SectionTitle>
        <PickupGrid>
          <PickupCard>
            <PickupLabel>When</PickupLabel>
            <PickupText>
              Late April through May. We schedule at dawn or dusk so the
              foragers are home. You'll get an email once colonies are ready.
            </PickupText>
          </PickupCard>
          <PickupCard>
            <PickupLabel>Where</PickupLabel>
            <PickupText>
              Our apiary in Vestal, NY, just outside Binghamton. Serving
              the Southern Tier and Upstate NY. We don't ship live bees.
              Pickup details will be arranged via email.
            </PickupText>
          </PickupCard>
          <PickupCard>
            <PickupLabel>Bring</PickupLabel>
            <PickupText>
              A vehicle that can fit your order. We seal each box before
              handoff. For larger orders, a truck bed or SUV works best.
            </PickupText>
          </PickupCard>
        </PickupGrid>
      </PickupSection>
    </PageWrapper>
  );
}

const HeroGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  min-height: 80vh;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const ImageCol = styled.div`
  background: ${({ theme }) => theme.colors.creamDark};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.space['2xl']};
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 520px;
  max-width: 80%;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: auto;
    max-width: 100%;
    padding: ${({ theme }) => theme.space.lg};
  }
`;

const HeroImg = styled.img`
  width: 85%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 70%;
  }
`;

const PurchaseCol = styled.div`
  padding: ${({ theme }) => theme.space['2xl']} ${({ theme }) => theme.space.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space.md};
  }
`;

const Tag = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const ProductName = styled.h1`
  font-size: clamp(2rem, 4vw, ${({ theme }) => theme.fontSizes['4xl']});
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const PriceMain = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.gold};
  font-weight: 500;
`;

const PriceUnit = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 400;
`;

const PriceSub = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.brownMedium};
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.6;
  opacity: 0.8;
  margin-bottom: ${({ theme }) => theme.space.xl};
  max-width: 480px;
`;

const OptionLabel = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.brownMedium};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const ToggleRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

const ToggleBtn = styled.button`
  flex: 1;
  padding: ${({ theme }) => theme.space.md};
  border: 1px solid ${({ $active, theme }) =>
    $active ? theme.colors.brown : theme.colors.brownLight};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.brown : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.cream : theme.colors.brown};
  text-align: center;
  transition: all ${({ theme }) => theme.transitions.fast};

  span {
    display: block;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
  small {
    display: block;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    margin-top: ${({ theme }) => theme.space.xs};
    opacity: 0.7;
  }
`;

const StepperRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const StepperBtn = styled.button`
  width: 48px;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.colors.brownLight};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: transparent;
  color: ${({ theme }) => theme.colors.brown};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.brown};
    color: ${({ theme }) => theme.colors.cream};
    border-color: ${({ theme }) => theme.colors.brown};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const StepperValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  min-width: 48px;
  text-align: center;
`;

const OrderTotal = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const AddToCartBtn = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.space.lg};
  background: ${({ theme }) => theme.colors.brown};
  color: ${({ theme }) => theme.colors.cream};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: opacity ${({ theme }) => theme.transitions.fast};
  &:hover { opacity: 0.85; }
`;

const Fine = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.brownMedium};
  margin-top: ${({ theme }) => theme.space.md};
  line-height: 1.5;
`;

const SingleLink = styled(Link)`
  display: block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.brownMedium};
  margin-top: ${({ theme }) => theme.space.lg};
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: ${({ theme }) => theme.colors.brown};
  }
`;

const PickupSection = styled.section`
  background: ${({ theme }) => theme.colors.creamDark};
  padding: ${({ theme }) => theme.space['4xl']} ${({ theme }) => theme.space.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.space['2xl']} ${({ theme }) => theme.space.md};
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, ${({ theme }) => theme.fontSizes['4xl']});
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space['2xl']};
`;

const PickupGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.space.xl};
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const PickupCard = styled.div`
  text-align: center;
`;

const PickupLabel = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const PickupText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  opacity: 0.75;
`;
