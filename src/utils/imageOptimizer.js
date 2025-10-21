// Image optimization utilities
export const optimizeImageUrl = (url, options = {}) => {
  if (!url || url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }

  const {
    width = 800,
    quality = 80,
    format = 'webp'
  } = options;

  // For external URLs, you might want to use a CDN service
  // For local images, we'll return the original URL in development
  if (process.env.NODE_ENV === 'development') {
    return url;
  }

  // In production, you can integrate with an image optimization service
  // For now, we'll return the original URL
  return url;
};

export const getImageDimensions = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
        aspectRatio: img.width / img.height
      });
    };
    img.onerror = () => {
      resolve({ width: 800, height: 600, aspectRatio: 4/3 });
    };
    img.src = url;
  });
};

export const createImagePlaceholder = (width, height, color = '#1e293b') => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" 
            fill="#64748b" text-anchor="middle" dy=".3em">Loading...</text>
    </svg>
  `)}`;
};

// Critical images to preload
export const CRITICAL_IMAGES = [
  '/src/assets/images/profile/profile.jpg',
  '/src/assets/images/projects/getjob-project.png',
  '/src/assets/images/projects/weatherapp-project.png',
  '/src/assets/images/certificates/react-certificate.png',
  '/src/assets/images/certificates/sql-certificate.png'
];