'use client';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { SelectHTMLAttributes, useState, useRef, useEffect } from 'react';
 import Image from'next/image';

const dropdownClasses = cva(
  'relative inline-flex items-center justify-between w-full px-3 py-2 text-base font-normal bg-white border border-border-primary rounded-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-light focus:border-primary-background disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-gray-50',
  {
    variants: {
      variant: {
        default: 'bg-white border-border-primary text-text-primary',
        filled: 'bg-secondary-light text-white border-secondary-light',
        outlined: 'bg-transparent border-2 border-border-primary text-text-primary',
      },
      size: {
        small: 'text-xs px-2 py-1',
        medium: 'text-sm px-3 py-2',
        large: 'text-md px-4 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  }
)

interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface DropdownProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>, VariantProps<typeof dropdownClasses> {
  // Optional parameters
  layout_gap?: string;
  layout_width?: string;
  padding?: string;
  position?: string;
  
  // Dropdown specific props
  options?: DropdownOption[];
  placeholder?: string;
  onSelectionChange?: (value: string) => void;
  leftImage?: {
    src: string;
    width: number;
    height: number;
  };
  rightImage?: {
    src: string;
    width: number;
    height: number;
  };
}

const Dropdown = ({
  // Optional parameters
  layout_gap,
  layout_width,
  padding,
  position,
  
  // Dropdown specific props
  options = [],
  placeholder = "Select an option",
  onSelectionChange,
  leftImage,
  rightImage,
  
  // Standard React props
  variant,
  size,
  disabled = false,
  className,
  value,
  onChange,
  ...props
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string>(value as string || '')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Safe validation for optional parameters
  const hasValidGap = layout_gap && typeof layout_gap === 'string' && layout_gap.trim() !== ''
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width.trim() !== ''
  const hasValidPadding = padding && typeof padding === 'string' && padding.trim() !== ''
  const hasValidPosition = position && typeof position === 'string' && position.trim() !== ''

  const optionalClasses = [
    hasValidGap ? `gap-[${layout_gap}]` : 'gap-2',
    hasValidWidth ? `w-[${layout_width}]` : '',
    hasValidPadding ? `p-[${padding}]` : '',
    hasValidPosition ? position : '',
  ].filter(Boolean).join(' ')

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue)
    setIsOpen(false)
    
    if (onSelectionChange) {
      onSelectionChange(optionValue)
    }
    
    if (onChange) {
      const syntheticEvent = {
        target: { value: optionValue }
      } as React.ChangeEvent<HTMLSelectElement>
      onChange(syntheticEvent)
    }
  }

  const selectedOption = options.find(option => option.value === selectedValue)

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div
        className={twMerge(
          dropdownClasses({ variant, size }),
          optionalClasses,
          className
        )}
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleToggle()
          }
        }}
      >
        <div className="flex items-center flex-1">
          {leftImage && (
            <Image
              src={leftImage.src}
              width={leftImage.width}
              height={leftImage.height}
              alt="Left icon"
              className="mr-2 flex-shrink-0"
            />
          )}
          <span className={`flex-1 ${selectedOption ? 'text-text-primary' : 'text-gray-400'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        
        <div className="flex items-center ml-2">
          {rightImage && (
            <Image
              src={rightImage.src}
              width={rightImage.width}
              height={rightImage.height}
              alt="Right icon"
              className="flex-shrink-0"
            />
          )}
          <svg
            className={`w-4 h-4 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-border-primary rounded-sm shadow-lg max-h-60 overflow-auto">
          {options.length === 0 ? (
            <div className="px-3 py-2 text-text-secondary">No options available</div>
          ) : (
            options.map((option) => (
              <div
                key={option.value}
                className={`px-3 py-2 cursor-pointer transition-colors duration-150 ${
                  option.disabled 
                    ? 'opacity-50 cursor-not-allowed text-text-secondary' :'hover:bg-gray-50 text-text-primary'
                } ${selectedValue === option.value ? 'bg-primary-light text-white' : ''}`}
                onClick={() => !option.disabled && handleSelect(option.value)}
                role="option"
                aria-selected={selectedValue === option.value}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Dropdown