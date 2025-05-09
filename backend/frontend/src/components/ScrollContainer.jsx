"use client"

import React from "react"

import { useState, useEffect, useRef, Children, cloneElement } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ScrollContainer({ children }) {
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef(null)
  const sectionRefs = useRef([])
  const scrolling = useRef(false)
  const touchStartY = useRef(0)

  // Initialize section refs
  useEffect(() => {
    sectionRefs.current = Array(Children.count(children))
      .fill()
      .map((_, i) => sectionRefs.current[i] || React.createRef())
  }, [children])

  // Handle scroll events
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()

      if (scrolling.current) return

      scrolling.current = true

      if (e.deltaY > 0 && activeSection < Children.count(children) - 1) {
        // Scroll down
        setActiveSection(activeSection + 1)
      } else if (e.deltaY < 0 && activeSection > 0) {
        // Scroll up
        setActiveSection(activeSection - 1)
      }

      setTimeout(() => {
        scrolling.current = false
      }, 1000) // Debounce scroll events
    }

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
      e.preventDefault()

      if (scrolling.current) return

      const touchY = e.touches[0].clientY
      const diff = touchStartY.current - touchY

      if (Math.abs(diff) < 50) return

      scrolling.current = true

      if (diff > 0 && activeSection < Children.count(children) - 1) {
        // Swipe up (scroll down)
        setActiveSection(activeSection + 1)
      } else if (diff < 0 && activeSection > 0) {
        // Swipe down (scroll up)
        setActiveSection(activeSection - 1)
      }

      setTimeout(() => {
        scrolling.current = false
      }, 1000)
    }

    const container = containerRef.current

    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
      container.addEventListener("touchstart", handleTouchStart, { passive: true })
      container.addEventListener("touchmove", handleTouchMove, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
      }
    }
  }, [activeSection, children])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (scrolling.current) return

      if (e.key === "ArrowDown" && activeSection < Children.count(children) - 1) {
        scrolling.current = true
        setActiveSection(activeSection + 1)
        setTimeout(() => {
          scrolling.current = false
        }, 1000)
      } else if (e.key === "ArrowUp" && activeSection > 0) {
        scrolling.current = true
        setActiveSection(activeSection - 1)
        setTimeout(() => {
          scrolling.current = false
        }, 1000)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeSection, children])

  return (
    <div ref={containerRef} className="h-screen overflow-hidden">
      <AnimatePresence initial={false}>
        {Children.map(children, (child, index) => {
          // Only render the active section and the one below it (for the stacked effect)
          if (index !== activeSection && index !== activeSection + 1) return null

          const zIndex = index === activeSection ? 20 : 10

          return (
            <motion.div
              key={index}
              ref={sectionRefs.current[index]}
              id={child.props.id || `section-${index}`}
              className="absolute top-0 left-0 w-full h-screen"
              style={{ zIndex }}
              initial={{
                y: index < activeSection ? "-100%" : "100%",
                opacity: index === activeSection ? 1 : 0.5,
              }}
              animate={{
                y: index === activeSection ? 0 : index === activeSection + 1 ? "15%" : "-100%",
                opacity: index === activeSection ? 1 : 0.8,
              }}
              exit={{
                y: index < activeSection ? "-100%" : "100%",
                opacity: 0.5,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              {cloneElement(child, { isActive: index === activeSection })}
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col space-y-4">
          {Children.map(children, (_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeSection ? "bg-teal-500 scale-125" : "bg-gray-500 hover:bg-gray-400"
                }`}
              onClick={() => {
                if (!scrolling.current) {
                  scrolling.current = true
                  setActiveSection(index)
                  setTimeout(() => {
                    scrolling.current = false
                  }, 1000)
                }
              }}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
