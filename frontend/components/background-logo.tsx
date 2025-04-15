"use client";

import React from 'react';

export default function BackgroundLogo() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] flex items-center justify-center opacity-5">
      <svg
        width="60%"
        height="60%"
        viewBox="0 0 100 100"
        className="text-white/10"
      >
        <g>
          {/* Left wing */}
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            d="M20 80 L35 65 L35 50 L50 35 M35 65 L50 50 M35 50 L50 50"
            className="filter drop-shadow-xl"
          />
          {/* Right wing */}
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            d="M80 80 L65 65 L65 50 L50 35 M65 65 L50 50 M65 50 L50 50"
            className="filter drop-shadow-xl"
          />
        </g>
      </svg>
    </div>
  );
} 