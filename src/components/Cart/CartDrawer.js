import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { GiHoneyJar } from 'react-icons/gi';
import { IoClose, IoWarningOutline } from 'react-icons/io5';
import { FiMinus, FiPlus, FiTrash2, FiLoader } from 'react-icons/fi';

// Cart Drawer Container
const DrawerContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${props => props.$isOpen ? '0' : '-450px'};
  width: 420px;
  max-width: 100vw;
  height: 100vh;
  background-color: #fff3c5;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: right 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

// Overlay background
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;

// Cart Header
const CartHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e6d7a0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3b2f20;
  color: #fff3c5;
`;

const CartTitle = styled.h2`
  margin: 0;
  font-family: 'EB Garamond', serif;
  font-size: 1.5rem;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff3c5;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 50%;
  
  &:hover {
    background-color: rgba(255, 243, 197, 0.1);
  }
`;

// Cart Items Container
const CartItemsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

// Empty Cart Message
const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #3b2f20;
  
  h3 {
    font-family: 'EB Garamond', serif;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 2rem;
  }
  
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.7;
  }
`;

// Cart Item
const CartItem = styled.div`
  display: flex;
  padding: 1rem 0;
  border-bottom: 1px dashed #d0c8b5;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background-color: #fff7d7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  border: 1px solid #d0c8b5;
  
  svg {
    color: #3b2f20;
    font-size: 2.5rem;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: #3b2f20;
`;

const ItemVariant = styled.div`
  font-size: 0.85rem;
  color: #6e6655;
  margin-bottom: 0.5rem;
`;

const ItemPrice = styled.div`
  font-weight: 500;
  margin-bottom: 0.75rem;
  color: #3b2f20;
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #d0c8b5;
  border-radius: 2rem;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  color: #3b2f20;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(59, 47, 32, 0.05);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityValue = styled.span`
  width: 32px;
  text-align: center;
  font-size: 0.9rem;
  color: #3b2f20;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #3b2f20;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  
  &:hover {
    background-color: rgba(59, 47, 32, 0.05);
  }
`;

// Cart Footer
const CartFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #e6d7a0;
  background-color: #fff7d7ff;
`;

const FreeShippingProgress = styled.div`
  background: rgba(59, 47, 32, 0.05);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(59, 47, 32, 0.1);
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #b38728;
  width: ${props => props.$progress}%;
  transition: width 0.3s ease;
`;

const ProgressText = styled.p`
  font-size: 0.85rem;
  color: #3b2f20;
  text-align: center;
  font-weight: 500;
`;

const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  .label {
    font-size: 1.1rem;
    font-weight: 500;
    color: #3b2f20;
  }
  
  .value {
    font-size: 1.1rem;
    font-weight: 600;
    color: #3b2f20;
  }
`;

// Add loading spinner for checkout
const LoadingSpinner = styled.div`
  display: inline-block;
  margin-left: 8px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Add error message styling
const ErrorMessage = styled.div`
  color: #842029;
  background-color: #f8d7da;
  border: 1px solid #f5c2c7;
  border-radius: 0.25rem;
  padding: 0.75rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    flex-shrink: 0;
  }
`;

// Update CheckoutButton to be a regular button for custom checkout flow
const CheckoutButton = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  background-color: #3b2f20;
  color: #fff3c5;
  border: none;
  border-radius: 2rem;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: background-color 0.2s;
  position: relative;
  
  &:hover {
    background-color: #574a3a;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ContinueShoppingButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem;
  background: none;
  color: #3b2f20;
  border: 1px solid #3b2f20;
  border-radius: 2rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(59, 47, 32, 0.05);
  }
`;

// Animation for newly added items
const AddedItemAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #3b2f20;
  transform: scaleX(${props => props.$show ? 1 : 0});
  transform-origin: left;
  transition: transform 0.3s ease-in-out;
`;

