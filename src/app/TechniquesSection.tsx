'use client';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import strapiService from '../services/strapi.service';
import type { StrapiTechniquesResponse, StrapiImage, StrapiImageData } from '../types/strapi.types';
import { useTemplate } from '../components/providers/TemplateProvider';
import { useRouter, useSearchParams } from 'next/navigation';

interface TechniqueContent {
  title: string;
  description: string;
  image: string;
}

interface TechniqueTab {
  id: string;
  label: string;
  slug?: string;
}

export default function TechniquesSection() {
  const { template } = useTemplate()
  const isLightTemplate = template === 'light'
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTechnique, setActiveTechnique] = useState<string>('');
  const [techniques, setTechniques] = useState<TechniqueTab[]>([]);
  const [techniquesContent, setTechniquesContent] = useState<Record<string, TechniqueContent>>({});

  const searchSlug = useMemo(() => searchParams?.get('tech')?.toString() ?? '', [searchParams]);

  // Fallback slug generator if Strapi record has no slug
  const slugify = (value?: string) => {
    if (!value) return '';
    return value
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

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
          const content: Record<string, TechniqueContent> = {};
          const tabs: TechniqueTab[] = [];

          response.data.forEach((technique) => {
            const attributes = technique.attributes ?? technique;
            const label = attributes?.label || attributes?.title || '';
            if (!label) return;
            const slug = attributes?.slug || slugify(label);
            const techniqueId = slug || label;
            const imageData = getImageAttributes(attributes?.image ?? null);
            if (!techniqueId) return;

            // Build the correct image URL
            let imageUrl = '/images/img_placeholder_image_536x536.png';
            if (imageData?.url) {
              // If URL is already absolute (starts with http/https), use it as-is
              // Otherwise, prepend the Strapi API URL for relative paths
              imageUrl = imageData.url.startsWith('http')
                ? imageData.url
                : `${STRAPI_API_URL}${imageData.url}`;
            }

            content[techniqueId] = {
              title: attributes?.title || attributes?.label || 'Papírtechnika',
              description: attributes?.description || attributes?.desctiption || attributes?.desciption || '',
              image: imageUrl,
            };

            tabs.push({
              id: techniqueId,
              label,
              slug: attributes?.slug || slug || undefined,
            });
          });

          // Tabs ordered alphabetically by label (Hungarian locale)
          tabs.sort((a, b) => a.label.localeCompare(b.label, 'hu', { sensitivity: 'base' }));
          setTechniquesContent(content);
          setTechniques(tabs);

          // Initial selection: URL query (?tech=slug) or first item
          const initial = searchSlug && content[searchSlug] ? searchSlug : tabs[0]?.id || '';
          if (initial) {
            setActiveTechnique(initial);
          }
        }
      } catch (error) {
        console.error('Error loading techniques from Strapi:', error);
        // Keep default mock data on error
      }
    };

    loadTechniquesData();
  }, []);

  useEffect(() => {
    if (searchSlug && techniquesContent[searchSlug]) {
      setActiveTechnique(searchSlug);
    }
  }, [searchSlug, techniquesContent]);

  const handleTechniqueClick = (techniqueId: string, slug?: string) => {
    setActiveTechnique(techniqueId);
    if (slug) {
      // Keep selection in the URL for sharing/bookmarking
      const params = new URLSearchParams(searchParams?.toString());
      params.set('tech', slug);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
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
          <div className="w-full max-w-content mx-auto px-[40px] sm:px-[60px] lg:px-[80px] py-[56px] sm:py-[84px] lg:py-[112px]">
            <div className="flex flex-col gap-[48px] justify-start items-center w-full">
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
                Technikák
              </span>

              <motion.div 
                className="flex flex-col gap-0 justify-start items-center w-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2
                  className={`text-[30px] sm:text-[45px] lg:text-[60px] font-normal leading-[110%] text-center ${
                    isLightTemplate ? 'text-[#3b3935]' : 'text-white'
                  }`}
                  style={{ 
                    fontFamily: 'Maname',
                    textShadow: isLightTemplate ? 'none' : '0 0 4px rgba(224, 168, 136, 0.40)',
                    marginBlockStart: '0px',
                    marginBlockEnd: '12px'
                  }}
                >
                  A papírművészet technikái
                </h2>

                <p
                  className={`text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[160%] text-center ${
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
                className={`flex flex-col lg:flex-row justify-start items-center w-full border border-b-0 ${
                  isLightTemplate
                    ? 'bg-white border-[#c8c1b4]'
                    : 'bg-[#14141466] border-[#77736b]'
                }`}
              >
                {techniques.map((technique, index) => {
                  const isLast = index === techniques.length - 1;
                  return (
                  <motion.button
                    key={technique.id}
                    onClick={() => handleTechniqueClick(technique.id, technique.slug)}
                    className={`w-full lg:flex-1 transition-all duration-200 text-[20px] sm:text-[23px] lg:text-[26px] leading-[26px] sm:leading-[29px] lg:leading-[32px] pt-[12px] pb-[24px] px-[20px] flex items-center justify-center ${
                      activeTechnique === technique.id
                        ? isLightTemplate
                          ? 'bg-transparent text-[#3b3935]'
                          : 'bg-transparent text-[#ece6e1]'
                        : isLightTemplate
                        ? 'text-[#77736b]'
                        : 'text-[#77736b]'
                    } ${
                      !isLast
                        ? isLightTemplate
                          ? 'border-r border-[#c8c1b4]'
                          : 'border-r border-[#575252]'
                        : ''
                    } ${
                      activeTechnique !== technique.id
                        ? isLightTemplate
                          ? 'border-b border-[#c8c1b4]'
                          : 'border-b border-[#77736b]'
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
                  );
                })}
              </div>

              {/* Technique Content */}
              <div
                className={`border border-t-0 rounded-b-[16px] w-full px-[32px] sm:px-[48px] lg:px-[64px] py-[28px] sm:py-[42px] lg:py-[56px] ${
                  isLightTemplate
                    ? 'border-[#c8c1b4] bg-white'
                    : 'border-[#77736b] bg-[#14141466]'
                }`}
              >
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeTechnique}
                    className="flex flex-col lg:flex-row justify-between items-center w-full gap-8 lg:gap-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    
                    {/* Content Text */}
                    <div className="flex flex-col gap-[32px] sm:gap-[48px] lg:gap-[64px] justify-start items-start w-full lg:w-[46%]">
                      
                      <motion.h3
                        className={`text-[24px] sm:text-[36px] lg:text-[48px] font-normal leading-[110%] text-left ${
                          isLightTemplate ? 'text-[#3b3935]' : 'text-white'
                        }`}
                        style={{ 
                          fontFamily: 'Maname',
                          textShadow: isLightTemplate ? 'none' : '0 0 4px rgba(73, 53, 24, 0.40)'
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        {content.title}
                      </motion.h3>
                      
                      <motion.p
                        className={`text-[16px] sm:text-[17px] lg:text-[18px] font-normal leading-[160%] text-left w-full ${
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
                      <img
                        src={content.image}
                        alt={content.title}
                        className="w-full max-w-[536px] h-auto rounded-[16px]"
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
