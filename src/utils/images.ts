// Dynamic import of all wedding images using Vite's import.meta.glob
const weddingImageModules = import.meta.glob('../assets/wedding/*.JPEG', { eager: true, query: '?url', import: 'default' });
const weddingJpgModules = import.meta.glob('../assets/wedding/*.jpg', { eager: true, query: '?url', import: 'default' });
const weddingPngModules = import.meta.glob('../assets/wedding/*.png', { eager: true, query: '?url', import: 'default' });
const sliderHeroModules = import.meta.glob('../assets/wedding/slider-hero/*', { eager: true, query: '?url', import: 'default' });
const qrImageModules = import.meta.glob('../assets/*.png', { eager: true, query: '?url', import: 'default' });
const brideModules = import.meta.glob('../assets/wedding/bride/*', { eager: true, query: '?url', import: 'default' });
const groomModules = import.meta.glob('../assets/wedding/groom/*', { eager: true, query: '?url', import: 'default' });
const momentsModules = import.meta.glob('../assets/wedding/moments/*', { eager: true, query: '?url', import: 'default' });

// Extract image paths
const weddingImages: Record<string, string> = {};
const sliderHeroImages: Record<string, string> = {};
const brideImage: Record<string, string> = {};
const groomImage: Record<string, string> = {};
const momentsImage: Record<string, string> = {};
const qrImages: Record<string, string> = {};

// Process wedding images
Object.entries(weddingImageModules).forEach(([path, url]) => {
  const filename = path.split('/').pop()?.replace('.JPEG', '') || '';
  weddingImages[filename] = url as string;
});

// Process JPG images
Object.entries(weddingJpgModules).forEach(([path, url]) => {
  const filename = path.split('/').pop()?.replace('.jpg', '') || '';
  weddingImages[filename] = url as string;
});

// Process PNG images
Object.entries(weddingPngModules).forEach(([path, url]) => {
  const filename = path.split('/').pop()?.replace('.png', '') || '';
  weddingImages[filename] = url as string;
});

// Process slider hero images
Object.entries(sliderHeroModules).forEach(([path, url]) => {
  const filename = path.split('/').pop()?.replace(/\.(JPEG|jpg)$/i, '') || '';
  sliderHeroImages[filename] = url as string;
});

// Process bride images
Object.entries(brideModules).forEach(([path, url]) => {
  const filename = path.split('/').pop()?.replace(/\.(JPEG|jpg)$/i, '') || '';
  brideImage[filename] = url as string;
});

// Process groom images
Object.entries(groomModules).forEach(([path, url]) => {
  const filename = path.split('/').pop()?.replace(/\.(JPEG|jpg)$/i, '') || '';
  groomImage[filename] = url as string;
});

// Process moments images
Object.entries(momentsModules).forEach(([path, url]) => {
  const filename = path.split('/').pop()?.replace(/\.(JPEG|jpg|png)$/i, '') || '';
  momentsImage[filename] = url as string;
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
  sliderHeroImages['slide-hero-1'],
  sliderHeroImages['slide-hero-2'],
  sliderHeroImages['slide-hero-3'],
  sliderHeroImages['slide-hero-4'],
];

export const brideImages = [
  brideImage['image-bride'],
  brideImage['image-bride-2'],
];

export const groomImages = [
  groomImage['image-groom'],
  groomImage['image-groom-2'],
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

export const bgOvalFrame = weddingImages['bg-oval-frame-2'];
export const backgroundBrideGroom = weddingImages['image-background-bride-groom'];
export const backgroundWeddingEvent = weddingImages['background-wedding-event'];
export const backgroundFooter = weddingImages['image-footer'];
export const backgroundFooter2 = weddingImages['image-footer-2'];

export const momentsImages = [
  momentsImage['image-moments-1'],
  momentsImage['image-moments-2'],
  momentsImage['image-moments-3'],
  momentsImage['image-moments-4'],
  momentsImage['image-moments-5'],
  momentsImage['image-moments-6'],
];

export const countDownImages = [
  weddingImages['image-countdown-1'],
  weddingImages['image-countdown-2'],
];