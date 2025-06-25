import { Box, Text, Heading, Link, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';
import TagCloud3D from './TagCloud3D';

const skills = [
  { id: 'JavaScript', val: 3 },
  { id: 'ChartJS', val: 2 },
  { id: 'Express', val: 2 },
  { id: 'React', val: 2 },
  { id: 'Next.js', val: 1.7 },
  { id: 'Node', val: 1.5 },
  { id: 'TypeScript', val: 1.5 },
  { id: 'HTML', val: 1.2 },
  { id: 'CSS', val: 1.2 },
  { id: 'SQL', val: 1.2 },
  { id: 'MongoDB', val: 1.2 },
  { id: 'Python', val: 1.2 },
  { id: 'C++', val: 1.1 },
  { id: 'PHP', val: 1 },
  { id: 'Git', val: 1 },
  { id: 'Styled-Components', val: 1 },
  { id: 'Figma', val: 1 },
  { id: 'Django', val: 1 },
  { id: 'PostgreSQL', val: 1 },
  { id: 'Azure', val: 1 },
  { id: 'Photoshop', val: 1 },
  { id: 'Angular', val: 1 },
  { id: 'Ruby', val: 1 },
  { id: 'API', val: 1 },
  { id: 'Visual Studio', val: 1 },
  { id: 'Adobe XD', val: 1 },
];

export default function Skills() {
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const accent = 'button1';

  return (
    <Box 
      w="100%" 
      py={{ base: 20, md: 32 }} 
      px={{ base: 4, md: 10 }}
      position="relative"
      overflow="hidden"
      minH={{ base: '600px', md: '800px' }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/* 3D Tag Cloud as Background */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        zIndex={0}
      >
        <TagCloud3D skills={skills} />
      </Box>
      
      {/* Centered Glassmorphism Circle */}
      <Box
        position="relative"
        zIndex={2}
        w={{ base: '220px', sm: '200px', md: '300px' }}
        h={{ base: '220px', sm: '200px', md: '300px' }}
        borderRadius="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        p={{ base: 6, md: 10 }}
        transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        _hover={{
          transform: 'scale(1.1)',
          filter: 'brightness(1.1)',
        }}
        sx={{
          // Liquid glass effect with multiple layers
          background: `
            radial-gradient(
              circle at 30% 30%,
              rgba(255, 255, 255, 0.1) 0%,
              rgba(255, 255, 255, 0.05) 25%,
              rgba(255, 255, 255, 0.02) 50%,
              transparent 100%
            ),
            radial-gradient(
              circle at 70% 70%,
              rgba(60, 207, 145, 0.08) 0%,
              rgba(60, 207, 145, 0.04) 25%,
              rgba(60, 207, 145, 0.02) 50%,
              transparent 100%
            ),
            rgba(10, 10, 10, 0.15)
          `,
          backdropFilter: `
            blur(20px) 
            saturate(180%) 
            contrast(1.1)
          `,
          border: `
            1px solid rgba(255, 255, 255, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.08)
          `,
          boxShadow: `
            0 8px 32px 0 rgba(0, 0, 0, 0.37),
            0 2px 8px 0 rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1)
          `,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            borderRadius: 'inherit',
            background: `
              linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.1) 0%,
                rgba(255, 255, 255, 0.05) 50%,
                rgba(255, 255, 255, 0.02) 100%
              )
            `,
            backdropFilter: 'blur(10px)',
            opacity: 0.6,
            zIndex: -1,
            animation: 'liquidShimmer 3s ease-in-out infinite',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '2px',
            left: '2px',
            right: '2px',
            bottom: '2px',
            borderRadius: 'inherit',
            background: `
              radial-gradient(
                circle at 20% 80%,
                rgba(60, 207, 145, 0.15) 0%,
                transparent 50%
              )
            `,
            opacity: 0.3,
            zIndex: -2,
            animation: 'liquidFlow 4s ease-in-out infinite',
          }
        }}
      >
        <VStack spacing={4}>
          {/* Main Heading */}
          <Heading
            as="h2"
            fontSize={{ base: '2xl', md: '4xl' }}
            color={accent}
            fontFamily="Ubuntu"
            fontWeight="bold"
            textShadow="0px 2px 15px rgba(0, 0, 0, 0.6)"
            sx={{
              background: 'linear-gradient(135deg, #3CCF91 0%, #ffffff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
            }}
          >
            Skills <Text as="span" color="white" fontWeight="normal">&</Text> Tools
          </Heading>
          
          {/* Subheading */}
          <Text 
            color="gray.300" 
            fontSize={{ base: 'xs', md: 'sm' }} 
            lineHeight="1.6"
            maxW="90%"
            mx="auto"
            fontWeight="300"
            textShadow="0px 1px 8px rgba(0, 0, 0, 0.8)"
            sx={{
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
              filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))',
            }}
          >
            For a more <Link 
              color={accent} 
              href="#projects" 
              fontWeight="bold"
              _hover={{ 
                color: 'white', 
                textDecoration: 'underline',
                textShadow: '0 0 8px rgba(60, 207, 145, 0.6)',
              }}
            >detailed</Link> overview, please feel free
            to check the tools that were used on a per-project basis.
          </Text>
        </VStack>
      </Box>

      {/* Floating Micro-Effects */}
      <Box
        position="absolute"
        top="20%"
        left="10%"
        w="4px"
        h="4px"
        bg={accent}
        borderRadius="full"
        opacity={0.6}
        animation="float1 6s ease-in-out infinite"
        zIndex={1}
      />
      <Box
        position="absolute"
        top="60%"
        right="15%"
        w="6px"
        h="6px"
        bg={accent}
        borderRadius="full"
        opacity={0.4}
        animation="float2 8s ease-in-out infinite"
        zIndex={1}
      />
      <Box
        position="absolute"
        bottom="30%"
        left="20%"
        w="3px"
        h="3px"
        bg="white"
        borderRadius="full"
        opacity={0.5}
        animation="float3 7s ease-in-out infinite"
        zIndex={1}
      />

      <style jsx>{`
        @keyframes glow {
          0% { box-shadow: 0 0 5px rgba(60, 207, 145, 0.3); }
          100% { box-shadow: 0 0 20px rgba(60, 207, 145, 0.6); }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
          50% { transform: translateY(-30px) scale(1.5); opacity: 0.8; }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.5; }
          50% { transform: translateY(-15px) scale(1.3); opacity: 0.9; }
        }
        @keyframes liquidShimmer {
          0%, 100% { 
            opacity: 0.6;
            transform: translateX(-2px) translateY(-2px);
          }
          20% { 
            opacity: 0.8;
            transform: translateX(2px) translateY(2px);
          }
        }
        @keyframes liquidFlow {
          0%, 100% { 
            opacity: 2.3;
            transform: scale(1) rotate(0deg);
          }
          25% { 
            opacity: 0.4;
            transform: scale(1.05) rotate(1deg);
          }
          50% { 
            opacity: 0.5;
            transform: scale(1.1) rotate(0deg);
          }
          75% { 
            opacity: 0.4;
            transform: scale(1.05) rotate(-1deg);
          }
        }
      `}</style>
    </Box>
  );
} 