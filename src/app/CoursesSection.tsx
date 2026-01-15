'use client';
import Button from'../components/ui/Button';

interface Course {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
}

interface CoursesSectionProps {
  courses: Course[];
  loading: boolean;
}

export default function CoursesSection({ courses, loading }: CoursesSectionProps) {
  const handleLearnMoreClick = () => {
    // Handle learn more action
  }

  const handleJoinWorkshopClick = (courseId: string) => {
    // Handle join workshop action
  }

  return (
    <section className="w-full" style={{ background: 'var(--primary, #7B6A3F)' }} id="courses-section">
      <div className="w-full">
        <div className="flex flex-col justify-start items-center w-full">
          <div className="w-full max-w-content mx-auto px-[40px] sm:px-[60px] lg:px-[80px] py-[56px] sm:py-[84px] lg:py-[112px]">
            <div className="flex flex-col gap-[48px] sm:gap-[64px] lg:gap-[84px] justify-start items-center w-full">
              <div className="flex flex-col justify-start items-center w-full max-w-[768px] mx-auto px-4 sm:px-8 lg:px-0">
              <span
                className="text-base font-extrabold leading-[150%] text-center uppercase mb-2"
                style={{ fontFamily: 'DM Sans', color: 'var(--light, #ECE6E1)' }}
              >
                Kurzusok
              </span>

              <h2
                className="text-[30px] sm:text-[45px] lg:text-[60px] font-normal leading-[110%] text-center text-white mb-4 lg:mb-6"
                style={{ 
                  fontFamily: 'Maname',
                  textShadow: '0 0 4px rgba(224, 168, 136, 0.40)'
                }}
              >
                Kézműves kurzusok
              </h2>

              <p
                className="text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[160%] text-center text-[#E6E4DC]"
                style={{ fontFamily: 'DM Sans' }}
              >
                Ha szeretnél új kézműves technikákat tanulni, látogass el a workshopomra!
              </p>
              </div>

            {/* Courses Grid - 2 columns, equal height rows */}
            <div className="grid grid-cols-2 gap-6 lg:gap-8 w-full auto-rows-fr">
              
              {/* Learn More Card - fixed first cell */}
              <div className="col-span-1 bg-[#27414c] rounded-[16px] p-[24px] sm:p-[36px] lg:p-[48px] flex flex-col">
                <div className="flex flex-col gap-[12px] sm:gap-[14px] lg:gap-[16px] justify-start items-start w-full flex-1">
                  
                  <span 
                    className="text-base font-extrabold leading-[150%] text-center uppercase text-white"
                    style={{ fontFamily: 'DM Sans' }}
                  >
                    Újrahasznosítás
                  </span>
                  
                  <div className="flex flex-col gap-[16px] sm:gap-[24px] lg:gap-[32px] justify-start items-start w-full flex-1">
                    
                    <h3 
                      className="text-[24px] sm:text-[36px] lg:text-[48px] font-normal leading-[110%] text-left text-white"
                      style={{ 
                        fontFamily: 'Maname',
                        textShadow: '0 0 4px rgba(73, 53, 24, 0.40)'
                      }}
                    >
                      Miről tanulhatsz?
                    </h3>
                    
                    <p 
                      className="text-[16px] sm:text-[17px] lg:text-[18px] font-normal leading-[160%] text-left text-white w-full"
                      style={{ fontFamily: 'DM Sans' }}
                    >
                      Döntsd el, hogy mit szeretnél megtanulni. Cartonnage, könyvkötés, dobozkészítés vagy valami más?
                    </p>
                  </div>
                </div>
                
                <div className="mt-auto pt-[24px]">
                  <Button
                    text="Tudj meg többet"
                    variant="secondary"
                    onClick={handleLearnMoreClick}
                    className="bg-[#ffffff33] hover:bg-[#ffffff4d]"
                  />
                </div>
              </div>

              {/* Workshop Cards in grid */}
              {loading ? (
                [...Array(3)].map((_, index) => (
                  <div key={index} className="bg-[#3b3935] rounded-[16px] p-8 animate-pulse">
                    <div className="h-12 bg-gray-300 rounded mb-4"></div>
                    <div className="h-20 bg-gray-300 rounded mb-4"></div>
                    <div className="h-10 bg-gray-300 rounded"></div>
                  </div>
                ))
              ) : (
                courses.map((course) => (
                  <div key={course.id} className="bg-[#3b3935] rounded-[16px] p-[24px] sm:p-[28px] lg:p-[32px] flex flex-col">
                    
                    {/* Workshop Header */}
                    <div className="flex flex-row justify-between items-center gap-4 mb-[20px] sm:mb-[30px] lg:mb-[40px]">
                      <h4 
                        className="text-[20px] sm:text-[30px] lg:text-[40px] font-normal leading-[110%] text-left text-white"
                        style={{ 
                          fontFamily: 'Crimson Pro',
                          textShadow: '0 0 4px rgba(73, 53, 24, 0.40)'
                        }}
                      >
                        {course.title}
                      </h4>
                      
                      <Button
                        text={course.price}
                        variant="secondary"
                        className="bg-[#14141466] text-[#ece6e1] text-sm lg:text-[18px] rounded-[4px] px-4"
                      />
                    </div>

                    {/* Workshop Content */}
                    <div className="flex flex-col gap-[6px] sm:gap-[7px] lg:gap-[8px] justify-start items-start w-full flex-1">
                      
                      {/* Description Section */}
                      <div className="pt-[19px] sm:pt-[29px] lg:pt-[38px] w-full border-t-2 border-[#77736B]">
                        <ul className="list-disc pl-5 text-[16px] sm:text-[17px] lg:text-[18px] font-normal leading-[160%] text-left text-white" style={{ fontFamily: 'DM Sans' }}>
                          {course.description.split('\n').map((line, idx) => (
                            <li key={idx}>{line}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <Button
                      text="Jelentkezem"
                      variant="secondary"
                      onClick={() => handleJoinWorkshopClick(course.id)}
                      className="mt-auto"
                    />
                  </div>
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