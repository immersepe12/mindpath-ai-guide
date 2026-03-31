import Image from 'next/image'
import Link from 'next/link'
import MinimalNav from '@/components/layout/MinimalNav'
import Footer from '@/components/layout/Footer'
import { breadcrumbSchema } from '@/lib/structured-data'
import PageTracker from '@/components/PageTracker'
import ScrollDepthTracker from '@/components/ScrollDepthTracker'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Our Psychologists | Clinical Team | MindTalk by Cadabams',
    description:
      "Meet the licensed clinical psychologists behind MindTalk's 90-day CBT programmes. All RCI-licensed, M.Phil qualified, and trained in evidence-based CBT.",
    alternates: {
      canonical: 'https://cadabamsmindtalk.com/team',
    },
    openGraph: {
      title: 'Our Psychologists | MindTalk by Cadabams',
      description:
        'Licensed clinical psychologists with 5–14 years of experience. RCI-licensed. CBT-trained. Built by Cadabams Group.',
    },
  }
}

const psychologists = [
  {
    name: 'Ms. Aparna Rani',
    role: 'Clinical Psychologist',
    experience: '9+ years',
    qualifications: 'M.Phil. Clinical Psychology (RCI), RINPAS',
    photo: '/team/aparna-rani.jpg',
    specialisations: ['Anxiety', 'Depression', 'Trauma', 'Relationship Issues', 'OCD', 'Stress'],
    bio: 'Ms. Aparna Rani is an RCI-licensed Clinical Psychologist and Psychotherapist with 9 years of experience. She holds an M.Phil. in Clinical Psychology from RINPAS and is trained in CBT, DBT, ACT, ERP, SFBT, and trauma-focused therapies. She specialises in anxiety, depression, relationship issues, and developmental concerns.',
    languages: ['English', 'Hindi'],
    location: 'Bengaluru',
  },
  {
    name: 'Ms. Vijayalaxmi Umate',
    role: 'Clinical Psychologist',
    experience: '5+ years',
    qualifications: 'M.Phil. Clinical Psychology (RCI), M.Sc. Psychology',
    photo: '/team/vijayalaxmi-umate.jpg',
    specialisations: ['Anxiety', 'Depression', 'Stress', 'Trauma', 'Addiction', 'Relationship Issues'],
    bio: 'Ms. Vijayalaxmi Umate is a dedicated Consultant Clinical Psychologist with over 5 years of experience, including 2 years at the Central Institute of Psychiatry, Ranchi. She holds an M.Phil. in Clinical Psychology (RCI) and combines evidence-based methods with a compassionate, personalised approach.',
    languages: ['English', 'Hindi', 'Marathi'],
    location: 'Bengaluru',
  },
  {
    name: 'Ms. Sufia Nusrat',
    role: 'Clinical Psychologist',
    experience: '14+ years',
    qualifications: 'Clinical Psychology',
    photo: '/team/sufia-nusrat.jpg',
    specialisations: ['Anxiety', 'Depression', 'Stress', 'Trauma', 'Burnout'],
    bio: 'Ms. Sufia Nusrat is a senior Clinical Psychologist at Cadabams with 14 years of clinical experience. She specialises in evidence-based CBT for anxiety, depression, stress, and burnout, and brings deep expertise to each structured programme.',
    languages: ['English'],
    location: 'Bengaluru',
  },
  {
    name: 'Ms. Srishti Agrawal',
    role: 'Clinical Psychologist',
    experience: '6+ years',
    qualifications: 'Clinical Psychology',
    photo: '/team/srishti-agrawal.jpg',
    specialisations: ['Anxiety', 'Depression', 'Relationship Issues', 'Stress', 'Workplace Burnout'],
    bio: 'Ms. Srishti Agrawal is a Clinical Psychologist at Cadabams with 6 years of experience. She works extensively with anxiety, depression, relationship difficulties, and workplace stress using structured CBT-based approaches.',
    languages: ['English'],
    location: 'Bengaluru',
  },
  {
    name: 'Dr. Rayani M Dessa',
    role: 'Clinical Psychologist',
    experience: '5+ years',
    qualifications: 'Clinical Psychology',
    photo: '/team/rayani-dessa.webp',
    specialisations: ['Anxiety', 'Depression', 'Relationship Issues', 'Trauma', 'Stress'],
    bio: 'Dr. Rayani M Dessa is a Clinical Psychologist at Cadabams with expertise spanning therapy and psychological assessment. She brings a structured, evidence-based approach to anxiety, depression, trauma, and relationship issues.',
    languages: ['English'],
    location: 'Bengaluru',
  },
]

const personSchemas = psychologists.map((p) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: p.name,
  jobTitle: p.role,
  worksFor: {
    '@type': 'MedicalOrganization',
    name: 'MindTalk by Cadabams',
  },
  knowsAbout: ['Cognitive Behavioural Therapy', ...p.specialisations],
  hasCredential: p.qualifications,
  image: `https://cadabamsmindtalk.com${p.photo}`,
}))

export default function TeamPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://cadabamsmindtalk.com' },
    { name: 'Our Psychologists', url: 'https://cadabamsmindtalk.com/team' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchemas) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <PageTracker page="team" />
      <ScrollDepthTracker page="team" />
      <MinimalNav />

      <main>
        {/* Hero */}
        <section className="bg-[#FDF8F4] py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meet Your Psychologists
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every MindTalk programme is led by a licensed clinical psychologist from Cadabams — India&apos;s
              largest private mental health group with 30+ years of expertise.
            </p>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {psychologists.map((p) => (
                <div
                  key={p.name}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square relative bg-[#F9F1EA]">
                    <Image
                      src={p.photo}
                      alt={`${p.name} — ${p.role} at MindTalk by Cadabams`}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-5">
                    <h2 className="text-lg font-semibold text-gray-900">{p.name}</h2>
                    <p className="text-sm text-[#EC6206] font-medium mt-0.5">
                      {p.role} · {p.experience}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{p.qualifications}</p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {p.specialisations.map((s) => (
                        <span
                          key={s}
                          className="text-xs px-2 py-0.5 rounded-full bg-[#FDF8F4] text-[#EC6206] border border-[#EC6206]/20"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">{p.bio}</p>

                    <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                      <span>{p.languages.join(', ')}</span>
                      <span>·</span>
                      <span>{p.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#FDF8F4] py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Get matched to a psychologist
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Take a 2-minute assessment and we&apos;ll match you with the right psychologist for your needs.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-lg bg-[#EC6206] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#d4580a] transition-colors"
            >
              Start your assessment
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <p className="text-xs text-gray-400 mt-8 text-center pb-4">
        Clinically reviewed: March 2026 · Cadabams Group
      </p>
    </>
  )
}
