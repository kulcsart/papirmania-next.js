'use client';
import Button from'../components/ui/Button';
import { marked } from 'marked';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useTemplate } from '../components/providers/TemplateProvider';

interface Course {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  registrationUrl?: string;
}

interface LearnMoreContent {
  subtitle: string;
  title: string;
  content: string;
}

interface CoursesSectionProps {
  courses: Course[];
  loading: boolean;
  learnMoreContent?: LearnMoreContent;
}

export default function CoursesSection({ courses, loading, learnMoreContent }: CoursesSectionProps) {
  const { template } = useTemplate()
  const isLightTemplate = template === 'light'

  const handleLearnMoreClick = () => {
    const el = document.getElementById('techniques-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  const handleJoinWorkshopClick = (registrationUrl?: string) => {
    if (registrationUrl) {
      window.open(registrationUrl, '_blank');
    } else {
      // Fallback - scroll to techniques or show message
      handleLearnMoreClick();
    }
  }

  return (
    <section
      className={`w-full ${isLightTemplate ? 'bg-[#f5f1e8]' : 'bg-[#7B6A3F]'}`}
      id="courses-section"
    >
      <div className="w-full">
        <div className="flex flex-col justify-start items-center w-full">
          <div className="w-full max-w-content mx-auto px-[40px] sm:px-[60px] lg:px-[80px] py-[80px] sm:py-[80px] lg:py-[80px]">
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
                Kurzusok
              </span>

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
                Kézműves kurzusok
              </h2>

              <p
                className={`text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[160%] text-center ${
                  isLightTemplate ? 'text-[#575252]' : 'text-[#E6E4DC]'
                }`}
                style={{ fontFamily: 'DM Sans' }}
              >
                Ha szeretnél új kézműves technikákat tanulni, látogass el a workshopomra!
              </p>
              </motion.div>

            {/* Courses Grid - 2 columns, equal height rows */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] w-full auto-rows-fr">
              
              {/* Learn More Card - fixed first cell */}
              <div
                className={`col-span-1 rounded-[16px] p-[32px] sm:p-[40px] lg:p-[48px] flex flex-col ${
                  isLightTemplate ? 'bg-white border border-[#c8c1b4]' : 'bg-[#27414c]'
                }`}
              >
                <div className="flex flex-col gap-[12px] sm:gap-[14px] lg:gap-[16px] justify-start items-start w-full flex-1">

                  <span
                    className={`text-base font-extrabold leading-[150%] text-center uppercase ${
                      isLightTemplate ? 'text-[#3b3935]' : 'text-white'
                    }`}
                    style={{ fontFamily: 'DM Sans' }}
                  >
                    {learnMoreContent?.subtitle || 'Újrahasznosítás'}
                  </span>

                  <div className="flex flex-col gap-[16px] sm:gap-[24px] lg:gap-[32px] justify-start items-start w-full flex-1">

                    <h3
                      className={`text-[24px] sm:text-[36px] lg:text-[48px] font-normal leading-[110%] text-left ${
                        isLightTemplate ? 'text-[#3b3935]' : 'text-white'
                      }`}
                      style={{
                        fontFamily: 'Maname',
                        textShadow: isLightTemplate ? 'none' : '0 0 4px rgba(73, 53, 24, 0.40)'
                      }}
                    >
                      {learnMoreContent?.title || 'Miről tanulhatsz?'}
                    </h3>

                    <p
                      className={`text-[16px] sm:text-[17px] lg:text-[18px] font-normal leading-[160%] text-left w-full ${
                        isLightTemplate ? 'text-[#575252]' : 'text-white'
                      }`}
                      style={{ fontFamily: 'DM Sans' }}
                    >
                      {learnMoreContent?.content || 'Döntsd el, hogy mit szeretnél megtanulni. Cartonnage, könyvkötés, dobozkészítés vagy valami más?'}
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-[24px]">
                  <Button
                    text="Tudj meg többet"
                    variant="secondary"
                    onClick={handleLearnMoreClick}
                    className={`${
                      isLightTemplate
                        ? 'border border-[#bfb6a9] text-[#3b3935] bg-[#ffffffcc] hover:bg-white'
                        : 'bg-[#ffffff33] hover:bg-[#ffffff4d] text-white'
                    }`}
                  />
                </div>
              </div>

              {/* Workshop Cards in grid */}
              {loading ? (
                [...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className={`rounded-[16px] p-8 animate-pulse ${
                      isLightTemplate ? 'bg-white border border-[#c8c1b4]' : 'bg-[#3b3935]'
                    }`}
                  >
                    <div className="h-12 bg-gray-300 rounded mb-4"></div>
                    <div className="h-20 bg-gray-300 rounded mb-4"></div>
                    <div className="h-10 bg-gray-300 rounded"></div>
                  </div>
                ))
              ) : (
                courses.map((course, index) => (
                  <motion.div 
                    key={course.id} 
                    className={`rounded-[16px] p-[32px] flex flex-col ${
                      isLightTemplate ? 'bg-white border border-[#c8c1b4]' : 'bg-[#3b3935]'
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Workshop Header */}

                    <div className="flex flex-row justify-between items-center gap-4 mb-[20px] sm:mb-[30px] lg:mb-[40px]">
                      <h4 
                        className={`text-[20px] sm:text-[30px] lg:text-[40px] font-normal leading-[110%] text-left ${
                          isLightTemplate ? 'text-[#3b3935]' : 'text-white'
                        }`}
                        style={{ 
                          fontFamily: 'Crimson Pro',
                          textShadow: isLightTemplate ? 'none' : '0 0 4px rgba(73, 53, 24, 0.40)'
                        }}
                      >
                        {course.title}
                      </h4>
                      <Button
                        text={course.price}
                        variant="secondary"
                        className={`text-sm lg:text-[18px] rounded-[4px] px-4 w-fit min-w-0 ${
                          isLightTemplate
                            ? 'bg-[#ECE6E1] text-[#3b3935] border border-[#c8c1b4]'
                            : 'bg-[#14141466] text-[#ece6e1]'
                        }`}
                        style={{ width: 'fit-content', minWidth: 'fit-content', paddingLeft: 16, paddingRight: 16 }}
                      />
                    </div>

                    {/* Workshop Content */}
                    <div className="flex flex-col gap-[6px] sm:gap-[7px] lg:gap-[8px] justify-start items-start w-full flex-1">
                      {/* Description Section */}
                      <div
                        className={`pt-[19px] sm:pt-[29px] lg:pt-[38px] w-full border-t-2 ${
                          isLightTemplate ? 'border-[#c8c1b4]' : 'border-[#77736B]'
                        }`}
                      >
                        <div
                          className={`text-[16px] sm:text-[17px] lg:text-[18px] font-normal leading-[160%] text-left ${
                            isLightTemplate ? 'text-[#575252]' : 'text-white'
                          }`}
                          style={{ fontFamily: 'DM Sans' }}
                          dangerouslySetInnerHTML={{ __html: marked.parse(course.description) }}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-[24px]">
                      <Button
                        text="Jelentkezem"
                        variant="secondary"
                        onClick={() => handleJoinWorkshopClick(course.registrationUrl)}
                        className={`${
                          isLightTemplate
                            ? 'border border-[#bfb6a9] text-[#3b3935] bg-[#ffffffcc] hover:bg-white'
                            : 'bg-[#ffffff33] hover:bg-[#ffffff4d] text-white'
                        }`}
                      />
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
