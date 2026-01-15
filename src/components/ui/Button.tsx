'use client';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  children?: ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button = ({
  text = "",
  variant = 'primary',
  disabled = false,
  className = '',
  children,
  onClick,
  type = 'button',
  ...props
}: ButtonProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault()
      return
    }
    
    if (typeof onClick === 'function') {
      onClick(event)
    }
  }

  // Determine the button class based on variant
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  const finalClassName = `${baseClass} ${className}`.trim();

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={finalClassName}
      aria-disabled={disabled}
      {...props}
    >
      {children || text}
    </button>
  )
}

export default Button