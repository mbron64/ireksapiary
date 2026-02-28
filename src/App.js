import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import './App.css';
import ComingSoon from './components/ComingSoon/ComingSoon';
import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';
import About from './components/About/About';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';
import Subscribe from './components/Subscribe/Subscribe';
import HoneyTrio from './components/Bundle/HoneyTrio';
import WildflowerProduct from './components/Products/WildflowerProduct';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/Cart/CartDrawer';
import { shopifyClient } from './utils/shopify';

function App() {
  return (
    <ApolloProvider client={shopifyClient}>
      <CartProvider>
        <Router>
          <div className="App">
            <CartDrawer />
            <Routes>
              <Route path="/" element={<ComingSoon />} />
              <Route path="/home" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/subscribe" element={<Subscribe />} />
              <Route path="/bundle/trio" element={<HoneyTrio />} />
              <Route path="/products/wildflower" element={<WildflowerProduct />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </ApolloProvider>
  );
}

export default App;
