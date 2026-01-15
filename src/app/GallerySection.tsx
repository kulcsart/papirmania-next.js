'use client';
import Image from'next/image';
import { useState, useEffect } from 'react';
import Lightbox from '../components/common/Lightbox';
import strapiService from '../services/strapi.service';
import type { StrapiGalleryResponse } from '../types/strapi.types';

export default function GallerySection() {
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
        
        if (response.data && response.data.length > 0) {
          const images = response.data.map((item) => ({
            id: item.id,
            src: item.attributes.image?.data
              ? `${STRAPI_API_URL}${item.attributes.image.data.attributes.url}`
              : '/images/img_placeholder_image_404x404.png',
            width: item.attributes.image?.data?.attributes.width || 404,
            height: item.attributes.image?.data?.attributes.height || 404,
            alt: item.attributes.alt || 'Gallery image',
          }));
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
      <section className="w-full bg-[#3b3935]" id="gallery-section">
      <div className="w-full">
        <div className="w-full max-w-content mx-auto px-[40px] sm:px-[60px] lg:px-[80px] py-[56px] sm:py-[84px] lg:py-[112px]">
          <div className="flex flex-col gap-[39px] sm:gap-[59px] lg:gap-[78px] justify-start items-center w-full">
            
            {/* Section Header */}
            <div className="flex flex-col justify-start items-center w-full max-w-[768px] mx-auto px-4 sm:px-8 lg:px-0">
              <span
                className="text-base font-extrabold leading-[150%] text-center uppercase mb-2"
                style={{ fontFamily: 'DM Sans', color: 'var(--light, #ECE6E1)' }}
              >
                Munkáink
              </span>
              
              <div className="flex flex-col gap-[13px] sm:gap-[20px] lg:gap-[26px] justify-center items-center w-full">
                <h2 
                  className="text-[30px] sm:text-[45px] lg:text-[60px] font-normal leading-[110%] text-center text-white"
                  style={{ 
                    fontFamily: 'Maname',
                    textShadow: '0 0 4px rgba(224, 168, 136, 0.40)'
                  }}
                >
                  Galéria
                </h2>
                
                <p 
                  className="text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[160%] text-center text-[#E6E4DC]"
                  style={{ fontFamily: 'DM Sans' }}
                >
                  Nézd meg az elkészült munkákat és inspirálódj
                </p>
              </div>
            </div>

            {/* Gallery Masonry Grid */}
            <div 
              className="w-full"
              style={{
                columnCount: 1,
                columnGap: '16px',
              }}
              onMouseEnter={(e) => {
                const style = (e.currentTarget as HTMLElement).style;
                const width = window.innerWidth;
                if (width >= 1024) {
                  style.columnCount = '3';
                  style.columnGap = '32px';
                } else if (width >= 640) {
                  style.columnCount = '2';
                  style.columnGap = '24px';
                }
              }}
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
                  <Image
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt={image.alt}
                    className="w-full h-auto rounded-[16px] hover:scale-105 transition-transform duration-300"
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