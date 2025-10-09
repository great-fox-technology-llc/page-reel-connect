import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  Type, 
  AlignLeft, 
  Image as ImageIcon, 
  Video, 
  SquareMousePointer, 
  Star, 
  Minus, 
  MoveVertical,
  LayoutPanelTop,
  Rows3,
  Newspaper,
  Clapperboard,
  PlaySquare,
  Grid3X3,
  FileText,
  MessageSquare,
  Box,
  Columns2,
  LayoutGrid,
  RectangleHorizontal,
  Rocket,
  Palette,
  Mail
} from "lucide-react";

interface CanvasBlock {
  id: string;
  type: string;
  label: string;
  zone?: 'header' | 'body' | 'footer';
  props?: {
    content?: string;
    link?: string;
    src?: string;
    alt?: string;
    [key: string]: any;
  };
}

const iconMap: Record<string, React.ReactNode> = {
  heading: <Type className="w-8 h-8" />,
  text: <AlignLeft className="w-8 h-8" />,
  image: <ImageIcon className="w-8 h-8" />,
  video: <Video className="w-8 h-8" />,
  button: <SquareMousePointer className="w-8 h-8" />,
  icon: <Star className="w-8 h-8" />,
  divider: <Minus className="w-8 h-8" />,
  spacer: <MoveVertical className="w-8 h-8" />,
  card: <LayoutPanelTop className="w-8 h-8" />,
  "button-group": <Rows3 className="w-8 h-8" />,
  feed: <Newspaper className="w-8 h-8" />,
  stories: <Clapperboard className="w-8 h-8" />,
  reels: <PlaySquare className="w-8 h-8" />,
  "product-grid": <Grid3X3 className="w-8 h-8" />,
  form: <FileText className="w-8 h-8" />,
  comments: <MessageSquare className="w-8 h-8" />,
  container: <Box className="w-8 h-8" />,
  columns: <Columns2 className="w-8 h-8" />,
  grid: <LayoutGrid className="w-8 h-8" />,
  section: <RectangleHorizontal className="w-8 h-8" />,
  hero: <Rocket className="w-8 h-8" />,
  portfolio: <Palette className="w-8 h-8" />,
  contact: <Mail className="w-8 h-8" />,
};

