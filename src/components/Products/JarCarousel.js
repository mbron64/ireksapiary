import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';

export default function JarCarousel({
  images = [],
  alt = 'Product',
  autoSpin = true,
  autoSpinInterval = 400,
  size = 'large',
}) {
  const [index, setIndex] = useState(0);
  const isDragging = useRef(false);
  const isHovering = useRef(false);
  const startX = useRef(0);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  const startAutoRotate = useCallback(() => {
    if (!autoSpin || images.length <= 1) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, autoSpinInterval);
  }, [autoSpin, autoSpinInterval, images.length]);

  const stopAutoRotate = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (autoSpin) startAutoRotate();
    return () => stopAutoRotate();
  }, [autoSpin, startAutoRotate, stopAutoRotate]);

  const handleMouseEnter = useCallback(() => {
    isHovering.current = true;
    stopAutoRotate();
    setIndex(0);
  }, [stopAutoRotate]);

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;
    isDragging.current = false;
    if (autoSpin) startAutoRotate();
  }, [autoSpin, startAutoRotate]);

  const handlePointerDown = useCallback((e) => {
    isDragging.current = true;
    startX.current = e.clientX || e.touches?.[0]?.clientX || 0;
    containerRef.current?.setPointerCapture?.(e.pointerId);
    stopAutoRotate();
  }, [stopAutoRotate]);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging.current) return;
    const x = e.clientX || e.touches?.[0]?.clientX || 0;
    const delta = x - startX.current;

    if (Math.abs(delta) > 5) {
      setIndex(prev => {
        const next = delta > 0
          ? (prev - 1 + images.length) % images.length
          : (prev + 1) % images.length;
        return next;
      });
      startX.current = x;
    }
  }, [images.length]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    if (!isHovering.current && autoSpin) {
      startAutoRotate();
    }
  }, [autoSpin, startAutoRotate]);

  if (images.length === 0) return null;

  const heights = { small: 180, medium: 280, large: 420 };
  const maxH = heights[size] || heights.large;

  return (
    <Wrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ImageContainer
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        $maxH={maxH}
      >
        <Img
          src={images[index]}
          alt={`${alt}, angle ${index + 1}`}
          draggable={false}
          $maxH={maxH}
        />
      </ImageContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

const ImageContainer = styled.div`
  cursor: grab;
  user-select: none;
  touch-action: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.space.lg};
  min-height: ${({ $maxH }) => $maxH}px;

  &:active { cursor: grabbing; }
`;

const Img = styled.img`
  max-height: ${({ $maxH }) => $maxH}px;
  width: auto;
  pointer-events: none;
  filter: drop-shadow(0 16px 32px rgba(60, 42, 33, 0.12));

  @media (max-width: 768px) {
    max-height: ${({ $maxH }) => Math.round($maxH * 0.7)}px;
  }
`;

