'use client';
import { useState, useEffect } from 'react';
import strapiService from '../services/strapi.service';
import type { StrapiTechniquesResponse } from '../types/strapi.types';
import Image from'next/image';

type TechniqueType = 'cartonnage' | 'bookbinding' | 'boxes' | 'marble' | 'papermache';

interface TechniqueContent {
  title: string;
  description: string;
  image: string;
}

export default function TechniquesSection() {
  const [activeTechnique, setActiveTechnique] = useState<TechniqueType>('cartonnage')
  const [techniquesContent, setTechniquesContent] = useState<Record<string, TechniqueContent>>({
    cartonnage: {
      title: 'Kartonból készült tárgyak borítása',
      description: 'Megtanítom, hogyan lehet papírral vagy textillel borítani a kartonból készült tárgyakat. Egyszerű, de hatásos technika, amely szép eredményt ad.',
      image: '/images/img_placeholder_image_536x536.png'
    }
  });

  const techniques = [
    { id: 'cartonnage' as TechniqueType, label: 'Cartonnage' },
    { id: 'bookbinding' as TechniqueType, label: 'Könyvkötés' },
    { id: 'boxes' as TechniqueType, label: 'Dobozkészítés' },
    { id: 'marble' as TechniqueType, label: 'Márványpapír' },
    { id: 'papermache' as TechniqueType, label: 'Papírmasé' },
  ]

  useEffect(() => {
    const loadTechniquesData = async () => {
      try {
        const response: StrapiTechniquesResponse = await strapiService.getTechniques();
        const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
        
        if (response.data && response.data.length > 0) {
          const content: Record<string, TechniqueContent> = {};
          response.data.forEach((technique) => {
            content[technique.attributes.slug] = {
              title: technique.attributes.title,
              description: technique.attributes.description,
              image: technique.attributes.image?.data
                ? `${STRAPI_API_URL}${technique.attributes.image.data.attributes.url}`
                : '/images/img_placeholder_image_536x536.png',
            };
          });
          setTechniquesContent(content);
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
    <section className="w-full bg-[#3b3935]" id="techniques-section">
      <div className="w-full">
        <div className="flex flex-col justify-start items-center w-full">
          <div className="w-full max-w-content mx-auto px-[40px] sm:px-[60px] lg:px-[80px] py-[56px] sm:py-[84px] lg:py-[112px]">
            <div className="flex flex-col gap-[48px] sm:gap-[64px] lg:gap-[84px] justify-start items-center w-full">
              <div className="flex flex-col justify-start items-center w-full max-w-[768px] mx-auto px-4 sm:px-8 lg:px-0">
              <span
                className="text-base font-extrabold leading-[150%] text-center uppercase mb-2"
                style={{ fontFamily: 'DM Sans', color: 'var(--light, #ECE6E1)' }}
              >
                Technikák
              </span>

              <div className="flex flex-col gap-[12px] sm:gap-[18px] lg:gap-[24px] justify-start items-center w-full">
                <h2
                  className="text-[30px] sm:text-[45px] lg:text-[60px] font-normal leading-[110%] text-center text-white"
                  style={{ 
                    fontFamily: 'Maname',
                    textShadow: '0 0 4px rgba(224, 168, 136, 0.40)'
                  }}
                >
                  A papírművészet technikái
                </h2>

                <p
                  className="text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[160%] text-center text-[#E6E4DC]"
                  style={{ fontFamily: 'DM Sans' }}
                >
                  A hagyományos papírművészeti technikákat használok elegáns tárgyak létrehozására
                </p>
              </div>
            </div>

            {/* Techniques Content */}
            <div className="flex flex-col justify-start items-center w-full h-auto">
              
              {/* Technique Tabs */}
              <div className="flex flex-col lg:flex-row justify-start items-center w-full bg-[#14141466] border border-b-0 border-[#77736b] ">
                {techniques.map((technique) => (
                  <button
                    key={technique.id}
                    onClick={() => handleTechniqueClick(technique.id)}
                    className={`w-full lg:flex-1 transition-all duration-200 hover:text-[#ece6e1] text-[20px] sm:text-[23px] lg:text-[26px] leading-[26px] sm:leading-[29px] lg:leading-[32px] p-[20px] ${
                      activeTechnique === technique.id ? 'bg-transparent text-[#ece6e1]' : 'hover:bg-[#ffffff0a] text-[#77736b]'
                    } ${technique.id !== 'papermache' ? 'border-r border-[#575252]' : ''} ${
                      activeTechnique !== technique.id ? 'border-b border-[#77736b]' : ''
                    }`}
                    style={{ fontFamily: 'Maname' }}
                  >
                    {technique.label}
                  </button>
                ))}
              </div>

              {/* Technique Content */}
              <div className="border border-t-0 border-[#77736b] rounded-b-[16px] bg-[#14141466] w-full px-[32px] sm:px-[48px] lg:px-[64px] py-[28px] sm:py-[42px] lg:py-[56px]">
                <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-8 lg:gap-12">
                  
                  {/* Content Text */}
                  <div className="flex flex-col gap-[32px] sm:gap-[48px] lg:gap-[64px] justify-start items-start w-full lg:w-[46%]">
                    
                    <h3
                      className="text-[24px] sm:text-[36px] lg:text-[48px] font-normal leading-[110%] text-left text-white"
                      style={{ 
                        fontFamily: 'Maname',
                        textShadow: '0 0 4px rgba(73, 53, 24, 0.40)'
                      }}
                    >
                      {content.title}
                    </h3>
                    
                    <p
                      className="text-[16px] sm:text-[17px] lg:text-[18px] font-normal leading-[160%] text-left text-white w-full"
                      style={{ fontFamily: 'DM Sans' }}
                    >
                      {content.description}
                    </p>
                  </div>

                  {/* Content Image */}
                  <div className="w-full lg:w-[536px] flex justify-center">
                    <Image
                      src={content.image}
                      width={536}
                      height={536}
                      alt={content.title}
                      className="w-full max-w-[536px] h-auto rounded-[16px]"
                    />
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}