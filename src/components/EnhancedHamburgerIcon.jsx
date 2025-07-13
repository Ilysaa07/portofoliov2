import React from 'react'

const EnhancedHamburgerIcon = ({ 
  isOpen = false, 
  onClick, 
  className = "",
  size = 24,
  strokeWidth = 2,
  color = "currentColor"
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        hamburger-icon group relative p-3 rounded-lg transition-all duration-300 ease-in-out
        hover:bg-muted/50 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50
        ${isOpen ? 'open' : ''}
        ${className}
      `}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      {/* Animated Background */}
      <div className="hamburger-ripple" />
      
      {/* Icon Container */}
      <div 
        className="relative flex flex-col justify-center items-center"
        style={{ width: size, height: size }}
      >
        {/* Animated Circle */}
        <div className="hamburger-circle" />
        
        {/* Top Line */}
        <span
          className={`
            hamburger-line absolute block transition-all duration-300 ease-in-out
            ${isOpen 
              ? 'rotate-45 translate-y-0' 
              : '-translate-y-1.5 rotate-0'
            }
          `}
          style={{ 
            width: size * 0.7,
            height: strokeWidth,
            backgroundColor: color,
            borderRadius: strokeWidth / 2
          }}
        />
        
        {/* Middle Line */}
        <span
          className={`
            hamburger-line absolute block transition-all duration-300 ease-in-out
            ${isOpen 
              ? 'opacity-0 scale-0 rotate-180' 
              : 'opacity-100 scale-100 rotate-0'
            }
          `}
          style={{ 
            width: size * 0.7,
            height: strokeWidth,
            backgroundColor: color,
            borderRadius: strokeWidth / 2
          }}
        />
        
        {/* Bottom Line */}
        <span
          className={`
            hamburger-line absolute block transition-all duration-300 ease-in-out
            ${isOpen 
              ? '-rotate-45 translate-y-0' 
              : 'translate-y-1.5 rotate-0'
            }
          `}
          style={{ 
            width: size * 0.7,
            height: strokeWidth,
            backgroundColor: color,
            borderRadius: strokeWidth / 2
          }}
        />
        
        {/* Pulse Effect for Active State */}
        <div
          className={`
            absolute inset-0 rounded-full transition-all duration-500 ease-in-out
            ${isOpen 
              ? 'animate-pulse bg-primary/10 scale-150' 
              : 'scale-0 bg-transparent'
            }
          `}
        />
      </div>
      
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Click Feedback */}
      <div className="absolute inset-0 rounded-lg bg-primary/20 scale-0 group-active:scale-100 transition-transform duration-150" />
    </button>
  )
}

export default EnhancedHamburgerIcon

