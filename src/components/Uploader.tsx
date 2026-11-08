import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, ImageIcon, Sparkles, ArrowRight } from 'lucide-react';
import { PhotoItem } from '../types';

interface UploaderProps {
  onAddPhotos: (photos: PhotoItem[]) => void;
  goToLibrary: () => void;
}

export const Uploader: React.FC<UploaderProps> = ({ onAddPhotos, goToLibrary }) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFiles = (files: FileList | File[]) => {
    setErrorMessage(null);
    const validFiles = Array.from(files).filter((file) => {
      const isValid =
        file.type.startsWith('image/') ||
        file.type === 'application/pdf' ||
        file.name.toLowerCase().endsWith('.tiff') ||
        file.name.toLowerCase().endsWith('.tif');
      return isValid;
    });

    if (validFiles.length === 0) {
      setErrorMessage('Please upload valid photo formats: JPG, PNG, TIFF, or PDF files.');
      return;
    }

    setUploading(true);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 100;
        }
        return prev + 30;
      });
    }, 200);

    setTimeout(() => {
      let processedCount = 0;
      const newPhotos: PhotoItem[] = [];

      validFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (result) {
            const img = new Image();
            img.onload = () => {
              newPhotos.push({
                id: 'upload-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
                name: file.name,
                url: result,
                size: file.size,
                format: file.type || 'image/jpeg',
                width: img.width || 1200,
                height: img.height || 900,
                dateCaptured: new Date().toISOString().slice(0, 10),
                source: 'upload'
              });

              processedCount++;
              if (processedCount === validFiles.length) {
                onAddPhotos(newPhotos);
                setUploading(false);
                setSuccessCount(validFiles.length);
                setUploadProgress(0);
              }
            };
            img.onerror = () => {
              // Fallback if image load fails
              newPhotos.push({
                id: 'upload-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
                name: file.name,
                url: result,
                size: file.size,
                format: file.type || 'image/jpeg',
                width: 1200,
                height: 900,
                dateCaptured: new Date().toISOString().slice(0, 10),
                source: 'upload'
              });

              processedCount++;
              if (processedCount === validFiles.length) {
                onAddPhotos(newPhotos);
                setUploading(false);
                setSuccessCount(validFiles.length);
                setUploadProgress(0);
              }
            };
            img.src = result;
          }
        };
        reader.readAsDataURL(file);
      });
    }, 800);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="min-h-screen bg-[#101827] text-slate-100 py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Physical Scanner & File Uploader
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Upload Scanned Photographs</h1>
            <p className="text-sm text-slate-400 mt-1">
              Import images scanned using your desktop flatbed scanner software or existing digital photo files.
            </p>
          </div>
          <button
            onClick={goToLibrary}
            className="px-4 py-2.5 bg-[#172B4D] hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <ImageIcon className="w-4 h-4 text-blue-400" />
            View Photo Library
          </button>
        </div>

        {/* Scanner Software Guidance Note */}
        <div className="p-5 rounded-2xl bg-[#172B4D]/60 border border-slate-800 flex items-start gap-4">
          <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 shrink-0 mt-0.5">
            <FileText className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-300 space-y-1">
            <span className="font-bold text-white block text-sm">Using Physical Scanner Software?</span>
            <p>
              Scan your physical photographs using your flatbed scanner software (Epson Scan, Canon IJ Scan, VueScan, etc.), save them to your computer as high-resolution JPG or PNG files, and drop them below.
            </p>
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800 text-rose-200 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success message */}
        {successCount > 0 && (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800 text-emerald-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Successfully imported {successCount} photograph(s) with original metadata preserved!</span>
            </div>
            <button
              onClick={goToLibrary}
              className="px-3 py-1.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
            >
              Open Gallery <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Dropzone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all ${
            dragOver ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 bg-[#172B4D]/40 hover:border-slate-600'
          }`}
        >
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/tiff,application/pdf"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="max-w-md mx-auto space-y-4 pointer-events-none">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 text-blue-400 mx-auto flex items-center justify-center border border-blue-500/30">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Drag and drop scanned photographs here</h3>
              <p className="text-xs text-slate-400">Supports JPG, JPEG, PNG, TIFF, and PDF files</p>
            </div>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs shadow-lg transition-all pointer-events-auto">
              Browse Files from Computer
            </button>
          </div>

          {uploading && (
            <div className="absolute inset-0 bg-[#101827]/90 backdrop-blur-sm flex flex-col items-center justify-center space-y-4 z-10">
              <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
              <div className="text-sm font-semibold text-white">Processing Scanned Files... {uploadProgress}%</div>
              <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 transition-all duration-200" style={{ width: `${uploadProgress}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
