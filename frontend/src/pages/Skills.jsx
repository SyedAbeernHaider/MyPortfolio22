"use client"

import React from "react"
import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Html } from "@react-three/drei"
import { motion } from "framer-motion"
import { FaReact, FaNodeJs, FaDatabase, FaDocker, FaAws, FaFigma } from "react-icons/fa"
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiGraphql } from "react-icons/si"

function SkillsIcosahedron() {
  const mesh = useRef()

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.05
      mesh.current.rotation.y += 0.05
    }
  })

  const skills = [
    { Icon: FaReact, name: "React", color: "#61DAFB" },
    { Icon: SiNextdotjs, name: "Next.js", color: "#FFFFFF" },
    { Icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
    { Icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
    { Icon: FaNodeJs, name: "Node.js", color: "#339933" },
    { Icon: SiExpress, name: "Express", color: "#FFFFFF" },
    { Icon: SiMongodb, name: "MongoDB", color: "#47A248" },
    { Icon: FaDatabase, name: "SQL", color: "#4479A1" },
    { Icon: SiGraphql, name: "GraphQL", color: "#E10098" },
    { Icon: FaDocker, name: "Docker", color: "#2496ED" },
    { Icon: FaAws, name: "AWS", color: "#FF9900" },
    { Icon: FaFigma, name: "Figma", color: "#F24E1E" },
  ]

  return (
    <group ref={mesh}>
      <mesh>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshStandardMaterial color="#0d9488" wireframe emissive="#0d9488" emissiveIntensity={0.2} />
      </mesh>

      {skills.map((skill, index) => {
        // Position skills around the icosahedron
        const phi = Math.acos(-1 + (2 * index) / skills.length)
        const theta = Math.sqrt(skills.length * Math.PI) * phi
        const x = 3 * Math.cos(theta) * Math.sin(phi)
        const y = 3 * Math.sin(theta) * Math.sin(phi)
        const z = 3 * Math.cos(phi)

        return (
          <Html key={index} position={[x, y, z]} center>
            <div className="flex flex-col items-center">
              <skill.Icon size={24} color={skill.color} />
              <span className="text-xs mt-1 text-white">{skill.name}</span>
            </div>
          </Html>
        )
      })}
    </group>
  )
}

export default function Skills({ isActive }) {
  const frontendSkills = [
    { name: "HTML/CSS", level: 90 },
    { name: "JavaScript", level: 80 },
    { name: "React", level: 80 },
    { name: "TypeScript", level: 59 },
    { name: "Tailwind CSS", level: 85 },
    { name: "Bootstrap", level: 85 }
  ]

  const backendSkills = [
    { name: "Node.js", level: 80 },
    { name: "Express", level: 80 },
    { name: "MongoDB", level: 80 },
    { name: "PostgreSQL", level: 70 },
    { name: "MySQL", level: 70 },
    { name: "REST API", level: 80 }
  ]

  const otherSkills = [
    { name: "Git/GitHub", level: 80 },
    { name: "Python", level: 65 },
    { name: "Java", level: 60 },
    { name: "Laravel", level: 64 },
    { name: "DSA", level: 60 },
    { name: "OOP", level: 60 }
  ]

  return (
    <section id="skills" className="relative h-screen flex items-center justify-center pt-16 bg-gray-900">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <SkillsIcosahedron />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={5} />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-2">My Skills</h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Frontend</h3>
              <div className="space-y-4">
                {frontendSkills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-teal-500 h-2.5 rounded-full"
                        style={{
                          width: `${skill.level}%`,
                          transitionProperty: isActive ? 'width' : 'none',
                          transitionDuration: isActive ? '1s' : '0s',
                          transitionTimingFunction: 'ease-in-out',
                          transitionDelay: `${0.4 + index * 0.1}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Backend</h3>
              <div className="space-y-4">
                {backendSkills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-teal-500 h-2.5 rounded-full"
                        style={{
                          width: `${skill.level}%`,
                          transitionProperty: isActive ? 'width' : 'none',
                          transitionDuration: isActive ? '1s' : '0s',
                          transitionTimingFunction: 'ease-in-out',
                          transitionDelay: `${0.4 + index * 0.1}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Other Skills</h3>
              <div className="space-y-4">
                {otherSkills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-teal-500 h-2.5 rounded-full"
                        style={{
                          width: `${skill.level}%`,
                          transitionProperty: isActive ? 'width' : 'none',
                          transitionDuration: isActive ? '1s' : '0s',
                          transitionTimingFunction: 'ease-in-out',
                          transitionDelay: `${0.4 + index * 0.1}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
