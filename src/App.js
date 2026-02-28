import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ThemeProvider } from './theme';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/Cart/CartDrawer';
import { ErrorBoundaryFallback } from './components/ErrorBoundary';

const Home = lazy(() => import('./components/Home/Home'));
const Shop = lazy(() => import('./components/Shop/Shop'));
const About = lazy(() => import('./components/About/About'));
const Blog = lazy(() => import('./components/Blog/Blog'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Subscribe = lazy(() => import('./components/Subscribe/Subscribe'));
const HoneyTrio = lazy(() => import('./components/Bundle/HoneyTrio'));
const ProductDetail = lazy(() => import('./components/Products/ProductDetail'));
const Nucs = lazy(() => import('./components/Nucs/Nucs'));

function PageLoader() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'EB Garamond', serif",
      fontSize: '1.25rem',
      color: '#3C2A21',
    }}>
      Loading...
    </div>
  );
}

function RootLayout() {
  return (
    <>
      <CartDrawer />
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorBoundaryFallback />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/shop', element: <Shop /> },
      { path: '/about', element: <About /> },
      { path: '/blog', element: <Blog /> },
      { path: '/contact', element: <Contact /> },
      { path: '/subscribe', element: <Subscribe /> },
      { path: '/bundle/trio', element: <HoneyTrio /> },
      { path: '/products/:slug', element: <ProductDetail /> },
      { path: '/nucs', element: <Nucs /> },
    ],
  },
]);

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </ThemeProvider>
  );
}
