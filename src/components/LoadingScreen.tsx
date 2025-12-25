import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHiding(true);
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-1000 ${
        isHiding ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background: "linear-gradient(135deg, hsl(212 67% 11%) 0%, hsl(212 67% 3%) 100%)",
      }}
    >
      <div className="font-arabic text-5xl text-primary animate-pulse-glow mb-4 text-glow">
        ﷽
      </div>
      <h1 className="font-arabic text-4xl md:text-5xl text-primary mb-6 text-glow">
        QURAN MASTER
      </h1>
      <p className="text-secondary-foreground text-lg opacity-80">
        Entering the Divine Realm
      </p>
      <div className="flex gap-4 mt-8">
        <div 
          className="w-5 h-5 rounded-full bg-primary animate-bounce-loading"
          style={{ animationDelay: "-0.32s" }}
        />
        <div 
          className="w-5 h-5 rounded-full bg-primary animate-bounce-loading"
          style={{ animationDelay: "-0.16s" }}
        />
        <div className="w-5 h-5 rounded-full bg-primary animate-bounce-loading" />
      </div>
    </div>
  );
};

export default LoadingScreen;
