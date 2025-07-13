import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, X, Home, User, Briefcase, FolderOpen, Mail, Github, Linkedin, ExternalLink } from 'lucide-react'

const SidebarNavigation = ({ 
  isOpen, 
  onClose, 
  darkMode, 
  toggleDarkMode, 
  scrollToSection 
}) => {
  const sidebarRef = useRef(null)

  // Handle outside click to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
        onClose()
      }
    }

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'hidden' // Prevent background scroll
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])
  const navigationItems = [
    { id: 'hero', label: 'HOME', icon: Home },
    { id: 'about', label: 'ABOUT', icon: User },
    { id: 'experience', label: 'EXPERIENCE', icon: Briefcase },
    { id: 'works', label: 'WORKS', icon: FolderOpen },
    { id: 'contact', label: 'CONTACT', icon: Mail }
  ]

  const socialLinks = [
    { 
      href: 'https://github.com/ilysaa07', 
      icon: Github, 
      label: 'GitHub',
      external: true 
    },
    { 
      href: '#', 
      icon: Linkedin, 
      label: 'LinkedIn',
      external: true 
    }
  ]

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId)
    onClose()
  }

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  }

  const overlayVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  }

  const itemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    },
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            ref={sidebarRef}
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed top-0 left-0 h-full w-80 bg-background/95 backdrop-blur-md border-r border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <motion.div 
                className="flex items-center space-x-3"
                variants={itemVariants}
              >
                <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
                  <div className="w-6 h-6 bg-background rounded-sm"></div>
                </div>
                <div>
                  <h2 className="font-medium text-sm">Ilyasa Meydiansyah</h2>
                  <p className="text-xs text-muted-foreground">Web Developer</p>
                </div>
              </motion.div>
              
              {/* Enhanced Close Button */}
              <motion.button
                onClick={onClose}
                className="group relative p-2 hover:bg-accent rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close sidebar"
              >
                <X className="h-4 w-4 transition-transform group-hover:rotate-90" />
                <div className="absolute inset-0 rounded-lg bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-6">
              <div className="space-y-2">
                {navigationItems.map((item, index) => {
                  const IconComponent = item.icon
                  return (
                    <motion.button
                      key={item.id}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleNavClick(item.id)}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-accent rounded-sm transition-colors group"
                    >
                      <IconComponent className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">
                        {item.label}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-border/50 space-y-4">
              {/* Theme Toggle */}
              <motion.button
                variants={itemVariants}
                onClick={toggleDarkMode}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-accent rounded-sm transition-colors group"
              >
                {darkMode ? (
                  <Sun className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                ) : (
                  <Moon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </motion.button>

              {/* Social Links */}
              <div className="space-y-2">
                <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase px-4">
                  Connect
                </p>
                {socialLinks.map((link, index) => {
                  const IconComponent = link.icon
                  return (
                    <motion.a
                      key={link.label}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      transition={{ delay: (navigationItems.length + index) * 0.1 }}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-accent rounded-sm transition-colors group"
                    >
                      <IconComponent className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">
                        {link.label}
                      </span>
                      {link.external && (
                        <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors ml-auto" />
                      )}
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default SidebarNavigation

