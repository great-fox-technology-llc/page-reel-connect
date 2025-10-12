import { PropertyGroup } from './header';

export const footerProperties: PropertyGroup[] = [
  {
    group: 'Content',
    controls: [
      {
        type: 'select',
        label: 'Layout',
        key: 'layout',
        options: [
          { label: 'Simple Row', value: 'row' },
          { label: '3 Columns', value: 'columns' },
          { label: 'Centered', value: 'centered' },
          { label: 'Rich (4-col + Newsletter)', value: 'rich' },
          { label: 'Minimal', value: 'mini' },
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
        label: 'Link Groups',
        key: 'linkGroups',
      },
      {
        type: 'toggle',
        label: 'Show Social Icons',
        key: 'showSocial',
      },
      {
        type: 'list',
        label: 'Social Links',
        key: 'socialLinks',
      },
      {
        type: 'text',
        label: 'Copyright',
        key: 'copyright',
        placeholder: '© 2025 Your Brand',
      },
      {
        type: 'toggle',
        label: 'Show Newsletter',
        key: 'showNewsletter',
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
        max: 400,
        step: 8,
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
    ],
  },
  {
    group: 'Advanced',
    controls: [],
  },
];
