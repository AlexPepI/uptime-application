import React from 'react';

// Single bar component
export function UptimeBar({ status = 'up', width = 8, height = 26, activeColor = '#37c77f', inactiveColor = '#2d2f36', downColor = '#e74c3c' }) {
  // status: 'up', 'down', or 'inactive'
  const color = status === 'up' ? activeColor : status === 'down' ? downColor : inactiveColor;
  return (
    <div
      role="presentation"
      style={{
        width,
        height,
        backgroundColor: color,
        borderRadius: width / 2,
      }}
    />
  );
}

// Container for multiple bars
export function UptimeBars({
  statuses = [],               // array of statuses: 'up', 'down', or 'inactive'
  gap = 2,                     // space between bars
  ariaLabel = 'Uptime status',
}) {
  const containerStyle = {
    display: 'flex',
    alignItems: 'flex-end',
    gap,
  };

  return (
    <div role="img" aria-label={ariaLabel} style={containerStyle}>
      {statuses.map((status, idx) => (
        <UptimeBar key={idx} status={status} />
      ))}
    </div>
  );
}