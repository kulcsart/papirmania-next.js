'use client';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { InputHTMLAttributes, forwardRef, useState } from 'react';

const checkboxClasses = cva(
  'flex items-start gap-3 cursor-pointer transition-all duration-200',
  {
    variants: {
      size: {
        small: 'text-xs',
        medium: 'text-sm',
        large: 'text-md',
      },
      variant: {
        default: '',
        outlined: 'border border-border-primary rounded p-2',
      },
    },
    defaultVariants: {
      size: 'medium',
      variant: 'default',
    },
  }
)

const checkboxInputClasses = cva(
  'w-5 h-5 border-2 rounded transition-all duration-200 focus:ring-2 focus:ring-offset-1 focus:ring-primary-light cursor-pointer flex-shrink-0',
  {
    variants: {
      checked: {
        true: 'bg-primary-background border-primary-background text-white',
        false: 'bg-white border-border-primary hover:border-primary-light',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      checked: false,
      disabled: false,
    },
  }
)

interface CheckBoxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof checkboxClasses> {
  // Required parameters with defaults
  text?: string;
  text_font_size?: string;
  text_font_family?: string;
  text_font_weight?: string;
  text_line_height?: string;
  text_text_align?: string;
  text_color?: string;
  
  // Optional parameters
  layout_gap?: string;
  layout_width?: string;
  padding?: string;
  position?: string;
  
  // Additional props
  label?: string;
  error?: string;
  helperText?: string;
}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(({
  // Required parameters with defaults
  text = "",
  text_font_size = "text-sm",
  text_font_family = "DM Sans",
  text_font_weight = "font-normal",
  text_line_height = "leading-md",
  text_text_align = "left",
  text_color = "text-text-muted",
  
  // Optional parameters
  layout_gap,
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
  checked,
  onChange,
  className,
  ...props
}, ref) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked || false)

  // Safe validation for optional parameters
  const hasValidGap = layout_gap && typeof layout_gap === 'string' && layout_gap.trim() !== ''
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width.trim() !== ''
  const hasValidPadding = padding && typeof padding === 'string' && padding.trim() !== ''
  const hasValidPosition = position && typeof position === 'string' && position.trim() !== ''

  const optionalClasses = [
    hasValidGap ? `gap-[${layout_gap}]` : '',
    hasValidWidth ? `w-[${layout_width}]` : '',
    hasValidPadding ? `p-[${padding}]` : '',
    hasValidPosition ? position : '',
  ].filter(Boolean).join(' ')

  // Build Tailwind classes for text styling
  const textStyleClasses = [
    text_font_size,
    text_font_family.startsWith('font-') ? text_font_family : '',
    text_font_weight,
    text_line_height,
    text_color,
    error ? 'text-red-600' : '',
  ].filter(Boolean).join(' ')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      const newChecked = event.target.checked
      setIsChecked(newChecked)
      if (onChange) {
        onChange(event)
      }
    }
  }

  const displayText = text || label || ''

  return (
    <div className="w-full">
      <label 
        className={twMerge(
          checkboxClasses({ size, variant }),
          optionalClasses,
          disabled ? 'cursor-not-allowed opacity-60' : '',
          className
        )}
        style={{
          fontFamily: text_font_family && !text_font_family.startsWith('font-') ? text_font_family : undefined,
          textAlign: text_text_align !== 'left' ? text_text_align as any : undefined,
        }}
      >
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
            className="sr-only"
            aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
            {...props}
          />
          <div 
            className={twMerge(
              checkboxInputClasses({ 
                checked: isChecked, 
                disabled 
              })
            )}
          >
            {isChecked && (
              <svg
                className="w-3 h-3 m-auto"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>
        
        {displayText && (
          <span className={twMerge(textStyleClasses, 'flex-1')}>
            {displayText}
          </span>
        )}
      </label>
      
      {error && (
        <p id={`${props.id}-error`} className="mt-1 text-sm text-red-600 ml-8">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p id={`${props.id}-helper`} className="mt-1 text-sm text-text-secondary ml-8">
          {helperText}
        </p>
      )}
    </div>
  )
})

CheckBox.displayName = 'CheckBox'

export default CheckBox