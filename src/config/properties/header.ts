import { HeaderProps } from '@/types/layout';

export interface PropertyControl {
  type: 'text' | 'select' | 'toggle' | 'slider' | 'color' | 'image' | 'list' | 'template-selector';
  label: string;
  key: string;
  options?: Array<{ label: string; value: string | number }>;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

export interface PropertyGroup {
  group: 'Content' | 'Style' | 'Advanced';
  label?: string;
  controls: PropertyControl[];
}

export const headerProperties: PropertyGroup[] = [
  {
    group: 'Content',
    controls: [
      {
        type: 'select',
        label: 'Layout',
        key: 'layout',
        options: [
          { label: 'Logo | Nav | Actions', value: 'logo-nav-actions' },
          { label: 'Nav | Logo | Actions', value: 'nav-logo-actions' },
          { label: 'Logo | Actions (Minimal)', value: 'logo-actions' },
          { label: 'Logo | Search | Actions', value: 'logo-search-actions' },
          { label: 'Logo | Burger Menu', value: 'logo-burger' },
        ],
      },
      {
        type: 'text',
        label: 'Logo Text',
        key: 'logo.text',
        placeholder: 'Your Brand',
      },
      {
        type: 'image',
        label: 'Logo Image',
        key: 'logo.src',
      },
      {
        type: 'list',
        label: 'Navigation Links',
        key: 'nav',
      },
      {
        type: 'toggle',
        label: 'Show Profile',
        key: 'showProfile',
      },
      {
        type: 'toggle',
        label: 'Show Search',
        key: 'showSearch',
      },
    ],
  },
  {
    group: 'Style',
    controls: [
      {
        type: 'slider',
        label: 'Height (px)',
        key: 'height',
        min: 48,
        max: 120,
        step: 4,
      },
      {
        type: 'color',
        label: 'Background',
        key: 'background',
      },
      {
        type: 'color',
        label: 'Text Color',
        key: 'textColor',
      },
      {
        type: 'toggle',
        label: 'Sticky',
        key: 'sticky',
      },
      {
        type: 'select',
        label: 'Sticky Behavior',
        key: 'stickyBehavior',
        options: [
          { label: 'Normal', value: 'normal' },
          { label: 'Shrink on Scroll', value: 'shrink-on-scroll' },
          { label: 'Hide on Scroll', value: 'hide-on-scroll' },
        ],
      },
    ],
  },
  {
    group: 'Advanced',
    controls: [
      {
        type: 'toggle',
        label: 'Collapse to Burger (Mobile)',
        key: 'collapseToBurger',
      },
    ],
  },
];
