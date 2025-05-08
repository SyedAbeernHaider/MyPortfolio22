"use client"

import React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"

// Sample project data (in a real app, this would come from your admin panel)
const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform built with React, Node.js, and MongoDB.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Full Stack", "React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A frontend task management application with React and TypeScript.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Frontend", "React", "TypeScript", "Tailwind"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    id: 3,
    title: "API Service",
    description: "A RESTful API service built with Node.js and Express.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Backend", "Node.js", "Express", "MongoDB"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    id: 4,
    title: "Social Media Platform",
    description: "A full-stack social media platform with real-time features.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Full Stack", "React", "Node.js", "Socket.io"],
    github: "https://github.com",
    demo: "https://example.com",
  },
]

export default function Projects({ isActive }) {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState("All")
  const [loading, setLoading] = useState(true)

  // Load projects from localStorage
  useEffect(() => {
    if (isActive) {
      const savedProjects = localStorage.getItem("portfolioProjects")
      if (savedProjects) {
        setProjects(JSON.parse(savedProjects))
      } else {
        setProjects(projectsData) // Fallback to sample data if no saved projects
      }
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [isActive])

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
          <h2 className="text-4xl font-bold mb-2">My Projects</h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
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
                filter === item ? "bg-teal-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg h-[420px] flex flex-col"
            >
              <div className="relative overflow-hidden group h-48">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-900 rounded-full text-white hover:bg-teal-500 transition-colors"
                    >
                      <FaGithub size={20} />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-900 rounded-full text-white hover:bg-teal-500 transition-colors"
                    >
                      <FaExternalLinkAlt size={20} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-gray-700 rounded-full text-xs font-medium text-gray-300"
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
