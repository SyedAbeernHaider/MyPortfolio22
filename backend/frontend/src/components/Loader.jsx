"use client"

import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { motion } from 'framer-motion'

const LoaderModel = () => {
  const [rotation, setRotation] = React.useState(0)

  React.useEffect(() => {
    let animationFrame
    const animate = () => {
      setRotation(prev => prev + 0.02)
      animationFrame = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <Float speed={5} rotationIntensity={0.5} floatIntensity={1}>
      <group rotation-y={rotation}>
        {/* Outer Ring */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[2, 0.2, 16, 32]} />
          <meshStandardMaterial
            color="#0d9488"
            emissive="#0d9488"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Inner Geometric Shape */}
        <mesh position={[0, 0, 0]} rotation-x={Math.PI / 4}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#0d9488"
            emissive="#0d9488"
            emissiveIntensity={0.8}
            metalness={1}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Orbiting Spheres */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
          <mesh
            key={i}
            position={[
              1.5 * Math.cos(angle + rotation * 2),
              0,
              1.5 * Math.sin(angle + rotation * 2),
            ]}
          >
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color="#0d9488"
              emissive="#0d9488"
              emissiveIntensity={1}
              metalness={1}
              roughness={0.1}
            />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
      <div className="w-full h-full max-w-md max-h-md">
        <Canvas
          camera={{
            position: [0, 0, 6],
            fov: 45,
            near: 0.1,
            far: 1000,
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <LoaderModel />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Canvas>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute bottom-12 left-0 right-0 text-center"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-teal-500 mb-2">
          Loading
          <motion.span
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            ...
          </motion.span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Preparing something amazing
        </p>
      </motion.div>
    </div>
  )
}

export default Loader
