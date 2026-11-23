export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  formValue: string;
  category: string;
  description: string;
  highlights: string[];
  iconName: 'Wrench' | 'Paintbrush' | 'Car' | 'Truck' | 'ShieldCheck';
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  quote: string;
}

export interface OperatingHourRow {
  days: string;
  hours: string;
  isClosed?: boolean;
}

export const COMPANY_INFO = {
  name: 'LimDent Auto Body Technologies',
  legalOrTradeName: 'Lim Dent Panelbeaters',
  accreditation: 'SAMBRA Approved',
  address: '45 Emerald St, Futura, Polokwane, 0699',
  suburb: 'Futura Industrial Area, Polokwane',
  phoneDisplay: '015 292 6518',
  phoneTel: '+27152926518',
  whatsappNumber: '27152926518',
  email: 'limdent@gmail.com',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Lim+Dent+Panelbeaters+45+Emerald+St+Futura+Polokwane+0699',
  ratingSummary: {
    score: '4.5',
    totalReviews: 75,
  },
  assets: {
    logo: '/assets/aistudio/i_think_thats_the_logo_48dbb6fc.png',
    companyBackground: '/assets/aistudio/company_background_42c5aac2.png',
    beforeRepair: '/assets/aistudio/2_6e218484.jpg',
    afterRepair: '/assets/aistudio/1_66028261.jpg',
  },
} as const;

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'panel-beating',
    number: '01',
    title: 'Panel Beating',
    formValue: 'Panel Beating',
    category: 'Structural & Bodywork',
    description:
      'Precision dent removal, chassis and panel straightening, bumper repairs, and body panel replacement for passenger vehicles, SUVs, and bakkies.',
    highlights: [
      'Small & major dent removal',
      'Panel alignment & replacement',
      'Bumper & fender restoration',
    ],
    iconName: 'Wrench',
  },
  {
    id: 'spray-painting',
    number: '02',
    title: 'Spray Painting',
    formValue: 'Spray Painting',
    category: 'Refinishing & Colour Matching',
    description:
      'Professional spray-booth refinishing with accurate computerised colour matching, deep clear-coat application, and scratch removal.',
    highlights: [
      'Accurate colour matching',
      'Dust-controlled booth finish',
      'Scratch & paintwork restoration',
    ],
    iconName: 'Paintbrush',
  },
  {
    id: 'auto-body-repairs',
    number: '03',
    title: 'Auto Body Repairs',
    formValue: 'Auto Body Repairs',
    category: 'Collision & Rust Restoration',
    description:
      'Comprehensive accident damage repairs, rust treatment, and complete exterior refurbishment performed to manufacturer specifications.',
    highlights: [
      'Accident damage restoration',
      'Rust stripping & priming',
      'Complete body assembly',
    ],
    iconName: 'Car',
  },
  {
    id: 'commercial-vehicle-repairs',
    number: '04',
    title: 'Commercial Vehicle Repairs',
    formValue: 'Commercial Vehicle Repairs',
    category: 'Fleets, Bakkies & Trailers',
    description:
      'Heavy-duty body repairs, full corrosion stripping, high-durability resprays, and safety trim installation for commercial fleets, work bakkies, and trailers.',
    highlights: [
      'Work bakkie & fleet repairs',
      'Trailer body refurbishment',
      'Reflective safety trim & fittings',
    ],
    iconName: 'Truck',
  },
  {
    id: 'sambra-approved-repairs',
    number: '05',
    title: 'SAMBRA Approved Repairs',
    formValue: 'Insurance / SAMBRA Claim Repair',
    category: 'Accredited Quality Standards',
    description:
      'Recognised South African Motor Body Repairers’ Association (SAMBRA) member delivering verified repair standards for both private owners and insurance claims.',
    highlights: [
      'SAMBRA accredited workshop',
      'Insurance & private quotes',
      'Clear step-by-step progress updates',
    ],
    iconName: 'ShieldCheck',
  },
];

export const OPERATING_HOURS: OperatingHourRow[] = [
  { days: 'Monday – Thursday', hours: '7:30 am – 4:45 pm' },
  { days: 'Friday', hours: '7:30 am – 4:15 pm' },
  { days: 'Saturday', hours: 'Closed', isClosed: true },
  { days: 'Sunday', hours: 'Closed', isClosed: true },
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'johan-zeelie',
    author: 'Johan Zeelie',
    rating: 5,
    quote:
      'Lim Dent Panelbeaters repaired my bakkie fast and very effective. They know how to repair small dents and scratches with ease. Very professional and done without breaking the bank. Fast and reliable service. I will recommend them any day.',
  },
  {
    id: 'jaco-kotze',
    author: 'Jaco Kotze',
    rating: 5,
    quote:
      'Exceptional service and workmanship received for the panel repairs and spray painting on my vehicle. The quality of work exceeded my expectations, with perfect colour matching and attention to detail.',
  },
  {
    id: 'mathews-letsoalo',
    author: 'Mathews Letsoalo',
    rating: 4.5,
    quote:
      'Big ups to the team for stepping up. Louise was very helpful in organizing the rest and kept us up to date on each and every step. The car was done on time with an immaculate paint job.',
  },
  {
    id: 'poseletso-malatji',
    author: 'Poseletso Malatji',
    rating: 5,
    quote: 'Exceptional customer service at an affordable price.',
  },
];
