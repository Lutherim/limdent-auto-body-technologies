import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LimDent Auto Body Technologies | SAMBRA Approved Panelbeaters in Polokwane',
  description:
    'SAMBRA approved panel beating, spray painting, accident repairs, and commercial vehicle refurbishment at 45 Emerald St, Futura, Polokwane. Request a free quote today.',
  keywords: [
    'LimDent Auto Body Technologies',
    'Lim Dent Panelbeaters',
    'panel beating Polokwane',
    'spray painting Polokwane',
    'auto body repairs Polokwane',
    'SAMBRA approved panelbeaters',
    'commercial vehicle repairs Polokwane',
  ],
  openGraph: {
    title: 'LimDent Auto Body Technologies | SAMBRA Approved Panelbeaters in Polokwane',
    description:
      'Expert vehicle body repairs, spray painting, colour matching, and commercial fleet refurbishment in Futura, Polokwane.',
    type: 'website',
    locale: 'en_ZA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LimDent Auto Body Technologies | SAMBRA Approved Panelbeaters in Polokwane',
    description:
      'SAMBRA approved panel beating, spray painting, and vehicle body repairs at 45 Emerald St, Futura, Polokwane.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutoBodyShop',
    name: 'LimDent Auto Body Technologies',
    alternateName: 'Lim Dent Panelbeaters',
    description:
      'SAMBRA approved panel beating, spray painting, auto body repairs, and commercial vehicle repairs in Polokwane.',
    telephone: '+27-15-292-6518',
    email: 'limdent@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '45 Emerald St, Futura',
      addressLocality: 'Polokwane',
      postalCode: '0699',
      addressCountry: 'ZA',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '07:30',
        closes: '16:45',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday'],
        opens: '07:30',
        closes: '16:15',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '75',
    },
  };

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${dmSans.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-white text-[#475569] antialiased selection:bg-[#C92332] selection:text-white"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        {children}
      </body>
    </html>
  );
}
