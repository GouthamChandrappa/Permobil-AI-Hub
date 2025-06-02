import { useEffect, useRef } from 'react';

const AIBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{ 
      x: number; 
      y: number; 
      vx: number; 
      vy: number; 
      size: number;
      opacity: number;
      color: string;
      type: 'node' | 'data' | 'synapse';
    }> = [];
    
    const particleCount = 80;
    const colors = ['#00FFCC', '#8A2BE2', '#00D4FF', '#F472B6'];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: ['node', 'data', 'synapse'][Math.floor(Math.random() * 3)] as 'node' | 'data' | 'synapse'
      });
    }

    const dataStreams: Array<{
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      progress: number;
      speed: number;
    }> = [];

    const animate = () => {
      // Clear with gradient fade effect
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width
      );
      gradient.addColorStop(0, 'rgba(8, 8, 20, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.15)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges with some energy loss
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.9;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.9;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Draw particle based on type
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        
        if (particle.type === 'node') {
          // Neural node
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 2
          );
          gradient.addColorStop(0, particle.color);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.type === 'data') {
          // Data packet
          ctx.fillStyle = particle.color;
          ctx.fillRect(
            particle.x - particle.size / 2, 
            particle.y - particle.size / 2, 
            particle.size, 
            particle.size
          );
        } else {
          // Synapse
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = particle.size / 2;
          ctx.beginPath();
          ctx.moveTo(particle.x - particle.size, particle.y);
          ctx.lineTo(particle.x + particle.size, particle.y);
          ctx.stroke();
        }
        
        ctx.restore();

        // Draw connections between nearby particles
        particles.slice(i + 1).forEach(otherParticle => {
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) + 
            Math.pow(particle.y - otherParticle.y, 2)
          );

          if (distance < 120) {
            const opacity = 0.3 * (1 - distance / 120);
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();

            // Occasionally create data streams
            if (Math.random() < 0.001 && dataStreams.length < 5) {
              dataStreams.push({
                x: particle.x,
                y: particle.y,
                targetX: otherParticle.x,
                targetY: otherParticle.y,
                progress: 0,
                speed: 0.02 + Math.random() * 0.03
              });
            }
          }
        });
      });

      // Draw and update data streams
      dataStreams.forEach((stream, index) => {
        stream.progress += stream.speed;
        
        const currentX = stream.x + (stream.targetX - stream.x) * stream.progress;
        const currentY = stream.y + (stream.targetY - stream.y) * stream.progress;
        
        ctx.save();
        ctx.globalAlpha = 0.8 * (1 - stream.progress);
        ctx.fillStyle = '#00FFCC';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00FFCC';
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        if (stream.progress >= 1) {
          dataStreams.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default AIBackground;
