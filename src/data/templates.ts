import { type CanvasBlock } from '@/components/builder/Canvas';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'profile' | 'landing' | 'portfolio' | 'store' | 'blog' | 'creator' | 'agency' | 'event';
  thumbnail: string;
  structure: {
    header: CanvasBlock | null;
    body: CanvasBlock[];
    footer: CanvasBlock | null;
  };
}

export const templates: Template[] = [
  {
    id: 'personal-brand',
    name: 'Personal Brand',
    description: 'Professional profile with hero section, about, skills, and contact',
    category: 'profile',
    thumbnail: '/placeholder.svg',
    structure: {
      header: {
        id: 'header-1',
        type: 'header',
        label: 'Header',
        zone: 'header',
        props: {
          title: 'Your Name',
          subtitle: 'Professional Title',
          backgroundColor: 'hsl(var(--primary))',
          textColor: 'hsl(var(--primary-foreground))',
        },
      },
      body: [
        {
          id: 'body-1',
          type: 'hero',
          label: 'Hero Section',
          zone: 'body',
          props: {
            heading: 'Welcome to My Profile',
            subheading: 'Building exceptional digital experiences',
            backgroundColor: 'hsl(var(--background))',
            textColor: 'hsl(var(--foreground))',
          },
        },
        {
          id: 'body-2',
          type: 'text',
          label: 'About Section',
          zone: 'body',
          props: {
            content: 'Share your story, experience, and what makes you unique.',
            alignment: 'left',
            fontSize: '16px',
          },
        },
        {
          id: 'body-3',
          type: 'button',
          label: 'CTA Button',
          zone: 'body',
          props: {
            text: 'Get in Touch',
            url: '#contact',
            variant: 'default',
          },
        },
      ],
      footer: {
        id: 'footer-1',
        type: 'footer',
        label: 'Footer',
        zone: 'footer',
        props: {
          text: '© 2025 Your Name. All rights reserved.',
          backgroundColor: 'hsl(var(--card))',
          textColor: 'hsl(var(--muted-foreground))',
        },
      },
    },
  },
  {
    id: 'creator-portfolio',
    name: 'Creator Portfolio',
    description: 'Showcase your content with media grid, bio, and social links',
    category: 'profile',
    thumbnail: '/placeholder.svg',
    structure: {
      header: {
        id: 'header-1',
        type: 'header',
        label: 'Header',
        zone: 'header',
        props: {
          title: 'Creator Name',
          subtitle: 'Content Creator & Designer',
          backgroundColor: 'hsl(var(--background))',
          textColor: 'hsl(var(--foreground))',
        },
      },
      body: [
        {
          id: 'body-1',
          type: 'image',
          label: 'Profile Image',
          zone: 'body',
          props: {
            url: '/placeholder.svg',
            alt: 'Profile picture',
            width: '200px',
            borderRadius: '50%',
          },
        },
        {
          id: 'body-2',
          type: 'text',
          label: 'Bio',
          zone: 'body',
          props: {
            content: 'Creative professional sharing inspiring content daily.',
            alignment: 'center',
            fontSize: '18px',
          },
        },
        {
          id: 'body-3',
          type: 'gallery',
          label: 'Content Gallery',
          zone: 'body',
          props: {
            columns: 3,
            gap: '16px',
          },
        },
      ],
      footer: {
        id: 'footer-1',
        type: 'footer',
        label: 'Footer',
        zone: 'footer',
        props: {
          text: 'Follow me on social media',
          backgroundColor: 'hsl(var(--background))',
          textColor: 'hsl(var(--muted-foreground))',
        },
      },
    },
  },
  {
    id: 'business-professional',
    name: 'Business Professional',
    description: 'Corporate profile with services, testimonials, and call-to-action',
    category: 'profile',
    thumbnail: '/placeholder.svg',
    structure: {
      header: {
        id: 'header-1',
        type: 'header',
        label: 'Header',
        zone: 'header',
        props: {
          title: 'Business Name',
          subtitle: 'Professional Services',
          backgroundColor: 'hsl(var(--card))',
          textColor: 'hsl(var(--foreground))',
        },
      },
      body: [
        {
          id: 'body-1',
          type: 'hero',
          label: 'Hero',
          zone: 'body',
          props: {
            heading: 'Transform Your Business',
            subheading: 'Expert solutions for modern challenges',
            backgroundColor: 'hsl(var(--primary))',
            textColor: 'hsl(var(--primary-foreground))',
          },
        },
        {
          id: 'body-2',
          type: 'text',
          label: 'Services',
          zone: 'body',
          props: {
            content: 'Discover our comprehensive range of professional services.',
            alignment: 'center',
            fontSize: '16px',
          },
        },
        {
          id: 'body-3',
          type: 'button',
          label: 'Contact Button',
          zone: 'body',
          props: {
            text: 'Schedule Consultation',
            url: '#contact',
            variant: 'default',
          },
        },
      ],
      footer: null,
    },
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean single-column layout with elegant simplicity',
    category: 'profile',
    thumbnail: '/placeholder.svg',
    structure: {
      header: null,
      body: [
        {
          id: 'body-1',
          type: 'text',
          label: 'Name',
          zone: 'body',
          props: {
            content: 'Your Name',
            alignment: 'center',
            fontSize: '32px',
          },
        },
        {
          id: 'body-2',
          type: 'text',
          label: 'Bio',
          zone: 'body',
          props: {
            content: 'Simple, focused, effective.',
            alignment: 'center',
            fontSize: '16px',
          },
        },
        {
          id: 'body-3',
          type: 'divider',
          label: 'Divider',
          zone: 'body',
          props: {
            color: 'hsl(var(--border))',
            width: '50%',
          },
        },
        {
          id: 'body-4',
          type: 'text',
          label: 'Content',
          zone: 'body',
          props: {
            content: 'Share your message with clarity and purpose.',
            alignment: 'center',
            fontSize: '14px',
          },
        },
      ],
      footer: {
        id: 'footer-1',
        type: 'footer',
        label: 'Footer',
        zone: 'footer',
        props: {
          text: '© 2025',
          backgroundColor: 'transparent',
          textColor: 'hsl(var(--muted-foreground))',
        },
      },
    },
  },
  {
    id: 'bold-colorful',
    name: 'Bold & Colorful',
    description: 'Vibrant sections with eye-catching accent colors',
    category: 'profile',
    thumbnail: '/placeholder.svg',
    structure: {
      header: {
        id: 'header-1',
        type: 'header',
        label: 'Header',
        zone: 'header',
        props: {
          title: 'Bold Name',
          subtitle: 'Creative Professional',
          backgroundColor: 'hsl(var(--secondary))',
          textColor: 'hsl(var(--secondary-foreground))',
        },
      },
      body: [
        {
          id: 'body-1',
          type: 'hero',
          label: 'Hero',
          zone: 'body',
          props: {
            heading: 'Stand Out From The Crowd',
            subheading: 'Make a lasting impression',
            backgroundColor: 'hsl(var(--primary))',
            textColor: 'hsl(var(--primary-foreground))',
          },
        },
        {
          id: 'body-2',
          type: 'text',
          label: 'About',
          zone: 'body',
          props: {
            content: 'Bringing energy and creativity to every project.',
            alignment: 'center',
            fontSize: '18px',
          },
        },
        {
          id: 'body-3',
          type: 'button',
          label: 'Action Button',
          zone: 'body',
          props: {
            text: "Let's Connect",
            url: '#contact',
            variant: 'default',
          },
        },
      ],
      footer: {
        id: 'footer-1',
        type: 'footer',
        label: 'Footer',
        zone: 'footer',
        props: {
          text: 'Making the world more colorful, one project at a time',
          backgroundColor: 'hsl(var(--accent-orange))',
          textColor: 'hsl(var(--accent-orange-foreground))',
        },
      },
    },
  },
  {
    id: 'photography-showcase',
    name: 'Photography Showcase',
    description: 'Image-focused layout with minimal text distractions',
    category: 'profile',
    thumbnail: '/placeholder.svg',
    structure: {
      header: {
        id: 'header-1',
        type: 'header',
        label: 'Header',
        zone: 'header',
        props: {
          title: 'Photographer Name',
          subtitle: 'Visual Storyteller',
          backgroundColor: 'hsl(var(--background))',
          textColor: 'hsl(var(--foreground))',
        },
      },
      body: [
        {
          id: 'body-1',
          type: 'image',
          label: 'Featured Image',
          zone: 'body',
          props: {
            url: '/placeholder.svg',
            alt: 'Featured work',
            width: '100%',
            borderRadius: '0px',
          },
        },
        {
          id: 'body-2',
          type: 'gallery',
          label: 'Portfolio Gallery',
          zone: 'body',
          props: {
            columns: 3,
            gap: '8px',
          },
        },
        {
          id: 'body-3',
          type: 'text',
          label: 'Caption',
          zone: 'body',
          props: {
            content: 'Capturing moments that tell stories.',
            alignment: 'center',
            fontSize: '14px',
          },
        },
      ],
      footer: {
        id: 'footer-1',
        type: 'footer',
        label: 'Footer',
        zone: 'footer',
        props: {
          text: 'Available for bookings',
          backgroundColor: 'hsl(var(--card))',
          textColor: 'hsl(var(--muted-foreground))',
        },
      },
    },
  },
];
