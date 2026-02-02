'use client';
import Button from'../components/ui/Button';
import { motion } from 'framer-motion';
import { useTemplate } from '../components/providers/TemplateProvider';

interface HeroSectionProps {
  title?: string;
  content?: string;
  imageLarge?: string;
  imageSmall?: string;
}

export default function HeroSection({ title, content, imageLarge, imageSmall }: HeroSectionProps) {
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
          <div className="w-full max-w-content mx-auto px-[24px] sm:px-[40px] md:px-[60px] lg:px-[80px] py-[40px] sm:py-[56px] md:py-[84px] lg:py-[112px]">
            <div className="flex flex-col-reverse lg:flex-row justify-between items-center w-full gap-[60px] sm:gap-[60px] lg:gap-12">
              
              {/* Left Content */}
              <motion.div
                className="flex flex-col gap-[40px] sm:gap-[48px] md:gap-[54px] lg:gap-[72px] justify-start items-start w-full lg:w-[48%]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                
                {/* Main Heading */}
                <motion.h1
                  className={`text-[36px] sm:text-[48px] md:text-[63px] lg:text-[74px] xl:text-[84px] font-normal leading-[120%] text-left pb-2 ${
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
                  {title || 'Ismerd meg a papír titkait'}
                </motion.h1>

                {/* Content Column */}
                <div className="flex flex-col gap-[24px] sm:gap-[36px] md:gap-[54px] lg:gap-[72px] justify-start items-start w-full">
                  
                  {/* Description */}
                  <motion.p
                    className={`text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] font-normal leading-[160%] text-left w-full ${
                      isLightTemplate ? 'text-[#575252]' : 'text-white'
                    }`}
                    style={{ fontFamily: 'DM Sans' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {content || 'Számomra a papír nemcsak egy alapanyag, hanem a kreativitás végtelen forrása. Szeretem a papírt, szeretek új életet adni a már nem használt anyagoknak.'}
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
                className="relative w-full lg:w-[48%] flex justify-center lg:justify-end items-center lg:h-[624px]"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Main Image */}
                <img
                  src={imageLarge || "/images/img_placeholder_image.png"}
                  alt="Paper crafts workshop"
                  className="w-full max-w-[400px] lg:absolute lg:top-0 lg:right-0 lg:w-[84%] lg:max-w-[516px] h-auto rounded-[12px] sm:rounded-[14px] lg:rounded-[16px] lg:z-10 shadow-lg"
                />

                {/* Secondary Image - hidden on mobile */}
                <img
                  src={imageSmall || "/images/img_placeholder_image_374x364.png"}
                  alt="Handmade paper art"
                  className="hidden lg:block absolute bottom-0 left-0 w-[60%] max-w-[364px] h-auto rounded-[12px] sm:rounded-[14px] lg:rounded-[16px] z-20 shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
