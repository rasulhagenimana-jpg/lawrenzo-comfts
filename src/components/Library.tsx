import React, { useState } from 'react';
import { Image as ImageIcon, Trash2, Download, CheckSquare, Square, FileText, Sparkles, FolderOpen, ArrowUpDown, Eye } from 'lucide-react';
import { PhotoItem } from '../types';
import JSZip from 'jszip';
import { jsPDF } from 'jspdf';

interface LibraryProps {
  photos: PhotoItem[];
  onDeletePhoto: (id: string) => void;
  onClearAll: () => void;
  onSelectPhoto: (photo: PhotoItem) => void;
  goToStudio: () => void;
}

export const Library: React.FC<LibraryProps> = ({
  photos,
  onDeletePhoto,
  onClearAll,
  onSelectPhoto,
  goToStudio
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<string | null>(null);

  const toggleSelectAll = () => {
    if (selectedIds.length === photos.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(photos.map((p) => p.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDownloadSingle = (photo: PhotoItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = photo.url;
    link.download = photo.name || 'photovault_image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadZip = async () => {
    if (photos.length === 0) return;
    const targetPhotos = selectedIds.length > 0 ? photos.filter((p) => selectedIds.includes(p.id)) : photos;

    setIsExporting(true);
    setExportStatus('Packaging ZIP archive...');

    try {
      const zip = new JSZip();
      const folder = zip.folder('photovault_archive');

      targetPhotos.forEach((photo, idx) => {
        // extract base64 data
        const base64Data = photo.url.split(',')[1];
        if (base64Data) {
          folder?.file(photo.name || `photo_${idx + 1}.jpg`, base64Data, { base64: true });
        }
      });

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `PhotoVault_Archive_${new Date().toISOString().slice(0, 10)}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setExportStatus('ZIP download complete!');
    } catch (err) {
      console.error(err);
      setExportStatus('Failed to create ZIP archive.');
    } finally {
      setIsExporting(false);
      setTimeout(() => setExportStatus(null), 3000);
    }
  };

  const handleExportPDF = async () => {
    if (photos.length === 0) return;
    const targetPhotos = selectedIds.length > 0 ? photos.filter((p) => selectedIds.includes(p.id)) : photos;

    setIsExporting(true);
    setExportStatus('Compiling archival PDF...');

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      targetPhotos.forEach((photo, idx) => {
        if (idx > 0) {
          doc.addPage();
        }

        doc.setFontSize(16);
        doc.setTextColor(30, 41, 59);
        doc.text(`PhotoVault Archival Record: ${photo.name}`, 15, 20);

        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        doc.text(`Captured: ${photo.dateCaptured} | Format: ${photo.format} | Size: ${(photo.size / 1024).toFixed(1)} KB`, 15, 28);

        // Add image to PDF
        try {
          doc.addImage(photo.url, 'JPEG', 15, 35, 180, 135);
        } catch (e) {
          console.error(e);
        }

        doc.setFontSize(8);
        doc.text('Preserved with original bit-for-bit fidelity by PhotoVault (No AI modifications).', 15, 285);
      });

      doc.save(`PhotoVault_Portfolio_${new Date().toISOString().slice(0, 10)}.pdf`);
      setExportStatus('PDF compilation complete!');
    } catch (err) {
      console.error(err);
      setExportStatus('Failed to compile PDF document.');
    } finally {
      setIsExporting(false);
      setTimeout(() => setExportStatus(null), 3000);
    }
  };

  if (photos.length === 0) {
    return (
      <div className="min-h-screen bg-[#101827] text-slate-100 py-20 px-6 flex items-center justify-center">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#172B4D] border border-slate-700 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/20 text-blue-400 mx-auto flex items-center justify-center border border-blue-500/30">
            <FolderOpen className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Your Photo Library is Empty</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Start scanning physical photographs using the Camera Studio or upload scanned files from your desktop scanner software.
            </p>
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={goToStudio}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs shadow-lg transition-all"
            >
              Open Camera Studio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101827] text-slate-100 py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Personal Photo Library ({photos.length} items)
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Digitized Archives</h1>
            <p className="text-sm text-slate-400 mt-1">
              Review, organize, and export your digitized photographs with original metadata preserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadZip}
              disabled={isExporting}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs shadow-lg flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {selectedIds.length > 0 ? `Download Selected (${selectedIds.length}) ZIP` : 'Download All (ZIP)'}
            </button>
            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="px-4 py-2.5 bg-[#172B4D] hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 font-semibold text-xs flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              Export PDF Portfolio
            </button>
            <button
              onClick={onClearAll}
              className="px-4 py-2.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 rounded-xl border border-rose-800/60 font-semibold text-xs flex items-center gap-2 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Clear Session
            </button>
          </div>
        </div>

        {/* Status banner */}
        {exportStatus && (
          <div className="p-4 rounded-2xl bg-blue-950/80 border border-blue-800 text-blue-200 text-xs flex items-center gap-3">
            <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
            <span>{exportStatus}</span>
          </div>
        )}

        {/* Selection bar */}
        <div className="flex items-center justify-between bg-[#172B4D] px-6 py-3 rounded-2xl border border-slate-700">
          <button
            onClick={toggleSelectAll}
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white"
          >
            {selectedIds.length === photos.length ? (
              <CheckSquare className="w-4 h-4 text-blue-400" />
            ) : (
              <Square className="w-4 h-4 text-slate-400" />
            )}
            Select All ({photos.length})
          </button>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>{selectedIds.length} selected</span>
            <div className="flex items-center gap-1 bg-[#101827] p-1 rounded-lg border border-slate-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-md transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((photo) => {
              const isSelected = selectedIds.includes(photo.id);
              return (
                <div
                  key={photo.id}
                  onClick={() => onSelectPhoto(photo)}
                  className={`group relative rounded-2xl bg-[#172B4D] border overflow-hidden transition-all cursor-pointer hover:border-blue-500 hover:shadow-xl ${
                    isSelected ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-slate-700'
                  }`}
                >
                  <div className="aspect-[4/3] bg-black relative overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelectOne(photo.id);
                        }}
                        className="p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white hover:bg-blue-600 transition-colors"
                      >
                        {isSelected ? <CheckSquare className="w-4 h-4 text-blue-400" /> : <Square className="w-4 h-4 text-white" />}
                      </button>
                    </div>
                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                      <button
                        onClick={(e) => handleDownloadSingle(photo, e)}
                        title="Download Original"
                        className="p-2 rounded-lg bg-black/70 backdrop-blur-md text-white hover:bg-blue-600 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeletePhoto(photo.id);
                        }}
                        title="Delete Photograph"
                        className="p-2 rounded-lg bg-black/70 backdrop-blur-md text-rose-400 hover:bg-rose-600 hover:text-white transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 space-y-1">
                    <h4 className="text-xs font-bold text-white truncate">{photo.name}</h4>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{photo.width} × {photo.height}</span>
                      <span>{(photo.size / 1024).toFixed(0)} KB</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="rounded-2xl bg-[#172B4D] border border-slate-700 overflow-hidden divide-y divide-slate-700/60">
            {photos.map((photo) => {
              const isSelected = selectedIds.includes(photo.id);
              return (
                <div
                  key={photo.id}
                  onClick={() => onSelectPhoto(photo)}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelectOne(photo.id);
                      }}
                      className="text-slate-400 hover:text-blue-400"
                    >
                      {isSelected ? <CheckSquare className="w-5 h-5 text-blue-400" /> : <Square className="w-5 h-5" />}
                    </button>
                    <div className="w-16 h-12 rounded-lg bg-black overflow-hidden shrink-0 border border-slate-700">
                      <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{photo.name}</h4>
                      <p className="text-xs text-slate-400">Captured: {photo.dateCaptured} &bull; Source: {photo.source}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right text-xs text-slate-400 hidden sm:block">
                      <p>{photo.width} × {photo.height} px</p>
                      <p>{(photo.size / 1024).toFixed(0)} KB</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleDownloadSingle(photo, e)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-blue-600 text-white transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeletePhoto(photo.id);
                        }}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-rose-300 hover:text-white transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
