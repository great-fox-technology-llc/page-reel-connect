import { LayoutTemplate, FooterProps } from '@/types/layout';

export const footerTemplates: LayoutTemplate<FooterProps>[] = [
  {
    id: 'footer-simple',
    name: 'Simple',
    thumbnail: '/placeholder.svg',
    defaults: {
      layout: 'row',
      logo: { type: 'text', text: 'YourBrand' },
      linkGroups: [],
      showSocial: true,
      socialLinks: [
        { platform: 'Twitter', url: '#' },
        { platform: 'Facebook', url: '#' },
        { platform: 'Instagram', url: '#' },
      ],
      copyright: '© 2025 YourBrand. All rights reserved.',
      background: 'hsl(var(--card))',
      textColor: 'hsl(var(--card-foreground))',
      height: 64,
    },
    styles: {
      '--ftr-height': 64,
      '--ftr-border-top': '1px solid hsl(var(--border))',
    },
    apply: (cur) => ({
      ...cur,
      layout: 'row',
      height: 64,
    }),
  },
  {
    id: 'footer-columns',
    name: '3 Columns',
    thumbnail: '/placeholder.svg',
    defaults: {
      layout: 'columns',
      logo: { type: 'text', text: 'Brand' },
      linkGroups: [
        {
          title: 'Product',
          links: [
            { label: 'Features', href: '/features' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Reviews', href: '/reviews' },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'About', href: '/about' },
            { label: 'Careers', href: '/careers' },
            { label: 'Contact', href: '/contact' },
          ],
        },
        {
          title: 'Resources',
          links: [
            { label: 'Blog', href: '/blog' },
            { label: 'Docs', href: '/docs' },
            { label: 'Support', href: '/support' },
          ],
        },
      ],
      showSocial: true,
      socialLinks: [
        { platform: 'Twitter', url: '#' },
        { platform: 'LinkedIn', url: '#' },
      ],
      copyright: '© 2025 Brand',
      background: 'hsl(var(--card))',
      textColor: 'hsl(var(--card-foreground))',
      height: 'auto',
    },
    styles: {
      '--ftr-padding': '40px',
    },
    apply: (cur) => ({
      ...cur,
      layout: 'columns',
      height: 'auto',
    }),
  },
  {
    id: 'footer-centered',
    name: 'Centered',
    thumbnail: '/placeholder.svg',
    defaults: {
      layout: 'centered',
      logo: { type: 'text', text: 'BRAND' },
      linkGroups: [
        {
          title: '',
          links: [
            { label: 'Privacy', href: '/privacy' },
            { label: 'Terms', href: '/terms' },
            { label: 'Contact', href: '/contact' },
          ],
        },
      ],
      showSocial: true,
      socialLinks: [
        { platform: 'Twitter', url: '#' },
        { platform: 'Instagram', url: '#' },
      ],
      copyright: '© 2025 Brand',
      background: 'hsl(var(--background))',
      textColor: 'hsl(var(--foreground))',
      height: 'auto',
    },
    styles: {
      '--ftr-padding': '32px',
    },
    apply: (cur) => ({
      ...cur,
      layout: 'centered',
      height: 'auto',
    }),
  },
  {
    id: 'footer-rich',
    name: 'Rich',
    thumbnail: '/placeholder.svg',
    defaults: {
      layout: 'rich',
      logo: { type: 'text', text: 'Brand' },
      linkGroups: [
        {
          title: 'Product',
          links: [
            { label: 'Features', href: '#' },
            { label: 'Pricing', href: '#' },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'About', href: '#' },
            { label: 'Blog', href: '#' },
          ],
        },
        {
          title: 'Legal',
          links: [
            { label: 'Privacy', href: '#' },
            { label: 'Terms', href: '#' },
          ],
        },
      ],
      showSocial: true,
      showNewsletter: true,
      socialLinks: [
        { platform: 'Twitter', url: '#' },
        { platform: 'Facebook', url: '#' },
        { platform: 'LinkedIn', url: '#' },
      ],
      copyright: '© 2025 Brand. All rights reserved.',
      background: 'hsl(var(--card))',
      textColor: 'hsl(var(--card-foreground))',
      height: 'auto',
    },
    styles: {
      '--ftr-padding': '48px',
    },
    apply: (cur) => ({
      ...cur,
      layout: 'rich',
      showNewsletter: true,
      height: 'auto',
    }),
  },
  {
    id: 'footer-minimal',
    name: 'Minimal',
    thumbnail: '/placeholder.svg',
    defaults: {
      layout: 'mini',
      logo: undefined,
      linkGroups: [],
      showSocial: false,
      socialLinks: [],
      copyright: '© 2025',
      background: 'hsl(var(--background))',
      textColor: 'hsl(var(--muted-foreground))',
      height: 48,
    },
    styles: {
      '--ftr-height': 48,
      '--ftr-border-top': 'none',
    },
    apply: (cur) => ({
      ...cur,
      layout: 'mini',
      linkGroups: [],
      showSocial: false,
      height: 48,
    }),
  },
];
