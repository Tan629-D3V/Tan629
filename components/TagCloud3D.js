import React, { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';

const TagCloud3D = ({ skills }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Tag cloud configuration
    const config = {
      radius: Math.min(canvas.width, canvas.height) * 0.25,
      maxSpeed: 0.05,
      initSpeed: 0.05,
      direction: 135,
      keep: true
    };

    // Create tags
    const tags = skills.map((skill, index) => ({
      text: skill.id,
      x: 0,
      y: 0,
      z: 0,
      size: Math.max(14, 24 - skill.val * 2),
      weight: skill.val,
      color: skill.id === 'JavaScript' || skill.id === 'React' || skill.id === 'Adobe XD' 
        ? '#3CCF91' 
        : '#ffffff',
      opacity: 1,
      isHovered: false,
      hoverScale: 1,
      originalSize: Math.max(14, 24 - skill.val * 2)
    }));

    // Initialize tag positions
    const initTags = () => {
      tags.forEach((tag, index) => {
        const phi = Math.acos(-1 + (2 * index) / tags.length);
        const theta = Math.sqrt(tags.length * Math.PI) * phi;
        
        tag.x = config.radius * Math.cos(theta) * Math.sin(phi);
        tag.y = config.radius * Math.sin(theta) * Math.sin(phi);
        tag.z = config.radius * Math.cos(phi);
      });
    };

    initTags();

    // Animation variables
    let mouseX = 0;
    let mouseY = 0;
    let autoRotateX = 0;
    let autoRotateY = 0;
    let isMouseOver = false;
    let hoveredTag = null;

    // Mouse event handlers
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      mouseY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      isMouseOver = true;
      
      // Check for tag hover
      const mouseCanvasX = e.clientX - rect.left;
      const mouseCanvasY = e.clientY - rect.top;
      
      // Find the closest tag to mouse position
      let closestTag = null;
      let closestDistance = Infinity;
      
      tags.forEach(tag => {
        // Apply current rotation to get screen position
        let rx1 = tag.x;
        let ry1 = tag.y * Math.cos(autoRotateX) + tag.z * Math.sin(autoRotateX);
        let rz1 = tag.z * Math.cos(autoRotateX) - tag.y * Math.sin(autoRotateX);
        
        let rx2 = rx1 * Math.cos(autoRotateY) + rz1 * Math.sin(autoRotateY);
        let ry2 = ry1;
        let rz2 = rz1 * Math.cos(autoRotateY) - rx1 * Math.sin(autoRotateY);
        
        const scale = config.radius / (config.radius + rz2);
        const x = rx2 * scale + canvas.width / 2;
        const y = ry2 * scale + canvas.height / 2;
        
        const distance = Math.sqrt((mouseCanvasX - x) ** 2 + (mouseCanvasY - y) ** 2);
        if (distance < closestDistance && distance < 50) { // 50px hover radius
          closestDistance = distance;
          closestTag = tag;
        }
      });
      
      // Update hover states
      tags.forEach(tag => {
        const wasHovered = tag.isHovered;
        tag.isHovered = tag === closestTag;
        
        // Animate scale on hover
        if (tag.isHovered && !wasHovered) {
          tag.hoverScale = 1.3;
        } else if (!tag.isHovered && wasHovered) {
          tag.hoverScale = 1;
        }
      });
      
      hoveredTag = closestTag;
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
      hoveredTag = null;
      tags.forEach(tag => {
        tag.isHovered = false;
        tag.hoverScale = 1;
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Auto-rotation when mouse is not over and no tag is hovered
      if (!isMouseOver && !hoveredTag) {
        autoRotateX += 0.005;
        autoRotateY += 0.003;
      }
      
      // Update tag positions
      tags.forEach(tag => {
        // Apply auto-rotation
        let rx1 = tag.x;
        let ry1 = tag.y * Math.cos(autoRotateX) + tag.z * Math.sin(autoRotateX);
        let rz1 = tag.z * Math.cos(autoRotateX) - tag.y * Math.sin(autoRotateX);
        
        let rx2 = rx1 * Math.cos(autoRotateY) + rz1 * Math.sin(autoRotateY);
        let ry2 = ry1;
        let rz2 = rz1 * Math.cos(autoRotateY) - rx1 * Math.sin(autoRotateY);
        
        // Apply mouse interaction
        if (isMouseOver && !tag.isHovered) {
          rx1 = rx2;
          ry1 = ry2 * Math.cos(mouseX * 0.1) + rz2 * Math.sin(mouseX * 0.1);
          rz1 = rz2 * Math.cos(mouseX * 0.1) - ry2 * Math.sin(mouseX * 0.1);
          
          rx2 = rx1 * Math.cos(mouseY * 0.1) + rz1 * Math.sin(mouseY * 0.1);
          ry2 = ry1;
          rz2 = rz1 * Math.cos(mouseY * 0.1) - rx1 * Math.sin(mouseY * 0.1);
        }
        
        // Project 3D to 2D
        const scale = config.radius / (config.radius + rz2);
        const x = rx2 * scale + canvas.width / 2;
        const y = ry2 * scale + canvas.height / 2;
        
        // Calculate opacity based on z position
        const opacity = Math.max(0.3, (rz2 + config.radius) / (2 * config.radius));
        
        // Draw tag
        if (x > -100 && x < canvas.width + 100 && y > -100 && y < canvas.height + 100) {
          // Calculate final size with hover scale
          const finalSize = tag.originalSize * tag.hoverScale;
          
          ctx.font = `${finalSize}px Inter, Arial, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          // Enhanced glow effect for hovered tags
          if (tag.isHovered) {
            // Draw background glow
            ctx.shadowColor = tag.color;
            ctx.shadowBlur = 25;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.fillStyle = 'rgba(60, 207, 145, 0.2)';
            ctx.fillText(tag.text, x, y);
            
            // Draw main text with stronger glow
            ctx.shadowBlur = 20;
            ctx.fillStyle = tag.color;
            ctx.fillText(tag.text, x, y);
            
            // Draw outline for extra pop
            ctx.shadowBlur = 0;
            ctx.strokeStyle = '#3CCF91';
            ctx.lineWidth = 2;
            ctx.strokeText(tag.text, x, y);
          } else {
            // Normal rendering for non-hovered tags
            ctx.globalAlpha = opacity;
            
            if (tag.color === '#3CCF91') {
              ctx.shadowColor = '#3CCF91';
              ctx.shadowBlur = 15;
              ctx.shadowOffsetX = 0;
              ctx.shadowOffsetY = 0;
            } else {
              ctx.shadowBlur = 0;
            }
            
            ctx.fillStyle = tag.color;
            ctx.fillText(tag.text, x, y);
            
            ctx.globalAlpha = 1;
          }
        }
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [skills]);

  return (
    <Box
      ref={containerRef}
      pos="absolute"
      top="0"
      left="0"
      w="100%"
      h="100%"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          display: 'block'
        }}
      />
    </Box>
  );
};

export default TagCloud3D; 