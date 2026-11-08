import React from 'react';
import { Camera, ShieldCheck, Lock, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b111b] border-t border-slate-800 text-slate-400 py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Camera className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">PhotoVault</span>
          </div>
          <p className="text-sm text-slate-400">
            Your Memories. Digitally Preserved. Free, 100% private browser-based photo digitization for physical prints.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">Digitization Suite</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#studio" className="hover:text-white transition-colors">Camera Studio</a></li>
            <li><a href="#upload" className="hover:text-white transition-colors">Scanner Software Uploader</a></li>
            <li><a href="#library" className="hover:text-white transition-colors">Personal Photo Library</a></li>
            <li><a href="#formats" className="hover:text-white transition-colors">Supported File Formats</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">Privacy Promise</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 text-slate-300">
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              100% Local Browser Processing
            </li>
            <li className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              No AI Modifications or Filters
            </li>
            <li className="flex items-center gap-2 text-slate-300">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              Zero Subscriptions or Ads
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">Export Options</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Original Resolution Preservation</li>
            <li>Lossless JPG & PNG Conversion</li>
            <li>Multi-Photo ZIP Archive Download</li>
            <li>Archival PDF Portfolio Compilation</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} PhotoVault. Free & Open Photo Digitization Platform.</p>
        <p className="mt-2 sm:mt-0">Original physical memories preserved with exact bit-for-bit fidelity.</p>
      </div>
    </footer>
  );
};
