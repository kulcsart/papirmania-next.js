'use client';

const Footer = () => {
  const socialLinks = [
    {
      id: 'facebook',
      src: '/images/img_facebook.svg',
      alt: 'Facebook',
      href: 'https://www.facebook.com/marianna.darmos'
    },
    {
      id: 'instagram',
      src: '/images/img_instagram.svg',
      alt: 'Instagram',
      href: 'https://www.instagram.com/papirmania/'
    }
  ]

  const footerLinks = [
    { id: 'privacy', label: 'Adatvédelem', href: '/privacy' },
    { id: 'terms', label: 'Felhasználási feltételek', href: '/terms' },
    { id: 'cookies', label: 'Sütik beállítása', href: '/cookies' }
  ]

  return (
    <footer className="w-full bg-background-accent">
      <div className="w-full max-w-content mx-auto px-[40px] sm:px-[60px] lg:px-[80px]">
        <div className="py-[44px]">
          
          {/* Main Footer Content */}
          <div className="flex flex-col gap-[24px]">
            
            {/* Top Section - Logo, Contact, Social */}
            <div className="flex flex-col lg:flex-row gap-[24px] lg:gap-[40px] justify-between items-center">

              {/* Logo */}
              <div className="flex justify-center lg:justify-start w-full lg:w-auto">
                <img
                  src="/images/img_footer_logo.png"
                  alt="Papírmánia Footer Logo"
                  className="w-[64px] h-[64px] sm:w-[74px] sm:h-[74px] lg:w-[84px] lg:h-[84px]"
                />
              </div>

              {/* Contact Information */}
              <div className="flex-1 w-full lg:w-auto">
                <div className="flex flex-col gap-[12px] items-center lg:items-start">

                  {/* Email */}
                  <div className="flex flex-row gap-[16px] justify-center lg:justify-start items-center">
                    <img
                      src="/images/img_lucide_send.svg"
                      alt="Email"
                      className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px]"
                    />
                    <a
                      href="mailto:papirmaniabp@gmail.com"
                      className="text-text-muted font-normal text-xs sm:text-sm lg:text-xs leading-xs underline hover:text-white transition-colors duration-200 text-center lg:text-left"
                      style={{ fontFamily: 'DM Sans' }}
                    >
                      papirmaniabp@gmail.com
                    </a>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-row gap-[16px] justify-center lg:justify-start items-center">
                    <img
                      src="/images/img_lucide_phone.svg"
                      alt="Phone"
                      className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px]"
                    />
                    <a
                      href="tel:+36304152930"
                      className="text-text-muted font-normal text-xs sm:text-sm lg:text-xs leading-xs hover:text-white transition-colors duration-200 text-center lg:text-left"
                      style={{ fontFamily: 'DM Sans' }}
                    >
                      06 30 415 2930
                    </a>
                  </div>

                  {/* Workshop Link */}
                  <div className="flex flex-row gap-[16px] justify-center lg:justify-start items-center">
                    <span className="w-[20px] sm:w-[22px] lg:w-[24px]">🎨</span>
                    <a
                      href="https://app.minup.io/book/art-and-deco-workshop/events/ea070dad-1f09-4d2c-abf8-d302293ced12"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted font-semibold text-xs sm:text-sm lg:text-xs leading-xs underline hover:text-white transition-colors duration-200 text-center lg:text-left"
                      style={{ fontFamily: 'DM Sans' }}
                    >
                      Workshop foglalás
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex flex-row gap-[12px] justify-center items-center">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.id}
                    href={social?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform duration-200 hover:scale-110"
                    aria-label={social?.alt}
                  >
                    <img
                      src={social?.src}
                      alt={social?.alt}
                      className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px]"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom Section - Separator and Links */}
            <div className="flex flex-col gap-[26px] items-center">
              
              {/* Separator Line */}
              <div className="w-full h-[1px] bg-secondary-light"></div>

              {/* Copyright and Links */}
              <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
                
                {/* Copyright */}
                <p className="text-secondary-light font-normal text-xs sm:text-sm lg:text-xs leading-xs text-center sm:text-left">
                  © 2026 Papírmánia. Minden jog fenntartva.
                </p>

                {/* Footer Links - Hidden temporarily */}
                <div className="hidden flex-col sm:flex-row gap-2 sm:gap-[24px] justify-center items-center">
                  {footerLinks?.map((link, index) => (
                    <a
                      key={link?.id}
                      href={link?.href}
                      className="text-secondary-light font-normal text-xs sm:text-sm lg:text-xs leading-xs underline hover:text-text-muted transition-colors duration-200 text-center"
                      style={{ fontFamily: 'DM Sans' }}
                    >
                      {link?.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer