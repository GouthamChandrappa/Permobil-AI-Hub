import { useEffect, useRef } from 'react';

const FuturisticBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Enhanced neural network nodes
    const neurons: Array<{ 
      x: number; 
      y: number; 
      vx: number; 
      vy: number; 
      size: number;
      opacity: number;
      color: string;
      type: 'input' | 'hidden' | 'output' | 'data' | 'processor';
      pulsePhase: number;
      connections: number[];
      activity: number;
      energy: number;
    }> = [];
    
    const neuronCount = 120;
    const colors = ['#00d4ff', '#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#8b5cf6'];

    // Initialize neurons with enhanced properties
    for (let i = 0; i < neuronCount; i++) {
      neurons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 8 + 4,
        opacity: Math.random() * 0.8 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: ['input', 'hidden', 'output', 'data', 'processor'][Math.floor(Math.random() * 5)] as any,
        pulsePhase: Math.random() * Math.PI * 2,
        connections: [],
        activity: Math.random(),
        energy: Math.random()
      });
    }

    // Create dynamic neural connections
    neurons.forEach((neuron, i) => {
      const connectionCount = Math.floor(Math.random() * 4) + 2;
      for (let j = 0; j < connectionCount; j++) {
        const target = Math.floor(Math.random() * neuronCount);
        if (target !== i && !neuron.connections.includes(target)) {
          neuron.connections.push(target);
        }
      }
    });

    // Data packets for neural transmission
    const dataPackets: Array<{
      fromIndex: number;
      toIndex: number;
      progress: number;
      speed: number;
      color: string;
      size: number;
    }> = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Activate nearby neurons
      neurons.forEach(neuron => {
        const distance = Math.sqrt(
          Math.pow(mouseRef.current.x - neuron.x, 2) + 
          Math.pow(mouseRef.current.y - neuron.y, 2)
        );
        if (distance < 150) {
          neuron.activity = Math.min(1, neuron.activity + 0.1);
          neuron.energy = Math.min(1, neuron.energy + 0.2);
        }
      });
    };

    const handleClick = (e: MouseEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      
      // Create ripple effect from click
      neurons.forEach(neuron => {
        const distance = Math.sqrt(
          Math.pow(clickX - neuron.x, 2) + 
          Math.pow(clickY - neuron.y, 2)
        );
        if (distance < 200) {
          neuron.activity = 1;
          neuron.energy = 1;
          // Send data packets from activated neurons
          neuron.connections.forEach(connectionIndex => {
            if (Math.random() < 0.7) {
              dataPackets.push({
                fromIndex: neurons.indexOf(neuron),
                toIndex: connectionIndex,
                progress: 0,
                speed: 0.01 + Math.random() * 0.02,
                color: neuron.color,
                size: Math.random() * 3 + 2
              });
            }
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const animate = () => {
      // Dynamic background gradient
      const time = Date.now() * 0.001;
      const gradient = ctx.createRadialGradient(
        canvas.width / 2 + Math.sin(time * 0.5) * 100, 
        canvas.height / 2 + Math.cos(time * 0.3) * 50, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, 'rgba(0, 10, 30, 0.95)');
      gradient.addColorStop(0.3, 'rgba(15, 23, 42, 0.98)');
      gradient.addColorStop(0.7, 'rgba(5, 15, 35, 0.99)');
      gradient.addColorStop(1, 'rgba(0, 5, 15, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animated neural grid
      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = '#00d4ff';
      ctx.lineWidth = 1;
      const gridSize = 80;
      
      for (let x = -gridSize; x < canvas.width + gridSize; x += gridSize) {
        for (let y = -gridSize; y < canvas.height + gridSize; y += gridSize) {
          const offsetX = Math.sin(time * 0.5 + x * 0.01) * 15;
          const offsetY = Math.cos(time * 0.3 + y * 0.01) * 15;
          const intensity = Math.sin(time + x * 0.01 + y * 0.01) * 0.5 + 0.5;
          
          ctx.globalAlpha = 0.03 + intensity * 0.05;
          ctx.beginPath();
          ctx.moveTo(x + offsetX, y + offsetY);
          ctx.lineTo(x + gridSize + offsetX, y + offsetY);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x + offsetX, y + offsetY);
          ctx.lineTo(x + offsetX, y + gridSize + offsetY);
          ctx.stroke();
        }
      }
      ctx.restore();

      // Update and draw neurons
      neurons.forEach((neuron, i) => {
        // Mouse interaction with stronger effect
        const mouseDistance = Math.sqrt(
          Math.pow(mouseRef.current.x - neuron.x, 2) + 
          Math.pow(mouseRef.current.y - neuron.y, 2)
        );
        
        if (mouseDistance < 200) {
          const force = (200 - mouseDistance) / 200;
          const angle = Math.atan2(neuron.y - mouseRef.current.y, neuron.x - mouseRef.current.x);
          neuron.vx += Math.cos(angle) * force * 0.3;
          neuron.vy += Math.sin(angle) * force * 0.3;
          neuron.activity = Math.min(1, neuron.activity + force * 0.05);
        }

        // Natural movement
        neuron.x += neuron.vx;
        neuron.y += neuron.vy;
        neuron.pulsePhase += 0.03 + neuron.activity * 0.05;

        // Enhanced boundary behavior
        if (neuron.x < 0 || neuron.x > canvas.width) {
          neuron.vx *= -0.7;
          neuron.x = Math.max(0, Math.min(canvas.width, neuron.x));
        }
        if (neuron.y < 0 || neuron.y > canvas.height) {
          neuron.vy *= -0.7;
          neuron.y = Math.max(0, Math.min(canvas.height, neuron.y));
        }

        // Apply friction and decay
        neuron.vx *= 0.98;
        neuron.vy *= 0.98;
        neuron.activity *= 0.995;
        neuron.energy *= 0.992;

        // Draw enhanced neurons
        ctx.save();
        const pulseScale = 1 + Math.sin(neuron.pulsePhase) * 0.4 * neuron.activity;
        const energyGlow = neuron.energy * 0.8 + 0.2;
        
        // Outer glow effect
        const glowGradient = ctx.createRadialGradient(
          neuron.x, neuron.y, 0,
          neuron.x, neuron.y, neuron.size * 6 * energyGlow
        );
        glowGradient.addColorStop(0, neuron.color + 'AA');
        glowGradient.addColorStop(0.3, neuron.color + '40');
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.globalAlpha = neuron.opacity * energyGlow;
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, neuron.size * 6 * energyGlow, 0, Math.PI * 2);
        ctx.fill();

        // Core neuron
        ctx.globalAlpha = neuron.opacity;
        if (neuron.type === 'processor') {
          // CPU/GPU processor visualization
          ctx.fillStyle = neuron.color;
          ctx.save();
          ctx.translate(neuron.x, neuron.y);
          ctx.rotate(neuron.pulsePhase * 0.5);
          ctx.fillRect(-neuron.size * pulseScale, -neuron.size * pulseScale, 
                      neuron.size * 2 * pulseScale, neuron.size * 2 * pulseScale);
          
          // Circuit lines
          ctx.strokeStyle = neuron.color;
          ctx.lineWidth = 2;
          ctx.globalAlpha = neuron.activity;
          for (let j = 0; j < 4; j++) {
            const angle = (j * Math.PI) / 2;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(angle) * neuron.size * 1.5, Math.sin(angle) * neuron.size * 1.5);
            ctx.stroke();
          }
          ctx.restore();
        } else {
          // Regular neural node
          ctx.fillStyle = neuron.color;
          ctx.beginPath();
          ctx.arc(neuron.x, neuron.y, neuron.size * pulseScale, 0, Math.PI * 2);
          ctx.fill();
          
          // Inner pulse
          if (neuron.activity > 0.5) {
            ctx.globalAlpha = neuron.activity * 0.6;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(neuron.x, neuron.y, neuron.size * 0.5 * pulseScale, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.restore();
      });

      // Draw dynamic neural connections
      neurons.forEach((neuron, i) => {
        neuron.connections.forEach(connectionIndex => {
          const targetNeuron = neurons[connectionIndex];
          if (!targetNeuron) return;
          
          const distance = Math.sqrt(
            Math.pow(neuron.x - targetNeuron.x, 2) + 
            Math.pow(neuron.y - targetNeuron.y, 2)
          );

          if (distance < 300) {
            const connectionStrength = (neuron.activity + targetNeuron.activity) / 2;
            const opacity = (0.1 + connectionStrength * 0.4) * (1 - distance / 300);
            
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = neuron.color;
            ctx.lineWidth = 1 + connectionStrength * 2;
            
            // Animated dash pattern
            const dashOffset = (Date.now() * 0.005) % 20;
            ctx.setLineDash([5, 15]);
            ctx.lineDashOffset = dashOffset;
            
            ctx.beginPath();
            ctx.moveTo(neuron.x, neuron.y);
            ctx.lineTo(targetNeuron.x, targetNeuron.y);
            ctx.stroke();
            ctx.restore();

            // Randomly create data packets
            if (connectionStrength > 0.6 && Math.random() < 0.003) {
              dataPackets.push({
                fromIndex: i,
                toIndex: connectionIndex,
                progress: 0,
                speed: 0.008 + Math.random() * 0.015,
                color: neuron.color,
                size: Math.random() * 4 + 2
              });
            }
          }
        });
      });

      // Update and draw data packets
      for (let i = dataPackets.length - 1; i >= 0; i--) {
        const packet = dataPackets[i];
        const fromNeuron = neurons[packet.fromIndex];
        const toNeuron = neurons[packet.toIndex];
        
        if (!fromNeuron || !toNeuron) {
          dataPackets.splice(i, 1);
          continue;
        }

        packet.progress += packet.speed;
        
        if (packet.progress >= 1) {
          // Activate target neuron
          toNeuron.activity = Math.min(1, toNeuron.activity + 0.3);
          toNeuron.energy = Math.min(1, toNeuron.energy + 0.5);
          dataPackets.splice(i, 1);
          continue;
        }

        // Draw data packet
        const currentX = fromNeuron.x + (toNeuron.x - fromNeuron.x) * packet.progress;
        const currentY = fromNeuron.y + (toNeuron.y - fromNeuron.y) * packet.progress;
        
        ctx.save();
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = packet.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = packet.color;
        
        // Pulsing data packet
        const pulseSize = packet.size * (1 + Math.sin(Date.now() * 0.01 + packet.progress * 10) * 0.3);
        ctx.beginPath();
        ctx.arc(currentX, currentY, pulseSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Trail effect
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(currentX, currentY, pulseSize * 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default FuturisticBackground;
