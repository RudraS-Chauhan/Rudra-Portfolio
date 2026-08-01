import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  section?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Rudra Singh Chauhan — Lead Engineer & AI/ML Systems Builder',
  description = 'Portfolio of Rudra Singh Chauhan — AI/ML Engineer, Mechatronics Builder, and Founder. Creator of AtlasCV, EventFit AI, ECHO-GATE Robotics, and FOREFLEX.',
  section,
  ogImage = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  canonicalUrl = 'https://rudrasc.vercel.app/',
}) => {
  const fullTitle = section
    ? `${title} | ${section}`
    : title;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta key="meta-description" name="description" content={description} />
      <meta
        key="meta-keywords"
        name="keywords"
        content="Rudra Singh Chauhan, AI Engineer, ML Engineer, AtlasCV, EventFit AI, Mechatronics, SolidWorks, React, TypeScript, Gemini API, Next.js, Robotics"
      />
      <meta key="meta-author" name="author" content="Rudra Singh Chauhan" />
      <link key="link-canonical" rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta key="og-type" property="og:type" content="website" />
      <meta key="og-url" property="og:url" content={canonicalUrl} />
      <meta key="og-title" property="og:title" content={fullTitle} />
      <meta key="og-description" property="og:description" content={description} />
      <meta key="og-image" property="og:image" content={ogImage} />
      <meta key="og-sitename" property="og:site_name" content="Rudra Singh Chauhan Portfolio" />

      {/* Twitter Card */}
      <meta key="twitter-card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter-title" name="twitter:title" content={fullTitle} />
      <meta key="twitter-description" name="twitter:description" content={description} />
      <meta key="twitter-image" name="twitter:image" content={ogImage} />
      <meta key="twitter-creator" name="twitter:creator" content="@ctrlhuman.io" />
    </Helmet>
  );
};
