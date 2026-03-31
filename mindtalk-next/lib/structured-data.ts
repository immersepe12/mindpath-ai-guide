export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'MindTalk by Cadabams',
    url: 'https://cadabamsmindtalk.com',
    logo: 'https://cadabamsmindtalk.com/uploads/logo.png',
    medicalSpecialty: 'Psychiatric',
    telephone: '+91-97414-76476',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-97414-76476',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi', 'Kannada'],
    },
    parentOrganization: {
      '@type': 'MedicalOrganization',
      name: 'Cadabams Group',
      url: 'https://cadabams.com',
      foundingDate: '1992',
      description: "India's largest private mental health organisation with 30+ years of clinical expertise",
    },
    employee: [
      { '@type': 'Person', name: 'Ms. Aparna Rani', jobTitle: 'Clinical Psychologist' },
      { '@type': 'Person', name: 'Ms. Vijayalaxmi Umate', jobTitle: 'Clinical Psychologist' },
      { '@type': 'Person', name: 'Ms. Sufia Nusrat', jobTitle: 'Clinical Psychologist' },
      { '@type': 'Person', name: 'Ms. Srishti Agrawal', jobTitle: 'Clinical Psychologist' },
      { '@type': 'Person', name: 'Dr. Rayani M Dessa', jobTitle: 'Clinical Psychologist' },
    ],
    sameAs: [
      'https://www.instagram.com/cadabamsmindtalk',
      'https://www.facebook.com/cadabamsmindtalk',
    ],
  }
}

export function medicalServiceSchema(vertical: string, url: string, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name,
    description,
    url,
    provider: {
      '@type': 'MedicalOrganization',
      name: 'Cadabams Group',
      url: 'https://cadabams.com',
    },
    medicineSystem: 'WesternConventional',
    relevantSpecialty: 'Psychiatry',
    study: {
      '@type': 'MedicalStudy',
      studySubject: { '@type': 'MedicalCondition', name: vertical },
    },
  }
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  }
}

export function productSchema(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    url,
    brand: {
      '@type': 'Brand',
      name: 'MindTalk by Cadabams',
    },
    offers: {
      '@type': 'Offer',
      price: '7799',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url,
      priceValidUntil: '2026-12-31',
      seller: {
        '@type': 'Organization',
        name: 'MindTalk by Cadabams',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '124',
      bestRating: '5',
    },
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function howToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to start a 90-day mental health recovery with MindTalk',
    description: 'A structured guide to starting your CBT-based mental health recovery programme with a licensed Cadabams psychologist.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Take the assessment',
        text: 'Complete the 6-question assessment quiz at cadabamsmindtalk.com/quiz to identify your issue and get matched to the right programme.',
        url: 'https://cadabamsmindtalk.com/quiz',
      },
      {
        '@type': 'HowToStep',
        name: 'Get matched to a psychologist',
        text: 'A Cadabams counsellor reviews your responses and assigns a licensed psychologist specialised in your issue.',
      },
      {
        '@type': 'HowToStep',
        name: 'Start your 90-day journey',
        text: 'Your programme begins with daily 3-5 minute CBT exercises and weekly 50-minute psychologist sessions over 90 days.',
      },
    ],
    totalTime: 'P90D',
    supply: [
      { '@type': 'HowToSupply', name: 'MindTalk app' },
      { '@type': 'HowToSupply', name: 'Licensed psychologist' },
    ],
    tool: [
      { '@type': 'HowToTool', name: 'CBT (Cognitive Behavioural Therapy)' },
      { '@type': 'HowToTool', name: 'AI journaling (Dr. Riya)' },
    ],
  }
}
