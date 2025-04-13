"use client"

import Head from 'next/head'
import { useState, useEffect } from 'react'

type Project = {
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl: string
  codeUrl: string
}

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    
    window.addEventListener('scroll', handleScroll)
    if (!isMobile) window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', checkMobile)
    checkMobile()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', checkMobile)
    }
  }, [isMobile])

  // Smooth scroll function with header offset
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerHeight = scrolled ? 72 : 80 // Adjust based on your header height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      // Close mobile menu if open
      if (menuOpen) setMenuOpen(false)
    }
  }

  const projects: Project[] = [
    {
      title: "A Gambling Website",
      description: "Concept of a gambling site where you can gamble with fake money.",
      image: "/images/casino.png",
      tags: ["HTML", "CSS", "JavaScript", "Tailwind"],
      liveUrl: "https://gamble1.netlify.app",
      codeUrl: "https://github.com/Kobe0103/Gamble"
    },
    {
      title: "Quiteboring.dev",
      description: "A developer portfolio website I built for a Minecraft mod developer.",
      image: "/images/dev.png",
      tags: ["HTML", "Tailwind", "JavaScript", "Next.js"],
      liveUrl: "https://quiteboring.dev/",
      codeUrl: "https://github.com/Kobe0103/quiteboring.github.io"
    },
    {
      title: "Task Forge",
      description: "An advanced task managing website made for learning web development.",
      image: "/images/tasker.png",
      tags: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://task-managingqsdsqd.netlify.app",
      codeUrl: "https://github.com/Kobe0103/Task-Manager"
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    alert('Form submission would happen here')
  }

  return (
    <div className="min-h-screen bg-black text-gray-300 relative overflow-x-hidden cursor-default">
      {/* Cursor effect - desktop only */}
      {!isMobile && !menuOpen && (
        <div 
          className="fixed pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full w-96 h-96 bg-purple-900/20 blur-3xl z-0"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transition: 'transform 0.1s linear'
          }}
        />
      )}
      
      <Head>
        <title>Kobe Janssens | Web Developer</title>
        <meta name="description" content="Personal portfolio of Kobe Janssens" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>

      <Header 
        scrolled={scrolled} 
        isMobile={isMobile} 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen}
        scrollToSection={scrollToSection}
      />
      
      <main className="pt-24 relative z-10">
        <HeroSection isMobile={isMobile} scrollToSection={scrollToSection} />
        <AboutSection />
        <ProjectsSection projects={projects} />
        <ContactSection onSubmit={handleSubmit} />
      </main>

      <Footer />
    </div>
  )
}

