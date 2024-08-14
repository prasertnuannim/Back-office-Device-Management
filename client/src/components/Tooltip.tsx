import React, { useState, ReactNode } from 'react';

export default function Tooltip({ content, children, className }:any) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <div
        className="flex cursor-pointer items-center"
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        >
        {children}
      </div>
      {showTooltip && <div className={`flex ${className} items-center justify-center absolute left-1/2 transform -translate-x-1/2 text-sm bg-gray-500 text-white rounded-md py-1 px-1 pointer-events-none transition-all duration-300 z-auto`}>{content}</div>}
    </div>
  );
} 