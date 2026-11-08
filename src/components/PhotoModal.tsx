import React from 'react';
import { X, Download, Trash2, Calendar, HardDrive, Maximize2, ShieldCheck } from 'lucide-react';
import { PhotoItem } from '../types';

interface PhotoModalProps {
  photo: PhotoItem | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose, onDelete }) => {
  if (!photo) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = photo.url;
    link.download = photo.name || 'photovault_image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative max-w-5xl w-full bg-[#172B4D] border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/80 bg-[#101827]">
          <div className="flex items-center gap-3 truncate">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Maximize2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white truncate">{photo.name}</h3>
              <p className="text-[11px] text-slate-400">Original Fidelity Preserved (No AI modifications)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Image View */}
        <div className="flex-1 bg-black flex items-center justify-center p-6 overflow-hidden relative">
          <img
            src={photo.url}
            alt={photo.name}
            className="max-h-[60vh] max-w-full object-contain rounded-xl shadow-2xl"
          />
        </div>

        {/* Modal Footer / Metadata */}
        <div className="p-6 bg-[#172B4D] border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>Captured: {photo.dateCaptured}</span>
            </div>
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-emerald-400" />
              <span>Size: {(photo.size / 1024).toFixed(1)} KB</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Resolution: {photo.width} &times; {photo.height} px</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onDelete(photo.id);
                onClose();
              }}
              className="px-4 py-2.5 bg-rose-950/60 hover:bg-rose-900 text-rose-300 rounded-xl border border-rose-800/80 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
            <button
              onClick={handleDownload}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
            >
              <Download className="w-4 h-4" />
              Download Original
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
