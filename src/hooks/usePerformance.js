import { useState, useEffect, useRef, useCallback } from 'react'

// Hook for intersection observer with performance optimizations
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [hasIntersected, options])

  return [elementRef, isIntersecting, hasIntersected]
}

// Hook for lazy loading images with performance optimizations
export const useLazyImage = (src, placeholder = null) => {
  const [imageSrc, setImageSrc] = useState(placeholder)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const [elementRef, isIntersecting] = useIntersectionObserver()

  useEffect(() => {
    if (isIntersecting && src && !isLoaded && !isError) {
      const img = new Image()
      
      img.onload = () => {
        setImageSrc(src)
        setIsLoaded(true)
      }
      
      img.onerror = () => {
        setIsError(true)
      }
      
      img.src = src
    }
  }, [isIntersecting, src, isLoaded, isError])

  return { elementRef, imageSrc, isLoaded, isError }
}

// Hook for performance monitoring
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: 0,
    loadTime: 0
  })

  useEffect(() => {
    // Monitor FPS
    let frameCount = 0
    let lastTime = performance.now()
    
    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        setMetrics(prev => ({
          ...prev,
          fps: Math.round((frameCount * 1000) / (currentTime - lastTime))
        }))
        frameCount = 0
        lastTime = currentTime
      }
      
      requestAnimationFrame(measureFPS)
    }
    
    requestAnimationFrame(measureFPS)

    // Monitor memory usage (if available)
    if ('memory' in performance) {
      const updateMemory = () => {
        setMetrics(prev => ({
          ...prev,
          memory: Math.round(performance.memory.usedJSHeapSize / 1048576) // MB
        }))
      }
      
      const memoryInterval = setInterval(updateMemory, 5000)
      return () => clearInterval(memoryInterval)
    }
  }, [])

  return metrics
}

// Hook for optimized 3D rendering
export const use3DOptimization = () => {
  const [shouldRender3D, setShouldRender3D] = useState(true)
  const [quality, setQuality] = useState('high')

  useEffect(() => {
    // Check device capabilities
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    
    if (!gl) {
      setShouldRender3D(false)
      return
    }

    // Check for mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    // Check memory and performance
    const hasLowMemory = 'memory' in performance && performance.memory.totalJSHeapSize < 100 * 1048576 // 100MB
    
    if (isMobile || hasLowMemory) {
      setQuality('low')
    }

    // Monitor performance and adjust quality
    let frameCount = 0
    let lastTime = performance.now()
    
    const monitorPerformance = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 2000) {
        const fps = (frameCount * 1000) / (currentTime - lastTime)
        
        if (fps < 30 && quality === 'high') {
          setQuality('medium')
        } else if (fps < 20 && quality === 'medium') {
          setQuality('low')
        } else if (fps < 15) {
          setShouldRender3D(false)
        }
        
        frameCount = 0
        lastTime = currentTime
      }
      
      if (shouldRender3D) {
        requestAnimationFrame(monitorPerformance)
      }
    }
    
    requestAnimationFrame(monitorPerformance)
  }, [shouldRender3D, quality])

  return { shouldRender3D, quality }
}

// Hook for preloading critical resources
export const usePreloader = (resources = []) => {
  const [loadedResources, setLoadedResources] = useState(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (resources.length === 0) {
      setIsLoading(false)
      return
    }

    const loadResource = (url) => {
      return new Promise((resolve, reject) => {
        if (url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          const img = new Image()
          img.onload = () => resolve(url)
          img.onerror = reject
          img.src = url
        } else if (url.match(/\.(mp4|webm|ogg)$/i)) {
          const video = document.createElement('video')
          video.onloadeddata = () => resolve(url)
          video.onerror = reject
          video.src = url
        } else {
          // For other resources, use fetch
          fetch(url)
            .then(() => resolve(url))
            .catch(reject)
        }
      })
    }

    const loadAllResources = async () => {
      const loaded = new Set()
      
      for (let i = 0; i < resources.length; i++) {
        try {
          const resource = await loadResource(resources[i])
          loaded.add(resource)
          setLoadedResources(new Set(loaded))
          setProgress(((i + 1) / resources.length) * 100)
        } catch (error) {
          console.warn(`Failed to load resource: ${resources[i]}`, error)
        }
      }
      
      setIsLoading(false)
    }

    loadAllResources()
  }, [resources])

  return { loadedResources, isLoading, progress }
}

// Hook for scroll-based animations
export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('down')

  useEffect(() => {
    let lastScrollY = window.scrollY

    const updateScrollY = () => {
      const currentScrollY = window.scrollY
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up')
      setScrollY(currentScrollY)
      lastScrollY = currentScrollY
    }

    const throttledUpdateScrollY = throttle(updateScrollY, 16) // ~60fps

    window.addEventListener('scroll', throttledUpdateScrollY)
    return () => window.removeEventListener('scroll', throttledUpdateScrollY)
  }, [])

  return { scrollY, scrollDirection }
}

// Utility function for throttling
const throttle = (func, limit) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

