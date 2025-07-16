import React from 'react'
import { Label as RadixLabel } from '@radix-ui/react-label'

export function Label({ htmlFor, className = '', children, ...props }) {
  return (
    <RadixLabel
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 ${className}`}
      {...props}
    >
      {children}
    </RadixLabel>
  )
}