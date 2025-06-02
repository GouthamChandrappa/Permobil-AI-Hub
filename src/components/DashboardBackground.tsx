import { useEffect, useRef } from 'react';

const DashboardBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawBackground = () => {
      // Static gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, 
        canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) * 0.8
      );
      gradient.addColorStop(0, 'rgba(0, 8, 20, 0.95)');
      gradient.addColorStop(0.3, 'rgba(5, 15, 35, 0.98)');
      gradient.addColorStop(0.7, 'rgba(10, 25, 45, 0.99)');
      gradient.addColorStop(1, 'rgba(0, 5, 15, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Static subtle grid pattern
      ctx.save();
      ctx.globalAlpha = 0.03;
      ctx.strokeStyle = '#00d4ff';
      ctx.lineWidth = 1;
      const gridSpacing = 120;
      
      for (let x = 0; x < canvas.width + gridSpacing; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height + gridSpacing; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      ctx.restore();

      // Static accent points
      ctx.save();
      ctx.globalAlpha = 0.1;
      const colors = [
        [0, 212, 255], // cyan
        [124, 58, 237], // purple
        [16, 185, 129], // emerald
      ];

      for (let i = 0; i < 20; i++) {
        const x = (i % 5) * (canvas.width / 4) + canvas.width / 8;
        const y = Math.floor(i / 5) * (canvas.height / 4) + canvas.height / 8;
        const colorSet = colors[i % colors.length];
        
        const pointGradient = ctx.createRadialGradient(
          x, y, 0,
          x, y, 50
        );
        pointGradient.addColorStop(0, `rgba(${colorSet[0]}, ${colorSet[1]}, ${colorSet[2]}, 0.3)`);
        pointGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = pointGradient;
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    drawBackground();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawBackground();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
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

export default DashboardBackground;