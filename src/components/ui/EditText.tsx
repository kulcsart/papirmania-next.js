'use client';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { InputHTMLAttributes, forwardRef, useState } from 'react';

const editTextClasses = cva(
  'w-full px-3 py-2 text-base font-normal transition-all duration-200 focus:outline-none outline outline-1 disabled:opacity-50 disabled:cursor-not-allowed rounded-[6px] min-h-[48px] flex items-center',
  {
    variants: {
      variant: {
        default: 'bg-input/5 outline-muted text-white placeholder-muted focus:outline-2 focus:outline-offset-0',
        filled: 'bg-input/10 outline-muted text-white placeholder-muted focus:outline-2 focus:outline-offset-0',
        outlined: 'bg-transparent outline-muted text-white placeholder-muted focus:outline-2 focus:outline-offset-0',
      },
      size: {
        small: 'text-sm px-3 py-2 min-h-[40px]',
        medium: 'text-base px-3 py-2 min-h-[48px]',
        large: 'text-lg px-4 py-3 min-h-[56px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  }
)

interface EditTextProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof editTextClasses> {
  // Required parameters with defaults
  fill_background_color?: string;
  border_border?: string;
  border_border_radius?: string;
  
  // Optional parameters
  layout_width?: string;
  padding?: string;
  position?: string;
  
  // Additional props
  label?: string;
  error?: string;
  helperText?: string;
}

const EditText = forwardRef<HTMLInputElement, EditTextProps>(({
  // Required parameters with defaults
  fill_background_color = "bg-input/5",
  border_border = "outline outline-1 outline-muted",
  border_border_radius = "rounded-[6px]",
  
  // Optional parameters
  layout_width,
  padding,
  position,
  
  // Additional props
  label,
  error,
  helperText,
  
  // Standard React props
  variant,
  size,
  disabled = false,
  className,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false)

  // Safe validation for optional parameters
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width.trim() !== ''
  const hasValidPadding = padding && typeof padding === 'string' && padding.trim() !== ''
  const hasValidPosition = position && typeof position === 'string' && position.trim() !== ''

  const optionalClasses = [
    hasValidWidth ? `w-[${layout_width}]` : '',
    hasValidPadding ? `p-[${padding}]` : '',
    hasValidPosition ? position : '',
  ].filter(Boolean).join(' ')

  // Build Tailwind classes for styling
  const styleClasses = [
    fill_background_color,
    border_border,
    border_border_radius,
    error ? 'border-red-500 focus:ring-red-300 focus:border-red-500' : '',
  ].filter(Boolean).join(' ')

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    if (onFocus) onFocus(event)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    if (onBlur) onBlur(event)
  }

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-1">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          ref={ref}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={twMerge(
            editTextClasses({ variant, size }),
            styleClasses,
            optionalClasses,
            'w-full',
            isFocused ? 'ring-2' : '',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
          {...props}
        />
      </div>
      {error && (
        <p id={`${props.id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${props.id}-helper`} className="mt-1 text-sm text-text-secondary">
          {helperText}
        </p>
      )}
    </div>
  )
})

EditText.displayName = 'EditText'

export default EditText