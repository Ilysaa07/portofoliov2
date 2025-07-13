import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Text3D, Center } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'

// 3D Avatar Component
function Avatar3D() {
  return (
    <group>
      {/* Head */}
      <Sphere args={[1, 32, 32]} position={[0, 1.5, 0]}>
        <MeshDistortMaterial
          color="#4f46e5"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.4}
        />
      </Sphere>
      
      {/* Body */}
      <Sphere args={[0.8, 32, 32]} position={[0, 0, 0]} scale={[1, 1.5, 0.8]}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.2}
          speed={1.5}
          roughness={0.3}
        />
      </Sphere>
      
      {/* Arms */}
      <Sphere args={[0.3, 16, 16]} position={[-1.2, 0.5, 0]} scale={[1, 2, 1]}>
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.1}
          speed={1}
        />
      </Sphere>
      <Sphere args={[0.3, 16, 16]} position={[1.2, 0.5, 0]} scale={[1, 2, 1]}>
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.1}
          speed={1}
        />
      </Sphere>
    </group>
  )
}

// Floating particles component
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => (
    <Sphere key={i} args={[0.02, 8, 8]} position={[
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    ]}>
      <MeshDistortMaterial
        color="#a855f7"
        attach="material"
        distort={0.5}
        speed={Math.random() * 2 + 1}
      />
    </Sphere>
  ))
  
  return <group>{particles}</group>
}

const HeroSection = () => {
  const scrollToNext = () => {
    const skillsSection = document.getElementById('skills')
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Alex Johnson
              </span>
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-muted-foreground"
            >
              Full-Stack Developer & UI/UX Designer
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg text-muted-foreground max-w-lg leading-relaxed"
            >
              I create exceptional digital experiences through innovative web applications, 
              combining cutting-edge technology with intuitive design to bring ideas to life.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Button 
              size="lg" 
              onClick={() => scrollToNext()}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
              View My Work
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="lg">
              Download CV
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex space-x-4"
          >
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <Mail className="h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Content - 3D Avatar */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-96 lg:h-[500px] relative"
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            <Suspense fallback={null}>
              <Avatar3D />
              <FloatingParticles />
            </Suspense>
            
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              autoRotate
              autoRotateSpeed={1}
            />
          </Canvas>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="cursor-pointer"
          onClick={scrollToNext}
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection

