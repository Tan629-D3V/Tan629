import {
  Box,
  Stack,
  Text,
  Heading,
  Badge,
  Link,
  HStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaGithub, FaExternalLinkAlt, FaCalendar, FaCode } from 'react-icons/fa'

export default function ProjectCard({ 
  title, 
  description, 
  technologies, 
  githubUrl, 
  liveUrl, 
  date, 
  status = 'completed',
  image 
}) {
  const bgColor = useColorModeValue('gray.50', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const statusColors = {
    completed: 'green',
    inProgress: 'yellow',
    planned: 'blue'
  }

  return (
    <Box
      p={6}
      bg={bgColor}
      border="1px"
      borderColor={borderColor}
      borderRadius="lg"
      _hover={{
        transform: 'translateY(-2px)',
        shadow: 'lg',
        borderColor: 'button1'
      }}
      transition="all 0.3s ease"
    >
      <Stack spacing={4}>
        <HStack align="flex-start" justify="space-between">
          <Heading bgGradient="linear(to-r, gray.600, gray.400)" bgClip="text" size="md">
            {title}
          </Heading>
          <Badge colorScheme={statusColors[status]} variant="subtle">
            {status}
          </Badge>
        </HStack>
        <Text color="textSecondary" fontSize="sm">
          {description}
        </Text>
        {technologies && (
          <HStack flexWrap="wrap" spacing={2}>
            {technologies.map((tech, index) => (
              <Badge key={index} fontSize="xs" colorScheme="blue" variant="outline">
                {tech}
              </Badge>
            ))}
          </HStack>
        )}
        <HStack color="textSecondary" fontSize="sm" spacing={4}>
          {date && (
            <HStack spacing={1}>
              <Icon as={FaCalendar} />
              <Text>{date}</Text>
            </HStack>
          )}
          <HStack spacing={1}>
            <Icon as={FaCode} />
            <Text>{technologies?.length || 0} technologies</Text>
          </HStack>
        </HStack>
        <HStack spacing={3}>
          {githubUrl && (
            <Link href={githubUrl} isExternal>
              <Icon as={FaGithub} boxSize={5} color="textSecondary" />
            </Link>
          )}
          {liveUrl && (
            <Link href={liveUrl} isExternal>
              <Icon as={FaExternalLinkAlt} boxSize={5} color="textSecondary" />
            </Link>
          )}
        </HStack>
      </Stack>
    </Box>
  )
} 