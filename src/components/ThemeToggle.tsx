import React, { useState, useEffect } from 'react';
import { Palette, Moon, Sparkles, Shield } from 'lucide-react';
import { soundEngine } from '../lib/soundEngine';

export type ThemeMode = 'obsidian' | 'midnight' | 'cyber-emerald';

interface ThemeOption {
  id: ThemeMode;
  name: string;
  bgClass: string;
  accentColor: string;
  iconColor: string;
}

const themeOptions: ThemeOption[] = [
  { id: 'obsidian', name: 'Obsidian Dark', bgClass: 'bg-[#0C0C0C]', accentColor: '#B600A8', iconColor: 'text-[#B600A8]' },
  { id: 'midnight', name: 'Midnight Navy', bgClass: 'bg-[#080D1A]', accentColor: '#00E5FF', iconColor: 'text-[#00E5FF]' },
  { id: 'cyber-emerald', name: 'Emerald Cyber', bgClass: 'bg-[#06120E]', accentColor: '#10B981', iconColor: 'text-[#10B981]' },
];

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>('obsidian');
  const [isOpen, setIsOpen] = useState(false);

  // Load stored theme on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('portfolio_theme_mode') as ThemeMode;
      if (savedTheme && ['obsidian', 'midnight', 'cyber-emerald'].includes(savedTheme)) {
        setTheme(savedTheme);
        applyTheme(savedTheme);
      } else {
        applyTheme('obsidian');
      }
    } catch {
      applyTheme('obsidian');
    }
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    document.documentElement.setAttribute('data-theme', mode);
    if (mode === 'midnight') {
      document.body.style.backgroundColor = '#080D1A';
    } else if (mode === 'cyber-emerald') {
      document.body.style.backgroundColor = '#06120E';
    } else {
      document.body.style.backgroundColor = '#0C0C0C';
    }
  };

  const handleSelectTheme = (mode: ThemeMode) => {
    soundEngine.playClick();
    setTheme(mode);
    applyTheme(mode);
    try {
      localStorage.setItem('portfolio_theme_mode', mode);
    } catch {
      // Ignore storage errors
    }
    setIsOpen(false);
  };

  const activeOption = themeOptions.find((t) => t.id === theme) || themeOptions[0];

  return (
    <div className="fixed bottom-6 left-20 sm:left-24 z-40 flex items-center">
      {/* Theme Picker Dropdown */}
      {isOpen && (
        <div className="absolute bottom-14 left-0 mb-2 w-48 bg-[#121218]/95 border border-white/15 rounded-2xl p-2 shadow-2xl backdrop-blur-xl z-50 flex flex-col gap-1 text-xs font-mono">
          <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-widest text-[#D7E2EA]/50 flex items-center gap-1.5 border-b border-white/10 pb-2 mb-1">
            <Palette className="w-3 h-3 text-[#00E5FF]" /> Theme Preference
          </div>
          {themeOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelectTheme(opt.id)}
              onMouseEnter={() => soundEngine.playHover()}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                theme === opt.id
                  ? 'bg-white/15 text-white font-bold shadow-sm'
                  : 'text-[#D7E2EA]/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${opt.bgClass} border border-white/20`} style={{ borderColor: opt.accentColor }} />
                <span>{opt.name}</span>
              </div>
              {theme === opt.id && <Sparkles className={`w-3.5 h-3.5 ${opt.iconColor}`} />}
            </button>
          ))}
        </div>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => {
          soundEngine.playClick();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => soundEngine.playHover()}
        title="Change Theme Preference"
        className={`p-3 rounded-full border transition-all duration-300 backdrop-blur-md flex items-center justify-center cursor-pointer shadow-lg group bg-[#121212]/80 border-white/10 text-[#D7E2EA]/80 hover:text-white hover:border-white/30`}
      >
        <Palette className={`w-5 h-5 ${activeOption.iconColor} group-hover:rotate-180 transition-transform duration-500`} />
      </button>
    </div>
  );
};
