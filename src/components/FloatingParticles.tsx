import { useEffect, useRef } from "react";

interface Particle {
  left: string;
  delay: string;
  opacity: number;
  size: number;
}

const FloatingParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesGenerated = useRef(false);

  useEffect(() => {
    if (particlesGenerated.current || !containerRef.current) return;
    particlesGenerated.current = true;

    const particles: Particle[] = Array.from({ length: 50 }, () => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 20}s`,
      opacity: Math.random() * 0.5 + 0.1,
      size: Math.random() * 3 + 1,
    }));

    particles.forEach((p) => {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full bg-primary animate-particle";
      particle.style.left = p.left;
      particle.style.animationDelay = p.delay;
      particle.style.opacity = String(p.opacity);
      particle.style.width = `${p.size}px`;
      particle.style.height = `${p.size}px`;
      containerRef.current?.appendChild(particle);
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
      aria-hidden="true"
    />
  );
};

export default FloatingParticles;
