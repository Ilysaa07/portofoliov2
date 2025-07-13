import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Box, Sphere, Cylinder, Text3D, Center, Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import Tilt from 'react-tilt'
import { useInView } from 'react-intersection-observer'

// 3D Skill Icon Component
function SkillIcon3D({ type, color }) {
  const getShape = () => {
    switch (type) {
      case 'frontend':
        return (
          <Box args={[1, 1, 1]}>
            <meshStandardMaterial color={color} />
          </Box>
        )
      case 'backend':
        return (
          <Cylinder args={[0.5, 0.5, 1, 8]}>
            <meshStandardMaterial color={color} />
          </Cylinder>
        )
      case 'database':
        return (
          <Sphere args={[0.6, 16, 16]}>
            <meshStandardMaterial color={color} />
          </Sphere>
        )
      case 'tools':
        return (
          <Box args={[0.8, 0.8, 0.8]} rotation={[0.5, 0.5, 0]}>
            <meshStandardMaterial color={color} />
          </Box>
        )
      default:
        return (
          <Box args={[1, 1, 1]}>
            <meshStandardMaterial color={color} />
          </Box>
        )
    }
  }

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      {getShape()}
    </Float>
  )
}

// Individual Skill Card Component
const SkillCard = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Tilt
        options={{
          max: 25,
          scale: 1.05,
          speed: 450,
          glare: true,
          'max-glare': 0.5,
        }}
        className="w-full"
      >
        <div className="bg-card border border-border rounded-xl p-6 h-full hover:shadow-lg transition-all duration-300 group">
          {/* 3D Icon */}
          <div className="h-32 mb-4 relative">
            <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[5, 5, 5]} intensity={0.8} />
              <pointLight position={[-5, -5, -5]} intensity={0.4} />
              
              <Suspense fallback={null}>
                <SkillIcon3D type={skill.type} color={skill.color} />
              </Suspense>
            </Canvas>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              {skill.name}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {skill.description}
            </p>
            
            {/* Technologies */}
            <div className="flex flex-wrap gap-2 pt-2">
              {skill.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="pt-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Proficiency</span>
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  viewport={{ once: true }}
                  className="h-2 rounded-full bg-gradient-to-r from-primary to-purple-600"
                />
              </div>
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  )
}

const SkillsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skills = [
    {
      name: 'Frontend Development',
      type: 'frontend',
      color: '#3b82f6',
      level: 85,
      description: 'Creating responsive and interactive user interfaces with modern frameworks and libraries.',
      technologies: ['React', 'Tailwind CSS', 'Bootstrap', 'Animate CSS', 'GSAP']
    },
    {
      name: 'Backend Development',
      type: 'backend',
      color: '#10b981',
      level: 90,
      description: 'Building robust server-side applications and APIs with scalable architecture.',
      technologies: ['Node.js', 'Express', 'PHP']
    },
    {
      name: 'Database Management',
      type: 'database',
      color: '#f59e0b',
      level: 85,
      description: 'Designing and optimizing database systems for efficient data storage and retrieval.',
      technologies: ['MongoDB', 'MySQL']
    },
    {
      name: 'DevOps & Tools',
      type: 'tools',
      color: '#8b5cf6',
      level: 80,
      description: 'Implementing CI/CD pipelines and managing cloud infrastructure for seamless deployment.',
      technologies: ['Postman', 'XAMPP', 'Git', 'Github']
    },
    {
      name: 'Mobile Development',
      type: 'frontend',
      color: '#ef4444',
      level: 75,
      description: 'Developing cross-platform mobile applications with native performance.',
      technologies: ['React Native', 'Flutter', 'Expo', 'iOS', 'Android']
    },
    {
      name: 'UI/UX Design',
      type: 'frontend',
      color: '#06b6d4',
      level: 85,
      description: 'Creating intuitive and visually appealing user experiences through design thinking.',
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research']
    }
  ]

  return (
    <section id="skills" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical Skills
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and the technologies 
            I use to create exceptional digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} />
          ))}
        </div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div className="space-y-2">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-primary"
            >
              50+
            </motion.div>
            <p className="text-muted-foreground">Projects Completed</p>
          </div>
          <div className="space-y-2">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-primary"
            >
              5+
            </motion.div>
            <p className="text-muted-foreground">Years Experience</p>
          </div>
          <div className="space-y-2">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-primary"
            >
              30+
            </motion.div>
            <p className="text-muted-foreground">Happy Clients</p>
          </div>
          <div className="space-y-2">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-primary"
            >
              15+
            </motion.div>
            <p className="text-muted-foreground">Technologies</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsSection

