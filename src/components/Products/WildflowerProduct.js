import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GiHoneyJar } from 'react-icons/gi';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

// Main styled components
const PageContainer = styled.div`
  background-color: #f4e8c4;
  color: #3b2f20;
  font-family: 'Crimson Text', 'Times New Roman', serif;
  min-height: 100vh;
  position: relative;
  isolation: isolate; /* Create new stacking context */
`;

const AnnouncementBar = styled.div`
  background-color: #3b2f20;
  color: #f4e8c4;
  text-align: center;
  padding: 0.75rem;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: #f4e8c4;
  border-bottom: 1px solid rgba(59, 47, 32, 0.1);
  position: sticky;
  top: 3rem;
  z-index: 99;
`;

const Logo = styled.h1`
  font-family: 'EB Garamond', serif;
  font-size: 2rem;
  font-weight: 590;
  letter-spacing: -0.03em;
  color: #3b2f20;
  margin: 0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  a {
    color: #3b2f20;
    text-decoration: none;
    font-size: 1rem;
    transition: opacity 0.2s;
    
    &:hover {
      opacity: 0.7;
    }
  }
`;

const CartButton = styled(Link)`
  border: 1px solid #3b2f20;
  border-radius: 2rem;
  padding: 0.5rem 1.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
  text-decoration: none;
  color: #3b2f20;
  display: inline-block;
  
  &:hover {
    background-color: rgba(59, 47, 32, 0.05);
  }
`;

const MainContent = styled.main`
  display: flex;
  padding: 0 2rem;
  max-width: 1400px;
  margin: 0 auto;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 0 1rem;
  }
`;

const ProductGallery = styled.div`
  flex: 1;
  position: relative;
`;

const MainImage = styled.div`
  background-color: #fff3c5;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    max-width: 100%;
    max-height: 600px;
  }
`;

