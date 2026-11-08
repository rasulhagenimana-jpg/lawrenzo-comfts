import { PhotoItem } from '../types';

// Helper to generate sample vintage photo canvas data URLs
export function getSamplePhotos(): PhotoItem[] {
  // We can create nice sepia / vintage canvas data URLs
  const createVintageCanvas = (title: string, bgColor: string, accentColor: string): string => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 900;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 1200, 900);
    grad.addColorStop(0, bgColor);
    grad.addColorStop(1, '#1e293b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 900);

    // Vignette / photo border frame
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 16;
    ctx.strokeRect(40, 40, 1120, 820);

    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.strokeRect(58, 58, 1084, 784);

    // Inner photo illustration
    ctx.fillStyle = accentColor;
    ctx.beginPath();
    ctx.arc(600, 380, 180, 0, Math.PI * 2);
    ctx.fill();

    // Geometric vintage shapes
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15);';
    ctx.fillRect(300, 580, 600, 180);

    // Text label
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, 600, 650);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Archival Scanned Photograph - 1200 x 900 px', 600, 700);

    return canvas.toDataURL('image/jpeg', 0.92);
  };

  return [
    {
      id: 'sample-1',
      name: 'Summer_Vacation_1974.jpg',
      url: createVintageCanvas('Summer Vacation 1974', '#334155', '#3b82f6'),
      size: 1048576,
      format: 'image/jpeg',
      width: 1200,
      height: 900,
      dateCaptured: '1974-07-14',
      source: 'sample'
    },
    {
      id: 'sample-2',
      name: 'Grandparents_Wedding_Day.jpg',
      url: createVintageCanvas('Grandparents Wedding 1952', '#1e293b', '#f59e0b'),
      size: 1420000,
      format: 'image/jpeg',
      width: 1200,
      height: 900,
      dateCaptured: '1952-10-22',
      source: 'sample'
    },
    {
      id: 'sample-3',
      name: 'Family_Reunion_1985.jpg',
      url: createVintageCanvas('Family Reunion 1985', '#0f172a', '#10b981'),
      size: 980000,
      format: 'image/jpeg',
      width: 1200,
      height: 900,
      dateCaptured: '1985-08-05',
      source: 'sample'
    }
  ];
}
