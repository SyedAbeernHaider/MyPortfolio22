"use client"

import React, { useState, useEffect, Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Loader from "./components/Loader"
import Home from "./pages/Home"
import About from "./pages/About"
import Skills from "./pages/Skills"
import Experience from "./pages/Experience"
import Projects from "./pages/Projects"
import Contact from "./pages/Contact"
import Admin from "./pages/Admin"
import AdminLogin from "./pages/AdminLogin"
import "./index.css"

function AppContent() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setLoading(false)
    }, 3000)

    // Handle scroll events
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Calculate scroll progress (0 to 1)
      const progress = scrollPosition / (documentHeight - windowHeight)
      setScrollProgress(progress)

      // Find active section
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop - windowHeight / 2 && 
              scrollPosition < offsetTop + offsetHeight - windowHeight / 2) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="bg-gray-900 text-white">
      <Navbar activeSection={activeSection} />
      <main className="relative">
        <div className="fixed top-0 left-0 w-1 h-full bg-gray-800">
          <div 
            className="w-full bg-teal-500 transition-all duration-300"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
        <Home isActive={activeSection === "home"} scrollProgress={scrollProgress} />
        <About isActive={activeSection === "about"} scrollProgress={scrollProgress} />
        <Experience isActive={activeSection === "experience"} scrollProgress={scrollProgress} />
        <Skills isActive={activeSection === "skills"} scrollProgress={scrollProgress} />
        <Suspense fallback={<Loader />}>
          <Projects isActive={activeSection === "projects"} scrollProgress={scrollProgress} />
        </Suspense>
        <Contact isActive={activeSection === "contact"} scrollProgress={scrollProgress} />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  )
}
