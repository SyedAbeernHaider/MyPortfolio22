"use client"

import React from "react"
import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text, Float, Environment } from "@react-three/drei"
import { motion } from "framer-motion"
import { FaGithub, FaLinkedin, FaTwitter, FaCode, FaServer, FaDatabase } from "react-icons/fa"

// Enhanced morphing blob with particles
function MorphingBlob() {
  const meshRef = React.useRef()
  
  React.useEffect(() => {
    let frameId
    const animate = () => {
      if (meshRef.current) {
        const t = performance.now() * 0.001
        const geometry = meshRef.current.geometry
        const position = geometry.attributes.position
        for (let i = 0; i < position.count; i++) {
          const ix = i * 3
          const iy = i * 3 + 1
          const iz = i * 3 + 2
          const x0 = position.getX(i)
          const y0 = position.getY(i)
          const z0 = position.getZ(i)
          const offset = Math.sin(t + x0 * 4 + y0 * 4 + z0 * 4) * 0.15
          position.setXYZ(i, x0 + offset * x0, y0 + offset * y0, z0 + offset * z0)
        }
        position.needsUpdate = true
        geometry.computeVertexNormals()
      }
      frameId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, -2]} scale={[1.5, 1.5, 1.5]}>
        <icosahedronGeometry args={[1.5, 4]} />
        <meshStandardMaterial
          color="#0d9488"
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.25}
          emissive="#0d9488"
          emissiveIntensity={0.2}
          wireframe={false}
        />
      </mesh>
      {/* Particle field with adjusted positioning */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Float key={i} speed={1} rotationIntensity={2} floatIntensity={2}>
          <mesh position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          ]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial
              color="#0d9488"
              emissive="#0d9488"
              emissiveIntensity={1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function Home({ isActive }) {
  const skills = [
    { icon: <FaCode />, text: "Frontend Development" },
    { icon: <FaServer />, text: "Backend Development" },
    { icon: <FaDatabase />, text: "Database Management" }
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center py-20 sm:py-24 md:py-28">
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ 
            position: [0, 0, 5], 
            fov: 45,
            near: 0.1,
            far: 1000
          }}
          style={{ width: '100%', height: '100%' }}
          dpr={[1, 2]} // Optimize performance while maintaining quality
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <MorphingBlob />
            <Environment preset="night" />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 z-10 mt-16 sm:mt-0">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-6 sm:mb-8 px-4 sm:px-6"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight">
              <span className="text-white">Hello, I'm </span>
              <span className="text-teal-500 block sm:inline">Syed Abeer</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-6 sm:mb-8 px-4 sm:px-6"
          >
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-4">
              Full Stack Web Developer
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Passionate about creating innovative web solutions with modern technologies.
              Specializing in full-stack development with a focus on user experience and performance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 px-4 sm:px-6"
          >
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-800/30 backdrop-blur-sm p-3 sm:p-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-800/50 transition-all duration-300"
              >
                <span className="text-teal-500 text-lg sm:text-xl">{skill.icon}</span>
                <span className="text-gray-300 text-xs sm:text-sm md:text-base">{skill.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8 px-4 sm:px-6"
          >
            <a
              href="#contact"
              className="px-4 sm:px-6 py-2 sm:py-3 bg-teal-500 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-teal-600 transition-colors text-center"
            >
              Contact Me
            </a>
            <a
              href="/assets/Professional CV.pdf"
              download="Syed_Abeer_Professional_CV.pdf"
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-800 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
              onClick={(e) => {
                e.preventDefault();
                window.open('/assets/Professional CV.pdf', '_blank');
              }}
            >
              <span>Download CV</span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center space-x-4 sm:space-x-6 px-4 sm:px-6"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
            >
              <FaGithub className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
            >
              <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
            >
              <FaTwitter className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="animate-bounce px-4"
        >
          <p className="text-gray-400 text-xs sm:text-sm mb-2">Scroll to explore</p>
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mx-auto"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