const Thumbnails = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Thumbnail = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${props => props.$active ? '#3b2f20' : 'transparent'};
  padding: 2px;
  
  &:hover {
    border-color: #826f2b;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  max-width: 500px;
  
  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;

const NewBadge = styled.span`
  background: #b38728;
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: inline-block;
  margin-bottom: 0.5rem;
`;

const ProductTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 0.25rem 0;
  font-weight: 500;
  color: #3b2f20;
  line-height: 1.1;
`;

const ProductType = styled.h2`
  font-size: 1.8rem;
  margin: 0 0 1.5rem 0;
  font-weight: 400;
  color: #3b2f20;
  border-bottom: 1px solid #3b2f20;
  padding-bottom: 0.5rem;
`;

const Ratings = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  
  .stars {
    display: flex;
    gap: 0.25rem;
    
    svg {
      color: #3b2f20;
    }
  }
  
  .reviews {
    font-size: 0.9rem;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ProductDescription = styled.div`
  border: 1px solid #d0c8b5;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background-color: #fff7d7ff;
  font-size: 1rem;
  line-height: 1.5;
`;

const SelectionContainer = styled.div`
  border: 1px solid #d0c8b5;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background-color: #fff7d7ff;
`;

const SectionTitle = styled.div`
  font-size: 1rem;
  margin-bottom: 1rem;
  font-weight: 500;
  border-bottom: 1px dotted #d0c8b5;
  padding-bottom: 0.5rem;
`;

const VariantOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const VariantOption = styled.label`
  border: 1px solid ${props => props.selected ? '#3b2f20' : '#d0c8b5'};
  border-radius: 0.5rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  background-color: ${props => props.selected ? '#fff3c5' : 'transparent'};
  transition: all 0.2s;
  
  &:hover {
    border-color: #826f2b;
  }
  
  .icon {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
  }
  
  .name {
    font-weight: 500;
    font-size: 0.9rem;
  }
  
  .size {
    font-size: 0.85rem;
    color: #6e6655;
  }
  
  input {
    position: absolute;
    opacity: 0;
  }
`;

const QuantityOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const QuantityOption = styled.label`
  border: 1px solid ${props => props.selected ? '#3b2f20' : '#d0c8b5'};
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  background-color: ${props => props.selected ? '#fff3c5' : 'transparent'};
  position: relative;
  transition: all 0.2s;
  overflow: hidden;
  height: 120px; /* Set fixed height for all quantity cards */
  
  &:hover {
    border-color: #826f2b;
  }
  
  .discount {
    font-size: 0.75rem;
    width: calc(100% + 1rem); /* Extend beyond padding */
    text-align: center;
    background-color: ${props => props.$discount ? '#3b2f20' : 'transparent'};
    color: ${props => props.$discount ? '#fff3c5' : 'transparent'};
    border-radius: 4px 4px 0 0;
    padding: 0.1rem 0;
    margin: -0.5rem -0.5rem 0.25rem -0.5rem;
    position: relative;
    left: 0;
    right: 0;
  }
  
  .quantity-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
  
  .quantity {
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.2;
  }
  
  .label {
    font-size: 0.8rem;
    color: #6e6655;
    margin-top: 0.25rem;
  }
  
  .shipping {
    font-size: 0.6rem;
    color: #3b2f20;
    margin-top: 0.25rem;
    text-align: center;
  }
  
  input {
    position: absolute;
    opacity: 0;
  }
`;

const PurchaseOptions = styled.div`
  margin-bottom: 1.5rem;
`;

const PurchaseOption = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  cursor: pointer;
  
  input {
    margin-right: 0.75rem;
    accent-color: #3b2f20;
    width: 1.1rem;
    height: 1.1rem;
  }
  
  .name {
    font-weight: ${props => props.selected ? '500' : '400'};
  }
  
  .price {
    margin-left: auto;
    
    .original {
      text-decoration: line-through;
      color: #6e6655;
      margin-right: 0.5rem;
    }
    
    .discounted {
      font-weight: 500;
    }
  }
`;

const FrequencySelect = styled.div`
  margin-left: 2rem;
  margin-bottom: 1.5rem;
  
  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d0c8b5;
    border-radius: 0.5rem;
    background-color: #fff3c5;
    font-family: inherit;
    font-size: 0.9rem;
    color: #3b2f20;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%233b2f20' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    cursor: pointer;
    
    &:focus {
      outline: none;
      border-color: #826f2b;
    }
  }
`;

const ActionButton = styled.button`
  width: 100%;
  background-color: #fff3c5;
  color: #3b2f20;
  border: 1px solid #3b2f20;
  border-radius: 3rem;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 1rem;
  text-decoration: none;
  display: block;
  text-align: center;
  
  &:hover {
    background-color: #f8eab8;
  }
`;

const ProductImagePlaceholder = styled.div`
  height: 500px;
  background-color: #fff3c5;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    color: #3b2f20;
  }
`;

const ThumbnailPlaceholder = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff3c5;
  
  svg {
    color: #3b2f20;
    font-size: 1.5rem;
  }
`;

const DividerDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 2rem 0;
  
  .dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #3b2f20;
  }
`;

const DottedDivider = styled.div`
  border-top: 1px dashed #d0c8b5;
  margin: 1.5rem 0;
`;

const TabsContainer = styled.div`
  max-width: 930px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const TabsHeader = styled.div`
  display: flex;
  margin-bottom: -1px;
`;

const Tab = styled.button`
  padding: 0.75rem 2rem;
  background-color: ${props => props.$active ? '#3b2f20' : '#fff3c5'};
  color: ${props => props.$active ? '#fff3c5' : '#3b2f20'};
  border: 1px solid #3b2f20;
  border-bottom: ${props => props.$active ? 'none' : '1px solid #3b2f20'};
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  cursor: pointer;
  text-transform: uppercase;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  position: relative;
  
  &:not(:last-child) {
    margin-right: 0.25rem;
  }

  &:focus {
    outline: none;
  }
`;

const TabContent = styled.div`
  padding: 2rem;
  background-color: #fff7d7ff;
  border: 1px solid #3b2f20;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  margin-bottom: 2rem;
  font-size: 1.05rem;
  line-height: 1.6;
  color: #3b2f20;
  min-height: 250px;
  position: relative;
  overflow-y: auto;
`;

const CancelText = styled.p`
  text-align: center;
  color: #6e6655;
  font-size: 0.9rem;
  margin-top: 0.75rem;
`;

const LargeTypography = styled.div`
  max-width: 1200px;
  margin: 6rem auto 8rem;
  padding: 0 2rem;
  text-align: center;
  font-family: 'EB Garamond', serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 400;
  line-height: 1.3;
  color: #3b2f20;
  
  @media (max-width: 768px) {
    margin: 4rem auto 6rem;
  }
`;

const GreenItalic = styled.em`
  font-style: italic;
  color: #b38728;
  font-weight: 500;
`;

// Comparison section styles
const ComparisonSection = styled.section`
  padding: 2rem 1.5rem 6rem;
  background-color: #fff3c5;
  position: relative;
  
  /* Add a container for the dotted line that's specific to this section */
  .center-line-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    z-index: 1;
  }
`;

const ComparisonHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 5%;
`;

const BuyNowButton = styled.button`
  background-color: #3b2f20;
  color: #fff3c5;
  border: none;
  padding: 1rem 2rem;
  border-radius: 2rem;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  text-decoration: none;
  display: inline-block;
  text-align: center;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 2rem;
    pointer-events: none;
  }
  
  &:hover {
    background-color: #574a3a;
  }
`;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductColumn = styled.div`
  text-align: center;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 0 2rem;
  min-height: 900px;
  
  &::before {
    display: none;
  }
  
  @media (max-width: 768px) {
    &::before {
      display: none;
    }
  }
`;

const CenterLabel = styled.div`
  text-align: center;
  font-family: 'EB Garamond', serif;
  position: sticky;
  top: 100px;
  z-index: 3;
  background-color: #fff3c5;
  padding: 1rem 0;
  width: 100%;
  
  .number {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .text {
    font-size: 1.2rem;
    white-space: nowrap;
  }
`;

// HoneycombIcon styled component (not currently used but kept for future use)
// const HoneycombIcon = styled.div`
//   width: 80px;
//   height: 80px;
//   background-color: #fff3c5;
//   border: 2px solid #3b2f20;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: sticky;
//   top: 220px;
//   z-index: 2;
//   
//   svg {
//     color: #3b2f20;
//     font-size: 2.5rem;
//   }
//   
//   transition: transform 0.05s linear;
// `;

