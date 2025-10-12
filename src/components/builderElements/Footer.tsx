import { FooterProps } from '@/types/layout';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface FooterElementProps extends FooterProps {
  isSelected?: boolean;
  isPreview?: boolean;
}

const socialIcons: Record<string, any> = {
  Facebook: Facebook,
  Twitter: Twitter,
  Instagram: Instagram,
  LinkedIn: Linkedin,
};

export const FooterElement = ({
  layout,
  logo,
  linkGroups,
  showSocial,
  socialLinks,
  copyright,
  background,
  textColor,
  height,
  showNewsletter,
  isSelected,
  isPreview,
}: FooterElementProps) => {
  const footerStyle = {
    minHeight: typeof height === 'number' ? `${height}px` : height,
    background,
    color: textColor,
  };

  const renderLogo = () => (
    <div className="font-bold text-lg mb-4">
      {logo?.type === 'image' && logo.src ? (
        <img src={logo.src} alt="Logo" className="h-8 object-contain" />
      ) : (
        <span>{logo?.text || 'Brand'}</span>
      )}
    </div>
  );

  const renderSocialLinks = () => (
    <div className="flex gap-3">
      {socialLinks.map((link, index) => {
        const Icon = socialIcons[link.platform] || Mail;
        return (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
          >
            <Icon className="w-4 h-4" />
          </a>
        );
      })}
    </div>
  );

  const renderLinkGroup = (group: any, index: number) => (
    <div key={index}>
      {group.title && <h3 className="font-semibold mb-3 text-sm">{group.title}</h3>}
      <ul className="space-y-2">
        {group.links.map((link: any, linkIndex: number) => (
          <li key={linkIndex}>
            <a
              href={link.href}
              className="text-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderNewsletter = () => (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm">Stay Updated</h3>
      <div className="flex gap-2">
        <Input
          placeholder="Your email"
          className="bg-background/10 border-white/10"
        />
        <Button size="sm" variant="secondary">Subscribe</Button>
      </div>
    </div>
  );

  return (
    <footer
      style={footerStyle}
      className={cn(
        'w-full px-6 py-8 border-t border-border/50',
        isSelected && !isPreview && 'ring-2 ring-primary ring-inset',
      )}
    >
      {layout === 'row' && (
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {renderLogo()}
          <p className="text-sm opacity-70">{copyright}</p>
          {showSocial && renderSocialLinks()}
        </div>
      )}

      {layout === 'columns' && (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              {renderLogo()}
            </div>
            {linkGroups.slice(0, 3).map(renderLinkGroup)}
          </div>
          <div className="pt-6 border-t border-border/30 flex items-center justify-between">
            <p className="text-sm opacity-70">{copyright}</p>
            {showSocial && renderSocialLinks()}
          </div>
        </div>
      )}

      {layout === 'centered' && (
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="flex justify-center">{renderLogo()}</div>
          {linkGroups[0] && (
            <div className="flex justify-center gap-6">
              {linkGroups[0].links.map((link: any, index: number) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
          {showSocial && (
            <div className="flex justify-center">{renderSocialLinks()}</div>
          )}
          <p className="text-sm opacity-70">{copyright}</p>
        </div>
      )}

      {layout === 'rich' && (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              {renderLogo()}
              <p className="text-sm opacity-70 mt-2">
                Building amazing experiences for the web.
              </p>
            </div>
            {linkGroups.slice(0, 2).map(renderLinkGroup)}
            {showNewsletter && (
              <div>{renderNewsletter()}</div>
            )}
          </div>
          <div className="pt-6 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm opacity-70">{copyright}</p>
            <div className="flex items-center gap-6">
              {linkGroups[2]?.links.slice(0, 2).map((link: any, index: number) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  {link.label}
                </a>
              ))}
            </div>
            {showSocial && renderSocialLinks()}
          </div>
        </div>
      )}

      {layout === 'mini' && (
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs opacity-60">{copyright}</p>
        </div>
      )}
    </footer>
  );
};
