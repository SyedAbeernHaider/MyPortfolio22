"use client"

import React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaGithub, FaExternalLinkAlt, FaLinkedin, FaWhatsapp } from "react-icons/fa"

// Sample project data (in a real app, this would come from your admin panel)
const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform built with React, Node.js, and MongoDB.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Full Stack", "React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/SyedAbeernHaider",
    linkedin: "https://www.linkedin.com/in/syedabeer12/",
    whatsapp: "http://Wa.me/+923442550096",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A frontend task management application with React and TypeScript.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Frontend", "React", "TypeScript", "Tailwind"],
    github: "https://github.com/SyedAbeernHaider",
    linkedin: "https://www.linkedin.com/in/syedabeer12/",
    whatsapp: "http://Wa.me/+923442550096",
  },
  {
    id: 3,
    title: "API Service",
    description: "A RESTful API service built with Node.js and Express.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Backend", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/SyedAbeernHaider",
    linkedin: "https://www.linkedin.com/in/syedabeer12/",
    whatsapp: "http://Wa.me/+923442550096",
  },
  {
    id: 4,
    title: "Social Media Platform",
    description: "A full-stack social media platform with real-time features.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Full Stack", "React", "Node.js", "Socket.io"],
    github: "https://github.com/SyedAbeernHaider",
    linkedin: "https://www.linkedin.com/in/syedabeer12/",
    whatsapp: "http://Wa.me/+923442550096",
  },
]

export default function Projects({ isActive }) {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState("All")
  const [loading, setLoading] = useState(true)

  // Load projects from API
  useEffect(() => {
    if (isActive) {
      fetch('/api/projects')
        .then(response => response.json())
        .then(data => {
          setProjects(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching projects:', error);
          setLoading(false);
        });
    } else {
      setLoading(true);
    }
  }, [isActive]);

  const filters = ["All", "Frontend", "Backend", "Full Stack"]

  const filteredProjects = projects.filter((project) => {
    if (filter === "All") return true
    return project.tags.includes(filter)
  })

  if (loading && isActive) {
    return (
      <section id="projects" className="relative min-h-screen flex items-center justify-center pt-16 pb-16 bg-gray-900">
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
          <div className="w-full max-w-md h-64">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-xl font-bold text-teal-500">Loading Projects...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="relative min-h-screen py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-2 text-[#64ffda]">My Projects</h2>
          <div className="w-20 h-1 bg-[#64ffda] mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((item, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === item 
                  ? "bg-[#64ffda]/10 text-[#64ffda] border border-[#64ffda]" 
                  : "bg-[#112240] text-[#8892b0] hover:bg-[#233554]"
              }`}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
              className="bg-[#112240] rounded-xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio */}
                <div className="absolute inset-0">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#0a192f]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-[#233554] rounded-full text-[#64ffda] hover:bg-[#64ffda] hover:text-[#0a192f] transition-all"
                        title="View on GitHub"
                      >
                        <FaGithub size={20} />
                      </a>
                      <a
                        href={project.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-[#233554] rounded-full text-[#64ffda] hover:bg-[#64ffda] hover:text-[#0a192f] transition-all"
                        title="Connect on LinkedIn"
                      >
                        <FaLinkedin size={20} />
                      </a>
                      <a
                        href={project.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-[#233554] rounded-full text-[#64ffda] hover:bg-[#64ffda] hover:text-[#0a192f] transition-all"
                        title="Contact on WhatsApp"
                      >
                        <FaWhatsapp size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-3 text-[#ccd6f6] group-hover:text-[#64ffda] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[#8892b0] text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-[#233554] rounded-full text-xs font-medium text-[#64ffda]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
