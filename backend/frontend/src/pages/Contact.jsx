"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp, FaMapMarkerAlt, FaPhone } from "react-icons/fa"

export default function Contact({ isActive }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ submitting: true, submitted: false, error: null })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({
          submitting: false,
          submitted: true,
          error: null
        })
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        })
      } else {
        throw new Error(data.message || 'Something went wrong')
      }
    } catch (error) {
      setStatus({
        submitting: false,
        submitted: false,
        error: error.message
      })
    }
  }

  return (
    <section id="contact" className="relative min-h-screen py-16 lg:py-24">
      {/* Background Modal */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#0a192f]">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent"></div>
      </div>

      <div className="container relative mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 text-[#64ffda]">
            Get In Touch
          </h2>
          <p className="text-[#8892b0] text-lg max-w-2xl mx-auto">
            Let's work together to bring your ideas to life. Feel free to reach out for collaborations or just a friendly hello!
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
          >
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-[#112240]/50 backdrop-blur-lg p-8 rounded-2xl border border-[#233554] shadow-xl">
                <h3 className="text-2xl font-semibold mb-6 text-[#ccd6f6]">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#64ffda]/10 rounded-full flex items-center justify-center">
                      <FaEnvelope className="text-[#64ffda] text-xl" />
                    </div>
                    <div>
                      <p className="text-[#8892b0] text-sm">Email</p>
                      <a href="mailto:haiderabeer794@gmail.com" className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors">
                        haiderabeer794@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#64ffda]/10 rounded-full flex items-center justify-center">
                      <FaPhone className="text-[#64ffda] text-xl" />
                    </div>
                    <div>
                      <p className="text-[#8892b0] text-sm">Phone</p>
                      <a href="tel:+9234425500096" className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors">
                        +92 344 2550 0096
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#64ffda]/10 rounded-full flex items-center justify-center">
                      <FaMapMarkerAlt className="text-[#64ffda] text-xl" />
                    </div>
                    <div>
                      <p className="text-[#8892b0] text-sm">Location</p>
                      <p className="text-[#ccd6f6]">North Karachi, Karachi, Pakistan</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-[#233554]">
                  <h4 className="text-lg font-medium mb-4 text-[#ccd6f6]">Connect with me</h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/SyedAbeernHaider"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-[#112240]/50 rounded-full flex items-center justify-center text-[#8892b0] hover:bg-[#64ffda]/20 hover:text-[#64ffda] transition-all"
                    >
                      <FaGithub size={20} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/syedabeer12/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-[#112240]/50 rounded-full flex items-center justify-center text-[#8892b0] hover:bg-[#64ffda]/20 hover:text-[#64ffda] transition-all"
                    >
                      <FaLinkedin size={20} />
                    </a>
                    <a
                      href="http://Wa.me/+923442550096"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-[#112240]/50 rounded-full flex items-center justify-center text-[#8892b0] hover:bg-[#64ffda]/20 hover:text-[#64ffda] transition-all"
                    >
                      <FaWhatsapp size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#112240]/50 backdrop-blur-lg p-8 rounded-2xl border border-[#233554] shadow-xl">
              <h3 className="text-2xl font-semibold mb-6 text-[#ccd6f6]">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                {status.submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#64ffda]/10 border border-[#64ffda] text-[#64ffda] px-4 py-3 rounded-lg"
                  >
                    Message sent successfully!
                  </motion.div>
                )}
                {status.error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg"
                  >
                    {status.error}
                  </motion.div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#8892b0] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#112240]/50 border border-[#233554] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#64ffda] text-[#ccd6f6] placeholder-[#8892b0]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#8892b0] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#112240]/50 border border-[#233554] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#64ffda] text-[#ccd6f6] placeholder-[#8892b0]"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#8892b0] mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#112240]/50 border border-[#233554] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#64ffda] text-[#ccd6f6] placeholder-[#8892b0]"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#8892b0] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-[#112240]/50 border border-[#233554] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#64ffda] text-[#ccd6f6] placeholder-[#8892b0] resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  disabled={status.submitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 bg-[#64ffda]/10 border border-[#64ffda] text-[#64ffda] rounded-lg font-medium hover:bg-[#64ffda]/20 transition-all shadow-lg ${
                    status.submitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {status.submitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
