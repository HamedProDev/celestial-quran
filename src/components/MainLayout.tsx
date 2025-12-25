import { useState } from "react";
import { Outlet } from "react-router-dom";
import CosmicNavigation from "@/components/CosmicNavigation";
import DivineHeader from "@/components/DivineHeader";
import FloatingParticles from "@/components/FloatingParticles";
import CalligraphyOverlay from "@/components/CalligraphyOverlay";
import AudioVisualizer from "@/components/AudioVisualizer";

const MainLayout = () => {
  const [isAudioActive, setIsAudioActive] = useState(false);

  return (
    <div className="min-h-screen">
      <FloatingParticles />
      <CalligraphyOverlay />
      <CosmicNavigation />
      <DivineHeader 
        onAudioToggle={() => setIsAudioActive(!isAudioActive)} 
        isAudioActive={isAudioActive} 
      />
      
      <main className="lg:ml-[90px] p-4 md:p-8 pb-40 min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>

      <AudioVisualizer isActive={isAudioActive} />
    </div>
  );
};

export default MainLayout;
