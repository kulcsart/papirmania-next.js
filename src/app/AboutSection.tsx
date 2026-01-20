'use client';
import Image from'next/image';
import { motion } from 'framer-motion';
import { useTemplate } from '../components/providers/TemplateProvider';

export default function AboutSection() {
  const { template } = useTemplate()
  const isLightTemplate = template === 'light'

  return (
    <section
      className={`w-full ${isLightTemplate ? 'bg-[#ECE6E1]' : 'bg-[#27414C]'}`}
      id="about-section"
    >
      <div className={`w-full ${isLightTemplate ? 'bg-[#ECE6E1]' : 'bg-[#27414C]'}`}>
        <div className={`flex flex-col justify-start items-center w-full ${isLightTemplate ? 'bg-[#ECE6E1]' : 'bg-[#27414C]'}`}>
          <div className="w-full max-w-content mx-auto px-[40px] sm:px-[60px] lg:px-[80px] py-[56px] sm:py-[84px] lg:py-[112px]">
            <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-8 lg:gap-12">
              
              {/* Left Content */}
              <motion.div 
                className="flex flex-col gap-[36px] sm:gap-[54px] lg:gap-[72px] justify-start items-start w-full lg:w-[48%]"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-col justify-start items-start w-full">
                  <motion.span
                    className="text-base font-extrabold leading-[150%] text-center uppercase mb-2"
                    style={{ fontFamily: 'DM Sans', color: isLightTemplate ? '#3b3935' : 'var(--light, #ECE6E1)' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Rólam
                  </motion.span>

                  <motion.h2
                    className={`text-[30px] sm:text-[45px] lg:text-[60px] font-normal leading-[110%] text-left ${
                      isLightTemplate ? 'text-[#3b3935]' : 'text-white'
                    }`}
                    style={{ 
                      fontFamily: 'Maname',
                      textShadow: isLightTemplate ? 'none' : '0 0 4px rgba(224, 168, 136, 0.40)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Én és a papír
                  </motion.h2>
                </div>

                {/* About Text */}
                <motion.p
                  className={`text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[160%] text-left w-full ${
                    isLightTemplate ? 'text-[#575252]' : 'text-[#E6E4DC]'
                  }`}
                  style={{ fontFamily: 'DM Sans' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Történetem a papír és a textil iránti gyermekkori rajongással indult. A barkácsolás, a kézműveskedés már akkor is az életem része volt, és ez a lelkesedés a felnőttkoromra sem tűnt el – sőt, egyre erősebb lett!
                  <br /><br />
                  Az évek során számos technikával megismerkedtem a varrástól, szövésen át egészen a kárpitozasig, a decoupage-ig és a falfestésig. Ez a kísérletezés máig tart, szívesen tanulok újabb és újabb technikákat. Bár sok területet szeretek, az igazi hívást a könyvkötés és a dobozkészítés jelentette.
                  <br /><br />
                  Lakberendezőként a hivatásomban is a papír és a textil a főszereplők. Szakterületem a tapéták és a lakástextiliák. A sok gyönyörű anyag, és textúra amivel nap mint nap dolgozom, folyamatosan inspirál a kézműveskedésre. Ez a két része az életemnek mára elválaszthatatlanul összefonódott, ebből született a Papírmánia.
                </motion.p>
              </motion.div>

              {/* Right Image */}
              <motion.div 
                className="relative w-full lg:w-[48%] h-[312px] sm:h-[468px] lg:h-[624px]"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                
                {/* Main Image */}
                <motion.div
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src="/images/img_placeholder_image.png"
                    width={516}
                    height={532}
                    alt="About the artist - paper crafts creator"
                    className="absolute top-0 right-0 w-[84%] max-w-[516px] h-auto rounded-[16px] z-10"
                  />
                </motion.div>
                
                {/* Secondary Image */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Image
                    src="/images/img_placeholder_image_374x364.png"
                    width={364}
                    height={374}
                    alt="Paper art collection"
                    className="absolute bottom-0 left-0 w-[60%] max-w-[364px] h-auto rounded-[16px] z-20"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
