import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { CameraStudio } from './components/CameraStudio';
import { Uploader } from './components/Uploader';
import { Library } from './components/Library';
import { PhotoModal } from './components/PhotoModal';
import { ActiveTab, PhotoItem } from './types';
import { getSamplePhotos } from './utils/samplePhotos';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    // Load sample photos initially so the user can test the gallery immediately
    return getSamplePhotos();
  });
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleAddPhoto = (newPhoto: PhotoItem) => {
    setPhotos((prev) => [newPhoto, ...prev]);
  };

  const handleAddPhotos = (newPhotos: PhotoItem[]) => {
    setPhotos((prev) => [...newPhotos, ...prev]);
  };

  const handleDeletePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all photographs from this scanning session?')) {
      setPhotos([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#101827] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        photoCount={photos.length}
      />

      <main className="flex-1">
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} />}
        {activeTab === 'studio' && (
          <CameraStudio
            onAddPhoto={handleAddPhoto}
            goToLibrary={() => setActiveTab('library')}
          />
        )}
        {activeTab === 'upload' && (
          <Uploader
            onAddPhotos={handleAddPhotos}
            goToLibrary={() => setActiveTab('library')}
          />
        )}
        {activeTab === 'library' && (
          <Library
            photos={photos}
            onDeletePhoto={handleDeletePhoto}
            onClearAll={handleClearAll}
            onSelectPhoto={(photo) => setSelectedPhoto(photo)}
            goToStudio={() => setActiveTab('studio')}
          />
        )}
      </main>

      <PhotoModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onDelete={handleDeletePhoto}
      />

      <Footer />
    </div>
  );
}
