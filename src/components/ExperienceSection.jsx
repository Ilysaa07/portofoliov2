import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Award, Briefcase, ExternalLink, Star } from 'lucide-react'

const ExperienceSection = () => {
  const experiences = [
    {
      id: 1,
      type: 'internship',
      title: 'Fullstack Developer Intern',
      company: 'PT. Zahir Accounting',
      period: 'Aug – Dec 2024',
      location: 'Bandung, Indonesia',
      description: 'Built web applications using React, Express.js, and Tailwind CSS. Developed full-stack solutions and collaborated with senior developers on enterprise-level projects.',
      technologies: ['React', 'Express.js', 'Tailwind CSS', 'Node.js', 'MySQL'],
      icon: Briefcase,
      color: 'blue',
      achievements: ['Built 3 full-stack applications', 'Improved code efficiency by 25%', 'Collaborated with 5+ developers']
    },
    {
      id: 2,
      type: 'competition',
      title: 'SMK Coding Competition',
      company: 'Alkademi',
      period: '2024',
      location: 'SMK Yadika Soreang',
      description: 'Represented SMK Yadika Soreang as a team leader. Developed creative web apps using HTML, CSS, and JavaScript, leading a team of 4 developers.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Team Leadership', 'Project Management'],
      icon: Award,
      color: 'amber',
      achievements: ['Led team of 4 developers', 'Created innovative web solutions', 'Represented school successfully']
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="experience" className="section-minimal bg-secondary/10">
      <div className="container-minimal">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-muted-foreground tracking-wider mb-4">MY JOURNEY</p>
          <h2 className="text-4xl font-bold mb-6">Experience & Achievements</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A timeline of my professional growth and key milestones in my development journey.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden lg:block"></div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-16"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 top-8 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg hidden lg:block z-10"></div>

                {/* Experience Card */}
                <div className="lg:ml-20">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="group relative overflow-hidden"
                  >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="card-minimal p-8 hover:shadow-2xl transition-all duration-500 border-l-4 border-primary/20 hover:border-primary relative z-10">
                      <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Content - Main Info */}
                        <div className="lg:col-span-2 space-y-6">
                          <div className="flex items-start gap-4">
                            <div className={`p-4 rounded-xl bg-${exp.color}-100 dark:bg-${exp.color}-900/20 group-hover:scale-110 transition-transform duration-300`}>
                              <exp.icon className={`h-7 w-7 text-${exp.color}-600 dark:text-${exp.color}-400`} />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <span className={`px-3 py-1 text-xs font-bold rounded-full bg-${exp.color}-100 text-${exp.color}-700 dark:bg-${exp.color}-900/20 dark:text-${exp.color}-300 uppercase tracking-wider`}>
                                  {exp.type}
                                </span>
                                <div className="flex items-center gap-1 text-amber-500">
                                  <Star className="h-4 w-4 fill-current" />
                                  <Star className="h-4 w-4 fill-current" />
                                  <Star className="h-4 w-4 fill-current" />
                                </div>
                              </div>
                              
                              <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                                {exp.title}
                              </h3>
                              
                              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                                <div className="flex items-center gap-2">
                                  <Briefcase className="h-4 w-4" />
                                  <span className="font-medium">{exp.company}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  <span>{exp.period}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  <span>{exp.location}</span>
                                </div>
                              </div>
                              
                              <p className="text-muted-foreground leading-relaxed text-base">
                                {exp.description}
                              </p>
                            </div>
                          </div>

                          {/* Key Achievements */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-bold text-muted-foreground tracking-wider uppercase">Key Achievements</h4>
                            <div className="grid gap-2">
                              {exp.achievements.map((achievement, achIndex) => (
                                <motion.div
                                  key={achIndex}
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.4, delay: achIndex * 0.1 }}
                                  viewport={{ once: true }}
                                  className="flex items-center gap-3"
                                >
                                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                                  <span className="text-sm text-muted-foreground">{achievement}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Content - Technologies */}
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-sm font-bold text-muted-foreground tracking-wider uppercase">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, techIndex) => (
                                <motion.span
                                  key={techIndex}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                                  viewport={{ once: true }}
                                  whileHover={{ scale: 1.05 }}
                                  className="px-3 py-2 bg-primary/10 text-primary text-sm rounded-lg border border-primary/20 hover:bg-primary/20 transition-all duration-200 font-medium"
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </div>
                          </div>

                          {/* Duration Badge */}
                          <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">{exp.period}</div>
                              <div className="text-xs text-muted-foreground uppercase tracking-wider">Duration</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-all duration-300 group">
            <span className="text-sm font-bold tracking-wider">READY FOR NEW OPPORTUNITIES</span>
            <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ExperienceSection

