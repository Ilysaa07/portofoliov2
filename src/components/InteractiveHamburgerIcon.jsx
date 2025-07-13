import React from 'react'

const InteractiveHamburgerIcon = ({ 
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
        relative p-2 rounded-lg transition-all duration-300 ease-in-out
        hover:bg-muted/50 hover:scale-110 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-primary/50
        ${className}
      `}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <div 
        className="relative flex flex-col justify-center items-center"
        style={{ width: size, height: size }}
      >
        {/* Top Line */}
        <span
          className={`
            absolute block h-0.5 bg-current transition-all duration-300 ease-in-out
            ${isOpen 
              ? 'rotate-45 translate-y-0' 
              : '-translate-y-2 rotate-0'
            }
          `}
          style={{ 
            width: size * 0.75,
            backgroundColor: color,
            transformOrigin: 'center'
          }}
        />
        
        {/* Middle Line */}
        <span
          className={`
            absolute block h-0.5 bg-current transition-all duration-300 ease-in-out
            ${isOpen 
              ? 'opacity-0 scale-0' 
              : 'opacity-100 scale-100'
            }
          `}
          style={{ 
            width: size * 0.75,
            backgroundColor: color
          }}
        />
        
        {/* Bottom Line */}
        <span
          className={`
            absolute block h-0.5 bg-current transition-all duration-300 ease-in-out
            ${isOpen 
              ? '-rotate-45 translate-y-0' 
              : 'translate-y-2 rotate-0'
            }
          `}
          style={{ 
            width: size * 0.75,
            backgroundColor: color,
            transformOrigin: 'center'
          }}
        />
        
        {/* Animated Background Circle */}
        <div
          className={`
            absolute inset-0 rounded-full border-2 transition-all duration-500 ease-in-out
            ${isOpen 
              ? 'scale-100 opacity-20 border-primary' 
              : 'scale-0 opacity-0 border-transparent'
            }
          `}
        />
      </div>
      
      {/* Ripple Effect */}
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 scale-0 rounded-lg transition-transform duration-300 ease-out hover:scale-100" />
      </div>
    </button>
  )
}

export default InteractiveHamburgerIcon

