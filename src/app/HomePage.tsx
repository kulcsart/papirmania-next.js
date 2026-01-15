'use client';
import { useState, useEffect } from 'react';
import Header from'../components/common/Header';
import Footer from'../components/common/Footer';
import HeroSection from'./HeroSection';
import CoursesSection from'./CoursesSection';
import TechniquesSection from'./TechniquesSection';
import AboutSection from'./AboutSection';
import GallerySection from'./GallerySection';
import TestimonialsSection from'./TestimonialsSection';
import CTASection from'./CTASection';
import ContactSection from'./ContactSection';
import strapiService from '../services/strapi.service';
import type {
  StrapiCoursesResponse,
  StrapiTestimonialsResponse,
} from '../types/strapi.types';

interface Course {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
}

interface TestimonialData {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
}

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadPageData = async () => {
      try {
        // Fetch courses from Strapi
        const coursesResponse: StrapiCoursesResponse = await strapiService.getCourses();
        const coursesData: Course[] = coursesResponse.data.map((course) => ({
          id: course.id.toString(),
          title: course.title || course.attributes?.title,
          price: course.price || course.attributes?.price,
          description: course.description || course.attributes?.description,
          features: course.features || course.attributes?.features || [],
        }));

        // Fetch testimonials from Strapi
        const testimonialsResponse: StrapiTestimonialsResponse = await strapiService.getTestimonials();
        const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
        const testimonialsData: TestimonialData[] = testimonialsResponse.data.map((testimonial) => ({
          id: testimonial.id.toString(),
          name: testimonial.name || testimonial.attributes?.name,
          role: testimonial.role || testimonial.attributes?.role,
          location: testimonial.location || testimonial.attributes?.location,
          rating: testimonial.rating || testimonial.attributes?.rating,
          comment: testimonial.comment || testimonial.attributes?.comment,
          avatar: testimonial.avatar?.data
            ? `${STRAPI_API_URL}${testimonial.avatar.data.attributes.url}`
            : testimonial.attributes?.avatar?.data
            ? `${STRAPI_API_URL}${testimonial.attributes.avatar.data.attributes.url}`
            : '/images/img_avatar_image.png',
        }));

        setCourses(coursesData);
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error('Error loading page data from Strapi:', error);
        // Fallback to mock data on error
        const coursesData: Course[] = [
          {
            id: 'workshop-1',
            title: 'Minta Workshop',
            price: '15.000 Ft',
            description: 'Tartalmazza az anyagköltséget \nVidd haza, amit készítettél',
            features: ['Anyagköltség', 'Kész alkotás']
          },
          {
            id: 'workshop-2',
            title: 'Minta Workshop',
            price: '15.000 Ft',
            description: 'Tartalmazza az anyagköltséget \nVidd haza, amit készítettél',
            features: ['Anyagköltség', 'Kész alkotás']
          },
          {
            id: 'workshop-3',
            title: 'Minta Workshop',
            price: '15.000 Ft',
            description: 'Tartalmazza az anyagköltséget \nVidd haza, amit készítettél',
            features: ['Anyagköltség', 'Kész alkotás']
          }
        ];

        const testimonialsData: TestimonialData[] = [
          {
            id: 'testimonial-1',
            name: 'Kovács Márta',
            role: 'Grafikus',
            location: 'Budapest',
            rating: 5,
            comment: 'Végre megtanultam, hogyan készítsek saját könyvet. Papírműves volt az élmény.',
            avatar: '/images/img_avatar_image.png'
          },
          {
            id: 'testimonial-2',
            name: 'Péter Mariann',
            role: 'Tanár',
            location: 'Debrecen',
            rating: 5,
            comment: 'A csapatépítő workshop után az egész irodánk másképp néz a papírra. Inspiráló és szórakoztató volt. Már újra szeretnénk menni.',
            avatar: '/images/img_avatar_image_48x48.png'
          },
          {
            id: 'testimonial-3',
            name: 'Szabó Juci',
            role: 'Művészet tanár',
            location: 'Miskolc',
            rating: 5,
            comment: 'A márványpapír technika megtanítása után azonnal elkészítettem az első darabom. Olyan szép lett, hogy ajándékba adtam. Mindenki szerette.',
            avatar: '/images/img_avatar_image_1.png'
          },
          {
            id: 'testimonial-4',
            name: 'Péter Molnár',
            role: 'Projektmenedzser',
            location: 'Szeged',
            rating: 5,
            comment: 'A csapatépítő workshop után az egész irodánk másképp néz a papírra. Inspiráló és szórakoztató volt. Már újra szeretnénk menni.',
            avatar: '/images/img_avatar_image_2.png'
          },
          {
            id: 'testimonial-5',
            name: 'Szabó János',
            role: 'Tanár',
            location: 'Debrecen',
            rating: 5,
            comment: 'A workshop során rájöttem, hogy a hulladék valóban kincs lehet. Kreatív és fenntartható.',
            avatar: '/images/img_avatar_image_3.png'
          }
        ];

        setCourses(coursesData);
        setTestimonials(testimonialsData);
      } finally {
        setLoading(false);
      }
    };

    loadPageData();
  }, [])

  return (
    <main className="w-full bg-[#3b3935]">
      <Header />
      
      <div className="flex flex-col justify-start items-center w-full">
        <HeroSection />
        <CoursesSection courses={courses} loading={loading} />
        <TechniquesSection />
        <AboutSection />
        <GallerySection />
        <TestimonialsSection testimonials={testimonials} loading={loading} />
        <CTASection />
        <ContactSection />
      </div>

      <Footer />
    </main>
  )
}