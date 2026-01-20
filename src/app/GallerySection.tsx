'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lightbox from '../components/common/Lightbox';
import strapiService from '../services/strapi.service';
import type { StrapiGalleryResponse, StrapiImage, StrapiImageData } from '../types/strapi.types';
import { useTemplate } from '../components/providers/TemplateProvider';

export default function GallerySection() {
  const { template } = useTemplate()
  const isLightTemplate = template === 'light'
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState([
    { 
      id: 1, 
      src: '/images/img_placeholder_image_532x524.png', 
      width: 404, 
      height: 402,
      alt: 'Paper craft creation 1'
    },
    { 
      id: 2, 
      src: '/images/img_placeholder_image_228x406.png', 
      width: 406, 
      height: 228,
      alt: 'Handmade paper item 2'
    },
    { 
      id: 3, 
      src: '/images/img_placeholder_image_416x404.png', 
      width: 404, 
      height: 416,
      alt: 'Creative paper work 3'
    },
    { 
      id: 4, 
      src: '/images/img_placeholder_image_532x524.png', 
      width: 404, 
      height: 402,
      alt: 'Paper art piece 4'
    },
    { 
      id: 5, 
      src: '/images/img_placeholder_image_228x406.png', 
      width: 406, 
      height: 228,
      alt: 'Decorative paper craft 5'
    },
    { 
      id: 6, 
      src: '/images/img_placeholder_image_416x404.png', 
      width: 404, 
      height: 416,
      alt: 'Paper creation showcase 6'
    },
    { 
      id: 7, 
      src: '/images/img_placeholder_image_404x404.png', 
      width: 404, 
      height: 404,
      alt: 'Artisan paper work 7'
    }
  ]);

  useEffect(() => {
    const loadGalleryData = async () => {
      try {
        const response: StrapiGalleryResponse = await strapiService.getGalleryItems();
        const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

        const getImageAttributes = (image?: StrapiImage | StrapiImageData | null) => {
          if (!image) return null;
          if ('data' in image) {
            return image.data?.attributes ?? null;
          }
          return image;
        };
        
        if (response.data && response.data.length > 0) {
          const images = response.data.map((item) => {
            const attributes = item.attributes ?? item;
            const imageData = getImageAttributes(attributes?.image ?? null);

            // Build the correct image URL
            let imageUrl = '/images/img_placeholder_image_404x404.png';
            if (imageData?.url) {
              // If URL is already absolute (starts with http/https), use it as-is
              // Otherwise, prepend the Strapi API URL for relative paths
              imageUrl = imageData.url.startsWith('http')
                ? imageData.url
                : `${STRAPI_API_URL}${imageData.url}`;
            }

            return {
              id: item.id,
              src: imageUrl,
              width: imageData?.width || 404,
              height: imageData?.height || 404,
              alt: attributes?.alt || 'Gallery image',
            };
          });
          setGalleryImages(images);
        }
      } catch (error) {
        console.error('Error loading gallery from Strapi:', error);
        // Keep default mock data on error
      }
    };

    loadGalleryData();
  }, []);

  return (
    <>
      <section
        className={`w-full ${isLightTemplate ? 'bg-[#ECE6E1]' : 'bg-[#3b3935]'}`}
        id="gallery-section"
      >
      <div className="w-full">
        <div className="w-full max-w-content mx-auto px-[40px] sm:px-[60px] lg:px-[80px] py-[56px] sm:py-[84px] lg:py-[112px]">
          <div className="flex flex-col gap-[48px] justify-start items-center w-full">
            
            {/* Section Header */}
            <motion.div 
              className="flex flex-col justify-start items-center w-full max-w-[768px] mx-auto px-4 sm:px-8 lg:px-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span
                className={`text-base font-extrabold leading-[150%] text-center uppercase ${
                  isLightTemplate ? 'text-[#3b3935]' : 'text-[#ECE6E1]'
                }`}
                style={{ fontFamily: 'DM Sans' }}
              >
                Munkáink
              </span>
              
              <div className="flex flex-col gap-[13px] sm:gap-[20px] lg:gap-[24px] justify-center items-center w-full">
                <h2 
                  className={`text-[30px] sm:text-[45px] lg:text-[60px] font-normal leading-[110%] text-center ${
                    isLightTemplate ? 'text-[#3b3935]' : 'text-white'
                  }`}
                  style={{ 
                    fontFamily: 'Maname',
                    textShadow: isLightTemplate ? 'none' : '0 0 4px rgba(224, 168, 136, 0.40)',
                    marginBlockStart: '0px',
                    marginBlockEnd: '40px'
                  }}
                >
                  Galéria
                </h2>
                
                <p 
                  className={`text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[160%] text-center ${
                    isLightTemplate ? 'text-[#575252]' : 'text-[#E6E4DC]'
                  }`}
                  style={{ fontFamily: 'DM Sans' }}
                >
                  Nézd meg az elkészült munkákat és inspirálódj
                </p>
              </div>
            </motion.div>

            {/* Gallery Masonry Grid */}
            <div 
              className="w-full columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 lg:gap-8"
            >
              {galleryImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => {
                    setLightboxIndex(index);
                    setIsLightboxOpen(true);
                  }}
                  className="w-full mb-4 sm:mb-6 lg:mb-8 cursor-pointer hover:opacity-90 transition-opacity break-inside-avoid"
                  style={{ breakInside: 'avoid' }}
                >
                  <img
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt={image.alt}
                    className="w-full h-auto rounded-[16px]"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      </section>

      <Lightbox
        images={galleryImages}
        initialIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  )
}