// Header Component with smooth scroll
function Header({ 
  scrolled, 
  isMobile, 
  menuOpen, 
  setMenuOpen,
  scrollToSection
}: { 
  scrolled: boolean, 
  isMobile: boolean, 
  menuOpen: boolean, 
  setMenuOpen: (open: boolean) => void,
  scrollToSection: (id: string) => void
}) {
  const handleNavClick = (id: string) => {
    scrollToSection(id)
    if (isMobile) setMenuOpen(false)
  }

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-black/90 backdrop-blur border-b border-purple-900/30' : 'py-4 bg-transparent'}`}>
      <div className="container mx-auto px-6">
        <nav className="flex justify-between items-center">
          <div className="text-xl font-bold">
            <button 
              onClick={() => handleNavClick('home')}
              className="text-purple-400 hover:text-white transition-all duration-300 relative group"
            >
              Kobe Janssens
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
            </button>
          </div>
          
          {isMobile ? (
            <>
              <button 
                className={`relative z-[60] w-8 h-8 focus:outline-none transition-all duration-300 ${menuOpen ? 'text-white' : 'text-gray-300 hover:text-purple-400'}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                <div className={`absolute w-8 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 top-1/2' : 'top-1/4'}`} />
                <div className={`absolute w-8 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : 'top-1/2 -translate-y-1/2'}`} />
                <div className={`absolute w-8 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 top-1/2' : 'top-3/4'}`} />
              </button>
              
              {/* Mobile menu */}
              <div 
                className={`fixed inset-0 bg-black/95 backdrop-blur-md z-40 transition-all duration-500 ease-in-out ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                style={{
                  top: scrolled ? '4.5rem' : '5.5rem',
                  height: scrolled ? 'calc(100vh - 4.5rem)' : 'calc(100vh - 5.5rem)'
                }}
              >
                <div className="w-full h-full pt-8 pb-8 px-6 overflow-y-auto">
                  <ul className="flex flex-col items-center space-y-8">
                    {['home', 'about', 'projects', 'contact'].map((item) => (
                      <li key={item} className="overflow-hidden">
                        <button
                          onClick={() => handleNavClick(item)}
                          className="block text-2xl text-gray-300 hover:text-purple-400 transition-all duration-500 transform hover:translate-x-4 cursor-pointer w-full text-left"
                        >
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                          <span className="block h-0.5 bg-purple-400 mt-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <ul className="flex space-x-8">
              {['home', 'about', 'projects', 'contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleNavClick(item)}
                    className="capitalize text-gray-300 hover:text-purple-400 transition-all duration-300 relative group cursor-pointer"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
    </header>
  )
}

// Hero Section with smooth scroll buttons
function HeroSection({ isMobile, scrollToSection }: { isMobile: boolean, scrollToSection: (id: string) => void }) {
  return (
    <section id="home" className="py-32 px-6 relative">
      <div className="container mx-auto">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white group">
            Hello, I'm <span className="text-purple-400 hover:text-white transition-all duration-300">Kobe Janssens</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 hover:text-gray-300 transition-all duration-300">
            Web Developer & Designer focused on clean, functional experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-purple-600 text-white rounded-lg font-medium transition-all duration-300 relative overflow-hidden group cursor-pointer hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1"
            >
              <span className="relative z-10">View My Work</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-purple-600 text-purple-400 rounded-lg font-medium transition-all duration-300 relative overflow-hidden group cursor-pointer hover:bg-gray-900/50 hover:text-white hover:-translate-y-1"
            >
              <span className="relative z-10">Get In Touch</span>
              <span className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
      {/* Floating elements - desktop only */}
      {!isMobile && (
        <>
          <div className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full bg-purple-600/30 animate-float1" />
          <div className="absolute top-1/3 left-1/4 w-6 h-6 rounded-full bg-purple-400/20 animate-float2" />
          <div className="absolute bottom-1/4 right-1/3 w-3 h-3 rounded-full bg-purple-500/30 animate-float3" />
        </>
      )}
    </section>
  )
}

// About Section with local logo
function AboutSection() {
  const skills = ['HTML5', 'CSS3', 'JavaScript', 'Python', 'React', 'Next.js', 'Tailwind', 'UI/UX Design']
  
  return (
    <section id="about" className="py-20 border-t border-gray-800 px-6">
      <div className="container mx-auto">
        <SectionTitle>About Me</SectionTitle>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3 group">
            <div className="bg-gradient-to-br from-purple-900 to-black p-1 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-purple-600/10 group-hover:opacity-100 opacity-0 transition-all duration-500" />
              <img 
                src="/images/Logo.png"
                alt="Kobe Janssens Logo" 
                className="rounded-full w-full aspect-square object-cover bg-black relative z-10 transform group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <p className="mb-4 text-gray-300 hover:text-white transition-all duration-300">
              I'm a 16 Year old passionate web developer with expertise in creating modern, functional websites. 
              With over 3 years of experience, I specialize in front-end development and user experience. Outside 
              of coding, I love diving into design trends and tweaking animations until they feel perfect.
            </p>
            <p className="mb-8 text-gray-300 hover:text-white transition-all duration-300">
              I turn ideas into fast, accessible websites with clean code, smooth UX, and eye-catching UI.
            </p>
            <p className=" mb-8 text-gray-300 hover:text-white transition-all duration-300">
              I'm currently open to freelance opportunities or collaborations on creative web projects. I also would love 
              to help people with their new startups and be a part of their journey to success. 
            </p>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white hover:text-purple-400 transition-all duration-300">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span 
                    key={skill} 
                    className="px-4 py-2 bg-gray-900 text-purple-400 rounded-full text-sm font-medium border border-gray-800 hover:bg-purple-600 hover:text-white hover:border-purple-600 hover:scale-105 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>  
    </section>
  )
}

// Projects Section with local images
function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-20 border-t border-gray-800 px-6">
      <div className="container mx-auto">
        <SectionTitle>My Projects</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.title} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-purple-900 transition-all duration-300 group hover:shadow-lg hover:shadow-purple-900/20 relative cursor-default">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="h-48 bg-black flex items-center justify-center p-4 relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="max-h-full max-w-full object-contain relative z-10 transform group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 relative z-10">
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-400 transition-all duration-300">{project.title}</h3>
                <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-all duration-300">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-800 text-purple-400 rounded-full text-xs font-medium hover:bg-purple-600 hover:text-white transition-all duration-300 cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a 
                    href={project.liveUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-white transition-all duration-300 relative group font-medium cursor-pointer"
                  >
                    View Live
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
                  </a>
                  <a 
                    href={project.codeUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-white transition-all duration-300 relative group font-medium cursor-pointer"
                  >
                    Source Code
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection({ onSubmit }: { onSubmit: (e: React.FormEvent) => void }) {
  return (
    <section id="contact" className="py-20 border-t border-gray-800 px-6">
      <div className="container mx-auto">
        <SectionTitle>Get In Touch</SectionTitle>
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <p className="mb-6 text-gray-300 hover:text-white transition-all duration-300">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className="space-y-4">
              <div className="text-gray-300 hover:text-white transition-all duration-300">
                <strong className="font-medium">Email:</strong>
                <a 
                  href="mailto:kobejanssens31@gmail.com" 
                  className="ml-2 text-purple-400 hover:text-white transition-all duration-300 relative group cursor-pointer"
                >
                  kobejanssens31@gmail.com
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
                </a>
              </div>
              <div className="text-gray-300 hover:text-white transition-all duration-300">
                <strong className="font-medium">Location:</strong>
                <span className="ml-2">Antwerpen, Belgium</span>
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <a 
                href="https://github.com/Kobe0103" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-white transition-all duration-300 relative group font-medium cursor-pointer"
              >
                GitHub
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
              </a>
              <a 
                href="http://discordapp.com/users/1187752214429712508" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-white transition-all duration-300 relative group font-medium cursor-pointer"
              >
                Discord
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
              </a>
            </div>
          </div>
          <div className="lg:w-1/2">
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium text-gray-300 hover:text-white transition-all duration-300">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-900 text-white transition-all duration-300 hover:border-purple-900 cursor-text"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-medium text-gray-300 hover:text-white transition-all duration-300">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-900 text-white transition-all duration-300 hover:border-purple-900 cursor-text"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block mb-2 font-medium text-gray-300 hover:text-white transition-all duration-300">Subject</label>
                <input
                  type="text"
                  id="subject"
                  required
                  className="w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-900 text-white transition-all duration-300 hover:border-purple-900 cursor-text"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 font-medium text-gray-300 hover:text-white transition-all duration-300">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  className="w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-900 text-white transition-all duration-300 hover:border-purple-900 cursor-text"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 w-full relative overflow-hidden group cursor-pointer hover:shadow-lg hover:shadow-purple-500/30"
              >
                <span className="relative z-10">Send Message</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-8 border-t border-gray-800 group">
      <div className="container mx-auto px-6 text-center">
        <p className="text-gray-500 group-hover:text-gray-300 transition-all duration-300">
          &copy; {new Date().getFullYear()} Kobe Janssens. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

// SectionTitle component
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-12 text-center group">
      <h2 className="text-3xl md:text-4xl font-bold text-white">
        {children}
      </h2>
      <div className="mt-4 w-20 h-1 bg-purple-600 mx-auto rounded-full transform scale-x-50 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  )
}