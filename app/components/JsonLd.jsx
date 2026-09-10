export default function JsonLd() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["School", "EducationalOrganization"],
        "@id": "https://apamgreatergracechristianacademygh.org/#school",
        "name": "Greater Grace Christian Academy",
        "alternateName": ["GGCA", "GGCA Apam", "Apam Greater Grace Christian Academy"],
        "legalName": "Greater Grace Christian Academy, Apam",
        "url": "https://apamgreatergracechristianacademygh.org",
        "logo": "https://apamgreatergracechristianacademygh.org/favicon.ico",
        "image": "https://apamgreatergracechristianacademygh.org/images/facilities/classroomblock.jpg",
        "description": "Greater Grace Christian Academy offers top-tier Christian education from Creche, Kindergarten, Primary to Junior High School in Apam, Central Region, Ghana, fostering intellectual growth, moral integrity, and leadership.",
        "slogan": "Humility And Hard work",
        "foundingDate": "2010",
        "founders": [
          {
            "@type": "Person",
            "name": "Mr. Alfred Acquah",
            "jobTitle": "Co-Founder"
          },
          {
            "@type": "Person",
            "name": "Mrs. Innocentia Acquah",
            "jobTitle": "Co-Founder"
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Opposite Apam Senior High School, Apam Junction (Cape Coast - Accra road)",
          "addressLocality": "Apam",
          "addressRegion": "Central Region",
          "addressCountry": "GH"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+233-24-499-7473",
            "contactType": "general inquiries",
            "areaServed": "GH",
            "availableLanguage": ["English", "Akan"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+233-24-404-4846",
            "contactType": "admissions",
            "areaServed": "GH",
            "availableLanguage": ["English", "Akan"]
          }
        ],
        "email": "gracapam@gmail.com",
        "sameAs": [
          "https://www.youtube.com/watch?v=TpNZPljPLgs"
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "07:30",
            "closes": "17:00"
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://apamgreatergracechristianacademygh.org/#website",
        "url": "https://apamgreatergracechristianacademygh.org",
        "name": "Greater Grace Christian Academy",
        "description": "Official website of Greater Grace Christian Academy in Apam, Ghana.",
        "publisher": {
          "@id": "https://apamgreatergracechristianacademygh.org/#school"
        },
        "inLanguage": "en-US"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
