import { createHttpLink, ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Validate Shopify configuration
const validateShopifyConfig = () => {
  const apiUrl = process.env.REACT_APP_SHOPIFY_API_URL;
  const token = process.env.REACT_APP_SHOPIFY_STOREFRONT_TOKEN;

  if (!apiUrl || !token) {
    const error = new Error(
      'Shopify configuration missing. Please set REACT_APP_SHOPIFY_API_URL and REACT_APP_SHOPIFY_STOREFRONT_TOKEN in your .env file.'
    );
    
    if (process.env.NODE_ENV === 'development') {
      console.error('Shopify Config Error:', {
        apiUrl: apiUrl ? '✓' : '✗ Missing',
        token: token ? '✓' : '✗ Missing'
      });
    }
    
    return { isValid: false, error };
  }

  // Check if using placeholder values
  if (apiUrl.includes('your-store') || token.includes('your-')) {
    const error = new Error(
      'Shopify configuration contains placeholder values. Please update with your actual Shopify credentials.'
    );
    
    if (process.env.NODE_ENV === 'development') {
      console.warn('Shopify Warning: Using placeholder configuration');
    }
    
    return { isValid: false, error };
  }

  return { isValid: true };
};

const config = validateShopifyConfig();

// Create a Shopify client using Apollo Client
// Use placeholder values if not configured to prevent initialization errors
export const shopifyClient = new ApolloClient({
  link: createHttpLink({
    uri: process.env.REACT_APP_SHOPIFY_API_URL || 'https://placeholder.myshopify.com/api/2024-01/graphql.json',
    headers: {
      'X-Shopify-Storefront-Access-Token': process.env.REACT_APP_SHOPIFY_STOREFRONT_TOKEN || 'placeholder-token',
      'Content-Type': 'application/json',
    },
    fetch,
  }),
  cache: new InMemoryCache(),
});

// Export config validation for use in components
export const isShopifyConfigured = config.isValid;

// GraphQL query to create a checkout
export const CREATE_CHECKOUT = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
        totalPrice
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              quantity
              variant {
                id
                title
                price {
                  amount
                }
                product {
                  id
                  title
                }
              }
            }
          }
        }
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

// GraphQL query to add items to an existing checkout
export const ADD_TO_CHECKOUT = gql`
  mutation checkoutLineItemsAdd($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
        id
        webUrl
        totalPrice
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              quantity
              variant {
                id
                title
                price {
                  amount
                }
                product {
                  id
                  title
                }
              }
            }
          }
        }
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

// Create a new checkout in Shopify
export const createCheckout = async (cartItems) => {
  // Validate Shopify is configured
  if (!isShopifyConfigured) {
    throw new Error('Shopify is not configured. Please contact support.');
  }

  // Validate cart items have required fields
  const invalidItems = cartItems.filter(item => !item.shopifyVariantId);
  if (invalidItems.length > 0) {
    throw new Error('Some cart items are missing Shopify variant IDs. Please refresh and try again.');
  }

  try {
    const lineItems = cartItems.map(item => ({
      variantId: item.shopifyVariantId,
      quantity: item.quantity
    }));

    // Collect subscription info from cart items
    const subscriptionItems = cartItems.filter(item => item.subscription);
    const customAttributes = [
      { key: "source", value: "custom_storefront" }
    ];

    // Add subscription metadata if any items are subscriptions
    if (subscriptionItems.length > 0) {
      customAttributes.push({
        key: "subscription_request",
        value: "true"
      });
      subscriptionItems.forEach((item, index) => {
        customAttributes.push({
          key: `subscription_${index}_frequency`,
          value: item.frequency || "month1"
        });
        customAttributes.push({
          key: `subscription_${index}_product`,
          value: item.id
        });
      });
    }

    const { data } = await shopifyClient.mutate({
      mutation: CREATE_CHECKOUT,
      variables: {
        input: {
          lineItems,
          customAttributes
        }
      }
    });

    if (data.checkoutCreate.checkoutUserErrors.length > 0) {
      const errorMessage = data.checkoutCreate.checkoutUserErrors[0].message;
      throw new Error(errorMessage);
    }

    return data.checkoutCreate.checkout;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error creating checkout:', error);
    }
    
    // Provide user-friendly error message
    if (error.message.includes('variant')) {
      throw new Error('Unable to process checkout. Please try again or contact support.');
    }
    
    throw error;
  }
};

// Function to handle redirecting to Shopify checkout
export const redirectToCheckout = (webUrl) => {
  window.location.href = webUrl;
}; 