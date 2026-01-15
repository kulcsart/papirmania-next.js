'use client';
import Image from'next/image';
 import RatingBar from'../components/ui/RatingBar';

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
  return (
    <section className="w-full bg-[#7b6a3f]" id="testimonials-section">
      <div className="w-full">
        <div className="w-full max-w-content mx-auto px-[40px] sm:px-[60px] lg:px-[80px] py-[56px] sm:py-[84px] lg:py-[112px]">
          <div className="flex flex-col gap-[40px] sm:gap-[60px] lg:gap-[80px] justify-center items-center w-full">
        
            {/* Section Header */}
            <div className="flex flex-col justify-start items-center w-full max-w-[52%] px-4">
              <span
                className="text-base font-extrabold leading-[150%] text-center uppercase mb-2"
                style={{ fontFamily: 'DM Sans', color: 'var(--light, #ECE6E1)' }}
              >
                Rólunk mondtátok
              </span>
          
              <div className="flex flex-col gap-[12px] sm:gap-[18px] lg:gap-[24px] justify-center items-center w-full">
                <h2 
                  className="text-[30px] sm:text-[45px] lg:text-[60px] font-normal leading-[110%] text-center text-white"
                  style={{ 
                    fontFamily: 'Maname',
                    textShadow: '0 0 4px rgba(224, 168, 136, 0.40)'
                  }}
                >
                  Visszajelzések
                </h2>
            
                <p 
                  className="text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[160%] text-center text-[#E6E4DC]"
                  style={{ fontFamily: 'DM Sans' }}
                >
                  Amit a résztvevők mondtak rólunk.
                </p>
              </div>
            </div>

            {/* Testimonials Grid */}
            <div className="w-full">
              {loading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="bg-[#ffffff33] rounded-[16px] p-8 animate-pulse">
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  {testimonials.map((testimonial) => (
                    <div 
                      key={testimonial.id} 
                      className="bg-[#ffffff33] rounded-[16px] p-[15px] sm:p-[23px] lg:p-[30px] h-auto"
                    >
                      <div className="flex flex-col gap-[12px] sm:gap-[18px] lg:gap-[24px] justify-start items-start w-full">
                        
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
                            readOnly
                            layout_width="auto"
                          />
                        )}
                        
                        <div className="flex flex-col gap-[12px] sm:gap-[18px] lg:gap-[24px] justify-start items-center w-full">
                          
                          {/* Comment */}
                          <p 
                            className="text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[160%] text-left text-[#3b3935] w-full"
                            style={{ fontFamily: 'DM Sans' }}
                          >
                            "{testimonial.comment}"
                          </p>

                          {/* User Info */}
                          <div className="flex flex-row gap-[12px] sm:gap-[14px] lg:gap-[16px] justify-start items-center w-full">
                            <Image
                              src={testimonial.avatar}
                              width={48}
                              height={48}
                              alt={`${testimonial.name} avatar`}
                              className="w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] lg:w-[48px] lg:h-[48px] rounded-[50%] flex-shrink-0"
                            />
                            
                            <div className="flex flex-col gap-[1px] sm:gap-[2px] lg:gap-[3px] justify-start items-start flex-1">
                              <span 
                                className="text-[16px] sm:text-[17px] lg:text-[18px] font-semibold leading-[21px] sm:leading-[23px] lg:leading-[24px] text-left text-[#3b3935]"
                                style={{ fontFamily: 'DM Sans' }}
                              >
                                {testimonial.name}
                              </span>
                              
                              <span 
                                className="text-[16px] sm:text-[17px] lg:text-[18px] font-normal leading-[21px] sm:leading-[23px] lg:leading-[24px] text-left text-[#3b3935]"
                                style={{ fontFamily: 'DM Sans' }}
                              >
                                {testimonial.role}, {testimonial.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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