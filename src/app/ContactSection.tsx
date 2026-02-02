'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import EditText from '../components/ui/EditText';
import TextArea from '../components/ui/TextArea';
import CheckBox from '../components/ui/CheckBox';
import Modal from '../components/ui/Modal';
import { useTemplate } from '../components/providers/TemplateProvider';

interface FormData {
  name: string;
  email: string;
  message: string;
  acceptTerms: boolean;
}

export default function ContactSection() {
  const { template } = useTemplate()
  const isLightTemplate = template === 'light'
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    acceptTerms: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [modal, setModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'error';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'success'
  })

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const showModal = (title: string, message: string, type: 'success' | 'error' = 'success') => {
    setModal({ isOpen: true, title, message, type })
  }

  const closeModal = () => {
    setModal({ ...modal, isOpen: false })
  }

  const handleSubmit = async () => {
    if (!formData.acceptTerms) {
      showModal('Hiányzó beleegyezés', 'Kérjük, fogadja el az adatvédelmi szabályzatot.', 'error')
      return
    }

    if (!formData.name || !formData.email || !formData.message) {
      showModal('Hiányos adatok', 'Kérjük, töltse ki az összes mezőt.', 'error')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        showModal('Sikeres küldés', 'Köszönjük az üzenetet! Hamarosan válaszolunk.', 'success')
        setFormData({
          name: '',
          email: '',
          message: '',
          acceptTerms: false
        })
      } else {
        showModal('Hiba', data.error || 'Hiba történt az üzenet küldése közben.', 'error')
      }
    } catch (error) {
      console.error('Error:', error)
      showModal('Hiba', 'Hiba történt az üzenet küldése közben.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      className={`w-full ${isLightTemplate ? 'bg-[#ECE6E1]' : 'bg-[#3b3935]'}`}
      id="contact-section"
    >
      <div className="w-full">
        <div className="w-full max-w-content mx-auto px-[40px] sm:px-[60px] lg:px-[80px] py-[56px] sm:py-[84px] lg:py-[112px]">
          <div className="flex flex-col lg:flex-row justify-between items-start w-full">
          
            {/* Left Content */}
            <motion.div 
              className="flex flex-col gap-[28px] justify-start items-center align-self-center w-full lg:w-[54%]"
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
            
              {/* Section Header */}
              <div className="flex flex-col justify-start items-start w-full">
                <motion.span
                  className={`text-base font-extrabold leading-[150%] text-left uppercase ${
                    isLightTemplate ? 'text-[#3b3935]' : 'text-[#ECE6E1]'
                  }`}
                  style={{ fontFamily: 'DM Sans' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Üzenet
                </motion.span>
              
                <motion.div 
                  className="flex flex-col gap-[13px] sm:gap-[20px] lg:gap-[24px] justify-start items-start w-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h2 
                  className={`text-[30px] sm:text-[45px] lg:text-[60px] font-normal leading-[110%] text-left ${
                    isLightTemplate ? 'text-[#3b3935]' : 'text-white'
                  }`}
                  style={{ 
                    fontFamily: 'Maname',
                    textShadow: isLightTemplate ? 'none' : '0 0 4px rgba(224, 168, 136, 0.40)',
                    marginBlockStart: '0px',
                    marginBlockEnd: '12px'
                  }}
                >
                  Írj nekem
                </h2>
                
                <p 
                  className={`text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[160%] text-left ${
                    isLightTemplate ? 'text-[#575252]' : 'text-[#E6E4DC]'
                  }`}
                  style={{ fontFamily: 'DM Sans' }}
                >
                  Van egy ötleted vagy kérdésed a workshopokról?
                </p>
                </motion.div>
              </div>

              {/* Contact Form */}
              <motion.div 
                className="flex flex-col gap-[16px] justify-start items-start w-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
              
                {/* Name Field */}
                <div className="flex flex-col gap-[4px] justify-center items-start w-full">
                  <span 
                    className={`text-[16px] sm:text-[17px] lg:text-[18px] font-normal leading-[160%] text-left ${
                      isLightTemplate ? 'text-[#575252]' : 'text-[#E6E4DC]'
                    }`}
                    style={{ fontFamily: 'DM Sans' }}
                  >
                    Név
                  </span>
                  <EditText
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    fill_background_color={isLightTemplate ? 'bg-white' : 'bg-[#0807050c]'}
                    border_border={isLightTemplate ? 'border border-[#c8c1b4]' : 'border border-[#77736b]'}
                    border_border_radius="rounded-[6px]"
                    layout_width="flex-1"
                    padding="8px 12px"
                    placeholder="Írd be a neved"
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-[4px] justify-center items-start w-full">
                  <span 
                    className={`text-[16px] sm:text-[17px] lg:text-[18px] font-normal leading-[160%] text-left ${
                      isLightTemplate ? 'text-[#575252]' : 'text-[#E6E4DC]'
                    }`}
                    style={{ fontFamily: 'DM Sans' }}
                  >
                    Email
                  </span>
                  <EditText
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    fill_background_color={isLightTemplate ? 'bg-white' : 'bg-[#0807050c]'}
                    border_border={isLightTemplate ? 'border border-[#c8c1b4]' : 'border border-[#77736b]'}
                    border_border_radius="rounded-[6px]"
                    layout_width="flex-1"
                    padding="8px 12px"
                    placeholder="Írd be az email címed"
                  />
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-[4px] justify-start items-start w-full">
                  <span 
                    className={`text-[16px] sm:text-[17px] lg:text-[18px] font-normal leading-[160%] text-left ${
                      isLightTemplate ? 'text-[#575252]' : 'text-[#E6E4DC]'
                    }`}
                    style={{ fontFamily: 'DM Sans' }}
                  >
                    Üzenet
                  </span>
                  <TextArea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    fill_background_color={isLightTemplate ? 'bg-white' : 'bg-[#0807050c]'}
                    border_border={isLightTemplate ? 'border border-[#c8c1b4]' : 'border border-[#77736b]'}
                    border_border_radius="rounded-[6px]"
                    layout_width="flex-1"
                    padding="8px 12px"
                    rows={6}
                    placeholder="Írd be az üzeneted ..."
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
                  text_color={isLightTemplate ? 'text-[#575252]' : 'text-[#E6E4DC]'}
                  layout_gap="16px"
                  layout_width="auto"
                />

                {/* Submit Button */}
                <Button
                  text={isSubmitting ? "Küldés..." : "Küldés"}
                  onClick={handleSubmit}
                  className="w-full sm:w-auto px-8 py-3"
                  disabled={isSubmitting}
                />
              </motion.div>
            </motion.div>

            {/* Right Contact Info */}
            <motion.div
              className="w-full lg:w-[38%] mt-8 lg:mt-0 flex flex-col gap-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Image */}
              <img
                src="/images/img_placeholder_image_774x516.png"
                alt="Contact us - paper crafts studio"
                className="w-full h-auto rounded-[16px]"
              />

              {/* Contact Details */}
              <div className="flex flex-col gap-6">
                <h3
                  className={`text-[24px] sm:text-[28px] lg:text-[32px] font-normal leading-[110%] ${
                    isLightTemplate ? 'text-[#3b3935]' : 'text-white'
                  }`}
                  style={{ fontFamily: 'Maname' }}
                >
                  Kapcsolat
                </h3>

                {/* Contact Items */}
                <div className="flex flex-col gap-4">
                  {/* Email */}
                  <a
                    href="mailto:papirmaniabp@gmail.com"
                    className={`text-[16px] sm:text-[17px] lg:text-[18px] font-normal leading-[160%] hover:underline ${
                      isLightTemplate ? 'text-[#575252]' : 'text-[#E6E4DC]'
                    }`}
                    style={{ fontFamily: 'DM Sans' }}
                  >
                    📧 papirmaniabp@gmail.com
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+36304152930"
                    className={`text-[16px] sm:text-[17px] lg:text-[18px] font-normal leading-[160%] hover:underline ${
                      isLightTemplate ? 'text-[#575252]' : 'text-[#E6E4DC]'
                    }`}
                    style={{ fontFamily: 'DM Sans' }}
                  >
                    📞 06 30 415 2930
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/marianna.darmos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[16px] sm:text-[17px] lg:text-[18px] font-normal leading-[160%] hover:underline ${
                      isLightTemplate ? 'text-[#575252]' : 'text-[#E6E4DC]'
                    }`}
                    style={{ fontFamily: 'DM Sans' }}
                  >
                    👤 Facebook
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/papirmania/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[16px] sm:text-[17px] lg:text-[18px] font-normal leading-[160%] hover:underline ${
                      isLightTemplate ? 'text-[#575252]' : 'text-[#E6E4DC]'
                    }`}
                    style={{ fontFamily: 'DM Sans' }}
                  >
                    📷 Instagram
                  </a>

                  {/* Workshop Link */}
                  <a
                    href="https://app.minup.io/book/art-and-deco-workshop/events/ea070dad-1f09-4d2c-abf8-d302293ced12"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[16px] sm:text-[17px] lg:text-[18px] font-semibold leading-[160%] hover:underline mt-2 ${
                      isLightTemplate ? 'text-[#3b3935]' : 'text-[#ece6e1]'
                    }`}
                    style={{ fontFamily: 'DM Sans' }}
                  >
                    🎨 Workshop foglalás →
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </section>
  )
}
