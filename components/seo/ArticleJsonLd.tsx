type ArticleJsonLdProps = {
  title: string;
  description: string;
  path: string;
};

export default function ArticleJsonLd({
  title,
  description,
  path,
}: ArticleJsonLdProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Organization",
      name: "SOMNIA",
    },
    publisher: {
      "@type": "Organization",
      name: "SOMNIA",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://somnia-delta-five.vercel.app${path}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}