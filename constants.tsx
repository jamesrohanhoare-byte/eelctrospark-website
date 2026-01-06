import { ServiceItem, BenefitItem, PartnerItem, FAQItem } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'maintenance',
    title: 'Maintenance & Repairs',
    description: 'Comprehensive electrical diagnostics and repairs for residential and commercial properties. We fix faults fast.',
    icon: 'fa-tools',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'installations',
    title: 'New Installations',
    description: 'Full electrical planning and execution for new builds, renovations, and site extensions with precision.',
    icon: 'fa-plug',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'solar',
    title: 'Solar & Inverter Systems',
    description: 'Transition to green energy. High-efficiency solar panels and reliable backup power systems tailored to your needs.',
    icon: 'fa-sun',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'rewiring',
    title: 'DB & Rewiring',
    description: 'Upgrading distribution boards and complete building rewiring to ensure safety and modern capacity compliance.',
    icon: 'fa-network-wired',
    image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'coc',
    title: 'COC Certifications',
    description: 'Legally mandatory Electrical Certificate of Compliance for property transfers, insurance, and safety peace of mind.',
    icon: 'fa-certificate',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'timers',
    title: 'Geyser Timers & Automation',
    description: 'Optimize your energy consumption with smart timers and home automation for high-usage appliances.',
    icon: 'fa-clock',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop'
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
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&auto=format&fit=crop',
    description: 'The Electrical Contractors\' Association ensures high standards of workmanship and ethical conduct in the industry.'
  },
  {
    id: 'ecb',
    name: 'ECB (Electrical Conformance Board)',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200&auto=format&fit=crop',
    description: 'Standardization and conformance monitoring for electrical installations nationwide.'
  },
  {
    id: 'solarassoc',
    name: 'Solar Accreditation Body',
    logo: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=200&auto=format&fit=crop',
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