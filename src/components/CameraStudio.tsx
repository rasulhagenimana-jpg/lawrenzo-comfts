import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, Check, X, Sparkles, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { PhotoItem } from '../types';

interface CameraStudioProps {
  onAddPhoto: (photo: PhotoItem) => void;
  goToLibrary: () => void;
}

export const CameraStudio: React.FC<CameraStudioProps> = ({ onAddPhoto, goToLibrary }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [capturedCount, setCapturedCount] = useState<number>(0);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);

  const startCamera = async (mode: 'user' | 'environment') => {
    try {
      setCameraError(null);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const constraints = {
        video: {
          facingMode: mode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      setIsCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError(
        'Unable to access camera. Please ensure camera permissions are allowed in your browser settings or use the File Uploader.'
      );
      setIsCameraActive(false);
    }
  };

  useEffect(() => {
    startCamera(facingMode);
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  const handleSwitchCamera = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    setCapturedImage(dataUrl);
  };

  const handleAcceptCapture = () => {
    if (!capturedImage) return;

    // Approximate size from base64
    const base64Length = capturedImage.length - (capturedImage.indexOf(',') + 1);
    const sizeInBytes = Math.round((base64Length * 3) / 4);

    const newPhoto: PhotoItem = {
      id: 'photo-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      name: `Scan_${new Date().toISOString().slice(0, 10)}_${Date.now().toString().slice(-4)}.jpg`,
      url: capturedImage,
      size: sizeInBytes,
      format: 'image/jpeg',
      width: canvasRef.current?.width || 1280,
      height: canvasRef.current?.height || 720,
      dateCaptured: new Date().toISOString().slice(0, 10),
      source: 'camera'
    };

    onAddPhoto(newPhoto);
    setCapturedCount((prev) => prev + 1);
    setCapturedImage(null);
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  return (
    <div className="min-h-screen bg-[#101827] text-slate-100 py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Original Image Preservation Mode
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Camera Scanning Studio</h1>
            <p className="text-sm text-slate-400 mt-1">
              Position physical printed photographs on a flat, well-lit surface and capture high-resolution unedited copies.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={goToLibrary}
              className="px-4 py-2.5 bg-[#172B4D] hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <ImageIcon className="w-4 h-4 text-blue-400" />
              View Library ({capturedCount} added)
            </button>
          </div>
        </div>

        {/* Instructions banner */}
        <div className="p-4 rounded-2xl bg-[#172B4D]/60 border border-slate-800 flex items-start gap-4">
          <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 shrink-0 mt-0.5">
            <Camera className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-300 space-y-1">
            <span className="font-bold text-white block text-sm">Digitization Guidelines for Best Results:</span>
            <p>1. Place your printed photograph flat on a dark or neutral surface under even, indirect lighting.</p>
            <p>2. Hold your device or webcam parallel to the photograph to avoid geometric distortion.</p>
            <p>3. PhotoVault preserves your photos with zero AI filters or automatic color editing.</p>
          </div>
        </div>

        {/* Error State */}
        {cameraError && (
          <div className="p-6 rounded-2xl bg-rose-950/40 border border-rose-800/80 text-rose-200 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-3">
              <h4 className="font-bold text-base">Camera Access Notice</h4>
              <p className="text-xs text-rose-300 leading-relaxed">{cameraError}</p>
              <button
                onClick={() => startCamera(facingMode)}
                className="px-4 py-2 bg-rose-900 hover:bg-rose-800 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Retry Camera Connection
              </button>
            </div>
          </div>
        )}

        {/* Studio Viewport */}
        <div className="relative rounded-3xl bg-[#172B4D] border border-slate-700 overflow-hidden shadow-2xl">
          {capturedImage ? (
            <div className="p-8 space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-bold text-white">Review Captured Photograph</h3>
                <p className="text-xs text-slate-400">Verify that the image is clear and fills the frame properly.</p>
              </div>
              <div className="relative max-w-2xl mx-auto rounded-2xl overflow-hidden border-2 border-slate-600 shadow-2xl bg-black">
                <img src={capturedImage} alt="Captured scan preview" className="w-full object-contain max-h-[500px]" />
              </div>
              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  onClick={handleRetake}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 text-sm flex items-center gap-2 transition-colors"
                >
                  <X className="w-4 h-4 text-rose-400" />
                  Retake Photo
                </button>
                <button
                  onClick={handleAcceptCapture}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
                >
                  <Check className="w-4 h-4" />
                  Accept & Save to Library
                </button>
              </div>
            </div>
          ) : (
            <div className="relative aspect-[16/10] bg-black flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />

              {/* Viewfinder Guide Overlay */}
              <div className="absolute inset-8 border-2 border-dashed border-white/30 rounded-2xl pointer-events-none flex items-center justify-center">
                <div className="text-center bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl text-white/80 text-xs">
                  Align photograph within frame
                </div>
              </div>

              {/* Camera Controls Overlay */}
              <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-6 px-6">
                <button
                  onClick={handleSwitchCamera}
                  title="Switch Camera"
                  className="p-4 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 backdrop-blur-md transition-all shadow-lg"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>

                <button
                  onClick={handleCapture}
                  disabled={!isCameraActive}
                  className="px-10 py-5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-2xl shadow-blue-600/50 flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  <Camera className="w-6 h-6" />
                  CAPTURE PHOTO
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
