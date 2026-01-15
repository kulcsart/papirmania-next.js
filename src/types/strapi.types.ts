// Strapi API Response Types
export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface StrapiImageData {
  data: {
    id: number;
    attributes: StrapiImage;
  } | null;
}

// Course Types
export interface StrapiCourseAttributes {
  title: string;
  price: string;
  description: string;
  features?: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiCourse {
  id: number;
  attributes: StrapiCourseAttributes;
}

export interface StrapiCoursesResponse {
  data: StrapiCourse[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Testimonial Types
export interface StrapiTestimonialAttributes {
  name: string;
  role: string;
  location: string;
  rating: number;
  comment: string;
  avatar?: StrapiImageData;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiTestimonial {
  id: number;
  attributes: StrapiTestimonialAttributes;
}

export interface StrapiTestimonialsResponse {
  data: StrapiTestimonial[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Gallery Types
export interface StrapiGalleryItemAttributes {
  alt: string;
  image: StrapiImageData;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiGalleryItem {
  id: number;
  attributes: StrapiGalleryItemAttributes;
}

export interface StrapiGalleryResponse {
  data: StrapiGalleryItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Technique Types
export interface StrapiTechniqueAttributes {
  label: string;
  slug: string;
  title: string;
  description: string;
  image: StrapiImageData;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiTechnique {
  id: number;
  attributes: StrapiTechniqueAttributes;
}

export interface StrapiTechniquesResponse {
  data: StrapiTechnique[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}