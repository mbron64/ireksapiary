import React, { createContext, useState, useContext, useEffect } from 'react';
import { createCheckout, redirectToCheckout } from '../utils/shopify';

// Create the cart context
export const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Initialize cart state from localStorage if available
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('honeyCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartAnimation, setCartAnimation] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('honeyCart', JSON.stringify(cart));
  }, [cart]);
  
  // Add item to cart with animation
  const addToCart = (product, quantity = 1) => {
    // Validate product has required fields
    if (!product || !product.id || !product.shopifyVariantId) {
      console.error('Invalid product:', product);
      setCheckoutError('Unable to add product. Please refresh and try again.');
      return;
    }

    setCart(prevCart => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(
        item => item.id === product.id && item.variant === product.variant
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists (immutably)
        return prevCart.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item (immutably)
        return [...prevCart, { ...product, quantity }];
      }
    });
    
    setIsCartOpen(true);
    
    // Trigger animation
    setCartAnimation('added');
    setTimeout(() => setCartAnimation(''), 1000);
  };
  
  // Remove item from cart
  const removeFromCart = (productId, variant) => {
    setCart(prevCart => 
      prevCart.filter(
        item => !(item.id === productId && item.variant === variant)
      )
    );
    
    setCartAnimation('removed');
    setTimeout(() => setCartAnimation(''), 1000);
  };
  
  // Update item quantity
  const updateQuantity = (productId, variant, quantity) => {
    if (quantity < 1) return;
    
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === productId && item.variant === variant) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };
  
  // Calculate cart totals
  const getCartTotals = () => {
    return cart.reduce(
      (totals, item) => {
        const itemTotal = item.price * item.quantity;
        
        return {
          subtotal: totals.subtotal + itemTotal,
          itemCount: totals.itemCount + item.quantity,
        };
      },
      { subtotal: 0, itemCount: 0 }
    );
  };
  
  // Toggle cart open/closed
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  // Clear cart
  const clearCart = () => {
    setCart([]);
  };
  
  // Initiate Shopify checkout process
  const proceedToCheckout = async () => {
    if (cart.length === 0) {
      setCheckoutError("Your cart is empty");
      return;
    }

    // Validate all cart items have Shopify variant IDs
    const invalidItems = cart.filter(item => !item.shopifyVariantId);
    if (invalidItems.length > 0) {
      setCheckoutError("Some items in your cart are invalid. Please refresh the page.");
      if (process.env.NODE_ENV === 'development') {
        console.error('Invalid cart items:', invalidItems);
      }
      return;
    }
    
    try {
      setIsCheckingOut(true);
      setCheckoutError(null);
      
      // Create checkout session with validated cart items
      const checkout = await createCheckout(cart);
      
      // Redirect to Shopify checkout
      redirectToCheckout(checkout.webUrl);
      
      // Optional: Clear cart after successful checkout creation
      // clearCart();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Error proceeding to checkout:", error);
      }
      setCheckoutError(error.message || "Unable to process checkout. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };
  
  // Prepare the context value
  const contextValue = {
    cart,
    isCartOpen,
    cartAnimation,
    isCheckingOut,
    checkoutError,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotals,
    toggleCart,
    clearCart,
    proceedToCheckout
  };
  
  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}; 