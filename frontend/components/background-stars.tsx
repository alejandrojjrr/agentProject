"use client";

import React, { useEffect, useRef } from 'react';

export default function BackgroundStars() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  type Star = {
    x: number;
    y: number;
    size: number;
    opacity: number;
    speed: number;
    blinkSpeed: number;
    blinkDirection: number;
  };
  const stars: Star[] = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const starCount = Math.floor((window.innerWidth * window.innerHeight) / 3000); // Adjust density
    
    // Set canvas to full window size
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars();
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Create stars with random properties
    function createStars() {
      if (!canvas) return;
      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 0.05 + 0.01,
          blinkSpeed: Math.random() * 0.01 + 0.005,
          blinkDirection: Math.random() > 0.5 ? 1 : -1
        });
      }
    }
    
    // Animation loop
    let animationFrameId: number;
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        
        // Update opacity for twinkling effect
        star.opacity += star.blinkSpeed * star.blinkDirection;
        if (star.opacity > 1 || star.opacity < 0.3) {
          star.blinkDirection *= -1;
        }
        
        // Slow drifting movement
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        
        // Draw the star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}