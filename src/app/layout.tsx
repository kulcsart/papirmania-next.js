import React from 'react';
import '../styles/index.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: {
    default: 'Papírmánia - Paper Crafts Studio',
    template: 'Papírmánia - Paper Crafts Studio | %s',
  },
  description: 'Master the art of paper crafts with Papírmánia! Learn Cartonnage, explore creative recycling techniques, join hands-on workshops, and discover the beauty of Hungarian paper artistry.',
  keywords: 'paper crafts, cartonnage, hungarian crafts, paper art, recycling, workshops, creative techniques, handmade, papírművészet',
  
  openGraph: {
    type: 'website',
    title: {
      default: 'Papírmánia - Paper Crafts Studio',
      template: 'Papírmánia - Paper Crafts Studio | %s',
    },
    description: 'Join Papírmánia for authentic Hungarian paper crafts education. Learn traditional techniques, create beautiful handmade pieces, and embrace sustainable artistry.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;800&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/maname" rel="stylesheet" />
</head>
      <body>{children}
</body>
    </html>
  );
}