import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { createCheckoutSession, redirectToCheckout } from '../utils/stripe';
import { FREE_SHIPPING_THRESHOLD } from '../config/products';

const CartContext = createContext();

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

function loadCart() {
  try {
    const raw = localStorage.getItem('honeyCart');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem('honeyCart');
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('honeyCart', JSON.stringify(cart));
    } catch { /* quota exceeded — silent fail */ }
  }, [cart]);

  const addToCart = useCallback((product, quantity = 1) => {
    if (!product?.id || !product?.variant) {
      setCheckoutError('Unable to add this item. Please try again.');
      return;
    }

    setCart(prev => {
      const key = `${product.id}::${product.variant}`;
      const idx = prev.findIndex(i => `${i.id}::${i.variant}` === key);

      if (idx >= 0) {
        return prev.map((item, i) =>
          i === idx ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    setIsCartOpen(true);
    setCheckoutError(null);
  }, []);

  const removeFromCart = useCallback((productId, variant) => {
    setCart(prev => prev.filter(
      item => !(item.id === productId && item.variant === variant)
    ));
  }, []);

  const updateQuantity = useCallback((productId, variant, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId, variant);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId && item.variant === variant
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => setCart([]), []);
  const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
    const shippingProgress = Math.min(subtotal / FREE_SHIPPING_THRESHOLD, 1);

    return { subtotal, itemCount, freeShipping, shippingProgress };
  }, [cart]);

  const proceedToCheckout = useCallback(async () => {
    if (cart.length === 0) {
      setCheckoutError('Your cart is empty');
      return;
    }

    const invalid = cart.filter(item => !item.stripePriceId);
    if (invalid.length > 0) {
      setCheckoutError('Some items cannot be checked out. Please remove them and try again.');
      return;
    }

    try {
      setIsCheckingOut(true);
      setCheckoutError(null);
      const url = await createCheckoutSession(cart);
      redirectToCheckout(url);
    } catch (error) {
      setCheckoutError(error.message || 'Unable to process checkout. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  }, [cart]);

  const value = useMemo(() => ({
    cart,
    isCartOpen,
    isCheckingOut,
    checkoutError,
    totals,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    proceedToCheckout,
  }), [
    cart, isCartOpen, isCheckingOut, checkoutError, totals,
    addToCart, removeFromCart, updateQuantity, clearCart,
    toggleCart, openCart, closeCart, proceedToCheckout,
  ]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