export default function Preview() {
  const [searchParams] = useSearchParams();
  const draftId = searchParams.get('draftId');
  const [headerBlock, setHeaderBlock] = useState<CanvasBlock | null>(null);
  const [bodyBlocks, setBodyBlocks] = useState<CanvasBlock[]>([]);
  const [footerBlock, setFooterBlock] = useState<CanvasBlock | null>(null);

  useEffect(() => {
    const savedDraft = localStorage.getItem('canvas-draft');
    console.info('Preview: Reading from localStorage', { draftId, hasDraft: !!savedDraft });
    
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        console.info('Preview: Draft parsed', { draft });
        
        setHeaderBlock(draft.header || null);
        setBodyBlocks(draft.body || []);
        setFooterBlock(draft.footer || null);
      } catch (error) {
        console.error('Preview: Failed to load draft', error);
      }
    } else {
      console.warn('Preview: No draft found in localStorage');
    }
  }, [draftId]);

  const hasContent = headerBlock || bodyBlocks.length > 0 || footerBlock;

  return (
    <div className="min-h-screen bg-white">
      {!hasContent ? (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <div className="text-gray-300 mb-6">
            <LayoutGrid className="w-24 h-24" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Nothing to preview yet</h2>
          <p className="text-gray-500 text-center">
            Add components to your canvas and save to see them here
          </p>
        </div>
      ) : (
        <>
          {/* HEADER */}
          {headerBlock && (
            <header 
              className={cn(
                "w-full border-b",
                headerBlock.props?.isSticky && "sticky top-0 z-50",
                headerBlock.props?.transparentUntilScroll && "backdrop-blur-lg"
              )}
              style={{
                backgroundColor: headerBlock.props?.backgroundColor || '#ffffff',
                color: headerBlock.props?.textColor || '#121726',
                height: `${headerBlock.props?.height || 80}px`,
                boxShadow: headerBlock.props?.shadowPreset === 'none' ? 'none' : 
                           headerBlock.props?.shadowPreset === 'sm' ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' :
                           headerBlock.props?.shadowPreset === 'md' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' :
                           '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className={cn(
                "flex items-center justify-between h-full",
                headerBlock.props?.layoutWidth === 'contained' ? "container mx-auto px-4" : "px-8"
              )}>
                <div className="flex items-center gap-3">
                  {headerBlock.props?.avatar && (
                    <img src={headerBlock.props.avatar} alt={headerBlock.props?.displayName} className="w-10 h-10 rounded-full" />
                  )}
                  <div>
                    <div style={{ fontSize: `${headerBlock.props?.brandFontSize || 20}px` }} className="font-bold">
                      {headerBlock.props?.displayName || 'Site Name'}
                    </div>
                    {headerBlock.props?.handle && (
                      <div className="text-xs opacity-70">{headerBlock.props.handle}</div>
                    )}
                  </div>
                </div>
                
                <nav className="hidden md:flex items-center gap-2">
                  {headerBlock.props?.navItems?.map((item: any, i: number) => (
                    <a 
                      key={i} 
                      href={item.url}
                      className="px-3 py-2 hover:bg-black/5 transition-colors"
                      style={{ 
                        fontSize: `${headerBlock.props?.navFontSize || 14}px`,
                        borderRadius: `${headerBlock.props?.navBorderRadius || 8}px`
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                
                <div className="flex items-center gap-3">
                  {headerBlock.props?.showSearch && (
                    <input 
                      type="search" 
                      placeholder="Search..." 
                      className="px-3 py-1.5 border rounded text-sm"
                      style={{ borderColor: `${headerBlock.props?.textColor}40` }}
                    />
                  )}
                  {headerBlock.props?.showCTA && (
                    <button 
                      className="px-4 py-2 rounded font-medium text-sm"
                      style={{ 
                        backgroundColor: headerBlock.props?.accentColor || '#4368D9',
                        color: 'white'
                      }}
                    >
                      {headerBlock.props?.ctaLabel || 'Get Started'}
                    </button>
                  )}
                </div>
              </div>
            </header>
          )}
          
          {/* BODY */}
          <main className="py-12">
            <div className="max-w-7xl mx-auto px-4">
              {bodyBlocks.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  <p>No content in the body zone yet</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {bodyBlocks.map((block) => {
                    const content = block.props?.content || '';
                    const link = block.props?.link || '';
                    
                    return (
                      <div key={block.id} className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className="text-primary flex-shrink-0">
                            {iconMap[block.type] || <Box className="w-8 h-8" />}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-xl text-gray-900 mb-2">{block.label}</h3>
                            <p className="text-sm text-gray-500 mb-4 capitalize">{block.type.replace('-', ' ')}</p>
                            {content && (
                              <div className="text-gray-700 whitespace-pre-wrap">
                                {link ? (
                                  <a href={link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                    {content}
                                  </a>
                                ) : (
                                  content
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </main>
          
          {/* FOOTER */}
          {footerBlock && (
            <footer 
              className="w-full py-12 border-t"
              style={{
                backgroundColor: footerBlock.props?.footerBackgroundColor || '#121726',
                color: footerBlock.props?.footerTextColor || '#C1C9D1',
              }}
            >
              <div className={cn(
                "grid gap-8",
                footerBlock.props?.footerLayoutWidth === 'contained' ? "container mx-auto px-4" : "px-8",
                footerBlock.props?.columns?.length === 1 && "grid-cols-1",
                footerBlock.props?.columns?.length === 2 && "grid-cols-1 md:grid-cols-2",
                footerBlock.props?.columns?.length === 3 && "grid-cols-1 md:grid-cols-3",
                footerBlock.props?.columns?.length === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
              )}
              style={{ gap: `${footerBlock.props?.gridGap || 32}px` }}
              >
                {footerBlock.props?.columns?.map((col: any, i: number) => (
                  <div key={i}>
                    <h3 className="font-semibold mb-4">{col.title}</h3>
                    <ul className="space-y-2">
                      {col.links?.map((link: any, j: number) => (
                        <li key={j}>
                          <a href={link.url} className="opacity-70 hover:opacity-100 transition-opacity text-sm">
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              {footerBlock.props?.showNewsletter && (
                <div className="mt-8 text-center max-w-md mx-auto px-4">
                  <h3 className="font-semibold mb-4">{footerBlock.props.newsletterTitle || 'Newsletter'}</h3>
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="flex-1 px-4 py-2 rounded text-black"
                      style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: footerBlock.props?.footerTextColor }}
                    />
                    <button className="px-6 py-2 rounded bg-white text-black font-medium">
                      Subscribe
                    </button>
                  </div>
                </div>
              )}
              
              <div 
                className="mt-12 pt-8 text-center text-sm opacity-70"
                style={{ 
                  borderTop: `1px solid ${footerBlock.props?.dividerColor || 'rgba(255,255,255,0.1)'}` 
                }}
              >
                © {footerBlock.props?.copyrightYear || new Date().getFullYear()} {footerBlock.props?.siteName || 'Your Site'}
                {footerBlock.props?.legalLinks?.map((link: any, i: number) => (
                  <span key={i}>
                    {" · "}
                    <a href={link.url} className="hover:opacity-100">
                      {link.label}
                    </a>
                  </span>
                ))}
              </div>
            </footer>
          )}
        </>
      )}
    </div>
  );
}