import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  background-color: ${props => props.$bgColor || '#3b2f20'};
  color: ${props => props.$textColor || '#f4e8c4'};
  text-align: center;
  padding: 0.75rem;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  position: sticky;
  top: 0;
  z-index: 100;
  animation: slideDown 0.3s ease-out;
  
  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

/**
 * Shared Announcement Bar Component
 * 
 * @param {string} message - The announcement message to display
 * @param {string} bgColor - Background color (optional)
 * @param {string} textColor - Text color (optional)
 */
function AnnouncementBar({ message, bgColor, textColor }) {
  if (!message) return null;
  
  return (
    <Bar $bgColor={bgColor} $textColor={textColor}>
      {message}
    </Bar>
  );
}

export default AnnouncementBar;
