import React from 'react';
import { Camera, Upload, Image as ImageIcon, Home, ShieldCheck, Sparkles } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  photoCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, photoCount }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#101827]/90 backdrop-blur-md border-b border-slate-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:bg-blue-500 transition-colors">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0">
              PhotoVault
            </span>
            <span className="hidden sm:block text-[10px] text-blue-400 font-medium tracking-wide uppercase">
              Digitally Preserved
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('home')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
              activeTab === 'home' ? 'text-blue-400 font-semibold' : ''
            }`}
          >
            <Home className="w-4 h-4" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('studio')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
              activeTab === 'studio' ? 'text-blue-400 font-semibold' : ''
            }`}
          >
            <Camera className="w-4 h-4" />
            Camera Studio
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
              activeTab === 'upload' ? 'text-blue-400 font-semibold' : ''
            }`}
          >
            <Upload className="w-4 h-4" />
            Scanner & Upload
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 relative ${
              activeTab === 'library' ? 'text-blue-400 font-semibold' : ''
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Photo Library
            {photoCount > 0 && (
              <span className="ml-1.5 px-2 py-0.5 text-xs bg-blue-600 text-white rounded-full font-semibold">
                {photoCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('studio')}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Start Scanning
          </button>
        </div>
      </div>
    </header>
  );
};
