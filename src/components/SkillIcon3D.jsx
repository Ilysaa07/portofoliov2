import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Box, Sphere, Cylinder, Torus } from '@react-three/drei'
import * as THREE from 'three'

// Individual 3D Icon Components
const ReactIcon = ({ position = [0, 0, 0] }) => {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <Sphere args={[0.3, 16, 16]}>
        <meshStandardMaterial color="#61dafb" metalness={0.3} roughness={0.4} />
      </Sphere>
      <Torus args={[0.5, 0.05, 8, 16]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#61dafb" metalness={0.8} roughness={0.2} />
      </Torus>
      <Torus args={[0.5, 0.05, 8, 16]} rotation={[Math.PI / 2, Math.PI / 3, 0]}>
        <meshStandardMaterial color="#61dafb" metalness={0.8} roughness={0.2} />
      </Torus>
      <Torus args={[0.5, 0.05, 8, 16]} rotation={[Math.PI / 2, -Math.PI / 3, 0]}>
        <meshStandardMaterial color="#61dafb" metalness={0.8} roughness={0.2} />
      </Torus>
    </group>
  )
}

const JavaScriptIcon = ({ position = [0, 0, 0] }) => {
  const boxRef = useRef()
  
  useFrame((state) => {
    if (boxRef.current) {
      boxRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2
      boxRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Box ref={boxRef} args={[0.8, 0.8, 0.8]} position={position}>
      <meshStandardMaterial color="#f7df1e" metalness={0.2} roughness={0.6} />
    </Box>
  )
}

const NodeIcon = ({ position = [0, 0, 0] }) => {
  const cylinderRef = useRef()
  
  useFrame((state) => {
    if (cylinderRef.current) {
      cylinderRef.current.rotation.z = state.clock.elapsedTime * 0.4
    }
  })

  return (
    <Cylinder ref={cylinderRef} args={[0.4, 0.4, 0.8, 8]} position={position}>
      <meshStandardMaterial color="#339933" metalness={0.4} roughness={0.3} />
    </Cylinder>
  )
}

const PythonIcon = ({ position = [0, 0, 0] }) => {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.6
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <Sphere args={[0.35, 16, 16]} position={[0, 0.2, 0]}>
        <meshStandardMaterial color="#3776ab" metalness={0.3} roughness={0.4} />
      </Sphere>
      <Sphere args={[0.35, 16, 16]} position={[0, -0.2, 0]}>
        <meshStandardMaterial color="#ffd43b" metalness={0.3} roughness={0.4} />
      </Sphere>
    </group>
  )
}

// 3D Skills Icon Container
const SkillIcon3D = ({ skill, className = "" }) => {
  const getIconComponent = (skillName) => {
    const name = skillName.toLowerCase()
    if (name.includes('react')) return ReactIcon
    if (name.includes('javascript') || name.includes('js')) return JavaScriptIcon
    if (name.includes('node') || name.includes('express')) return NodeIcon
    if (name.includes('python')) return PythonIcon
    return ReactIcon // Default fallback
  }

  const IconComponent = getIconComponent(skill)

  return (
    <div className={`w-16 h-16 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.4} color="#8b5cf6" />
        <IconComponent position={[0, 0, 0]} />
      </Canvas>
    </div>
  )
}

export default SkillIcon3D

