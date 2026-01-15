'use client';
import Image from'next/image';

export default function AboutSection() {
  return (
    <section className="w-full bg-[#27414C]" id="about-section">
      <div className="w-full bg-[#27414C]">
        <div className="flex flex-col justify-start items-center w-full bg-[#27414C]">
          <div className="w-full max-w-content mx-auto px-[40px] sm:px-[60px] lg:px-[80px] py-[56px] sm:py-[84px] lg:py-[112px]">
            <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-8 lg:gap-12">
              
              {/* Left Content */}
              <div className="flex flex-col gap-[36px] sm:gap-[54px] lg:gap-[72px] justify-start items-start w-full lg:w-[48%]">
                <div className="flex flex-col justify-start items-start w-full">
                  <span
                    className="text-base font-extrabold leading-[150%] text-center uppercase mb-2"
                    style={{ fontFamily: 'DM Sans', color: 'var(--light, #ECE6E1)' }}
                  >
                    Rólam
                  </span>

                  <h2
                    className="text-[30px] sm:text-[45px] lg:text-[60px] font-normal leading-[110%] text-left text-white"
                    style={{ 
                      fontFamily: 'Maname',
                      textShadow: '0 0 4px rgba(224, 168, 136, 0.40)'
                    }}
                  >
                    Én és a papír
                  </h2>
                </div>

                {/* About Text */}
                <p
                  className="text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[160%] text-left text-[#E6E4DC] w-full"
                  style={{ fontFamily: 'DM Sans' }}
                >
                  Történetem a papír és a textil iránti gyermekkori rajongással indult. A barkácsolás, a kézműveskedés már akkor is az életem része volt, és ez a lelkesedés a felnőttkoromra sem tűnt el – sőt, egyre erősebb lett!
                  <br /><br />
                  Az évek során számos technikával megismerkedtem a varrástól, szövésen át egészen a kárpitozasig, a decoupage-ig és a falfestésig. Ez a kísérletezés máig tart, szívesen tanulok újabb és újabb technikákat. Bár sok területet szeretek, az igazi hívást a könyvkötés és a dobozkészítés jelentette.
                  <br /><br />
                  Lakberendezőként a hivatásomban is a papír és a textil a főszereplők. Szakterületem a tapéták és a lakástextiliák. A sok gyönyörű anyag, és textúra amivel nap mint nap dolgozom, folyamatosan inspirál a kézműveskedésre. Ez a két része az életemnek mára elválaszthatatlanul összefonódott, ebből született a Papírmánia.
                </p>
              </div>

              {/* Right Image */}
              <div className="relative w-full lg:w-[48%] h-[312px] sm:h-[468px] lg:h-[624px]">
                
                {/* Main Image */}
                <Image
                  src="/images/img_placeholder_image.png"
                  width={516}
                  height={532}
                  alt="About the artist - paper crafts creator"
                  className="absolute top-0 right-0 w-[84%] max-w-[516px] h-auto rounded-[16px] z-10"
                />
                
                {/* Secondary Image */}
                <Image
                  src="/images/img_placeholder_image_374x364.png"
                  width={364}
                  height={374}
                  alt="Paper art collection"
                  className="absolute bottom-0 left-0 w-[60%] max-w-[364px] h-auto rounded-[16px] z-20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}