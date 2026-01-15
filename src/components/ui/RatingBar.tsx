'use client';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';

const ratingBarClasses = cva(
  'flex items-center gap-1 select-none',
  {
    variants: {
      size: {
        small: 'gap-0.5',
        medium: 'gap-1',
        large: 'gap-2',
      },
      variant: {
        default: '',
        readonly: 'pointer-events-none',
        interactive: 'cursor-pointer',
      },
    },
    defaultVariants: {
      size: 'medium',
      variant: 'default',
    },
  }
)

const starClasses = cva(
  'transition-all duration-200',
  {
    variants: {
      size: {
        small: 'w-4 h-4',
        medium: 'w-5 h-5',
        large: 'w-6 h-6',
      },
      state: {
        empty: 'text-gray-300 hover:text-yellow-400',
        filled: 'text-yellow-400',
        half: 'text-yellow-400',
      },
      interactive: {
        true: 'cursor-pointer hover:scale-110',
        false: 'cursor-default',
      },
    },
    defaultVariants: {
      size: 'medium',
      state: 'empty',
      interactive: false,
    },
  }
)

interface RatingBarProps extends VariantProps<typeof ratingBarClasses> {
  // Optional parameters
  layout_width?: string;
  position?: string;
  
  // Rating specific props
  rating?: number;
  maxRating?: number;
  allowHalfRating?: boolean;
  readonly?: boolean;
  onRatingChange?: (rating: number) => void;
  showValue?: boolean;
  className?: string;
}

const RatingBar = ({
  // Optional parameters
  layout_width,
  position,
  
  // Rating specific props
  rating = 0,
  maxRating = 5,
  allowHalfRating = true,
  readonly = false,
  onRatingChange,
  showValue = false,
  
  // Standard React props
  variant = readonly ? 'readonly' : 'interactive',
  size,
  className,
}: RatingBarProps) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)
  const [currentRating, setCurrentRating] = useState<number>(rating)

  // Safe validation for optional parameters
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width.trim() !== ''
  const hasValidPosition = position && typeof position === 'string' && position.trim() !== ''

  const optionalClasses = [
    hasValidWidth ? `w-[${layout_width}]` : '',
    hasValidPosition ? position : '',
  ].filter(Boolean).join(' ')

  const handleStarClick = (starIndex: number, isHalf: boolean = false) => {
    if (readonly) return
    
    const newRating = starIndex + (isHalf && allowHalfRating ? 0.5 : 1)
    setCurrentRating(newRating)
    
    if (onRatingChange) {
      onRatingChange(newRating)
    }
  }

  const handleStarHover = (starIndex: number, isHalf: boolean = false) => {
    if (readonly) return
    
    const hoverRating = starIndex + (isHalf && allowHalfRating ? 0.5 : 1)
    setHoveredRating(hoverRating)
  }

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoveredRating(null)
    }
  }

  const getStarState = (starIndex: number) => {
    const displayRating = hoveredRating !== null ? hoveredRating : currentRating
    
    if (displayRating >= starIndex + 1) {
      return 'filled'
    } else if (allowHalfRating && displayRating >= starIndex + 0.5) {
      return 'half'
    } else {
      return 'empty'
    }
  }

  const renderStar = (starIndex: number) => {
    const starState = getStarState(starIndex)
    const isInteractive = !readonly
    
    return (
      <div
        key={starIndex}
        className="relative"
        onMouseEnter={() => handleStarHover(starIndex)}
        onMouseLeave={handleMouseLeave}
      >
        {allowHalfRating && isInteractive ? (
          <>
            {/* Left half of star */}
            <div
              className="absolute inset-0 w-1/2 overflow-hidden cursor-pointer z-10"
              onClick={() => handleStarClick(starIndex, true)}
              onMouseEnter={() => handleStarHover(starIndex, true)}
            />
            {/* Right half of star */}
            <div
              className="absolute inset-0 left-1/2 w-1/2 overflow-hidden cursor-pointer z-10"
              onClick={() => handleStarClick(starIndex, false)}
              onMouseEnter={() => handleStarHover(starIndex, false)}
            />
          </>
        ) : (
          <div
            className={isInteractive ? 'cursor-pointer' : ''}
            onClick={() => handleStarClick(starIndex, false)}
          />
        )}
        
        <svg
          className={twMerge(
            starClasses({ 
              size, 
              state: starState, 
              interactive: isInteractive 
            })
          )}
          fill={starState === 'empty' ? 'none' : 'currentColor'}
          stroke={starState === 'empty' ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
        >
          {starState === 'half' ? (
            <defs>
              <linearGradient id={`half-${starIndex}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
          ) : null}
          
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={starState === 'empty' ? 2 : 0}
            fill={starState === 'half' ? `url(#half-${starIndex})` : undefined}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      </div>
    )
  }

  return (
    <div 
      className={twMerge(
        ratingBarClasses({ size, variant }),
        optionalClasses,
        className
      )}
      role="radiogroup"
      aria-label={`Rating: ${currentRating} out of ${maxRating} stars`}
    >
      {Array.from({ length: maxRating }, (_, index) => renderStar(index))}
      
      {showValue && (
        <span className="ml-2 text-sm text-text-secondary font-medium">
          {currentRating.toFixed(allowHalfRating ? 1 : 0)}/{maxRating}
        </span>
      )}
    </div>
  )
}

export default RatingBar