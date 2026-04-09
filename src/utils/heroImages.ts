// Month-specific hero images in soft pastel scenic aesthetic
// Each month gets a curated generated landscape/nature image

export interface HeroImageData {
  url: string;
  alt: string;
  accentColor: string; 
}

export const MONTH_HERO_IMAGES: HeroImageData[] = [
  {
    url: '/images/hero/jan.png',
    alt: 'Misty snow-capped mountains in soft lavender and baby blue',
    accentColor: '#7C3AED', // Deeper Lavender
  },
  {
    url: '/images/hero/FEB.png',
    alt: 'Misty winter landscape with frozen river and pine trees in soft mint green',
    accentColor: '#2F5241', // Deep Sage Green (matches the pine trees)
  },
  {
    url: '/images/hero/MAR.png',
    alt: 'Winding path through a peaceful meadow at sunset in warm peach and gold tones',
    accentColor: '#A16207', // Deep Sunset Gold (matches the meadow tones)
  },
  {
    url: '/images/hero/APR.png',
    alt: 'Soft desert dunes at sunset in peach and warm sand tones',
    accentColor: '#9A3412', // Deep Terracotta (matches the sand shadows)
  },
  {
    url: '/images/hero/MAY.png',
    alt: 'Calm lake at sunset with golden hills and soft yellow sky',
    accentColor: '#854D0E', // Deep Golden Bronze (matches the sunset hills)
  },
  {
    url: '/images/hero/JUN.png',
    alt: 'Serene beach at sunset with soft peach sky and calm waves',
    accentColor: '#9D174D', // Deep Rose Pink (matches the sunset sky)
  },
  {
    url: '/images/hero/jul.png',
    alt: 'Dreamy cloudy sky in baby blue and peach',
    accentColor: '#1D4ED8', // Sky Deep Blue
  },
  {
    url: '/images/hero/AUG.png',
    alt: 'Soft rolling grassland at sunset with a winding path in hazy golden and beige tones',
    accentColor: '#78350F', // Deep Warm Earth Brown (matches the hazy golden hills)
  },
  {
    url: '/images/hero/SEP.png',
    alt: 'Minimalist misty lake in soft grey and white tones',
    accentColor: '#334155', // Deep Slate Grey (matches the foggy lake)
  },
  {
    url: '/images/hero/OCT.png',
    alt: 'Minimalist beach at dawn with pale blue water and soft grey sand',
    accentColor: '#155E75', // Deep Misty Blue (matches the ocean water)
  },
  {
    url: '/images/hero/NOV.png',
    alt: 'Misty frozen lake at dawn in soft lavender and pale lilac tones',
    accentColor: '#5B21B6', // Deep Violet (matches the lilac sky)
  },
  {
    url: '/images/hero/dec.png',
    alt: 'Winter snowy landscape with pale pink sky',
    accentColor: '#6D28D9', // Winter Purple
  },
];
