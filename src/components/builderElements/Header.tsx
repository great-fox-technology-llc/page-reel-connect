import { HeaderProps } from '@/types/layout';
import { Menu, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface HeaderElementProps extends HeaderProps {
  isSelected?: boolean;
  isPreview?: boolean;
}

export const HeaderElement = ({
  layout,
  logo,
  nav = [],
  showProfile,
  avatar,
  displayName,
  sticky,
  stickyBehavior,
  background,
  textColor,
  height,
  showSearch,
  isSelected,
  isPreview,
}: HeaderElementProps) => {
  const headerStyle = {
    height: `${height}px`,
    background,
    color: textColor,
  };

  const renderLogo = () => (
    <div className="font-bold text-lg">
      {logo?.type === 'image' && logo.src ? (
        <img src={logo.src} alt="Logo" className="h-8 object-contain" />
      ) : (
        <span>{logo?.text || 'Brand'}</span>
      )}
    </div>
  );

  const renderNav = () => (
    <nav className="hidden md:flex items-center gap-6">
      {nav.map((item, index) => (
        <a
          key={index}
          href={item.href}
          target={item.openInNewTab ? '_blank' : undefined}
          rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
          className="text-sm hover:opacity-70 transition-opacity"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );

  const renderActions = () => (
    <div className="flex items-center gap-3">
      {showSearch && (
        <div className="relative w-64 hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
          <Input
            placeholder="Search..."
            className="pl-9 bg-background/10 border-white/10"
          />
        </div>
      )}
      {showProfile && (
        <Avatar className="w-8 h-8">
          <AvatarImage src={avatar} />
          <AvatarFallback>
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="w-5 h-5" />
      </Button>
    </div>
  );

  const layoutClasses = {
    'logo-nav-actions': 'justify-between',
    'nav-logo-actions': 'justify-between',
    'logo-actions': 'justify-between',
    'logo-search-actions': 'justify-between',
    'logo-burger': 'justify-between',
  };

  return (
    <header
      style={headerStyle}
      className={cn(
        'w-full px-6 flex items-center border-b border-border/50 transition-all',
        layoutClasses[layout],
        sticky && 'sticky top-0 z-50 backdrop-blur-md',
        isSelected && !isPreview && 'ring-2 ring-primary ring-inset',
      )}
    >
      {layout === 'logo-nav-actions' && (
        <>
          {renderLogo()}
          {renderNav()}
          {renderActions()}
        </>
      )}
      {layout === 'nav-logo-actions' && (
        <>
          {renderNav()}
          {renderLogo()}
          {renderActions()}
        </>
      )}
      {layout === 'logo-actions' && (
        <>
          {renderLogo()}
          {renderActions()}
        </>
      )}
      {layout === 'logo-search-actions' && (
        <>
          {renderLogo()}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
              <Input
                placeholder="Search..."
                className="pl-9 bg-background/10 border-white/10"
              />
            </div>
          </div>
          {renderActions()}
        </>
      )}
      {layout === 'logo-burger' && (
        <>
          {renderLogo()}
          <Button variant="ghost" size="icon">
            <Menu className="w-5 h-5" />
          </Button>
        </>
      )}
    </header>
  );
};