const ProductImage = styled.div`
  width: 100%;
  height: 400px; /* Increased height */
  background-color: #fff3c5;
  border-radius: 12px;
  margin-bottom: 2rem;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &::before {
    content: "${props => props.label}";
    position: absolute;
    writing-mode: vertical-lr;
    text-orientation: upright;
    left: 0;
    top: 0;
    bottom: 0;
    padding: 1rem 0.25rem;
    background-color: rgba(255, 243, 197, 0.8);
    font-family: 'Courier New', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    color: #3b2f20;
  }
`;

const ComparisonTitle = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 400;
  color: #3b2f20;
  text-align: center;
  margin: 0;
`;

const ComparisonDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #3b2f20;
  text-align: left;
  max-width: 400px;
  margin: 0 auto;
`;

// Re-add the ProductHeading component
const ProductHeading = styled.h3`
  font-family: 'EB Garamond', serif;
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #3b2f20;
  margin-bottom: 1.5rem;
`;

// Flavor Profile Section styles
const FlavorSection = styled.section`
  padding: 4rem 1.5rem;
  background-color: #fff3c5;
  position: relative;
  overflow: hidden;
  
  /* Add a container for the dotted line that's specific to this section */
  .center-line-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    z-index: 1;
  }
`;

const FlavorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  
  &::before {
    display: none;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    
    &::before {
      display: none;
    }
  }
`;

const FlavorColumn = styled.div`
  padding: 2rem;
  text-align: center;
  
  .vertical-label {
    writing-mode: vertical-lr;
    text-orientation: upright;
    font-family: 'Courier New', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    color: #3b2f20;
    position: absolute;
    top: 50%;
    ${props => props.$side === 'left' ? 'left: 1rem;' : 'right: 1rem;'}
    transform: translateY(-50%);
  }
`;

const FlavorImage = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 2rem;
  
  svg {
    width: 100%;
    height: 100%;
    color: #3b2f20;
  }
`;

const FlavorName = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: #3b2f20;
  margin: 0 0 2rem;
  text-align: center;
  font-weight: 400;
  letter-spacing: 0.02em;
  
  /* Add outline effect */
  text-shadow: 
    1px 1px 0 #fff3c5,
    -1px 1px 0 #fff3c5,
    1px -1px 0 #fff3c5,
    -1px -1px 0 #fff3c5;
`;

const FlavorHeading = styled.h3`
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.07em;
  color: #3b2f20;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
`;

const FlavorDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #3b2f20;
  max-width: 400px;
  margin: 0 auto;
  text-align: left;
`;

