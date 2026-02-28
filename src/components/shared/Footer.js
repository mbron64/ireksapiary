import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterSection = styled.footer`
  background: #3b2f20;
  color: #f4e8c4;
  padding: 4rem 2rem 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const FooterColumn = styled.div`
  h4 {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    font-weight: 500;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 0.75rem;
  }
  
  a {
    color: #f4e8c4;
    text-decoration: none;
    transition: opacity 0.2s;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 4rem;
  font-size: 0.85rem;
  opacity: 0.8;
`;

function Footer() {
  return (
    <FooterSection>
      <FooterContent>
        <FooterColumn>
          <h4>Shop</h4>
          <ul>
            <li><Link to="/bundle/trio">The Honey Trio</Link></li>
            <li><Link to="/products/wildflower">Wildflower</Link></li>
            <li><Link to="/shop">Clover</Link></li>
            <li><Link to="/shop">Forest</Link></li>
            <li><Link to="/shop">Gift Cards</Link></li>
          </ul>
        </FooterColumn>
        
        <FooterColumn>
          <h4>Learn</h4>
          <ul>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/blog">FAQs</Link></li>
          </ul>
        </FooterColumn>
        
        <FooterColumn>
          <h4>Programs</h4>
          <ul>
            <li><Link to="/subscribe">Subscribe & Save</Link></li>
            <li><Link to="/subscribe">Manage Subscription</Link></li>
            <li><Link to="/contact">Wholesale</Link></li>
            <li><Link to="/contact">Corporate Gifting</Link></li>
            <li><Link to="/contact">Ambassador Program</Link></li>
          </ul>
        </FooterColumn>
        
        <FooterColumn>
          <h4>Follow The Buzz</h4>
          <ul>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          </ul>
        </FooterColumn>
      </FooterContent>
      
      <Copyright>
        © Irek's Apiary {new Date().getFullYear()}
      </Copyright>
    </FooterSection>
  );
}

export default Footer;


