'use client';
import { useState } from 'react';
import Image from 'next/image';
import Button from '../components/ui/Button';
import EditText from '../components/ui/EditText';
import TextArea from '../components/ui/TextArea';
import CheckBox from '../components/ui/CheckBox';

interface FormData {
  name: string;
  email: string;
  message: string;
  acceptTerms: boolean;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    acceptTerms: false
  })

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    if (!formData.acceptTerms) {
      alert('Kérjük, fogadja el az adatvédelmi szabályzatot.')
      return
    }
    
    // Handle form submission
    alert('Üzenet elküldve!')
  }

  return (
    <section className="w-full bg-[#3b3935]" id="contact-section">
      <div className="w-full">
        <div className="w-full max-w-content mx-auto px-[40px] sm:px-[60px] lg:px-[80px] py-[56px] sm:py-[84px] lg:py-[112px]">
          <div className="flex flex-col lg:flex-row justify-between items-start w-full">
          
            {/* Left Content */}
            <div className="flex flex-col gap-[15px] sm:gap-[23px] lg:gap-[30px] justify-start items-center align-self-center w-full lg:w-[54%]">
            
              {/* Section Header */}
              <div className="flex flex-col justify-start items-start w-full">
                <span
                  className="text-base font-extrabold leading-[150%] text-left uppercase mb-2"
                  style={{ fontFamily: 'DM Sans', color: 'var(--light, #ECE6E1)' }}
                >
                  Üzenet
                </span>
              
                <div className="flex flex-col gap-[13px] sm:gap-[20px] lg:gap-[26px] justify-start items-start w-full">
                  <h2 
                    className="text-[30px] sm:text-[45px] lg:text-[60px] font-normal leading-[110%] text-left text-white"
                    style={{ 
                      fontFamily: 'Maname',
                      textShadow: '0 0 4px rgba(224, 168, 136, 0.40)'
                    }}
                  >
                    Írj nekem
                  </h2>
                
                  <p 
                    className="text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[160%] text-left text-[#E6E4DC]"
                    style={{ fontFamily: 'DM Sans' }}
                  >
                    Van egy ötleted vagy kérdésed a workshopokról?
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="flex flex-col gap-[11px] sm:gap-[16px] lg:gap-[22px] justify-start items-start w-full">
              
                {/* Name Field */}
                <div className="flex flex-col gap-[4px] sm:gap-[6px] lg:gap-[8px] justify-center items-start w-full">
                  <span 
                    className="text-[16px] sm:text-[17px] lg:text-[18px] font-normal leading-[160%] text-left text-[#E6E4DC]"
                    style={{ fontFamily: 'DM Sans' }}
                  >
                    Név
                  </span>
                  <EditText
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    fill_background_color="bg-[#0807050c]"
                    border_border="border border-[#77736b]"
                    border_border_radius="rounded-[6px]"
                    layout_width="flex-1"
                    padding="12px"
                    placeholder="Írja be a nevét"
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-[4px] sm:gap-[6px] lg:gap-[8px] justify-center items-start w-full">
                  <span 
                    className="text-[16px] sm:text-[17px] lg:text-[18px] font-normal leading-[160%] text-left text-[#E6E4DC]"
                    style={{ fontFamily: 'DM Sans' }}
                  >
                    Email
                  </span>
                  <EditText
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    fill_background_color="bg-[#0807050c]"
                    border_border="border border-[#77736b]"
                    border_border_radius="rounded-[6px]"
                    layout_width="flex-1"
                    padding="12px"
                    placeholder="email@example.com"
                  />
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-[5px] sm:gap-[8px] lg:gap-[10px] justify-start items-start w-full">
                  <span 
                    className="text-[16px] sm:text-[17px] lg:text-[18px] font-normal leading-[160%] text-left text-[#E6E4DC]"
                    style={{ fontFamily: 'DM Sans' }}
                  >
                    Üzenet
                  </span>
                  <TextArea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    fill_background_color="bg-[#0807050c]"
                    border_border="border border-[#77736b]"
                    border_border_radius="rounded-[6px]"
                    layout_width="flex-1"
                    padding="12px"
                    rows={6}
                    placeholder="Írja be üzenetét itt..."
                  />
                </div>

                {/* Terms Checkbox */}
                <CheckBox
                  checked={formData.acceptTerms}
                  onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                  text="Elfogadom az adatvédelmi szabályzatot"
                  text_font_size="text-base"
                  text_font_family="DM Sans"
                  text_font_weight="font-normal"
                  text_line_height="leading-md"
                  text_color="text-[#E6E4DC]"
                  layout_gap="16px"
                  layout_width="auto"
                  padding="2px 0 14px 0"
                />

                {/* Submit Button */}
                <Button
                  text="Küldés"
                  onClick={handleSubmit}
                  className="w-full sm:w-auto px-8 py-3"
                />
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-[38%] mt-8 lg:mt-0">
              <Image
                src="/images/img_placeholder_image_774x516.png"
                width={516}
                height={774}
                alt="Contact us - paper crafts studio"
                className="w-full h-auto rounded-[16px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}