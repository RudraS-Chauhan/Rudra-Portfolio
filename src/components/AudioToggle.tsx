import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../lib/soundEngine';

export const AudioToggle: React.FC = () => {
  const [isMuted, setIsMuted] = useState<boolean>(soundEngine.getMuted());

  const handleToggle = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={() => soundEngine.playHover()}
      title={isMuted ? 'Enable UI Ambient Sounds' : 'Mute UI Sounds'}
      className={`fixed bottom-6 left-6 z-40 p-3 rounded-full border transition-all duration-300 backdrop-blur-md flex items-center justify-center cursor-pointer shadow-lg group ${
        !isMuted
          ? 'bg-[#B600A8]/20 border-[#B600A8] text-[#B600A8] shadow-[0_0_20px_rgba(182,0,168,0.5)] scale-105'
          : 'bg-[#121212]/80 border-white/10 text-[#D7E2EA]/60 hover:text-white hover:border-white/30'
      }`}
    >
      {!isMuted ? (
        <Volume2 className="w-5 h-5 animate-pulse text-[#B600A8]" />
      ) : (
        <VolumeX className="w-5 h-5 group-hover:scale-110 transition-transform" />
      )}
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider pl-0 group-hover:pl-2 text-white">
        {!isMuted ? 'Sound On' : 'Enable Audio'}
      </span>
    </button>
  );
};
