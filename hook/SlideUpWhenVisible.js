import { useRef } from 'react'
import { useInView, motion } from 'framer-motion'

/**
 * SectionReveal: Animates section entrance on scroll, supports direction and staggered children.
 * @param {children} ReactNode(s) to animate
 * @param {direction} 'right' | 'left' | 'up' | 'down' (default: 'up')
 * @param {delay} animation delay (default: 0)
 * @param {stagger} stagger delay for children (default: 0.15)
 * @param {duration} animation duration (default: 0.5)
 */
export default function SectionReveal({
  children,
  direction = 'up',
  delay = 0,
  stagger = 0.15,
  duration = 0.5,
  ...rest
}) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  let offsetX = 0, offsetY = 0
  if (direction === 'right') offsetX = 40
  else if (direction === 'left') offsetX = -40
  else if (direction === 'down') offsetY = 40
  else offsetY = 30

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, x: offsetX, y: offsetY }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, ease: 'easeOut', delay }}
      style={{ willChange: 'transform, opacity' }}
      {...rest}
    >
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: stagger, delayChildren: delay + 0.1 } }
        }}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'backOut' } }
                }}
                style={{ willChange: 'transform, opacity' }}
              >
                {child}
              </motion.div>
            ))
          : children}
      </motion.div>
    </motion.section>
  )
}
