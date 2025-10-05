import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface NASAImage {
  href: string;
  title: string;
  description: string;
}

interface Props {
  objectName: string;
  onClose: () => void;
}

export default function NASAGallery({ objectName, onClose }: Props) {
  const [images, setImages] = useState<NASAImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/nasa-images?query=${encodeURIComponent(objectName)}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
          }
        );
        const data = await response.json();
        setImages(data.images || []);
      } catch (error) {
        console.error('Error fetching NASA images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [objectName]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
      >
        <X size={24} className="text-white" />
      </button>

      <div className="max-w-4xl w-full bg-gray-900 rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            NASA Images: {objectName}
          </h2>

          {isLoading ? (
            <div className="text-white text-center py-12">Loading images...</div>
          ) : images.length > 0 ? (
            <>
              <div className="relative bg-black rounded-lg overflow-hidden mb-4">
                <img
                  src={images[currentIndex].href}
                  alt={images[currentIndex].title}
                  className="w-full h-96 object-contain"
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <ChevronLeft size={24} className="text-white" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <ChevronRight size={24} className="text-white" />
                    </button>
                  </>
                )}
              </div>

              <div className="text-white">
                <h3 className="font-semibold mb-2">{images[currentIndex].title}</h3>
                <p className="text-gray-400 text-sm">{images[currentIndex].description}</p>
                <p className="text-gray-500 text-xs mt-2">
                  Image {currentIndex + 1} of {images.length}
                </p>
              </div>
            </>
          ) : (
            <div className="text-white text-center py-12">
              No images found for {objectName}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
