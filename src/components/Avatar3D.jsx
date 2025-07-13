import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Box, Torus, Cylinder } from '@react-three/drei'
import * as THREE from 'three'

// Sun Component for Light Mode
const SunAvatar = () => {
  const groupRef = useRef()
  const sphereRef = useRef()
  const raysRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.2
      // Gentle pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
      sphereRef.current.scale.setScalar(scale)
    }
    if (raysRef.current) {
      raysRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  // Create sun rays
  const sunRays = useMemo(() => {
    const rays = []
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      const x = Math.cos(angle) * 2
      const y = Math.sin(angle) * 2
      rays.push(
        <Box
          key={i}
          args={[0.1, 0.8, 0.1]}
          position={[x, y, 0]}
          rotation={[0, 0, angle]}
        >
          <meshStandardMaterial 
            color="#fbbf24" 
            metalness={0.3} 
            roughness={0.4}
            transparent
            opacity={0.8}
          />
        </Box>
      )
    }
    return rays
  }, [])

  return (
    <group ref={groupRef}>
      {/* Main sun sphere */}
      <Sphere ref={sphereRef} args={[1.2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#f59e0b" 
          metalness={0.2} 
          roughness={0.3}
          emissive="#fbbf24"
          emissiveIntensity={0.3}
        />
      </Sphere>
      
      {/* Sun rays */}
      <group ref={raysRef}>
        {sunRays}
      </group>
      
      {/* Inner glow effect */}
      <Sphere args={[1.4, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#fbbf24" 
          transparent
          opacity={0.2}
          metalness={0.1}
          roughness={0.8}
        />
      </Sphere>
      
      {/* Floating particles */}
      <Box args={[0.15, 0.15, 0.15]} position={[2.2, 0.8, 0.5]}>
        <meshStandardMaterial color="#f59e0b" metalness={0.5} roughness={0.3} />
      </Box>
      
      <Box args={[0.1, 0.1, 0.1]} position={[-2.0, -1.2, 0.8]}>
        <meshStandardMaterial color="#fbbf24" metalness={0.5} roughness={0.3} />
      </Box>
    </group>
  )
}

// Moon Component for Dark Mode
const MoonAvatar = () => {
  const groupRef = useRef()
  const sphereRef = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
    if (glowRef.current) {
      const intensity = 0.3 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1
      glowRef.current.material.opacity = intensity
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main moon sphere */}
      <Sphere ref={sphereRef} args={[1.1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#e5e7eb" 
          metalness={0.1} 
          roughness={0.8}
          emissive="#6b7280"
          emissiveIntensity={0.1}
        />
      </Sphere>
      
      {/* Moon craters */}
      <Sphere args={[0.2, 16, 16]} position={[0.4, 0.3, 0.8]}>
        <meshStandardMaterial 
          color="#9ca3af" 
          metalness={0.1} 
          roughness={0.9}
        />
      </Sphere>
      
      <Sphere args={[0.15, 16, 16]} position={[-0.5, -0.2, 0.9]}>
        <meshStandardMaterial 
          color="#9ca3af" 
          metalness={0.1} 
          roughness={0.9}
        />
      </Sphere>
      
      <Sphere args={[0.1, 16, 16]} position={[0.2, -0.6, 0.8]}>
        <meshStandardMaterial 
          color="#9ca3af" 
          metalness={0.1} 
          roughness={0.9}
        />
      </Sphere>
      
      {/* Outer glow effect */}
      <Sphere ref={glowRef} args={[1.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#60a5fa" 
          transparent
          opacity={0.2}
          metalness={0.1}
          roughness={0.8}
        />
      </Sphere>
      
      {/* Floating stars */}
      <Box args={[0.08, 0.08, 0.08]} position={[2.5, 1.2, 0.3]}>
        <meshStandardMaterial 
          color="#f8fafc" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#f8fafc"
          emissiveIntensity={0.5}
        />
      </Box>
      
      <Box args={[0.06, 0.06, 0.06]} position={[-2.2, -0.8, 0.6]}>
        <meshStandardMaterial 
          color="#f8fafc" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#f8fafc"
          emissiveIntensity={0.5}
        />
      </Box>
      
      <Box args={[0.05, 0.05, 0.05]} position={[1.8, -1.5, 0.4]}>
        <meshStandardMaterial 
          color="#f8fafc" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#f8fafc"
          emissiveIntensity={0.5}
        />
      </Box>
    </group>
  )
}

// Main Avatar Component with Theme Support
const ThemeAvatar = ({ darkMode = false }) => {
  return (
    <group>
      {darkMode ? <MoonAvatar /> : <SunAvatar />}
    </group>
  )
}

// 3D Scene Container with Theme Support
const Avatar3DContainer = ({ className = "", darkMode = false }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={darkMode ? 0.3 : 0.6} />
        <pointLight 
          position={[10, 10, 10]} 
          intensity={darkMode ? 0.8 : 1.2} 
          color={darkMode ? "#60a5fa" : "#fbbf24"}
        />
        <pointLight 
          position={[-10, -10, -10]} 
          intensity={darkMode ? 0.4 : 0.6} 
          color={darkMode ? "#a78bfa" : "#f59e0b"} 
        />
        <ThemeAvatar darkMode={darkMode} />
      </Canvas>
    </div>
  )
}

export default Avatar3DContainer

