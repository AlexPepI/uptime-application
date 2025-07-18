import React from 'react';

export function Indicator({
  size = 48,          // overall diameter in px
  color = '#37c77f',  // dot & ring color
  duration = 1.5,     // seconds per ripple
}) {
  const dotSize = size * 0.4; // inner dot is 40% of overall

  const wrapperStyle = {
    position: 'relative',
    width: size,
    height: size,
    display: 'inline-block',
  };

  const ringStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: size,
    height: size,
    borderRadius: '50%',
    backgroundColor: color,
    opacity: 0.4,
    animation: `ripple ${duration}s ease-out infinite`,
  };

  const dotStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: dotSize,
    height: dotSize,
    marginTop: -dotSize / 2,
    marginLeft: -dotSize / 2,
    borderRadius: '50%',
    backgroundColor: color,
    boxShadow: '0 0 4px rgba(0,0,0,0.1)',
  };

  return (
    <>
      <div style={wrapperStyle} role="status" aria-label="Loading">
        <div style={ringStyle} />
        <div style={dotStyle} />
      </div>
      <style>
        {`
          @keyframes ripple {
            0% {
              transform: scale(0);
              opacity: 0.4;
            }
            80% {
              opacity: 0.15;
            }
            100% {
              transform: scale(1.5);
              opacity: 0;
            }
          }
        `}
      </style>
    </>
  );
}