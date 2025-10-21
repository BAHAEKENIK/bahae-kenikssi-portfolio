import { useEffect, useRef, useState } from 'react';

export const useLazyLoad = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsIntersecting(true);
      return;
    }

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        setHasLoaded(true);
        if (observerRef.current && ref.current) {
          observerRef.current.unobserve(ref.current);
        }
      }
    }, {
      rootMargin: options.rootMargin || '50px',
      threshold: options.threshold || 0.1,
      ...options
    });

    if (ref.current) {
      observerRef.current.observe(ref.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [options]);

  return [ref, isIntersecting, hasLoaded];
};

export const useImagePreloader = (imageUrls) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) {
      setIsReady(true);
      return;
    }

    let mounted = true;
    const loadedImages = new Set();

    const preloadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          if (mounted) {
            loadedImages.add(url);
            setLoadedCount(loadedImages.size);
            resolve(url);
          }
        };
        img.onerror = reject;
      });
    };

    const preloadAll = async () => {
      try {
        await Promise.allSettled(imageUrls.map(url => preloadImage(url)));
        if (mounted) {
          setIsReady(true);
        }
      } catch (error) {
        console.warn('Some images failed to preload:', error);
        if (mounted) {
          setIsReady(true);
        }
      }
    };

    preloadAll();

    return () => {
      mounted = false;
    };
  }, [imageUrls]);

  return { isReady, progress: imageUrls ? loadedCount / imageUrls.length : 1 };
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useThrottle = (value, limit) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
};