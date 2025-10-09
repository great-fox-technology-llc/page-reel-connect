import { ChevronDown, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface CanvasBlock {
  id: string;
  type: string;
  label: string;
  zone?: 'header' | 'body' | 'footer';
  props: {
    content?: string;
    link?: string;
    src?: string;
    alt?: string;
    [key: string]: any;
  };
}

interface PropertiesPanelProps {
  selectedBlock?: CanvasBlock | null;
  onUpdateProps?: (blockId: string, props: any) => void;
}

export const PropertiesPanel = ({ selectedBlock, onUpdateProps }: PropertiesPanelProps) => {
  const [showLayers, setShowLayers] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("content");

  useEffect(() => {
    const hash = location.hash.replace('#props=', '');
    if (hash && ['content', 'style', 'behavior', 'visibility'].includes(hash)) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`#props=${value}`, { replace: true });
  };

  const handlePropChange = (key: string, value: any) => {
    if (selectedBlock && onUpdateProps) {
      onUpdateProps(selectedBlock.id, { [key]: value });
    }
  };

  const elementSelected = !!selectedBlock;
  const isHeader = selectedBlock?.type === 'header';
  const isFooter = selectedBlock?.type === 'footer';
  const isStructure = isHeader || isFooter;

  return (
    <div className="w-80 bg-background/95 backdrop-blur-xl border-l border-white/10 flex flex-col h-full">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <h2 className="font-bold">Properties</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowLayers(!showLayers)}
          className="gap-2"
        >
          <Layers className="w-4 h-4" />
          Layers
        </Button>
      </div>

      {elementSelected ? (
        <>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-1 flex flex-col">
            <TabsList className={`w-full grid ${isStructure ? 'grid-cols-4' : 'grid-cols-3'} bg-background/50`}>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="style">Style</TabsTrigger>
              <TabsTrigger value="behavior">Behavior</TabsTrigger>
              {isStructure && <TabsTrigger value="visibility">Visibility</TabsTrigger>}
            </TabsList>

            <div className="flex-1 overflow-y-auto">
              {/* HEADER CONTENT */}
              {isHeader && (
                <TabsContent value="content" className="p-4 space-y-4 mt-0">
                  <div className="space-y-3">
                    <Label className="text-xs font-semibold uppercase tracking-wide">Profile</Label>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Avatar URL</Label>
                      <Input value={selectedBlock.props.avatar || ''} onChange={(e) => handlePropChange('avatar', e.target.value)} className="bg-background/50 border-white/10" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Display Name</Label>
                      <Input value={selectedBlock.props.displayName || ''} onChange={(e) => handlePropChange('displayName', e.target.value)} className="bg-background/50 border-white/10" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Handle</Label>
                      <Input value={selectedBlock.props.handle || ''} onChange={(e) => handlePropChange('handle', e.target.value)} className="bg-background/50 border-white/10" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Bio Snippet</Label>
                      <textarea className="w-full bg-background/50 border border-white/10 rounded-lg px-3 py-2 text-sm" rows={2} value={selectedBlock.props.bioSnippet || ''} onChange={(e) => handlePropChange('bioSnippet', e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-xs font-semibold uppercase tracking-wide">Optional Items</Label>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Search Bar</Label>
                      <Switch checked={selectedBlock.props.showSearch} onCheckedChange={(checked) => handlePropChange('showSearch', checked)} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">CTA Button</Label>
                      <Switch checked={selectedBlock.props.showCTA} onCheckedChange={(checked) => handlePropChange('showCTA', checked)} />
                    </div>
                    {selectedBlock.props.showCTA && (
                      <>
                        <Input placeholder="CTA Label" value={selectedBlock.props.ctaLabel || ''} onChange={(e) => handlePropChange('ctaLabel', e.target.value)} className="bg-background/50 border-white/10" />
                        <Input placeholder="CTA Link" value={selectedBlock.props.ctaLink || ''} onChange={(e) => handlePropChange('ctaLink', e.target.value)} className="bg-background/50 border-white/10" />
                      </>
                    )}
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Theme Toggle</Label>
                      <Switch checked={selectedBlock.props.showThemeToggle} onCheckedChange={(checked) => handlePropChange('showThemeToggle', checked)} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Notifications</Label>
                      <Switch checked={selectedBlock.props.showNotifications} onCheckedChange={(checked) => handlePropChange('showNotifications', checked)} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Messages</Label>
                      <Switch checked={selectedBlock.props.showMessages} onCheckedChange={(checked) => handlePropChange('showMessages', checked)} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Cart Icon</Label>
                      <Switch checked={selectedBlock.props.showCart} onCheckedChange={(checked) => handlePropChange('showCart', checked)} />
                    </div>
                    {selectedBlock.props.showCart && (
                      <Input type="number" placeholder="Cart Badge" value={selectedBlock.props.cartBadge || 0} onChange={(e) => handlePropChange('cartBadge', Number(e.target.value))} className="bg-background/50 border-white/10" />
                    )}
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Followers Counter</Label>
                      <Switch checked={selectedBlock.props.showFollowers} onCheckedChange={(checked) => handlePropChange('showFollowers', checked)} />
                    </div>
                    {selectedBlock.props.showFollowers && (
                      <>
                        <Input type="number" placeholder="Followers Count" value={selectedBlock.props.followersCount || 0} onChange={(e) => handlePropChange('followersCount', Number(e.target.value))} className="bg-background/50 border-white/10" />
                        <Input type="number" placeholder="Following Count" value={selectedBlock.props.followingCount || 0} onChange={(e) => handlePropChange('followingCount', Number(e.target.value))} className="bg-background/50 border-white/10" />
                      </>
                    )}
                  </div>
                </TabsContent>
              )}

              {/* FOOTER CONTENT */}
              {isFooter && (
                <TabsContent value="content" className="p-4 space-y-4 mt-0">
                  <div className="space-y-3">
                    <Label className="text-xs font-semibold uppercase tracking-wide">Footer Info</Label>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Site Name</Label>
                      <Input value={selectedBlock.props.siteName || ''} onChange={(e) => handlePropChange('siteName', e.target.value)} className="bg-background/50 border-white/10" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Copyright Year</Label>
                      <Input type="number" value={selectedBlock.props.copyrightYear || new Date().getFullYear()} onChange={(e) => handlePropChange('copyrightYear', Number(e.target.value))} className="bg-background/50 border-white/10" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Newsletter Section</Label>
                      <Switch checked={selectedBlock.props.showNewsletter} onCheckedChange={(checked) => handlePropChange('showNewsletter', checked)} />
                    </div>
                    {selectedBlock.props.showNewsletter && (
                      <Input placeholder="Newsletter Title" value={selectedBlock.props.newsletterTitle || ''} onChange={(e) => handlePropChange('newsletterTitle', e.target.value)} className="bg-background/50 border-white/10" />
                    )}
                  </div>
                </TabsContent>
              )}

              {/* BODY CONTENT */}
              {!isHeader && !isFooter && (
                <TabsContent value="content" className="p-4 space-y-4 mt-0">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-2 block">Text Content</Label>
                    <Input 
                      placeholder="Enter text..." 
                      className="bg-background/50 border-white/10"
                      value={selectedBlock?.props.content || ''}
                      onChange={(e) => handlePropChange('content', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-2 block">Link URL</Label>
                    <Input 
                      placeholder="https://..." 
                      className="bg-background/50 border-white/10"
                      value={selectedBlock?.props.link || ''}
                      onChange={(e) => handlePropChange('link', e.target.value)}
                    />
                  </div>
                </TabsContent>
              )}

              {/* HEADER STYLE */}
              {isHeader && (
                <TabsContent value="style" className="p-4 space-y-6 mt-0">
                  <div className="space-y-3">
                    <Label className="text-xs font-semibold uppercase tracking-wide">Layout</Label>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Width</Label>
                      <select className="w-full bg-background/50 border border-white/10 rounded-lg px-3 py-2 text-sm" value={selectedBlock.props.layoutWidth || 'full'} onChange={(e) => handlePropChange('layoutWidth', e.target.value)}>
                        <option value="full">Full Width</option>
                        <option value="contained">Contained</option>
                      </select>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Height (px)</Label>
                      <Input type="number" value={selectedBlock.props.height || 80} onChange={(e) => handlePropChange('height', Number(e.target.value))} className="bg-background/50 border-white/10" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Sticky on Scroll</Label>
                      <Switch checked={selectedBlock.props.isSticky} onCheckedChange={(checked) => handlePropChange('isSticky', checked)} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Transparent Until Scroll</Label>
                      <Switch checked={selectedBlock.props.transparentUntilScroll} onCheckedChange={(checked) => handlePropChange('transparentUntilScroll', checked)} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-xs font-semibold uppercase tracking-wide">Colors</Label>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Background</Label>
                      <div className="flex gap-2">
                        <Input type="color" value={selectedBlock.props.backgroundColor || '#ffffff'} onChange={(e) => handlePropChange('backgroundColor', e.target.value)} className="w-12 h-10 p-1 bg-background/50 border-white/10" />
                        <Input value={selectedBlock.props.backgroundColor || '#ffffff'} onChange={(e) => handlePropChange('backgroundColor', e.target.value)} className="bg-background/50 border-white/10" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Text Color</Label>
                      <div className="flex gap-2">
                        <Input type="color" value={selectedBlock.props.textColor || '#121726'} onChange={(e) => handlePropChange('textColor', e.target.value)} className="w-12 h-10 p-1 bg-background/50 border-white/10" />
                        <Input value={selectedBlock.props.textColor || '#121726'} onChange={(e) => handlePropChange('textColor', e.target.value)} className="bg-background/50 border-white/10" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Accent</Label>
                      <div className="flex gap-2">
                        <Input type="color" value={selectedBlock.props.accentColor || '#4368D9'} onChange={(e) => handlePropChange('accentColor', e.target.value)} className="w-12 h-10 p-1 bg-background/50 border-white/10" />
                        <Input value={selectedBlock.props.accentColor || '#4368D9'} onChange={(e) => handlePropChange('accentColor', e.target.value)} className="bg-background/50 border-white/10" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground mb-2 block">Shadow Preset</Label>
                    <select className="w-full bg-background/50 border border-white/10 rounded-lg px-3 py-2 text-sm" value={selectedBlock.props.shadowPreset || 'md'} onChange={(e) => handlePropChange('shadowPreset', e.target.value)}>
                      <option value="none">None</option>
                      <option value="sm">Small</option>
                      <option value="md">Medium</option>
                      <option value="lg">Large</option>
                    </select>
                  </div>
                </TabsContent>
              )}

              {/* FOOTER STYLE */}
              {isFooter && (
                <TabsContent value="style" className="p-4 space-y-6 mt-0">
                  <div className="space-y-3">
                    <Label className="text-xs font-semibold uppercase tracking-wide">Layout</Label>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Width</Label>
                      <select className="w-full bg-background/50 border border-white/10 rounded-lg px-3 py-2 text-sm" value={selectedBlock.props.footerLayoutWidth || 'full'} onChange={(e) => handlePropChange('footerLayoutWidth', e.target.value)}>
                        <option value="full">Full Width</option>
                        <option value="contained">Contained</option>
                      </select>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Grid Gap (px)</Label>
                      <Input type="number" value={selectedBlock.props.gridGap || 32} onChange={(e) => handlePropChange('gridGap', Number(e.target.value))} className="bg-background/50 border-white/10" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-xs font-semibold uppercase tracking-wide">Colors</Label>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Background</Label>
                      <div className="flex gap-2">
                        <Input type="color" value={selectedBlock.props.footerBackgroundColor || '#121726'} onChange={(e) => handlePropChange('footerBackgroundColor', e.target.value)} className="w-12 h-10 p-1 bg-background/50 border-white/10" />
                        <Input value={selectedBlock.props.footerBackgroundColor || '#121726'} onChange={(e) => handlePropChange('footerBackgroundColor', e.target.value)} className="bg-background/50 border-white/10" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Text Color</Label>
                      <div className="flex gap-2">
                        <Input type="color" value={selectedBlock.props.footerTextColor || '#C1C9D1'} onChange={(e) => handlePropChange('footerTextColor', e.target.value)} className="w-12 h-10 p-1 bg-background/50 border-white/10" />
                        <Input value={selectedBlock.props.footerTextColor || '#C1C9D1'} onChange={(e) => handlePropChange('footerTextColor', e.target.value)} className="bg-background/50 border-white/10" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              )}

              {/* BODY STYLE */}
              {!isHeader && !isFooter && (
                <TabsContent value="style" className="p-4 space-y-6 mt-0">
                  <div>
                    <button className="w-full flex items-center justify-between mb-3 text-sm font-medium">
                      <span>Typography</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="space-y-3 pl-2">
                      <div>
                        <Label className="text-xs text-muted-foreground mb-2 block">Font Family</Label>
                        <select className="w-full bg-background/50 border border-white/10 rounded-lg px-3 py-2 text-sm">
                          <option>Inter</option>
                          <option>Poppins</option>
                          <option>Roboto</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground mb-2 block">Size</Label>
                        <Input type="number" defaultValue="16" className="bg-background/50 border-white/10" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <button className="w-full flex items-center justify-between mb-3 text-sm font-medium">
                      <span>Colors</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="space-y-3 pl-2">
                      <div>
                        <Label className="text-xs text-muted-foreground mb-2 block">Text Color</Label>
                        <div className="flex gap-2">
                          <Input type="color" defaultValue="#ffffff" className="w-12 h-10 p-1 bg-background/50 border-white/10" />
                          <Input defaultValue="#ffffff" className="flex-1 bg-background/50 border-white/10" />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              )}

              {/* HEADER BEHAVIOR */}
              {isHeader && (
                <TabsContent value="behavior" className="p-4 space-y-4 mt-0">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-2 block">Collapse Breakpoint (px)</Label>
                    <Input type="number" value={selectedBlock.props.collapseBreakpoint || 768} onChange={(e) => handlePropChange('collapseBreakpoint', Number(e.target.value))} className="bg-background/50 border-white/10" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Navigation collapses to hamburger menu below this width
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wide">Keyboard Shortcuts</Label>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• "/" focuses search</div>
                      <div>• "g h" navigates to Home</div>
                      <div>• "g b" opens Builder</div>
                    </div>
                  </div>
                </TabsContent>
              )}

              {/* FOOTER BEHAVIOR */}
              {isFooter && (
                <TabsContent value="behavior" className="p-4 space-y-4 mt-0">
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wide">Newsletter</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Form submit shows success toast
                    </p>
                  </div>
                </TabsContent>
              )}

              {/* BODY BEHAVIOR */}
              {!isHeader && !isFooter && (
                <TabsContent value="behavior" className="p-4 space-y-4 mt-0">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-2 block">Hover Effect</Label>
                    <select className="w-full bg-background/50 border border-white/10 rounded-lg px-3 py-2 text-sm">
                      <option>None</option>
                      <option>Scale Up</option>
                      <option>Fade</option>
                      <option>Lift</option>
                    </select>
                  </div>
                </TabsContent>
              )}

              {/* VISIBILITY TAB (Header & Footer only) */}
              {isStructure && (
                <TabsContent value="visibility" className="p-4 space-y-4 mt-0">
                  <Label className="text-xs font-semibold uppercase tracking-wide">Device Visibility</Label>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Show on Mobile</Label>
                    <Switch checked={selectedBlock.props.visibleMobile !== false} onCheckedChange={(checked) => handlePropChange('visibleMobile', checked)} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Show on Tablet</Label>
                    <Switch checked={selectedBlock.props.visibleTablet !== false} onCheckedChange={(checked) => handlePropChange('visibleTablet', checked)} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Show on Desktop</Label>
                    <Switch checked={selectedBlock.props.visibleDesktop !== false} onCheckedChange={(checked) => handlePropChange('visibleDesktop', checked)} />
                  </div>
                </TabsContent>
              )}
            </div>
          </Tabs>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <div className="text-3xl">👆</div>
            </div>
            <h3 className="font-semibold mb-2">No Element Selected</h3>
            <p className="text-sm text-muted-foreground">
              Click on any element in the canvas to edit its properties
            </p>
          </div>
        </div>
      )}
    </div>
  );
};