const CartDrawer = () => {
  const { 
    cart, 
    isCartOpen, 
    cartAnimation, 
    toggleCart, 
    updateQuantity, 
    removeFromCart, 
    getCartTotals,
    proceedToCheckout,
    isCheckingOut,
    checkoutError
  } = useCart();
  
  const { subtotal, itemCount} = getCartTotals();
  
  // Calculate free shipping progress
  const FREE_SHIPPING_THRESHOLD = 50;
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  
  // Function to handle clicking the overlay (close the cart)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleCart();
    }
  };

  // Handle checkout button click
  const handleCheckout = () => {
    proceedToCheckout();
  };

  return (
    <>
      <Overlay $isOpen={isCartOpen} onClick={handleOverlayClick} />
      <DrawerContainer $isOpen={isCartOpen}>
        <AddedItemAnimation $show={cartAnimation === 'added'} />
        <CartHeader>
          <CartTitle>Your Cart ({itemCount})</CartTitle>
          <CloseButton onClick={toggleCart}>
            <IoClose />
          </CloseButton>
        </CartHeader>
        
        <CartItemsContainer>
          {cart.length === 0 ? (
            <EmptyCartMessage>
              <GiHoneyJar />
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added any honey to your cart yet.</p>
              <ContinueShoppingButton onClick={toggleCart}>
                Continue Shopping
              </ContinueShoppingButton>
            </EmptyCartMessage>
          ) : (
            cart.map((item, index) => (
              <CartItem key={`${item.id}-${item.variant}-${index}`}>
                <ItemImage>
                  <GiHoneyJar />
                </ItemImage>
                <ItemDetails>
                  <ItemTitle>{item.name}</ItemTitle>
                  <ItemVariant>{item.variant} - {item.size}</ItemVariant>
                  <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
                  <ItemActions>
                    <QuantityControl>
                      <QuantityButton 
                        onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <FiMinus size={14} />
                      </QuantityButton>
                      <QuantityValue>{item.quantity}</QuantityValue>
                      <QuantityButton 
                        onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                      >
                        <FiPlus size={14} />
                      </QuantityButton>
                    </QuantityControl>
                    <RemoveButton onClick={() => removeFromCart(item.id, item.variant)}>
                      <FiTrash2 />
                    </RemoveButton>
                  </ItemActions>
                </ItemDetails>
              </CartItem>
            ))
          )}
        </CartItemsContainer>
        
        {cart.length > 0 && (
          <CartFooter>
            {checkoutError && (
              <ErrorMessage>
                <IoWarningOutline size={18} />
                {checkoutError}
              </ErrorMessage>
            )}
            
            {subtotal < FREE_SHIPPING_THRESHOLD && (
              <FreeShippingProgress>
                <ProgressBar>
                  <ProgressFill $progress={shippingProgress} />
                </ProgressBar>
                <ProgressText>
                  ${amountToFreeShipping.toFixed(2)} away from free shipping! 🚚
                </ProgressText>
              </FreeShippingProgress>
            )}
            
            {subtotal >= FREE_SHIPPING_THRESHOLD && (
              <FreeShippingProgress>
                <ProgressText style={{ color: '#b38728', fontWeight: 600 }}>
                  🎉 You've unlocked free shipping!
                </ProgressText>
              </FreeShippingProgress>
            )}
            
            <CartTotal>
              <span className="label">Subtotal</span>
              <span className="value">${subtotal.toFixed(2)}</span>
            </CartTotal>
            <CheckoutButton 
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? (
                <>
                  Processing...
                  <LoadingSpinner>
                    <FiLoader size={18} />
                  </LoadingSpinner>
                </>
              ) : (
                'Proceed to Checkout'
              )}
            </CheckoutButton>
            <ContinueShoppingButton onClick={toggleCart}>
              Continue Shopping
            </ContinueShoppingButton>
          </CartFooter>
        )}
      </DrawerContainer>
    </>
  );
};

export default CartDrawer; 