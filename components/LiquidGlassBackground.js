import { useEffect, useRef } from 'react';

// Liquid Glass effect adapted from https://github.com/shuding/liquid-glass/blob/main/liquid-glass.js
export default function LiquidGlassBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId;

    // Resize canvas
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    // Liquid glass animation variables
    const points = [];
    const POINTS = 18;
    const RADIUS = Math.max(width, height) * 0.45;
    const CENTER = { x: width / 2, y: height / 2 };
    for (let i = 0; i < POINTS; i++) {
      const angle = (i / POINTS) * Math.PI * 2;
      points.push({
        angle,
        radius: RADIUS + Math.random() * 30 - 15,
        speed: 0.002 + Math.random() * 0.02,
        offset: Math.random() * Math.PI * 2,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.globalAlpha = 0.25;
      ctx.filter = 'blur(16px)';
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const x = CENTER.x + Math.cos(p.angle + p.offset) * p.radius;
        const y = CENTER.y + Math.sin(p.angle + p.offset) * p.radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(60, 207, 145, 0.18)';
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      for (let p of points) {
        p.offset += p.speed;
      }
      draw();
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
      aria-hidden="true"
    />
  );
} 