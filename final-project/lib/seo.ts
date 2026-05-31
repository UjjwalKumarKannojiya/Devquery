

export interface SEOMetadata {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
}

export function generateMetaTags(seo: SEOMetadata) {
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: seo.image
        ? [
            {
              url: seo.image,
              width: 1200,
              height: 630,
              alt: seo.title,
            },
          ]
        : undefined,
      type: seo.type || 'website',
      url: seo.url,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: seo.image ? [seo.image] : undefined,
    },
  };
}

export function generateStructuredData(seo: SEOMetadata) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: seo.title,
    description: seo.description,
    image: seo.image,
    datePublished: seo.publishedDate,
    dateModified: seo.modifiedDate,
    author: seo.author
      ? {
          '@type': 'Person',
          name: seo.author,
        }
      : undefined,
  };
}

export const defaultSEO: SEOMetadata = {
  title: 'DevQuery Forum - Get Instant AI-Powered Answers',
  description:
    'Join DevQuery Forum to ask coding questions and receive instant AI-powered answers. Learn from the community and grow your skills.',
  image: '/og-image.png',
  type: 'website',
};

