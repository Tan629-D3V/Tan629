import { useEffect, useState } from 'react'
import { IconButton } from '@chakra-ui/react'
import { ChevronUpIcon } from '@chakra-ui/icons'
import { motion, AnimatePresence } from 'framer-motion'

export default function BackToTopButton() {
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <AnimatePresence>
      {showTop && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ position: 'fixed', bottom: '2.5rem', right: '2.5rem', zIndex: 100 }}
        >
          <IconButton
            icon={<ChevronUpIcon boxSize={6} />}
            aria-label="Back to top"
            color="button1"
            bg="transparent"
            _hover={{
              bg: 'button1',
              color: 'white',
              transform: 'scale(1.12)',
              boxShadow: '0 4px 16px 0rgb(60, 173, 207)',
            }}
            borderRadius="full"
            boxShadow="lg"
            transition="all 0.2s cubic-bezier(.4,0,.2,1)"
            onClick={scrollToTop}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
} 