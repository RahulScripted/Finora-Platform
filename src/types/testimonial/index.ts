export interface TestimonialData {
  tempId: number;
  testimonial: string;
  by: string;
  imgSrc: string;
}

export interface TestimonialCardProps {
  position: number;
  testimonial: TestimonialData;
  handleMove: (steps: number) => void;
  cardSize: number;
}

export const testimonials: TestimonialData[] = [
  {
    tempId: 0,
    testimonial: 'My favorite solution in the market. We work 5x faster with Finora.',
    by: 'Alex, CEO at TechCorp',
    imgSrc:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
  },
  {
    tempId: 1,
    testimonial: "I'm confident my data is safe with Finora. I can't say that about other providers.",
    by: 'Dan, CTO at SecureNet',
    imgSrc:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces',
  },
  {
    tempId: 2,
    testimonial: "I know it's cliche, but we were lost before we found Finora. Can't thank you enough!",
    by: 'Stephanie, COO at InnovateCo',
    imgSrc:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
  },
  {
    tempId: 3,
    testimonial: "Finora's products make planning for the future seamless. Can't recommend enough!",
    by: 'Marie, CFO at FuturePlanning',
    imgSrc:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
  },
  {
    tempId: 4,
    testimonial: "If I could give 11 stars, I'd give 12.",
    by: 'Andre, Head of Design at CreativeSolutions',
    imgSrc:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=faces',
  },
  {
    tempId: 5,
    testimonial: "SO HAPPY WE FOUND YOU GUYS! I'd bet you've saved me 100 hours so far.",
    by: 'Jeremy, Product Manager at TimeWise',
    imgSrc:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
  },
  {
    tempId: 6,
    testimonial: "Took some convincing, but now that we're on Finora, we're never going back.",
    by: 'Pam, Marketing Director at BrandBuilders',
    imgSrc:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=faces',
  },
  {
    tempId: 7,
    testimonial: "I would be lost without Finora's in-depth analytics. The ROI is EASILY 100X for us.",
    by: 'Daniel, Data Scientist at AnalyticsPro',
    imgSrc:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=faces',
  },
  {
    tempId: 8,
    testimonial: "It's just the best. Period.",
    by: 'Fernando, UX Designer at UserFirst',
    imgSrc:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop&crop=faces',
  },
  {
    tempId: 9,
    testimonial: 'I switched 5 years ago and never looked back.',
    by: 'Andy, DevOps Engineer at CloudMasters',
    imgSrc:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces',
  },
  {
    tempId: 10,
    testimonial: "I've been searching for a solution like Finora for YEARS. So glad I found one!",
    by: 'Pete, Sales Director at RevenueRockets',
    imgSrc:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
  },
  {
    tempId: 11,
    testimonial: "It's so simple and intuitive, we got the team up to speed in 10 minutes.",
    by: 'Marina, HR Manager at TalentForge',
    imgSrc:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces',
  },
];
