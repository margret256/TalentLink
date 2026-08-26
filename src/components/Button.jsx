import React from 'react'

const variants = {
  primary:
    'btn-gradient text-white shadow-soft hover:opacity-90 active:opacity-80',
  outline:
    'bg-white text-maintext border border-border hover:bg-gray-50',
  ghost: 'bg-transparent text-primary hover:bg-lightpurple',
  dark: 'bg-navy text-white hover:bg-navy/90',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as: Component = 'button',
  ...props
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all focus-ring disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
