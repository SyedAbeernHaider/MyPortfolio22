"use client"

import React from "react"
import { useState, useEffect } from "react"
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaSignOutAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

// Project categories
const PROJECT_CATEGORIES = ["Frontend", "Backend", "Full Stack"]

// Sample project data
const initialProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform built with React, Node.js, and MongoDB.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Full Stack", "React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "Full Stack"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A frontend task management application with React and TypeScript.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Frontend", "React", "TypeScript", "Tailwind"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "Frontend"
  },
  {
    id: 3,
    title: "API Service",
    description: "A RESTful API service built with Node.js and Express.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Backend", "Node.js", "Express", "MongoDB"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "Backend"
  }
]

export default function Admin() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [editingProject, setEditingProject] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('adminToken'))

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: "/placeholder.svg?height=600&width=800",
    tags: [],
    github: "",
    demo: "",
    category: "Frontend",
  })

  const [newTag, setNewTag] = useState("")

  // Check authentication and load projects
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin-login')
      return
    }

    setIsAuthenticated(true)
    fetchProjects()
  }, [navigate])

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin-login')
  }

  const handleAddProject = () => {
    setIsAdding(true)
    setEditingProject(null)
    setNewProject({
      title: "",
      description: "",
      image: "/placeholder.svg?height=600&width=800",
      tags: [],
      github: "",
      demo: "",
      category: "Frontend",
    })
    setNewTag("")
  }

  const handleEditProject = (project) => {
    setIsAdding(false)
    setEditingProject(project)
    setNewProject({ ...project })
    setNewTag("")
  }

  const handleDeleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          setProjects(projects.filter(project => project._id !== id))
        } else {
          const data = await response.json()
          alert(data.message || 'Error deleting project')
        }
      } catch (error) {
        console.error('Error deleting project:', error)
        alert('Error deleting project')
      }
    }
  }

  const handleSaveProject = async () => {
    const updatedTags = [...new Set([newProject.category, ...newProject.tags])]
    const projectData = { ...newProject, tags: updatedTags }

    try {
      const url = isAdding 
        ? 'http://localhost:5000/api/projects'
        : `http://localhost:5000/api/projects/${editingProject._id}`
      
      const response = await fetch(url, {
        method: isAdding ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projectData)
      })

      if (response.ok) {
        const data = await response.json()
        if (isAdding) {
          setProjects([data, ...projects])
        } else {
          setProjects(projects.map(p => p._id === data._id ? data : p))
        }
        setIsAdding(false)
        setEditingProject(null)
      } else {
        const data = await response.json()
        alert(data.message || 'Error saving project')
      }
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Error saving project')
    }
  }

  const handleCancelEdit = () => {
    setIsAdding(false)
    setEditingProject(null)
  }

  const handleAddTag = () => {
    if (newTag && !newProject.tags.includes(newTag)) {
      setNewProject({ ...newProject, tags: [...newProject.tags, newTag] })
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag) => {
    // Don't allow removing the category tag
    if (tag !== newProject.category) {
      setNewProject({ ...newProject, tags: newProject.tags.filter((t) => t !== tag) })
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewProject({ ...newProject, [name]: value })
  }

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value
    // Remove old category from tags if it exists
    const filteredTags = newProject.tags.filter(tag => !PROJECT_CATEGORIES.includes(tag))
    setNewProject({
      ...newProject,
      category: newCategory,
      tags: [newCategory, ...filteredTags]
    })
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-16 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Projects</h2>
            <button
              onClick={handleAddProject}
              className="w-full sm:w-auto px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center"
            >
              <FaPlus className="mr-2" />
              Add Project
            </button>
          </div>

          {(isAdding || editingProject) && (
            <div className="bg-gray-700 rounded-lg p-4 sm:p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newProject.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Category</label>
                  <select
                    name="category"
                    value={newProject.category}
                    onChange={handleCategoryChange}
                    className="w-full px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {PROJECT_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={newProject.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={newProject.image}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">GitHub URL</label>
                  <input
                    type="text"
                    name="github"
                    value={newProject.github}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Demo URL</label>
                  <input
                    type="text"
                    name="demo"
                    value={newProject.demo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-teal-500 text-white rounded-full text-sm flex items-center"
                      >
                        {tag}
                        {tag !== newProject.category && (
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-2 focus:outline-none"
                          >
                            <FaTimes className="w-3 h-3" />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Add a tag"
                    />
                    <button
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                <button
                  onClick={handleCancelEdit}
                  className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProject}
                  className="w-full sm:w-auto px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors flex items-center justify-center"
                >
                  <FaSave className="mr-2" />
                  Save
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div key={project._id} className="bg-gray-700 rounded-lg p-4">
                <div className="relative h-[200px] w-full mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-teal-500 text-white rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handleEditProject(project)}
                    className="flex-1 px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project._id)}
                    className="flex-1 px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center justify-center"
                  >
                    <FaTrash className="mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
