'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import strapiService from '../services/strapi.service';
import type { StrapiTechniquesResponse, StrapiImage, StrapiImageData } from '../types/strapi.types';
import Image from'next/image';
import { useTemplate } from '../components/providers/TemplateProvider';

type TechniqueType = 'cartonnage' | 'bookbinding' | 'boxes' | 'marble' | 'papermache';

interface TechniqueContent {
  title: string;
  description: string;
  image: string;
}

export default function TechniquesSection() {
  const { template } = useTemplate()
  const isLightTemplate = template === 'light'
  const [activeTechnique, setActiveTechnique] = useState<TechniqueType>('cartonnage')
  const [techniquesContent, setTechniquesContent] = useState<Record<string, TechniqueContent>>({
    cartonnage: {
      title: 'Kartonból készült tárgyak borítása',
      description: 'Megtanítom, hogyan lehet papírral vagy textillel borítani a kartonból készült tárgyakat. Egyszerű, de hatásos technika, amely szép eredményt ad.',
      image: '/images/img_placeholder_image_536x536.png'
    }
  });
  const [techniques, setTechniques] = useState<Array<{ id: TechniqueType; label: string }>>([
    { id: 'cartonnage' as TechniqueType, label: 'Cartonnage' },
    { id: 'bookbinding' as TechniqueType, label: 'Könyvkötés' },
    { id: 'boxes' as TechniqueType, label: 'Dobozkészítés' },
    { id: 'marble' as TechniqueType, label: 'Márványpapír' },
    { id: 'papermache' as TechniqueType, label: 'Papírmasé' },
  ])

  const resolveTechniqueId = (label?: string) => {
    if (!label) return null;
    const normalized = label.toLowerCase();
    if (normalized.includes('cartonnage')) return 'cartonnage';
    if (normalized.includes('könyvköt') || normalized.includes('konyvkot')) return 'bookbinding';
    if (normalized.includes('doboz')) return 'boxes';
    if (normalized.includes('márvány') || normalized.includes('marvany')) return 'marble';
    if (normalized.includes('papírmas') || normalized.includes('papirmas')) return 'papermache';
    return null;
  }

  const getImageAttributes = (image?: StrapiImage | StrapiImageData | null) => {
    if (!image) return null;
    if ('data' in image) {
      return image.data?.attributes ?? null;
    }
    return image;
  };

  useEffect(() => {
    const loadTechniquesData = async () => {
      try {
        const response: StrapiTechniquesResponse = await strapiService.getTechniques();
        const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

        if (response.data && response.data.length > 0) {
          // Sort by order field
          const sortedData = [...response.data].sort((a, b) => {
            const orderA = a.attributes?.order ?? a.order ?? 999;
            const orderB = b.attributes?.order ?? b.order ?? 999;
            return orderA - orderB;
          });

          const content: Record<string, TechniqueContent> = {};
          const techniquesList: Array<{ id: TechniqueType; label: string }> = [];

          sortedData.forEach((technique) => {
            const attributes = technique.attributes ?? technique;
            const techniqueId = attributes?.slug || resolveTechniqueId(attributes?.label);
            const imageData = getImageAttributes(attributes?.image ?? null);
            if (!techniqueId) return;

            content[techniqueId] = {
              title: attributes?.title || attributes?.label || 'Papírtechnika',
              description: attributes?.description || attributes?.desctiption || attributes?.desciption || '',
              image: imageData?.url
                ? `${STRAPI_API_URL}${imageData.url}`
                : '/images/img_placeholder_image_536x536.png',
            };

            techniquesList.push({
              id: techniqueId as TechniqueType,
              label: attributes?.label || attributes?.title || 'Technika'
            });
          });

          setTechniquesContent(content);
          setTechniques(techniquesList);

          // Set first technique as active if current active is not in the list
          if (techniquesList.length > 0 && !techniquesList.find(t => t.id === activeTechnique)) {
            setActiveTechnique(techniquesList[0].id);
          }
        }
      } catch (error) {
        console.error('Error loading techniques from Strapi:', error);
        // Keep default mock data on error
      }
    };

    loadTechniquesData();
  }, []);

  const handleTechniqueClick = (techniqueId: TechniqueType) => {
    setActiveTechnique(techniqueId)
  }

  const getTechniqueContent = () => {
    return techniquesContent[activeTechnique] || {
      title: 'Válassz egy technikát',
      description: 'Kattints a fenti gombok egyikére, hogy többet tudj meg az adott technikáról.',
      image: '/images/img_placeholder_image_536x536.png'
    };
  }

  const content = getTechniqueContent()

  return (
    <section
      className={`w-full ${isLightTemplate ? 'bg-[#ECE6E1]' : 'bg-[#3b3935]'}`}
      id="techniques-section"
    >
      <div className="w-full">
        <div className="flex flex-col justify-start items-center w-full">
          <div className="w-full max-w-content mx-auto px-[24px] sm:px-[40px] md:px-[60px] lg:px-[80px] py-[40px] sm:py-[56px] md:py-[84px] lg:py-[112px]">
            <div className="flex flex-col gap-[32px] sm:gap-[40px] md:gap-[48px] justify-start items-center w-full">
              <motion.div
                className="flex flex-col justify-start items-center w-full max-w-full sm:max-w-[90%] md:max-w-[85%] lg:max-w-[768px] mx-auto px-4 sm:px-6 md:px-8 lg:px-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
              <motion.div
                className="flex flex-col gap-0 justify-start items-center w-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2
                  className={`text-[28px] sm:text-[36px] md:text-[45px] lg:text-[60px] font-normal leading-[120%] text-center pb-2 ${
                    isLightTemplate ? 'text-[#3b3935]' : 'text-white'
                  }`}
                  style={{
                    fontFamily: 'Maname',
                    textShadow: isLightTemplate ? 'none' : '0 0 4px rgba(224, 168, 136, 0.40)',
                    marginBlockStart: '0px',
                    marginBlockEnd: '24px'
                  }}
                >
                  A papírművészet technikái
                </h2>

                <p
                  className={`text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] font-normal leading-[160%] text-center ${
                    isLightTemplate ? 'text-[#575252]' : 'text-[#E6E4DC]'
                  }`}
                  style={{ fontFamily: 'DM Sans' }}
                >
                  A hagyományos papírművészeti technikákat használok elegáns tárgyak létrehozására
                </p>
              </motion.div>
            </motion.div>

            {/* Techniques Content */}
            <div className="flex flex-col justify-start items-center w-full h-auto">
              
              {/* Technique Tabs */}
              <div
                className={`flex flex-col sm:flex-row flex-wrap lg:flex-nowrap justify-start items-stretch w-full border border-b-0 ${
                  isLightTemplate
                    ? 'bg-white border-[#c8c1b4]'
                    : 'bg-[#14141466] border-[#77736b]'
                }`}
              >
                {techniques.map((technique, index) => (
                  <motion.button
                    key={technique.id}
                    onClick={() => handleTechniqueClick(technique.id)}
                    className={`w-full ${index === techniques.length - 1 ? 'sm:w-full' : 'sm:w-1/2'} lg:flex-1 transition-all duration-200 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[23px] xl:text-[26px] leading-[1.2] sm:leading-[1.25] lg:leading-[1.3] pt-[10px] sm:pt-[12px] pb-[16px] sm:pb-[20px] lg:pb-[24px] px-[12px] sm:px-[16px] lg:px-[20px] flex items-center justify-center border-b ${
                      activeTechnique === technique.id
                        ? isLightTemplate
                          ? 'bg-[#d9d3cc] text-[#3b3935] border-[#c8c1b4]'
                          : 'bg-[#1a1917] text-[#ece6e1] border-[#77736b]'
                        : isLightTemplate
                        ? 'text-[#77736b] border-[#c8c1b4]'
                        : 'text-[#77736b] border-[#77736b]'
                    } ${
                      // Desktop: only last item has no right border
                      index !== techniques.length - 1
                        ? isLightTemplate
                          ? 'lg:border-r border-[#c8c1b4]'
                          : 'lg:border-r border-[#575252]'
                        : ''
                    } ${
                      // Mobile/Tablet: even items (right column) have no right border
                      index % 2 === 0 && index < techniques.length - 1
                        ? isLightTemplate
                          ? 'sm:border-r border-[#c8c1b4]'
                          : 'sm:border-r border-[#575252]'
                        : ''
                    }`}
                    style={{ fontFamily: 'Maname' }}
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    whileHover={{ backgroundColor: 'transparent' }}
                  >
                    {technique.label}
                  </motion.button>
                ))}
              </div>

              {/* Technique Content */}
              <div
                className={`border border-t-0 rounded-b-[12px] sm:rounded-b-[14px] md:rounded-b-[16px] w-full px-[20px] sm:px-[32px] md:px-[48px] lg:px-[64px] py-[24px] sm:py-[32px] md:py-[42px] lg:py-[56px] ${
                  isLightTemplate
                    ? 'border-[#c8c1b4] bg-white'
                    : 'border-[#77736b] bg-[#14141466]'
                }`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTechnique}
                    className="flex flex-col lg:flex-row justify-between items-center w-full gap-6 sm:gap-8 lg:gap-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    
                    {/* Content Text */}
                    <div className="flex flex-col gap-[24px] sm:gap-[32px] md:gap-[48px] lg:gap-[64px] justify-start items-start w-full lg:w-[46%]">

                      <motion.h3
                        className={`text-[22px] sm:text-[28px] md:text-[36px] lg:text-[48px] font-normal leading-[110%] text-left ${
                          isLightTemplate ? 'text-[#3b3935]' : 'text-white'
                        }`}
                        style={{
                          fontFamily: 'Maname',
                          textShadow: isLightTemplate ? 'none' : '0 0 4px rgba(73, 53, 24, 0.40)'
                        }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        {content.title}
                      </motion.h3>

                      <motion.p
                        className={`text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] font-normal leading-[160%] text-left w-full ${
                          isLightTemplate ? 'text-[#575252]' : 'text-white'
                        }`}
                        style={{ fontFamily: 'DM Sans' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        {content.description}
                      </motion.p>
                    </div>

                    {/* Content Image */}
                    <motion.div
                      className="w-full lg:w-[536px] flex justify-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                    >
                      <Image
                        src={content.image}
                        width={536}
                        height={536}
                        alt={content.title}
                        className="w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[536px] h-auto rounded-[12px] sm:rounded-[14px] md:rounded-[16px]"
                      />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
