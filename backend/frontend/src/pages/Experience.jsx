"use client"

import React from "react"
import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Environment } from "@react-three/drei"
import { motion } from "framer-motion"
import { FaBriefcase, FaCode, FaLaptop, FaGlobe } from "react-icons/fa"

// Animated Rings Component
function AnimatedRings() {
  const rings = [
    { radius: 2, rotation: [0, 0, 0], speed: 1 },
    { radius: 2.5, rotation: [Math.PI / 4, 0, 0], speed: 1.5 },
    { radius: 3, rotation: [0, Math.PI / 4, 0], speed: 2 }
  ]

  return (
    <Float speed={1} rotationIntensity={1} floatIntensity={1}>
      <group>
        {rings.map((ring, index) => (
          <mesh key={index} rotation={ring.rotation}>
            <torusGeometry args={[ring.radius, 0.1, 16, 100]} />
            <meshStandardMaterial
              color="#0d9488"
              roughness={0.1}
              metalness={0.8}
              emissive="#0d9488"
              emissiveIntensity={0.2}
              wireframe
            />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

export default function Experience({ isActive }) {
  const experiences = [
    {
      icon: <FaCode className="text-3xl text-teal-500" />,
      title: "HTML/CSS Projects",
      period: "Jan 2024 - Mar 2024",
      description: "Built responsive websites focusing on modern design principles and animations. Implemented best practices in web development and accessibility.",
      skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
    },
    {
      icon: <FaLaptop className="text-3xl text-teal-500" />,
      title: "Full Stack Projects",
      period: "Jun 2024 - Sep 2024",
      description: "Developed full-stack applications using MERN stack. Created RESTful APIs and implemented user authentication systems.",
      skills: ["React", "Node.js", "MongoDB", "Express"]
    },
    {
      icon: <FaGlobe className="text-3xl text-teal-500" />,
      title: "Upwork Freelancer",
      period: "Oct 2024 - Present",
      description: "Delivering custom web solutions for international clients. Specializing in modern web applications with focus on performance and user experience.",
      skills: ["Full Stack Development", "Client Communication", "Project Management"]
    },
    {
      icon: <FaBriefcase className="text-3xl text-teal-500" />,
      title: "SupSoft Philippines",
      period: "Apr 2025 - Jun 2025",
      description: "Internship focused on enterprise-level application development. Collaborated with international team on large-scale projects.",
      skills: ["Enterprise Development", "Team Collaboration", "Agile Methodology"]
    }
  ]

  return (
    <section id="experience" className="relative min-h-screen flex items-center justify-center pt-16 bg-gray-900">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <AnimatedRings />
            <Environment preset="warehouse" />
          </Suspense>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-2">Experience</h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
              transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg hover:bg-gray-800/70 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  {exp.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
                  <p className="text-teal-500 text-sm mb-3">{exp.period}</p>
                  <p className="text-gray-300 mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="text-xs bg-gray-700/50 text-teal-400 px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 