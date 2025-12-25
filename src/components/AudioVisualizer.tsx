interface AudioVisualizerProps {
  isActive: boolean;
}

const AudioVisualizer = ({ isActive }: AudioVisualizerProps) => {
  const bars = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div
      className={`fixed bottom-0 left-0 lg:left-[90px] right-0 h-36 z-[900] flex items-center justify-center transition-all duration-500 ${
        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"
      }`}
      style={{
        background: "linear-gradient(0deg, hsla(212, 67%, 11%, 0.95) 0%, transparent 100%)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid hsla(43, 76%, 52%, 0.2)",
      }}
    >
      <div className="flex gap-1 h-24 items-end">
        {bars.map((i) => (
          <div
            key={i}
            className="w-1.5 rounded-sm animate-audio-wave"
            style={{
              background: "linear-gradient(to top, hsl(var(--primary)), hsl(var(--accent)))",
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AudioVisualizer;
