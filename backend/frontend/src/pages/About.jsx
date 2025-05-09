"use client"

import React from "react"
import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Environment } from "@react-three/drei"
import { motion } from "framer-motion"
import { FaCode, FaServer, FaDatabase, FaUserGraduate, FaLaptopCode, FaRegLightbulb } from "react-icons/fa"

function AnimatedCube() {
  return (
    <Float speed={5} rotationIntensity={4} floatIntensity={3}>
      <mesh scale={[1.2, 1.2, 1.2]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color="#0d9488"
          roughness={0.1}
          metalness={0.8}
          emissive="#0d9488"
          emissiveIntensity={0.2}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  )
}

export default function About({ isActive }) {
  const aboutCards = [
    {
      icon: <FaUserGraduate className="text-4xl text-teal-500" />,
      title: "Education",
      content: "Bachelor's in Computer Science",
      subContent: "University of Karachi (2024-2028)",
    },
    {
      icon: <FaLaptopCode className="text-4xl text-teal-500" />,
      title: "Role",
      content: "Full Stack Developer",
      subContent: "Building end-to-end web solutions",
    },
    {
      icon: <FaRegLightbulb className="text-4xl text-teal-500" />,
      title: "Focus Areas",
      content: "Web Development & Software Engineering",
      subContent: "Modern tech stack & best practices",
    }
  ]

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center py-16 sm:py-20 md:py-24 bg-gray-900">
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ 
            position: [0, 0, 5], 
            fov: 45,
            near: 0.1,
            far: 1000
          }}
          style={{ width: '100%', height: '100%' }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <AnimatedCube />
            <Environment preset="warehouse" />
          </Suspense>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.2}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 2.5}
          />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 1 }}
          className="text-center mb-6 sm:mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">About Me</h2>
          <div className="w-16 sm:w-20 h-1 bg-teal-500 mx-auto"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center mb-6 sm:mb-8 md:mb-12 px-4"
          >
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              I'm Syed Abeer, a 20-year-old aspiring Full Stack Developer passionate about creating innovative web solutions. 
              My journey in tech combines academic excellence with practical development experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-12 px-4">
            {aboutCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg hover:bg-gray-800/70 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl text-teal-500">{card.icon}</div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold mt-3 sm:mt-4 mb-2">{card.title}</h3>
                  <p className="text-teal-500 font-medium mb-1 text-sm sm:text-base">{card.content}</p>
                  <p className="text-gray-400 text-xs sm:text-sm">{card.subContent}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-4"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
                <FaCode className="text-teal-500 mr-2 text-lg sm:text-xl md:text-2xl" />
                Technical Journey
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
                Specializing in modern web technologies, I've developed strong foundations in both frontend and backend development.
                My academic pursuits in Computer Science complement my practical development experience.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
                <FaServer className="text-teal-500 mr-2 text-lg sm:text-xl md:text-2xl" />
                Professional Focus
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
                Currently focused on building scalable web applications and exploring new technologies.
                I combine academic knowledge with real-world project experience to deliver effective solutions.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
