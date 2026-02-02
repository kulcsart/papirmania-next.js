'use client';
import Image from'next/image';
import { motion } from 'framer-motion';
import RatingBar from'../components/ui/RatingBar';
import { useTemplate } from '../components/providers/TemplateProvider';

interface TestimonialData {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
}

interface TestimonialsSectionProps {
  testimonials: TestimonialData[];
  loading: boolean;
}

export default function TestimonialsSection({ testimonials, loading }: TestimonialsSectionProps) {
  const { template } = useTemplate()
  const isLightTemplate = template === 'light'

  return (
    <section
      className={`w-full ${isLightTemplate ? 'bg-[#f5f1e8]' : 'bg-[#7b6a3f]'}`}
      id="testimonials-section"
    >
      <div className="w-full">
        <div className="w-full max-w-content mx-auto px-[24px] sm:px-[40px] md:px-[60px] lg:px-[80px] py-[40px] sm:py-[56px] md:py-[84px] lg:py-[112px]">
          <div className="flex flex-col gap-[32px] sm:gap-[40px] md:gap-[48px] justify-center items-center w-full">
        
            {/* Section Header */}
            <motion.div
              className="flex flex-col justify-start items-center w-full max-w-full sm:max-w-[85%] md:max-w-[70%] lg:max-w-[52%] px-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col gap-[8px] sm:gap-[12px] md:gap-[18px] lg:gap-[24px] justify-center items-center w-full">
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
                  Visszajelzések
                </h2>

                <p
                  className={`text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] font-normal leading-[160%] text-center max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] mx-auto ${
                    isLightTemplate ? 'text-[#575252]' : 'text-[#E6E4DC]'
                  }`}
                  style={{ fontFamily: 'DM Sans' }}
                >
                  Amit a résztvevők mondtak rólunk.
                </p>
              </div>
            </motion.div>

            {/* Testimonials Grid */}
            <div className="w-full">
              {loading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className={`rounded-[16px] p-8 animate-pulse ${
                        isLightTemplate ? 'bg-white border border-[#c8c1b4]' : 'bg-[#ffffff33]'
                      }`}
                    >
                      <div className="h-6 bg-gray-300 rounded mb-4"></div>
                      <div className="h-20 bg-gray-300 rounded mb-4"></div>
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-300 rounded mb-2"></div>
                          <div className="h-4 bg-gray-300 rounded"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.id}
                      className={`rounded-[12px] sm:rounded-[14px] md:rounded-[16px] p-[20px] sm:p-[24px] md:p-[28px] lg:p-[30px] h-auto ${
                        isLightTemplate ? 'bg-white border border-[#c8c1b4]' : 'bg-[#ffffff33]'
                      }`}
                      initial={{ opacity: 0, y: 40, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: "easeOut"
                      }}
                      whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
                    >
                      <div className="flex flex-col gap-[16px] sm:gap-[20px] md:gap-[22px] lg:gap-[24px] justify-start items-start w-full">
                        
                        {/* Rating */}
                        {testimonial.id === 'testimonial-3' ? (
                          <Image
                            src="/images/img_stars.svg"
                            width={116}
                            height={18}
                            alt="5 star rating"
                            className="w-[20%] h-auto"
                          />
                        ) : (
                          <RatingBar 
                            rating={testimonial.rating}
                            readonly
                            layout_width="auto"
                          />
                        )}
                        
                        <div className="flex flex-col gap-[16px] sm:gap-[20px] md:gap-[22px] lg:gap-[24px] justify-start items-center w-full">

                          {/* Comment */}
                          <p
                            className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] font-normal leading-[160%] text-left text-[#3b3935] w-full"
                            style={{ fontFamily: 'DM Sans' }}
                          >
                            "{testimonial.comment}"
                          </p>

                          {/* User Info */}
                          <div className="flex flex-col gap-[2px] sm:gap-[3px] justify-start items-start w-full">
                            <span
                              className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] font-semibold leading-[1.4] text-left text-[#3b3935]"
                              style={{ fontFamily: 'DM Sans' }}
                            >
                              {testimonial.name}
                            </span>

                            <span
                              className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] font-normal leading-[1.4] text-left text-[#3b3935]"
                              style={{ fontFamily: 'DM Sans' }}
                            >
                              {testimonial.role}, {testimonial.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
