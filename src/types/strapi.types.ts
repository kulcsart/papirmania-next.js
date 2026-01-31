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
  registrationUrl?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiCourse {
  id: number;
  attributes?: StrapiCourseAttributes;
  title?: string;
  price?: string;
  description?: string;
  features?: string[];
  registrationUrl?: string;
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
  media?: StrapiImageData | StrapiImage;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiTestimonial {
  id: number;
  attributes?: StrapiTestimonialAttributes;
  name?: string;
  role?: string;
  location?: string;
  rating?: number;
  comment?: string;
  media?: StrapiImageData | StrapiImage;
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
  image: StrapiImageData | StrapiImage;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiGalleryItem {
  id: number;
  attributes?: StrapiGalleryItemAttributes;
  alt?: string;
  image?: StrapiImageData | StrapiImage;
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
  order?: number;
  description?: string;
  desctiption?: string;
  desciption?: string;
  image: StrapiImageData | StrapiImage;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiTechnique {
  id: number;
  attributes?: StrapiTechniqueAttributes;
  label?: string;
  slug?: string;
  title?: string;
  order?: number;
  description?: string;
  desctiption?: string;
  desciption?: string;
  image?: StrapiImageData | StrapiImage;
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

// Page Papírmania Types
export interface StrapiPagePapirmaniaAttributes {
  title: string;
  tag: string;
  slug?: string;
  content: string;
  subtitle?: string;
  TwoButtonCTA?: any;
  page_image_large?: StrapiImageData | StrapiImage;
  page_image_small?: StrapiImageData | StrapiImage;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiPagePapirmania {
  id: number;
  attributes?: StrapiPagePapirmaniaAttributes;
  title?: string;
  tag?: string;
  slug?: string;
  content?: string;
  subtitle?: string;
  TwoButtonCTA?: any;
  page_image_large?: StrapiImageData | StrapiImage;
  page_image_small?: StrapiImageData | StrapiImage;
}

export interface StrapiPagesResponse {
  data: StrapiPagePapirmania[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
