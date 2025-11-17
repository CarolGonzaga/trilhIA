import { useState, useEffect } from "react";
// 1. IMPORTAMOS O TIPO DOS ÍCONES
import { Sparkles, Heart, Star, Zap, type LucideProps } from "lucide-react";
import React from "react"; // Importamos React para o tipo ComponentType

// 2. DEFINIMOS UM TIPO SEGURO PARA OS ÍCONES (em vez de 'any')
type IconComponent = React.ComponentType<LucideProps>;

// 3. EXPORTAMOS O TIPO 'TiliMood'
export type TiliMood = "neutral" | "happy" | "excited" | "thinking" | "celebrating";

interface TiliMascotProps {
  mood?: TiliMood;
  message?: string;
  showParticles?: boolean;
  size?: "sm" | "md" | "lg";
}

export const TiliMascot = ({
  mood = "neutral",
  message,
  showParticles = false,
  size = "md"
}: TiliMascotProps) => {
  // 4. USAMOS O TIPO 'IconComponent' AQUI (em vez de 'any')
  const [particles, setParticles] = useState<Array<{ id: number; icon: IconComponent }>>([]);

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24"
  };

  const moodAnimations = {
    neutral: "animate-float",
    happy: "animate-bounce",
    excited: "animate-pulse",
    thinking: "animate-pulse",
    celebrating: "animate-bounce"
  };

  const moodGlow = {
    neutral: "glow-primary",
    happy: "glow-primary",
    excited: "glow-secondary",
    thinking: "",
    celebrating: "glow-primary animate-pulse"
  };

  useEffect(() => {
    if (showParticles || mood === "celebrating" || mood === "excited") {
      // 5. O ARRAY DE ÍCONES AGORA TEM O TIPO CORRETO
      const icons: IconComponent[] = [Sparkles, Heart, Star, Zap];
      const newParticles = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        icon: icons[Math.floor(Math.random() * icons.length)]
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => setParticles([]), 2000);
      return () => clearTimeout(timer);
    }
  }, [mood, showParticles]);

  return (
    <div className="relative inline-flex flex-col items-center gap-2">
      {/* Tili Image with animations */}
      <div className="relative">
        {/* 6. USAMOS /logo.png DA PASTA public/ */}
        <img
          src="/logo.png"
          alt="Tili"
          className={`${sizeClasses[size]} ${moodAnimations[mood]} ${moodGlow[mood]} transition-all duration-300 drop-shadow-lg`}
        />

        {/* Floating particles */}
        {particles.map((particle, index) => {
          const ParticleIcon = particle.icon;
          const angle = (index / particles.length) * Math.PI * 2;
          const distance = 40;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;

          return (
            <div
              key={particle.id}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                animation: `float-away 2s ease-out forwards`,
                animationDelay: `${index * 0.1}s`
              }}
            >
              <ParticleIcon
                className="w-4 h-4 text-primary"
                style={{
                  transform: `translate(${x}px, ${y}px)`
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Speech bubble with message */}
      {message && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <div className="relative bg-primary/20 border border-primary/40 rounded-2xl px-4 py-2 backdrop-blur-sm">
            <p className="text-sm font-medium text-primary">{message}</p>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary/20"></div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add custom keyframe animation for particles
// (O <style> tag não funciona bem em TSX, vamos garantir que está no CSS)
// O ideal é adicionar isso no seu 'src/index.css'
if (typeof window !== 'undefined') {
  const styleId = 'tili-animations';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes float-away {
        0% {
          opacity: 1;
          transform: translate(0, 0) scale(1);
        }
        100% {
          opacity: 0;
          transform: translate(var(--tx, 0), var(--ty, -30px)) scale(0.5);
        }
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }

      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
  }
}