'use client';
import Image from'next/image';
import Button from'../components/ui/Button';
import { motion } from 'framer-motion';
import { useTemplate } from '../components/providers/TemplateProvider';

export default function HeroSection() {
  const { template } = useTemplate()
  const isLightTemplate = template === 'light'

  const handleCoursesClick = () => {
    const coursesSection = document.getElementById('courses-section')
    coursesSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleGalleryClick = () => {
    const gallerySection = document.getElementById('gallery-section')
    gallerySection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className={`w-full ${isLightTemplate ? 'bg-[#ECE6E1]' : 'bg-[#3b3935]'}`}
      id="hero-section"
    >
      <div className="w-full">
        <div className="flex flex-col lg:flex-row justify-start items-center w-full">
          <div className="w-full max-w-content mx-auto px-[40px] sm:px-[60px] lg:px-[80px] py-[56px] sm:py-[84px] lg:py-[112px]">
            <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-8 lg:gap-12">
              
              {/* Left Content */}
              <motion.div 
                className="flex flex-col gap-[36px] sm:gap-[54px] lg:gap-[72px] justify-start items-start w-full lg:w-[48%]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                
                {/* Main Heading */}
                <motion.h1 
                  className={`text-[42px] sm:text-[63px] md:text-[74px] lg:text-[84px] font-normal leading-[110%] text-left ${
                    isLightTemplate ? 'text-[#3b3935]' : 'text-white'
                  }`}
                  style={{ 
                    fontFamily: 'Maname',
                    letterSpacing: '0px'
                  }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Ismerd meg a papír titkait
                </motion.h1>

                {/* Content Column */}
                <div className="flex flex-col gap-[36px] sm:gap-[54px] lg:gap-[72px] justify-start items-start w-full">
                  
                  {/* Description */}
                  <motion.p 
                    className={`text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[160%] text-left w-full ${
                      isLightTemplate ? 'text-[#575252]' : 'text-white'
                    }`}
                    style={{ fontFamily: 'DM Sans' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    Számomra a papír nemcsak egy alapanyag, hanem a kreativitás végtelen forrása. Szeretem a papírt, szeretek új életet adni a már nem használt anyagoknak.
                  </motion.p>

                  {/* Action Buttons */}
                  <motion.div 
                    className="flex flex-col sm:flex-row justify-start items-center w-full gap-4 sm:gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <Button
                      text="Kurzusok"
                      onClick={handleCoursesClick}
                      className="w-full sm:w-auto"
                    />
                    
                    <Button
                      text="Galéria"
                      variant="secondary"
                      onClick={handleGalleryClick}
                      className={`w-full sm:w-auto ${
                        isLightTemplate
                          ? 'border border-[#bfb6a9] text-[#3b3935] bg-[#ffffffcc] hover:bg-white'
                          : 'bg-[#ffffff33] hover:bg-[#ffffff4d] text-white'
                      }`}
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Images Stack */}
              <motion.div 
                className="relative w-full lg:w-[48%] h-[312px] sm:h-[468px] lg:h-[624px] justify-end items-end"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Main Image */}
                <Image
                  src="/images/img_placeholder_image.png"
                  width={516}
                  height={532}
                  alt="Paper crafts workshop"
                  className="absolute top-0 right-0 w-[84%] max-w-[516px] h-auto rounded-[16px] z-10"
                />
                
                {/* Secondary Image */}
                <Image
                  src="/images/img_placeholder_image_374x364.png"
                  width={364}
                  height={374}
                  alt="Handmade paper art"
                  className="absolute bottom-0 left-0 w-[60%] max-w-[364px] h-auto rounded-[16px] z-20"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
