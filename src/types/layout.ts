export type TemplateVariant = 'desktop' | 'mobile';

export interface AppliedStyle {
  [cssVar: string]: string | number;
}

export interface LayoutTemplate<TProps> {
  id: string;
  name: string;
  thumbnail: string;
  defaults: Partial<TProps>;
  styles: AppliedStyle;
  variant?: {
    desktop?: Partial<TProps>;
    mobile?: Partial<TProps>;
  };
  apply: (current: TProps) => TProps;
}

export interface HeaderProps {
  layout: 'logo-nav-actions' | 'nav-logo-actions' | 'logo-actions' | 'logo-search-actions' | 'logo-burger';
  logo?: {
    type: 'image' | 'text';
    src?: string;
    text?: string;
  };
  nav: Array<{
    label: string;
    href: string;
    openInNewTab?: boolean;
  }>;
  showProfile: boolean;
  avatar?: string;
  displayName?: string;
  sticky: boolean;
  stickyBehavior?: 'normal' | 'shrink-on-scroll' | 'hide-on-scroll';
  background: string;
  textColor: string;
  height: number;
  collapseToBurger?: boolean;
  showSearch?: boolean;
}

export interface FooterProps {
  layout: 'row' | 'columns' | 'centered' | 'rich' | 'mini';
  logo?: {
    type: 'image' | 'text';
    src?: string;
    text?: string;
  };
  linkGroups: Array<{
    title: string;
    links: Array<{
      label: string;
      href: string;
    }>;
  }>;
  showSocial: boolean;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
  copyright: string;
  background: string;
  textColor: string;
  height: number | 'auto';
  showNewsletter?: boolean;
}
