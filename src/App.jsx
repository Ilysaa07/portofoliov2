import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  ArrowDown,
  Send,
  MessageCircle,
  Plus,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import ExperienceSection from "./components/ExperienceSection.jsx";
import SidebarNavigation from "./components/SidebarNavigation.jsx";
import Avatar3DContainer from "./components/Avatar3D.jsx";
import SkillIcon3D from "./components/SkillIcon3D.jsx";
import InteractiveHamburgerIcon from "./components/EnhancedHamburgerIcon.jsx";
import ContactSection from "./components/ContactSection.jsx"; // Import the fixed ContactSection
import "./App.css";
import ProjectsSection from "./components/ProjectsSection";
import { getUserRepos } from "./lib/github"; // pastikan path-nya sesuai

function App() {
  const [projects, setProjects] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)")
      .matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setSidebarOpen(false);
  };

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const repos = await getUserRepos("Ilysaa07");
        const mapped = repos.map((r) => ({
          id: r.id,
          title: r.name.replace(/[-_]/g, " "),
          category: r.topics?.[0] ?? r.language ?? "Project",
          description: r.description ?? "No description provided",
          image: "/placeholder-project.webp", // opsional
          technologies: r.topics?.length ? r.topics : [r.language],
          stars: r.stargazers_count,
          views: r.watchers_count,
          demoUrl: r.homepage || r.html_url,
          githubUrl: r.html_url,
          pushedAt: new Date(r.pushed_at),
        }));
        setProjects(mapped);
      } catch (error) {
        console.error("Error fetching GitHub repos:", error);
      }
    };

    fetchRepos();
  }, []);

  const skills = [
    {
      name: "Frontend Development",
      level: 85,
      technologies: [
        "React",
        "Tailwind CSS",
        "Bootstrap",
        "Animate CSS",
        "GSAP",
        "AOS",
      ],
    },
    {
      name: "Backend Development",
      level: 80,
      technologies: ["Node.js", "Express", "PHP"],
    },
    {
      name: "Database Management",
      level: 85,
      technologies: ["MongoDB", "MySQL"],
    },
    {
      name: "DevOps & Tools",
      level: 80,
      technologies: ["Docker", "XAMPP", "Git", "Github"],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Decorative Plus Icons */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <Plus className="absolute top-12 left-12 w-4 h-4 text-muted-foreground/20" />
        <Plus className="absolute top-32 right-16 w-4 h-4 text-muted-foreground/20" />
        <Plus className="absolute bottom-32 left-20 w-4 h-4 text-muted-foreground/20" />
        <Plus className="absolute bottom-12 right-12 w-4 h-4 text-muted-foreground/20" />
        <Plus className="absolute top-1/2 right-8 w-4 h-4 text-muted-foreground/20" />
      </div>

      {/* Sidebar Navigation */}
      <SidebarNavigation
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        scrollToSection={scrollToSection}
      />

      {/* Mobile Menu Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-6 left-6 z-40 lg:hidden"
      >
        <InteractiveHamburgerIcon
          isOpen={sidebarOpen}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-sm"
          size={20}
          color={darkMode ? "#ffffff" : "#000000"}
        />
      </motion.div>

      {/* Desktop Sidebar Toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-6 left-6 z-40 hidden lg:block"
      >
        <InteractiveHamburgerIcon
          isOpen={sidebarOpen}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-sm"
          size={20}
          color={darkMode ? "#ffffff" : "#000000"}
        />
      </motion.div>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center pt-16"
      >
        <div className="container-minimal">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                  PORTFOLIO WEBSITE
                </p>
                <p className="text-sm text-muted-foreground">2025</p>
              </div>

              <div className="space-y-6">
                <h1 className="text-balance">
                  web developer
                  <br />/ front-end.
                </h1>

                <p className="text-lg text-muted-foreground max-w-md text-pretty">
                  Hi, I'm Ilyasa Meydiansyah. A passionate Front-End Developer
                  based in Bandung, West Java, Indonesia.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <button
                  onClick={() => scrollToSection("works")}
                  className="btn-minimal group"
                >
                  SEE MY WORKS
                  <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex space-x-6 pt-8"
              >
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors border-b border-transparent hover:border-primary"
                >
                  Download CV
                </a>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors border-b border-transparent hover:border-primary"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors border-b border-transparent hover:border-primary"
                >
                  GitHub
                </a>
              </motion.div>
            </motion.div>

            {/* Right Content - 3D Avatar */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              <div className="relative">
                {/* Background Circle */}
                <div className="absolute inset-0 w-80 h-80 bg-muted/30 rounded-full blur-3xl"></div>

                {/* Main Container with 3D Avatar */}
                <div className="relative w-96 h-96  backdrop-blur-sm flex items-center justify-center overflow-hidden">
                  <Suspense
                    fallback={
                      <div className="w-48 h-48 flex items-center justify-center">
                        <div className="w-20 h-20 bg-muted rounded-full border border-border animate-pulse"></div>
                      </div>
                    }
                  >
                    <Avatar3DContainer
                      className="w-full h-full"
                      darkMode={darkMode}
                    />
                  </Suspense>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-minimal">
        <div className="container-minimal">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content - About Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground tracking-wider">
                    ABOUT ME
                  </p>
                  <h2 className="text-4xl font-bold">Passionate Developer</h2>
                </div>

                <div className="space-y-4 text-muted-foreground">
                  <p className="text-lg leading-relaxed">
                    I'm Ilyasa Meydiansyah, a passionate junior web developer
                    with a keen eye for the front-end. I specialize in creating
                    beautiful and functional digital experiences.
                  </p>
                  <p>
                    With expertise in modern web technologies, I bring ideas to
                    life through clean code and intuitive user interfaces. I
                    believe in the power of good code to solve real-world
                    problems.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">1+</div>
                    <div className="text-sm text-muted-foreground">
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">15+</div>
                    <div className="text-sm text-muted-foreground">
                      Projects Completed
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">100%</div>
                    <div className="text-sm text-muted-foreground">
                      Client Satisfaction
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Skills */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground tracking-wider">
                  SKILLS & EXPERTISE
                </p>
                <h3 className="text-2xl font-bold">Technical Proficiency</h3>
              </div>

              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Suspense
                          fallback={
                            <div className="w-8 h-8 bg-muted rounded-sm animate-pulse"></div>
                          }
                        >
                          <SkillIcon3D skill={skill.name} size={32} />
                        </Suspense>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="w-full bg-secondary rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.2, delay: index * 0.1 + 0.3 }}
                        viewport={{ once: true }}
                        className="h-2 rounded-full bg-gradient-to-r from-primary to-primary/70"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {skill.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-sm border border-border/50 hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <ExperienceSection />

      {/* Works/Projects Section */}
      <ProjectsSection />

      {/* Contact Section - Using the fixed ContactSection component */}
      <ContactSection />
    </div>
  );
}

export default App;