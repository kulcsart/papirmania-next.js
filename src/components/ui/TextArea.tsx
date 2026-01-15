'use client';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { TextareaHTMLAttributes, forwardRef, useState } from 'react';

const textAreaClasses = cva(
  'w-full px-3 py-2 text-base font-normal transition-all duration-200 focus:outline-none outline outline-1 disabled:opacity-50 disabled:cursor-not-allowed resize-vertical rounded-[6px] flex items-start',
  {
    variants: {
      variant: {
        default: 'bg-input/5 outline-muted text-white placeholder-muted focus:outline-2 focus:outline-offset-0',
        filled: 'bg-input/10 outline-muted text-white placeholder-muted focus:outline-2 focus:outline-offset-0',
        outlined: 'bg-transparent outline-muted text-white placeholder-muted focus:outline-2 focus:outline-offset-0',
      },
      size: {
        small: 'text-sm px-3 py-2 min-h-[80px]',
        medium: 'text-base px-3 py-2 min-h-[120px]',
        large: 'text-lg px-4 py-3 min-h-[160px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  }
)

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textAreaClasses> {
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
  maxCharCount?: number;
  showCharCount?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
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
  maxCharCount,
  showCharCount = false,
  
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
  rows = 4,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false)
  const [charCount, setCharCount] = useState<number>(
    typeof value === 'string' ? value.length : 0
  )

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

  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true)
    if (onFocus) onFocus(event)
  }

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false)
    if (onBlur) onBlur(event)
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value
    
    // Update character count
    setCharCount(newValue.length)
    
    // Check max character limit
    if (maxCharCount && newValue.length > maxCharCount) {
      return // Don't allow typing beyond max
    }
    
    if (onChange) {
      onChange(event)
    }
  }

  const isOverLimit = maxCharCount && charCount > maxCharCount
  const isNearLimit = maxCharCount && charCount > maxCharCount * 0.8

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-1">
          {label}
        </label>
      )}
      
      <div className="relative w-full">
        <textarea
          ref={ref}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          rows={rows}
          maxLength={maxCharCount}
          className={twMerge(
            textAreaClasses({ variant, size }),
            styleClasses,
            optionalClasses,
            'w-full',
            isOverLimit ? 'border-red-500 focus:ring-red-300' : '',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error 
              ? `${props.id}-error` 
              : helperText 
                ? `${props.id}-helper` 
                : undefined
          }
          {...props}
        />
        
        {showCharCount && maxCharCount && (
          <div 
            className={`absolute bottom-2 right-2 text-xs px-2 py-1 rounded bg-white shadow-sm border ${
              isOverLimit 
                ? 'text-red-600 border-red-300' 
                : isNearLimit 
                  ? 'text-yellow-600 border-yellow-300' :'text-text-secondary border-gray-200'
            }`}
          >
            {charCount}/{maxCharCount}
          </div>
        )}
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

TextArea.displayName = 'TextArea'

export default TextArea