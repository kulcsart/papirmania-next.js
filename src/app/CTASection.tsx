'use client';
import Image from'next/image';
 import Button from'../components/ui/Button';

export default function CTASection() {
  const handleViewScheduleClick = () => {
    // Handle view schedule action
  }

  return (
    <section className="w-full bg-[#27414c]" id="cta-section">
      <div className="w-full">
        <div className="w-full max-w-content mx-auto px-[40px] sm:px-[60px] lg:px-[80px] py-[56px] sm:py-[84px] lg:py-[112px]">
          <div className="flex flex-col lg:flex-row justify-start items-center w-full max-h-[520px]">
          
            {/* Left Content */}
            <div className="flex flex-col gap-[18px] sm:gap-[27px] lg:gap-[36px] justify-center items-start w-full lg:flex-1 mr-0 lg:mr-6">
            
              <div className="flex flex-col gap-[12px] sm:gap-[18px] lg:gap-[24px] justify-start items-start w-full mr-0 lg:mr-6">
                <h2 
                  className="text-[30px] sm:text-[45px] lg:text-[60px] font-normal leading-[110%] text-left text-white"
                  style={{ 
                    fontFamily: 'Maname',
                    textShadow: '0 0 4px rgba(224, 168, 136, 0.40)'
                  }}
                >
                  Alkossunk együtt
                </h2>
              
                <p 
                  className="text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[160%] text-left text-[#E6E4DC] w-full"
                  style={{ fontFamily: 'DM Sans' }}
                >
                  Ne maradj le a következő alkalomról. Tanulj kézműves technikákat, óvd a környezetet kreatívan
                </p>
              </div>
            
              <Button
                text="Megnézem az időpontokat"
                variant="secondary"
                onClick={handleViewScheduleClick}
                className="w-full sm:w-auto bg-[#ffffff33] hover:bg-[#ffffff4d] px-8 py-3"
              />
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-[38%] mt-8 lg:mt-0 flex justify-center">
              <Image
                src="/images/img_placeholder_image_374x364.png"
                width={516}
                height={286}
                alt="Creative workshop session"
                className="w-full max-w-[516px] h-auto rounded-[16px] self-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}