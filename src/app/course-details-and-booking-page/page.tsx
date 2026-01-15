'use client';
import { useState } from 'react';

import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Button from '@/components/ui/Button';

interface Testimonial {
  id: string;
  name: string;
  course: string;
  rating: number;
  comment: string;
  avatar: string;
}

export default function CourseDetailsAndBookingPage() {
  const [activeTab, setActiveTab] = useState('description');

  // Mock course data
  const courseData = {
    id: 'cartonnage-basics',
    title: 'Cartonnage Alapok',
    subtitle: 'Kezdő szintű papírművészet workshop',
    price: '15,000 Ft',
    duration: '4 óra',
    difficulty: 'Kezdő',
    maxParticipants: 8,
    image: '/images/img_placeholder_image_774x516.png',
    description: 'Fedezd fel a Cartonnage művészetét ebben az átfogó kezdő kurzusban. Megtanulod az alapvető technikákat, amelyekkel gyönyörű papír alapú dísztárgyakat készíthetsz. A workshop során elkészítesz egy saját dobozt, amelyet hazavihetsz.',
    materialsIncluded: [
      'Professzionális minőségű kartonpapír',
      'Speciális ragasztók és szerszámok',
      'Dekoratív papírok és szövetek',
      'Minden szükséges alapanyag a projekthez',
      'Munkafüzet és útmutatók'
    ],
    techniques: [
      'Pontos mérés és vágás technikák',
      'Ragasztási módszerek és tippek',
      'Sarkok és élek professzionális kezelése',
      'Dekoratív borítás alkalmazása',
      'Befejező technikák és védelem'
    ],
    instructor: {
      name: 'Kovács Mária',
      bio: 'Több mint 15 éves tapasztalattal rendelkezem a papírművészetben. Franciaországban tanultam a hagyományos Cartonnage technikákat, és szenvedélyem az újrahasznosítás és a fenntartható kézművesség.',
      image: '/images/img_avatar_image.png'
    },
    bookingUrl: 'https://example.com/booking/cartonnage-basics'
  };

  // Mock testimonials
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Nagy Anna',
      course: 'Cartonnage Alapok',
      rating: 5,
      comment: 'Fantasztikus élmény volt! Mária türelmes és inspiráló oktató. A kurzus végére gyönyörű dobozt készítettem, amit büszkén mutogatok.',
      avatar: '/images/img_avatar_image_1.png'
    },
    {
      id: '2',
      name: 'Szabó Péter',
      course: 'Cartonnage Alapok',
      rating: 5,
      comment: 'Kezdőként féltem, hogy nem fogom tudni követni, de minden lépést részletesen elmagyaráztak. Ajánlom mindenkinek!',
      avatar: '/images/img_avatar_image_2.png'
    },
    {
      id: '3',
      name: 'Kiss Eszter',
      course: 'Cartonnage Alapok',
      rating: 5,
      comment: 'A műhely hangulata csodálatos, az anyagok kiváló minőségűek. Már várom a következő kurzust!',
      avatar: '/images/img_avatar_image_3.png'
    }
  ];

  const tabs = [
    { id: 'description', label: 'Leírás' },
    { id: 'materials', label: 'Anyagok' },
    { id: 'techniques', label: 'Technikák' },
    { id: 'instructor', label: 'Oktató' }
  ];

  return (
    <div className="w-full bg-[#3b3935]">
      <Header />

      {/* Breadcrumb Navigation */}
      <div className="w-full bg-[#7b6a3f] py-4">
        <div className="w-full max-w-[1440px] mx-auto px-[32px] sm:px-[48px] lg:px-[64px]">
          <div className="flex items-center gap-2 text-sm" style={{ fontFamily: 'DM Sans' }}>
            <a href="/" className="text-[#ece6e1] hover:text-white transition-colors">Főoldal</a>
            <span className="text-[#ece6e1]">/</span>
            <a href="/courses" className="text-[#ece6e1] hover:text-white transition-colors">Kurzusok</a>
            <span className="text-[#ece6e1]">/</span>
            <span className="text-white font-medium">{courseData.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="w-full bg-[#7b6a3f]">
        <div className="w-full py-[40px] sm:py-[60px] lg:py-[80px]">
          <div className="w-full max-w-[1440px] mx-auto px-[32px] sm:px-[48px] lg:px-[64px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Course Image */}
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-[16px] overflow-hidden">
                <Image
                  src={courseData.image}
                  alt={courseData.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Course Info */}
              <div className="flex flex-col gap-6">
                <div>
                  <span
                    className="text-[14px] sm:text-[16px] font-extrabold uppercase mb-2 block"
                    style={{ fontFamily: 'DM Sans', color: 'var(--light, #ECE6E1)' }}
                  >
                    {courseData.subtitle}
                  </span>
                  <h1 
                    className="text-[36px] sm:text-[48px] lg:text-[60px] font-normal leading-tight text-white shadow-[0px_0px_4px_#e0a78766] mb-4"
                    style={{ fontFamily: 'Maname' }}
                  >
                    {courseData.title}
                  </h1>
                </div>

                {/* Course Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#ffffff19] rounded-[8px] p-4">
                    <span className="text-[#ece6e1] text-sm block mb-1" style={{ fontFamily: 'DM Sans' }}>Időtartam</span>
                    <span className="text-white text-lg font-semibold" style={{ fontFamily: 'Nunito' }}>{courseData.duration}</span>
                  </div>
                  <div className="bg-[#ffffff19] rounded-[8px] p-4">
                    <span className="text-[#ece6e1] text-sm block mb-1" style={{ fontFamily: 'DM Sans' }}>Szint</span>
                    <span className="text-white text-lg font-semibold" style={{ fontFamily: 'Nunito' }}>{courseData.difficulty}</span>
                  </div>
                  <div className="bg-[#ffffff19] rounded-[8px] p-4">
                    <span className="text-[#ece6e1] text-sm block mb-1" style={{ fontFamily: 'DM Sans' }}>Ár</span>
                    <span className="text-white text-lg font-semibold" style={{ fontFamily: 'Nunito' }}>{courseData.price}</span>
                  </div>
                  <div className="bg-[#ffffff19] rounded-[8px] p-4">
                    <span className="text-[#ece6e1] text-sm block mb-1" style={{ fontFamily: 'DM Sans' }}>Max. létszám</span>
                    <span className="text-white text-lg font-semibold" style={{ fontFamily: 'Nunito' }}>{courseData.maxParticipants} fő</span>
                  </div>
                </div>

                {/* External Booking Button */}
                <a 
                  href={courseData.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    text="Foglalás most"
                    className="w-full text-lg px-8 py-4"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabbed Content Section */}
      <section className="w-full bg-[#3b3935]">
        <div className="w-full py-[40px] sm:py-[60px] lg:py-[80px]">
          <div className="w-full max-w-[1440px] mx-auto px-[32px] sm:px-[48px] lg:px-[64px]">
            
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-8 border-b border-[#ffffff33] pb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-t-[8px] text-sm sm:text-base font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-[#7b6a3f] text-white'
                      : 'bg-transparent text-[#ece6e1] hover:bg-[#ffffff19]'
                  }`}
                  style={{ fontFamily: 'Nunito' }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-[#27414c] rounded-[16px] p-[24px] sm:p-[36px] lg:p-[48px]">
              
              {/* Description Tab */}
              {activeTab === 'description' && (
                <div className="animate-fadeIn">
                  <h2 
                    className="text-[28px] sm:text-[36px] lg:text-[44px] font-normal text-white mb-6"
                    style={{ fontFamily: 'Crimson Pro' }}
                  >
                    Kurzus leírása
                  </h2>
                  <p 
                    className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-relaxed text-[#ece6e1]"
                    style={{ fontFamily: 'DM Sans' }}
                  >
                    {courseData.description}
                  </p>
                </div>
              )}

              {/* Materials Tab */}
              {activeTab === 'materials' && (
                <div className="animate-fadeIn">
                  <h2 
                    className="text-[28px] sm:text-[36px] lg:text-[44px] font-normal text-white mb-6"
                    style={{ fontFamily: 'Crimson Pro' }}
                  >
                    Tartalmazott anyagok
                  </h2>
                  <ul className="space-y-4">
                    {courseData.materialsIncluded.map((material, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-paperGold flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span 
                          className="text-[16px] sm:text-[18px] font-normal text-[#ece6e1]"
                          style={{ fontFamily: 'DM Sans' }}
                        >
                          {material}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Techniques Tab */}
              {activeTab === 'techniques' && (
                <div className="animate-fadeIn">
                  <h2 
                    className="text-[28px] sm:text-[36px] lg:text-[44px] font-normal text-white mb-6"
                    style={{ fontFamily: 'Crimson Pro' }}
                  >
                    Tanult technikák
                  </h2>
                  <ul className="space-y-4">
                    {courseData.techniques.map((technique, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-paperGold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <span 
                          className="text-[16px] sm:text-[18px] font-normal text-[#ece6e1]"
                          style={{ fontFamily: 'DM Sans' }}
                        >
                          {technique}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Instructor Tab */}
              {activeTab === 'instructor' && (
                <div className="animate-fadeIn">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={courseData.instructor.image}
                        alt={courseData.instructor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 
                        className="text-[28px] sm:text-[36px] font-normal text-white mb-4"
                        style={{ fontFamily: 'Crimson Pro' }}
                      >
                        {courseData.instructor.name}
                      </h2>
                      <p 
                        className="text-[16px] sm:text-[18px] font-normal leading-relaxed text-[#ece6e1]"
                        style={{ fontFamily: 'DM Sans' }}
                      >
                        {courseData.instructor.bio}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA Section */}
      <section className="w-full bg-[#7b6a3f]">
        <div className="w-full py-[40px] sm:py-[60px] lg:py-[80px]">
          <div className="w-full max-w-[1440px] mx-auto px-[32px] sm:px-[48px] lg:px-[64px]">
            
            {/* Centered Booking Card */}
            <div className="max-w-[800px] mx-auto bg-[#27414c] rounded-[16px] p-[32px] sm:p-[48px] text-center">
              <span
                className="text-[14px] sm:text-[16px] font-extrabold uppercase mb-4 block"
                style={{ fontFamily: 'DM Sans', color: 'var(--light, #ECE6E1)' }}
              >
                Készen állsz?
              </span>
              <h2 
                className="text-[36px] sm:text-[48px] lg:text-[56px] font-normal text-white shadow-[0px_0px_4px_#e0a78766] mb-6"
                style={{ fontFamily: 'Maname' }}
              >
                Foglalj helyet most!
              </h2>
              <p 
                className="text-[16px] sm:text-[18px] font-normal leading-relaxed text-[#ece6e1] mb-8 max-w-[600px] mx-auto"
                style={{ fontFamily: 'DM Sans' }}
              >
                Kattints az alábbi gombra, hogy megtekintsd az elérhető időpontokat és lefoglald a helyed ezen a csodálatos workshopon.
              </p>
              
              {/* External Booking Button */}
              <a 
                href={courseData.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  text="Ugrás a foglalási oldalra"
                  className="text-lg px-10 py-[18px]"
                />
              </a>
              
              <p 
                className="text-[14px] text-[#ece6e1] mt-6"
                style={{ fontFamily: 'DM Sans' }}
              >
                A foglalás külső alkalmazásban történik
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full bg-[#3b3935]">
        <div className="w-full py-[40px] sm:py-[60px] lg:py-[80px]">
          <div className="w-full max-w-[1440px] mx-auto px-[32px] sm:px-[48px] lg:px-[64px]">
            
            {/* Section Header */}
            <div className="text-center mb-12">
              <span
                className="text-[14px] sm:text-[16px] font-extrabold uppercase mb-2 block"
                style={{ fontFamily: 'DM Sans', color: 'var(--light, #ECE6E1)' }}
              >
                Vélemények
              </span>
              <h2 
                className="text-[36px] sm:text-[48px] lg:text-[60px] font-normal text-white shadow-[0px_0px_4px_#e0a78766]"
                style={{ fontFamily: 'Maname' }}
              >
                Mit mondanak a résztvevők?
              </h2>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-[#27414c] rounded-[16px] p-6 hover:scale-105 transition-transform duration-300">
                  
                  {/* Avatar and Name */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-[48px] h-[48px] rounded-full overflow-hidden">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold" style={{ fontFamily: 'Nunito' }}>
                        {testimonial.name}
                      </h4>
                      <p className="text-[#ece6e1] text-sm" style={{ fontFamily: 'DM Sans' }}>
                        {testimonial.course}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <svg key={index} className="w-5 h-5 text-paperGold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-[#ece6e1] text-sm leading-relaxed" style={{ fontFamily: 'DM Sans' }}>
                    {testimonial.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}