// Bee character SVG component
const BeeCharacter = ({ type }) => {
  if (type === 'floral') {
    return (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="40" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="35" cy="30" r="5" fill="currentColor" />
        <circle cx="65" cy="30" r="5" fill="currentColor" />
        <path d="M35 50 Q 50 60 65 50" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M20 15 Q 30 5 40 15" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M60 15 Q 70 5 80 15" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M30 75 Q 50 85 70 75" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="40" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="35" cy="30" r="5" fill="currentColor" />
      <circle cx="65" cy="30" r="5" fill="currentColor" />
      <path d="M30 45 Q 50 55 70 45" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M50 10 L 50 0" stroke="currentColor" strokeWidth="2" />
      <path d="M65 80 Q 50 70 35 80" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M75 20 L 85 10" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
};

// Final Usage Section styles
const UsageSection = styled.section`
  padding: 4rem 1.5rem;
  background-color: #fff3c5;
  position: relative;
  overflow: hidden;
  
  /* Add a container for the dotted line that's specific to this section */
  .center-line-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    z-index: 1;
  }
`;

const UsageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 5%;
`;

const UsageTitle = styled.div`
  h2 {
    font-size: 2.5rem;
    margin: 0 0 0.25rem 0;
    font-weight: 500;
    color: #3b2f20;
    line-height: 1.1;
  }
  
  span {
    font-size: 1.2rem;
    font-weight: 400;
    color: #3b2f20;
    display: block;
    text-align: center;
  }
`;

const UsageContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const UsageColumn = styled.div`
  text-align: center;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const UsageIllustration = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 1rem;
  position: relative;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const UsageCategoryLabel = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: #3b2f20;
  margin-top: 0.5rem;
`;

const UsageDescription = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #3b2f20;
  text-align: left;
  max-width: 400px;
  margin: 0 auto;
`;

const UsageCenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 0 2rem;
  min-height: 900px;
  
  &::before {
    display: none;
  }
  
  @media (max-width: 768px) {
    &::before {
      display: none;
    }
  }
`;

const DottedLine = styled.div`
  border-top: 1px dashed #d0c8b5;
  margin: 1.5rem 0;
`;

const GreenDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #3b2f20;
  margin: 0 auto;
`;

// Update the ContinuousCenterLine to make it start at the comparison section
const ContinuousCenterLine = styled.div`
  position: absolute; /* Changed from fixed to absolute */
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  z-index: 0;
  pointer-events: none;
  background-image: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 5%,
    #3b2f20 5%,
    #3b2f20 10%,
    transparent 10%,
    transparent 15%,
    #3b2f20 15%,
    #3b2f20 20%,
    transparent 20%,
    transparent 25%,
    #3b2f20 25%,
    #3b2f20 30%,
    transparent 30%,
    transparent 35%,
    #3b2f20 35%,
    #3b2f20 40%,
    transparent 40%,
    transparent 45%,
    #3b2f20 45%,
    #3b2f20 50%,
    transparent 50%,
    transparent 55%,
    #3b2f20 55%,
    #3b2f20 60%,
    transparent 60%,
    transparent 65%,
    #3b2f20 65%,
    #3b2f20 70%,
    transparent 70%,
    transparent 75%,
    #3b2f20 75%,
    #3b2f20 80%,
    transparent 80%,
    transparent 85%,
    #3b2f20 85%,
    #3b2f20 90%,
    transparent 90%,
    transparent 95%,
    #3b2f20 95%,
    #3b2f20 100%
  );
  transform: translateX(-50%);
  
  @media (max-width: 768px) {
    display: none;
  }
`;

// Update the ContinuousHoneyJar styling for sharper transitions
const ContinuousHoneyJar = styled.div`
  width: 80px;
  height: 80px;
  background-color: #fff3c5;
  border: 2px solid #3b2f20;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  pointer-events: none; /* Critical: ensures this doesn't block clicks */
  
  svg {
    color: #3b2f20;
    font-size: 2.5rem;
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

function WildflowerProduct() {
  const [selectedVariant, setSelectedVariant] = useState('jar');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedPurchase, setSelectedPurchase] = useState('onetime');
  const [selectedFrequency, setSelectedFrequency] = useState('month1');
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('details');
  const [jarPosition, setJarPosition] = useState(220); // Initial jar position
  const [jarVisible, setJarVisible] = useState(false); // State to control jar visibility
  const [jarScrolling, setJarScrolling] = useState(false); // State to control when jar starts scrolling
  const comparisonSectionRef = useRef(null); // Ref for comparison section
  const fixedJarPosition = 220; // Store the fixed position as a constant to ensure consistency
  
  // Import cart context
  const { addToCart, toggleCart, getCartTotals } = useCart();
  const { itemCount } = getCartTotals();
  
  // Improved scroll event listener with smooth transitions between states
  useEffect(() => {
    const handleScroll = () => {
      if (!comparisonSectionRef.current) return;

      const comparisonSectionRect = comparisonSectionRef.current.getBoundingClientRect();
      const comparisonSectionTop = comparisonSectionRect.top;
      const scrollPosition = window.scrollY;
      
      // Calculate absolute position of comparison section
      const comparisonSectionOffsetTop = window.scrollY + comparisonSectionRect.top;
      // The exact point where we want to start scrolling - when comparison section reaches a specific position
      const scrollTriggerPoint = comparisonSectionOffsetTop + 350; 
      const endPosition = document.body.scrollHeight - window.innerHeight - 100;
      
      // Check if comparison section is visible
      if (comparisonSectionTop <= window.innerHeight) {
        setJarVisible(true);
        
        if (comparisonSectionTop > fixedJarPosition) {
          // Comparison section is still entering the viewport
          // The jar should move with the section, maintaining its relative position
          setJarPosition(comparisonSectionTop);
          setJarScrolling(false);
        } else if (scrollPosition < scrollTriggerPoint) {
          // Comparison section is in view but not scrolled far enough to trigger independent scrolling
          // Keep jar fixed at its static position exactly where it appears in the comparison section
          setJarPosition(fixedJarPosition);
          setJarScrolling(false);
        } else {
          // User has scrolled past trigger point, now jar should follow scroll independently
          setJarScrolling(true);
          
          // Start the scrolling position calculation from exactly where the jar was static
          // This prevents any jump when transitioning to scrolling
          if (scrollPosition > endPosition) {
            // Maximum position - keep jar at bottom when reaching end of page
            setJarPosition(window.innerHeight - 150);
          } else {
            // Proportionally move jar down as user scrolls, starting from its fixed position
            const scrollRange = endPosition - scrollTriggerPoint;
            const scrollPercent = (scrollPosition - scrollTriggerPoint) / scrollRange;
            const jarRange = window.innerHeight - fixedJarPosition - 150;
            setJarPosition(fixedJarPosition + (scrollPercent * jarRange));
          }
        }
      } else {
        // Comparison section is below viewport, hide jar
        setJarVisible(false);
        setJarScrolling(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Import product configuration
  const PRODUCT = {
    wildflower: {
      id: 'wildflower-honey',
      name: '"Wildflower" Premium Honey',
      shopifyProductId: process.env.REACT_APP_SHOPIFY_WILDFLOWER_PRODUCT_ID,
      variants: {
        jar: {
          id: 'jar',
          name: 'Jar',
          size: '8oz',
          price: 18,
          shopifyVariantId: process.env.REACT_APP_SHOPIFY_WILDFLOWER_JAR_ID || 'placeholder-jar-id'
        },
        bottle: {
          id: 'bottle',
          name: 'Bottle',
          size: '16oz',
          price: 32, // Roughly double the 8oz price
          shopifyVariantId: process.env.REACT_APP_SHOPIFY_WILDFLOWER_BOTTLE_ID || 'placeholder-bottle-id'
        },
        jug: {
          id: 'jug',
          name: 'Jug',
          size: '32oz',
          price: 58, // Roughly 4x the 8oz price with volume discount
          shopifyVariantId: process.env.REACT_APP_SHOPIFY_WILDFLOWER_JUG_ID || 'placeholder-jug-id'
        }
      }
    }
  };

  const variants = [
    { 
      ...PRODUCT.wildflower.variants.jar,
      icon: <GiHoneyJar size={40} color="#3b2f20" /> 
    },
    { 
      ...PRODUCT.wildflower.variants.bottle,
      icon: <GiHoneyJar size={40} color="#3b2f20" /> 
    },
    { 
      ...PRODUCT.wildflower.variants.jug,
      icon: <GiHoneyJar size={40} color="#3b2f20" /> 
    }
  ];
  
  const quantities = [
    { id: 1, label: 'Jar', discount: '+5% Off', freeShipping: false },
    { id: 2, label: 'Jars', discount: '+10% Off', freeShipping: false },
    { id: 6, label: 'Jars', discount: '+15% Off', freeShipping: true },
    { id: 12, label: 'Jars', discount: '+17% Off', freeShipping: true }
  ];
  
  // Calculate prices based on selections
  // Get the price for the currently selected variant
  const selectedVariantObj = variants.find(v => v.id === selectedVariant);
  const basePrice = selectedVariantObj?.price || 18;
  
  let discountRate = 0;
  
  // Determine discount rate based on quantity
  if (selectedQuantity === 1) discountRate = 0.05;
  else if (selectedQuantity === 2) discountRate = 0.10;
  else if (selectedQuantity === 6) discountRate = 0.15;
  else if (selectedQuantity === 12) discountRate = 0.17;
  
  // Calculate final price
  const totalPrice = basePrice * selectedQuantity;
  const discountedPrice = selectedPurchase === 'subscribe' 
    ? (totalPrice * (1 - (discountRate + 0.05))).toFixed(2)
    : (totalPrice * (1 - discountRate)).toFixed(2);
  
  // Function to handle adding product to cart
  const handleAddToCart = () => {
    console.log('🛒 Add to Cart clicked!'); // Debug log
    
    // Validate that we have a Shopify variant ID
    if (!selectedVariantObj?.shopifyVariantId || selectedVariantObj.shopifyVariantId.includes('placeholder')) {
      console.warn('⚠️ Shopify variant ID is a placeholder. Product will be added to cart but checkout will fail.');
      // Don't block adding to cart during development
    }
    
    const productDetails = {
      id: PRODUCT.wildflower.id,
      name: PRODUCT.wildflower.name,
      variant: selectedVariant,
      size: selectedVariantObj.size,
      shopifyProductId: PRODUCT.wildflower.shopifyProductId,
      shopifyVariantId: selectedVariantObj.shopifyVariantId,
      quantity: selectedQuantity,
      price: parseFloat(discountedPrice) / selectedQuantity, // Per unit price (already includes discounts)
      basePrice: basePrice, // Store base price before discounts
      subscription: selectedPurchase === 'subscribe',
      frequency: selectedPurchase === 'subscribe' ? selectedFrequency : null
    };
    
    addToCart(productDetails);
  };
  
  // Function to handle buy now
  const handleBuyNow = () => {
    handleAddToCart();
    // Cart drawer will already be open from addToCart
  };
  
  // Calculate the amount of content for each tab to determine an appropriate min-height
  const renderTabContent = () => {
    if (activeTab === 'details') {
      return (
        <>
          <h3 style={{ marginTop: 0, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            WILDFLOWER HONEY: {selectedVariant === 'jar' ? '8OZ' : selectedVariant === 'bottle' ? '16OZ' : '32OZ'}
          </h3>
          <p>
            Meet your new artisanal honey, crafted from a diverse blend of wildflowers across Central Valley, California. 
            With its floral aroma and complex flavor profile, our raw, unfiltered Wildflower Honey captures the essence of 
            seasonal blooms in every jar.
          </p>
          <p>
            Each jar contains pure, unheated honey that preserves all natural enzymes and antioxidants. No additives, 
            no pasteurization — just 100% pure honey as nature intended.
          </p>
        </>
      );
    }
    
    if (activeTab === 'harvest') {
      return (
        <>
          <h3 style={{ marginTop: 0, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            LOCAL HARVEST
          </h3>
          <p>
            Our honey is harvested from apiaries located throughout the Central Valley of California, 
            where bees forage on a diverse range of wildflowers that bloom throughout the seasons.
          </p>
          <p>
            Each batch of honey varies slightly in color and flavor depending on which flowers were blooming 
            when the bees were foraging. This natural variation makes each jar a unique reflection of the local ecosystem.
          </p>
        </>
      );
    }
    
    if (activeTab === 'uses') {
      return (
        <>
          <h3 style={{ marginTop: 0, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            HOW TO USE
          </h3>
          <p>
            Drizzle over yogurt, toast, cheese boards, and desserts for a touch of natural sweetness.
            Stir into tea or coffee as a refined sweetener with complex flavor notes.
            Use in baking to add moisture and richness to cakes, breads, and cookies.
          </p>
          <p>
            For crystallized honey, simply place jar in warm (not hot) water until it returns to liquid form.
            Store at room temperature — refrigeration will speed up crystallization.
          </p>
        </>
      );
    }
    
    return null;
  };
  
  return (
    <PageContainer>
      {/* The honey jar with opacity transition but no position transition */}
      <ContinuousHoneyJar 
        style={{ 
          top: `${jarPosition}px`,
          opacity: jarVisible ? 1 : 0
        }}
      >
        <GiHoneyJar />
      </ContinuousHoneyJar>
      
      <AnnouncementBar>
        🌸 BACK IN STOCK: WILDFLOWER HONEY - ORDER NOW BEFORE IT'S GONE!
      </AnnouncementBar>
      
      <Header>
        <Logo>
          <Link to="/home" style={{ textDecoration: 'none', color: '#3b2f20' }}>
            irek<span style={{ 
              display: 'inline-block', 
              transform: 'translateY(-0.66em)',
              marginLeft: '0.05em',
              marginRight: '-0.05em',
              fontSize: '0.9em'
            }}>
              ,
            </span>s apiary
          </Link>
        </Logo>
        
        <NavLinks>
          <Link to="/shop">Shop</Link>
          <Link to="/subscribe">Subscribe</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <CartButton to="#" onClick={(e) => { e.preventDefault(); toggleCart(); }}>
            Cart [{itemCount}]
          </CartButton>
        </NavLinks>
      </Header>
      
      <MainContent>
        <ProductGallery>
          <MainImage>
            <ProductImagePlaceholder>
              <GiHoneyJar size={180} color="#3b2f20" />
            </ProductImagePlaceholder>
          </MainImage>
          
          <Thumbnails>
            {[0, 1, 2, 3].map((index) => (
              <Thumbnail 
                key={index} 
                $active={activeImage === index} 
                onClick={() => setActiveImage(index)}
              >
                <ThumbnailPlaceholder>
                  <GiHoneyJar color="#3b2f20" />
                </ThumbnailPlaceholder>
              </Thumbnail>
            ))}
          </Thumbnails>
        </ProductGallery>
        
        <ProductInfo>
          <NewBadge>✨ Back in Stock</NewBadge>
          <ProductTitle>"Wildflower"</ProductTitle>
          <ProductType>Raw & Unfiltered Honey</ProductType>
          
          <Ratings>
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <div className="reviews">3 Reviews</div>
          </Ratings>
          
          <ProductDescription>
            A naturally sourced, floral-flavored honey made from 100% wildflowers.
            Perfect for drizzling, baking, and sweetening your favorite foods.
          </ProductDescription>
          
          <SelectionContainer>
            <SectionTitle>Select Product</SectionTitle>
            <VariantOptions>
              {variants.map((variant) => (
                <VariantOption 
                  key={variant.id}
                  selected={selectedVariant === variant.id}
                  onClick={() => setSelectedVariant(variant.id)}
                >
                  <input 
                    type="radio" 
                    name="variant" 
                    value={variant.id} 
                    checked={selectedVariant === variant.id}
                    onChange={() => setSelectedVariant(variant.id)}
                  />
                  <div className="icon">{variant.icon}</div>
                  <div className="name">{variant.name}</div>
                  <div className="size">{variant.size}</div>
                </VariantOption>
              ))}
            </VariantOptions>
            
            <SectionTitle>Quantity</SectionTitle>
            <QuantityOptions>
              {quantities.map((qty) => (
                <QuantityOption 
                  key={qty.id}
                  selected={selectedQuantity === qty.id}
                  $discount={qty.discount}
                  onClick={() => setSelectedQuantity(qty.id)}
                >
                  <input 
                    type="radio" 
                    name="quantity" 
                    value={qty.id} 
                    checked={selectedQuantity === qty.id}
                    onChange={() => setSelectedQuantity(qty.id)}
                  />
                  <div className="discount">{qty.discount}</div>
                  <div 
                    className="quantity-container"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: '1',
                      paddingTop: (qty.id === 1 || qty.id === 2) ? '0.75rem' : '0.25rem',
                      paddingBottom: (qty.id === 1 || qty.id === 2) ? '0.75rem' : '0.25rem'
                    }}
                  >
                    <div className="quantity">{qty.id}</div>
                    <div className="label">{qty.label}</div>
                    {qty.freeShipping && (
                      <div className="shipping">Free Shipping</div>
                    )}
                  </div>
                </QuantityOption>
              ))}
            </QuantityOptions>
            
            <DottedDivider />
            
            <PurchaseOptions>
              <PurchaseOption 
                selected={selectedPurchase === 'onetime'}
                onClick={() => setSelectedPurchase('onetime')}
              >
                <input 
                  type="radio" 
                  name="purchase" 
                  value="onetime" 
                  checked={selectedPurchase === 'onetime'}
                  onChange={() => setSelectedPurchase('onetime')}
                />
                <span className="name">One Time Purchase</span>
                <span className="price">
                  ${discountedPrice}
                </span>
              </PurchaseOption>
              
              <DottedDivider />
              
              <PurchaseOption 
                selected={selectedPurchase === 'subscribe'}
                onClick={() => setSelectedPurchase('subscribe')}
              >
                <input 
                  type="radio" 
                  name="purchase" 
                  value="subscribe" 
                  checked={selectedPurchase === 'subscribe'}
                  onChange={() => setSelectedPurchase('subscribe')}
                />
                <span className="name">Subscribe & Save</span>
                <span className="price">
                  <span className="original">${discountedPrice}</span>
                  <span className="discounted">${(totalPrice * (1 - (discountRate + 0.05))).toFixed(2)}</span>
                </span>
              </PurchaseOption>
            </PurchaseOptions>
            
            {selectedPurchase === 'subscribe' && (
              <FrequencySelect>
                <select
                  value={selectedFrequency}
                  onChange={(e) => setSelectedFrequency(e.target.value)}
                >
                  <option value="month1">Frequency: Every 1 Month</option>
                  <option value="month2">Frequency: Every 2 Months</option>
                  <option value="month3">Frequency: Every 3 Months</option>
                </select>
              </FrequencySelect>
            )}
            
            <DottedDivider />
            
            <ActionButton onClick={handleAddToCart}>
              {selectedPurchase === 'subscribe' 
                ? `Subscribe - $${(totalPrice * (1 - (discountRate + 0.05))).toFixed(2)}` 
                : `Add to Cart - $${discountedPrice}`}
            </ActionButton>
            
            {selectedPurchase === 'subscribe' && (
              <CancelText>Skip, Edit or Cancel Anytime</CancelText>
            )}
          </SelectionContainer>
        </ProductInfo>
      </MainContent>
      
      <TabsContainer>
        <TabsHeader>
          <Tab 
            $active={activeTab === 'details'} 
            onClick={() => setActiveTab('details')}
          >
            Details
          </Tab>
          <Tab 
            $active={activeTab === 'harvest'} 
            onClick={() => setActiveTab('harvest')}
          >
            Harvest
          </Tab>
          <Tab 
            $active={activeTab === 'uses'} 
            onClick={() => setActiveTab('uses')}
          >
            Uses
          </Tab>
        </TabsHeader>
        
        <TabContent>
          {renderTabContent()}
        </TabContent>
      </TabsContainer>
      
      <LargeTypography>
        "Wildflower" is a <GreenItalic>floral</GreenItalic>-flavored, <GreenItalic>raw and unfiltered</GreenItalic> honey made from peak harvest wildflowers. Perfect for drizzling, baking, and <GreenItalic>sweetening</GreenItalic>.
      </LargeTypography>
      
      <ComparisonSection ref={comparisonSectionRef}>
        {/* Add the center line container inside the comparison section */}
        <div className="center-line-container">
          <ContinuousCenterLine />
        </div>
        
        <ComparisonHeader>
          <div></div>
          <BuyNowButton onClick={handleBuyNow}>
            Buy Now
          </BuyNowButton>
        </ComparisonHeader>
        
        <ComparisonGrid>
          <ProductColumn>
            <ComparisonTitle>"Wildflower"</ComparisonTitle>
            <ProductType>ARTISANAL HONEY</ProductType>
            <ProductImage label="Wildflower">
              {/* Image placeholder */}
            </ProductImage>
            <ProductHeading>WILDFLOWER NECTAR</ProductHeading>
            <ComparisonDescription>
              A 100% raw and unfiltered honey made from diverse wildflowers that bloom during peak seasons. These seasonal blossoms produce a complex honey with distinctive floral notes and rich amber color.
            </ComparisonDescription>
          </ProductColumn>
          
          <CenterColumn>
            <CenterLabel>
              <div className="number">1 BEE</div>
              <div className="text">2 HONEY VARIETIES</div>
            </CenterLabel>
            
            {/* Remove individual honeycomb icon as it's replaced by the continuous one */}
          </CenterColumn>
          
          <ProductColumn>
            <ComparisonTitle>"Clover"</ComparisonTitle>
            <ProductType>EVERYDAY HONEY</ProductType>
            <ProductImage label="Clover">
              {/* Image placeholder */}
            </ProductImage>
            <ProductHeading>SINGLE-SOURCE HONEY</ProductHeading>
            <ComparisonDescription>
              We carefully harvest honey from bees that forage predominantly on clover fields. This creates a honey that's mild, sweet, and perfect for everyday use in tea, coffee, baking, and cooking with a smooth, consistent flavor.
            </ComparisonDescription>
          </ProductColumn>
        </ComparisonGrid>
      </ComparisonSection>
      
      <FlavorSection>
        {/* Add the center line container inside the flavor section */}
        <div className="center-line-container">
          <ContinuousCenterLine />
        </div>
        
        <FlavorGrid>
          <FlavorColumn $side="left">
            <span className="vertical-label">Wildflower</span>
            <FlavorImage>
              <BeeCharacter type="floral" />
            </FlavorImage>
            <FlavorName>FLORAL</FlavorName>
            <FlavorHeading>TASTES RICH & COMPLEX</FlavorHeading>
            <FlavorDescription>
              A bold honey with distinctive floral notes and a complex flavor profile. Use Wildflower when you want to showcase honey's natural depth of flavor in desserts, cheese pairings, or drizzled over yogurt and fruit.
            </FlavorDescription>
          </FlavorColumn>
          
          <div style={{ position: 'relative' }}>
            {/* Remove individual center honey as it's replaced by the continuous one */}
          </div>
          
          <FlavorColumn $side="right">
            <span className="vertical-label">Clover</span>
            <FlavorImage>
              <BeeCharacter type="mild" />
            </FlavorImage>
            <FlavorName>MILD</FlavorName>
            <FlavorHeading>TASTES SWEET & SMOOTH</FlavorHeading>
            <FlavorDescription>
              A buttery, yet delicately flavored honey perfect for everyday sweetening. Use Clover honey in tea, coffee, baking recipes, and anywhere you want subtle sweetness without overpowering other flavors.
            </FlavorDescription>
          </FlavorColumn>
        </FlavorGrid>
      </FlavorSection>
      
      {/* Final Usage Section - inspired by Graza */}
      <UsageSection>
        {/* Add the center line container inside the usage section */}
        <div className="center-line-container">
          <ContinuousCenterLine />
        </div>
        
        <UsageHeader>
          <UsageTitle>
            <h2>"Nectar"</h2>
            <span>Raw Honey<br />Everyday Use</span>
          </UsageTitle>
          <BuyNowButton onClick={handleBuyNow}>
            Buy Now
          </BuyNowButton>
        </UsageHeader>
        
        <UsageContentGrid>
          <UsageColumn $side="left">
            <span className="vertical-label">Drizzle</span>
            <UsageIllustration>
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M120,50 C160,80 140,150 100,150" />
                  <path d="M100,150 C80,150 60,130 70,110" />
                  <path d="M70,110 C80,90 110,80 120,50" />
                  <circle cx="85" cy="100" r="3" fill="currentColor" />
                  <circle cx="100" cy="80" r="3" fill="currentColor" />
                  
                  {/* Person drizzling honey */}
                  <path d="M50,60 C70,55 80,65 70,80" />
                  <path d="M70,80 L90,100" />
                  <path d="M70,80 L50,100" />
                  <path d="M90,100 L85,130" />
                  <path d="M50,100 L55,130" />
                  <circle cx="50" cy="50" r="10" />
                  
                  {/* Honey bottle */}
                  <path d="M95,60 L110,50 L115,60 L100,70 Z" />
                  <path d="M100,70 L95,90" />
                  <path fill="currentColor" d="M95,75 L92,80 L90,85 L88,90" />
                  <path fill="currentColor" d="M92,80 L90,85 L87,90" />
                  <path fill="currentColor" d="M90,85 L85,90" />
                </g>
              </svg>
            </UsageIllustration>
            <UsageCategoryLabel>#1 EVERYDAY HONEY</UsageCategoryLabel>
            <UsageDescription>
              A versatile raw honey that's perfect for everyday use in tea, coffee, and drizzled over breakfast favorites.
            </UsageDescription>
          </UsageColumn>
          
          <UsageCenterColumn>
            {/* Remove individual usage center honey as it's replaced by the continuous one */}
            <DottedLine />
          </UsageCenterColumn>
          
          <UsageColumn $side="right">
            <span className="vertical-label">Infuse</span>
            <UsageIllustration>
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="currentColor" strokeWidth="2">
                  {/* Person with honey jar */}
                  <circle cx="120" cy="50" r="10" />
                  <path d="M120,60 C130,65 125,75 120,80" />
                  <path d="M120,80 L105,100" />
                  <path d="M120,80 L135,100" />
                  <path d="M105,100 L100,130" />
                  <path d="M135,100 L140,130" />
                  
                  {/* Mixing bowl */}
                  <path d="M80,110 C60,120 60,140 80,150 C100,160 130,160 150,150 C170,140 170,120 150,110 C130,100 100,100 80,110 Z" />
                  <path d="M90,120 C110,125 130,125 150,120" />
                  <path d="M90,130 C110,135 130,135 150,130" />
                  
                  {/* Honey jar */}
                  <path d="M70,70 L90,70 L90,90 L85,95 L75,95 L70,90 Z" />
                  <path d="M75,70 L75,60 L85,60 L85,70" />
                  <path d="M80,60 L80,50" />
                </g>
              </svg>
            </UsageIllustration>
            <UsageCategoryLabel>#1 CULINARY HONEY</UsageCategoryLabel>
            <UsageDescription>
              With its nuanced flavor profile, our infused honey elevates culinary creations from marinades to desserts.
            </UsageDescription>
          </UsageColumn>
        </UsageContentGrid>
        
        <GreenDot />
      </UsageSection>
      
      <DividerDots>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </DividerDots>
    </PageContainer>
  );
}

export default WildflowerProduct; 