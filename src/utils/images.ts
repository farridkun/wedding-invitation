// Dynamic import of all wedding images using Vite's import.meta.glob
const weddingImageModules = import.meta.glob('../assets/wedding/*.JPEG', { eager: true, query: '?url', import: 'default' });
const qrImageModules = import.meta.glob('../assets/*.png', { eager: true, query: '?url', import: 'default' });

// Extract image paths
const weddingImages: Record<string, string> = {};
const qrImages: Record<string, string> = {};

// Process wedding images
Object.entries(weddingImageModules).forEach(([path, url]) => {
  const filename = path.split('/').pop()?.replace('.JPEG', '') || '';
  weddingImages[filename] = url as string;
});

// Process QR images
Object.entries(qrImageModules).forEach(([path, url]) => {
  const filename = path.split('/').pop()?.replace('.png', '') || '';
  if (filename.includes('qr-gopay')) {
    qrImages.gopay = url as string;
  }
});

// Export individual images
export const images = {
  ...weddingImages,
  qr: qrImages,
};

// Predefined image sets for different components
export const heroImages = [
  weddingImages.CLT08580,
  weddingImages.CLT08607,
  weddingImages.CLT08388,
  weddingImages.CLT08296,
  weddingImages.CLT08143,
];

export const brideImages = [
  weddingImages.CLT08607,
  weddingImages.CLT08512,
  weddingImages.CLT08365,
];

export const groomImages = [
  weddingImages.CLT08666,
  weddingImages.CLT08686,
  weddingImages.CLT08699,
];

export const loveStoryImages = [
  weddingImages.CLT08105,
  weddingImages.CLT08124,
  weddingImages.CLT08143,
  weddingImages.CLT08173,
  weddingImages.CLT08211,
  weddingImages.CLT08255,
  weddingImages.CLT08360,
  weddingImages.CLT08388,
  weddingImages.CLT08440,
  weddingImages.CLT08526,
];

export const introImages = [
  weddingImages.CLT08580,
];
