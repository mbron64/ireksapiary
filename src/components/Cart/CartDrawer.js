import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { X, Plus, Minus, ShoppingBag } from 'react-feather';
import { useCart } from '../../context/CartContext';
import { FREE_SHIPPING_THRESHOLD } from '../../config/products';

export default function CartDrawer() {
  const {
    cart, isCartOpen, closeCart, removeFromCart,
    updateQuantity, totals, proceedToCheckout,
    isCheckingOut, checkoutError,
  } = useCart();

  const drawerRef = useRef(null);

  useEffect(() => {
    if (!isCartOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') closeCart(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isCartOpen, closeCart]);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  const remaining = FREE_SHIPPING_THRESHOLD - totals.shippableTotal;

  return (
    <>
      {isCartOpen && <Overlay onClick={closeCart} />}
      <Drawer ref={drawerRef} $open={isCartOpen} role="dialog" aria-label="Shopping cart">
        <DrawerHeader>
          <DrawerTitle>Your Cart ({totals.itemCount})</DrawerTitle>
          <CloseBtn onClick={closeCart} aria-label="Close cart"><X size={20} /></CloseBtn>
        </DrawerHeader>

        {totals.hasShippableItems && !totals.freeShipping && (
          <ShippingBar>
            <ShippingText>
              {remaining > 0
                ? `$${remaining.toFixed(2)} away from free shipping`
                : 'You qualify for free shipping!'}
            </ShippingText>
            <ProgressTrack>
              <ProgressFill style={{ width: `${totals.shippingProgress * 100}%` }} />
            </ProgressTrack>
          </ShippingBar>
        )}

        {totals.freeShipping && (
          <ShippingBar $success>
            <ShippingText>Free shipping unlocked!</ShippingText>
          </ShippingBar>
        )}

        <CartItems>
          {cart.length === 0 ? (
            <EmptyState>
              <ShoppingBag size={40} strokeWidth={1} />
              <p>Your cart is empty</p>
            </EmptyState>
          ) : (
            cart.map(item => (
              <CartItem key={`${item.id}::${item.variant}`}>
                <ItemImage src={item.image} alt={item.name} />
                <ItemDetails>
                  <ItemName>{item.name}</ItemName>
                  <ItemMeta>{item.size}</ItemMeta>
                  <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
                </ItemDetails>
                <QuantityControls>
                  <QtyBtn
                    onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </QtyBtn>
                  <QtyValue>{item.quantity}</QtyValue>
                  <QtyBtn
                    onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </QtyBtn>
                </QuantityControls>
                <RemoveBtn
                  onClick={() => removeFromCart(item.id, item.variant)}
                  aria-label={`Remove ${item.name}`}
                >
                  <X size={16} />
                </RemoveBtn>
              </CartItem>
            ))
          )}
        </CartItems>

        {cart.length > 0 && (
          <CartFooter>
            <SubtotalRow>
              <span>Subtotal</span>
              <span>${totals.subtotal.toFixed(2)}</span>
            </SubtotalRow>
            {checkoutError && <ErrorMsg>{checkoutError}</ErrorMsg>}
            <CheckoutBtn onClick={proceedToCheckout} disabled={isCheckingOut}>
              {isCheckingOut ? 'Redirecting...' : 'Checkout'}
            </CheckoutBtn>
          </CartFooter>
        )}
      </Drawer>
    </>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlay};
  z-index: ${({ theme }) => theme.zIndex.cartOverlay};
  animation: fadeIn 0.2s ease;
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
`;

const Drawer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 420px;
  max-width: 100vw;
  background: ${({ theme }) => theme.colors.white};
  z-index: ${({ theme }) => theme.zIndex.cart};
  display: flex;
  flex-direction: column;
  transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
  transition: transform ${({ theme }) => theme.transitions.base};
  box-shadow: ${({ $open, theme }) => ($open ? theme.shadows.lg : 'none')};
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space.lg} ${({ theme }) => theme.space.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.creamDark};
`;

const DrawerTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const CloseBtn = styled.button`
  color: ${({ theme }) => theme.colors.brown};
  display: flex;
  padding: ${({ theme }) => theme.space.xs};
`;

const ShippingBar = styled.div`
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
  background: ${({ $success, theme }) =>
    $success ? 'rgba(179, 135, 40, 0.08)' : theme.colors.cream};
  border-bottom: 1px solid ${({ theme }) => theme.colors.creamDark};
`;

const ShippingText = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: ${({ theme }) => theme.space.xs};
  color: ${({ theme }) => theme.colors.gold};
`;

const ProgressTrack = styled.div`
  height: 3px;
  background: ${({ theme }) => theme.colors.creamDark};
  border-radius: ${({ theme }) => theme.radii.full};
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radii.full};
  transition: width ${({ theme }) => theme.transitions.base};
`;

const CartItems = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => theme.space['3xl']} 0;
  color: ${({ theme }) => theme.colors.brownLight};

  p {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr auto auto;
  gap: ${({ theme }) => theme.space.md};
  align-items: center;
  padding: ${({ theme }) => theme.space.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.creamDark};
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  background: ${({ theme }) => theme.colors.cream};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: ${({ theme }) => theme.space.xs};
`;

const ItemDetails = styled.div`
  min-width: 0;
`;

const ItemName = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemMeta = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.brownMedium};
`;

const ItemPrice = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.space.xs};
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  border: 1px solid ${({ theme }) => theme.colors.creamDark};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: ${({ theme }) => theme.space.xs};
`;

const QtyBtn = styled.button`
  color: ${({ theme }) => theme.colors.brown};
  display: flex;
  align-items: center;
  padding: 2px;
`;

const QtyValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  min-width: 20px;
  text-align: center;
`;

const RemoveBtn = styled.button`
  color: ${({ theme }) => theme.colors.brownLight};
  display: flex;
  padding: ${({ theme }) => theme.space.xs};
  transition: color ${({ theme }) => theme.transitions.fast};
  &:hover { color: ${({ theme }) => theme.colors.error}; }
`;

const CartFooter = styled.div`
  padding: ${({ theme }) => theme.space.lg} ${({ theme }) => theme.space.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.creamDark};
`;

const SubtotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const ErrorMsg = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const CheckoutBtn = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.space.md};
  background: ${({ theme }) => theme.colors.brown};
  color: ${({ theme }) => theme.colors.cream};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.md};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: opacity ${({ theme }) => theme.transitions.fast};
  &:hover { opacity: 0.85; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;
