import { Metadata } from 'next';
 import HomePage from'./HomePage';

export const metadata: Metadata = {
  title: 'Papírmánia - Hungarian Paper Crafts Studio | Learn Traditional Techniques',
  description: 'Discover the art of paper crafts with Papírmánia! Master traditional Hungarian techniques like Cartonnage, join hands-on workshops, and create beautiful sustainable art pieces.',
  keywords: 'papírmánia, paper crafts, cartonnage, hungarian crafts, workshops, paper art, recycling, handmade, creative techniques, sustainable art',
  
  openGraph: {
    title: 'Papírmánia - Hungarian Paper Crafts Studio | Learn Traditional Techniques',
    description: 'Discover the art of paper crafts with Papírmánia! Master traditional Hungarian techniques like Cartonnage, join hands-on workshops, and create beautiful sustainable art pieces.',
  }
}

export default function Page() {
  return <HomePage />
}