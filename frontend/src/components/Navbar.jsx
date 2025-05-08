"use client"

import React, { useState } from "react"
import { FaHome, FaUser, FaLaptopCode, FaBriefcase, FaEnvelope, FaBars, FaTimes } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export default function Navbar({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = typeof useNavigate === 'function' ? useNavigate() : () => {};

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const menuItems = [
    { name: "Home", icon: <FaHome />, id: "home" },
    { name: "About", icon: <FaUser />, id: "about" },
    { name: "Experience", icon: <FaBriefcase />, id: "experience" },
    { name: "Skills", icon: <FaLaptopCode />, id: "skills" },
    { name: "Projects", icon: <FaBriefcase />, id: "projects" },
    { name: "Contact", icon: <FaEnvelope />, id: "contact" },
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <button
            onClick={() => scrollToSection("home")}
            className="text-2xl font-bold text-teal-500 hover:text-teal-400 transition-colors"
          >
            DevPortfolio
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center space-x-1 transition-colors ${
                  activeSection === item.id
                    ? "text-teal-500"
                    : "text-gray-300 hover:text-teal-500"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
            {/* Admin Login Button */}
            <button
              onClick={() => navigate("/admin-login")}
              className="ml-6 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-semibold"
            >
              Admin Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-300 focus:outline-none" onClick={toggleMenu}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 border-b border-gray-700">
          <div className="container mx-auto px-4 py-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center space-x-2 py-3 w-full transition-colors ${
                  activeSection === item.id
                    ? "text-teal-500"
                    : "text-gray-300 hover:text-teal-500"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
            {/* Admin Login Button for Mobile */}
            <button
              onClick={() => { setIsOpen(false); navigate("/admin-login") }}
              className="w-full mt-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-semibold"
            >
              Admin Login
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
