import axios, { AxiosInstance } from 'axios';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || '';

class StrapiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: `${STRAPI_API_URL}/api`,
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
      },
    });
  }

  // Generic GET method
  private async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    try {
      const response = await this.api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  // Fetch courses
  async getCourses() {
    return this.get('/courses', {
      populate: '*',
    });
  }

  // Fetch single course by ID
  async getCourseById(id: string) {
    return this.get(`/courses/${id}`, {
      populate: '*',
    });
  }

  // Fetch testimonials
  async getTestimonials() {
    return this.get('/testimonials', {
      populate: '*',
    });
  }

  // Fetch gallery items
  async getGalleryItems() {
    return this.get('/gallery-items', {
      populate: '*',
    });
  }

  // Fetch techniques
  async getTechniques() {
    return this.get('/techniques', {
      populate: '*',
    });
  }

  // Fetch single technique by ID or slug
  async getTechniqueById(id: string) {
    return this.get(`/techniques/${id}`, {
      populate: '*',
    });
  }
}

export const strapiService = new StrapiService();
export default strapiService;