
import { ServiceItem, BenefitItem, PartnerItem, FAQItem } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'maintenance',
    title: 'Maintenance & Repairs',
    description: 'Comprehensive electrical diagnostics and repairs for residential and commercial properties. We fix faults fast.',
    icon: 'fa-tools',
    image: 'https://picsum.photos/seed/elec1/800/600'
  },
  {
    id: 'installations',
    title: 'New Installations',
    description: 'Full electrical planning and execution for new builds, renovations, and site extensions with precision.',
    icon: 'fa-plug',
    image: 'https://picsum.photos/seed/elec2/800/600'
  },
  {
    id: 'solar',
    title: 'Solar & Inverter Systems',
    description: 'Transition to green energy. High-efficiency solar panels and reliable backup power systems tailored to your needs.',
    icon: 'fa-sun',
    image: 'https://picsum.photos/seed/elec3/800/600'
  },
  {
    id: 'rewiring',
    title: 'DB & Rewiring',
    description: 'Upgrading distribution boards and complete building rewiring to ensure safety and modern capacity compliance.',
    icon: 'fa-network-wired',
    image: 'https://picsum.photos/seed/elec4/800/600'
  },
  {
    id: 'coc',
    title: 'COC Certifications',
    description: 'Legally mandatory Electrical Certificate of Compliance for property transfers, insurance, and safety peace of mind.',
    icon: 'fa-certificate',
    image: 'https://picsum.photos/seed/elec5/800/600'
  },
  {
    id: 'timers',
    title: 'Geyser Timers & Automation',
    description: 'Optimize your energy consumption with smart timers and home automation for high-usage appliances.',
    icon: 'fa-clock',
    image: 'https://picsum.photos/seed/elec6/800/600'
  }
];

export const BENEFITS: BenefitItem[] = [
  {
    id: 'compliant',
    title: 'Legally Compliant',
    description: 'We adhere to all SANS regulations and safety standards.',
    icon: 'fa-shield-halved'
  },
  {
    id: 'timelines',
    title: 'Accurate Timelines',
    description: 'Punctual service and reliable project delivery every time.',
    icon: 'fa-calendar-check'
  },
  {
    id: 'value',
    title: 'Value for Money',
    description: 'Competitive pricing without compromising on material quality.',
    icon: 'fa-money-bill-trend-up'
  },
  {
    id: 'expertise',
    title: 'Technical Expertise',
    description: 'Highly trained master electricians with decades of experience.',
    icon: 'fa-user-gear'
  }
];

export const PARTNERS: PartnerItem[] = [
  {
    id: 'eca',
    name: 'ECA South Africa',
    logo: 'https://picsum.photos/seed/partner1/200/100',
    description: 'The Electrical Contractors\' Association ensures high standards of workmanship and ethical conduct in the industry.'
  },
  {
    id: 'ecb',
    name: 'ECB (Electrical Conformance Board)',
    logo: 'https://picsum.photos/seed/partner2/200/100',
    description: 'Standardization and conformance monitoring for electrical installations nationwide.'
  },
  {
    id: 'solarassoc',
    name: 'Solar Accreditation Body',
    logo: 'https://picsum.photos/seed/partner3/200/100',
    description: 'Verified specialists in renewable energy and photovoltaic system design.'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "What is an Electrical Certificate of Compliance (COC)?",
    answer: "An Electrical Certificate of Compliance (COC) is a document that verifies that the electrical installations in a property are safe and comply with the required standards. It is legally mandatory when selling a property."
  },
  {
    question: "How long does a typical solar installation take?",
    answer: "A standard residential solar system (5kW-8kW) usually takes 2 to 3 days to install, depending on roof complexity and weather conditions."
  },
  {
    question: "Do you offer emergency 24/7 services?",
    answer: "Yes, we have a dedicated rapid response team for emergency electrical faults and dangerous situations across our service area."
  }
];
