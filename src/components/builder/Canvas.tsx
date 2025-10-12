import { Monitor, Smartphone, Tablet, ArrowLeft, Save, Eye, Upload, MoreVertical, Copy, Trash2, ChevronUp, ChevronDown, LayoutGrid, Edit3, LayoutDashboard, PanelBottom } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { HeaderElement } from "@/components/builderElements/Header";
import { FooterElement } from "@/components/builderElements/Footer";

type DeviceType = "desktop" | "tablet" | "mobile";

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

interface CanvasProps {
  headerBlock: CanvasBlock | null;
  bodyBlocks: CanvasBlock[];
  footerBlock: CanvasBlock | null;
  selectedBlockId: string | null;
  onSelectBlock?: (blockId: string | null) => void;
  onHeaderChange?: (block: CanvasBlock | null) => void;
  onBodyBlocksChange?: (blocks: CanvasBlock[]) => void;
  onFooterChange?: (block: CanvasBlock | null) => void;
  currentSlug?: string | null;
  onSaveToDatabase?: (draft: { header: CanvasBlock | null; body: CanvasBlock[]; footer: CanvasBlock | null }) => Promise<void>;
}

export type { CanvasBlock };

export const Canvas = ({ 
  headerBlock, 
  bodyBlocks = [], 
  footerBlock, 
  selectedBlockId, 
  onSelectBlock, 
  onHeaderChange, 
  onBodyBlocksChange, 
  onFooterChange,
  currentSlug,
  onSaveToDatabase
}: CanvasProps) => {
  const navigate = useNavigate();
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [zoom, setZoom] = useState(100);
  const [headerDragOver, setHeaderDragOver] = useState(false);
  const [bodyDragOverIndex, setBodyDragOverIndex] = useState<number | null>(null);
  const [footerDragOver, setFooterDragOver] = useState(false);
  const [hoveredBlockId, setHoveredBlockId] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Safety check for undefined props during hot reload
  const safeBodyBlocks = bodyBlocks || [];

  // Auto-save whenever blocks change
  useEffect(() => {
    const draft = {
      id: `draft-${Date.now()}`,
      header: headerBlock,
      body: safeBodyBlocks,
      footer: footerBlock,
      layout: {
        headerOrder: headerBlock ? [headerBlock.id] : [],
        bodyOrder: safeBodyBlocks.map(b => b.id),
        footerOrder: footerBlock ? [footerBlock.id] : []
      }
    };
    localStorage.setItem('canvas-draft', JSON.stringify(draft));
    setHasUnsavedChanges(true);
    console.info('Draft auto-saved', { id: draft.id, zones: { header: !!headerBlock, body: safeBodyBlocks.length, footer: !!footerBlock } });
  }, [headerBlock, safeBodyBlocks, footerBlock]);

  const deviceSizes = {
    desktop: "w-full",
    tablet: "w-[768px]",
    mobile: "w-[375px]",
  };

  const handleHeaderDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setHeaderDragOver(false);
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.type === 'component' && data.componentId === 'header') {
        if (headerBlock) {
          toast.error('Only one header per page');
          return;
        }
        
        const newBlock: CanvasBlock = {
          id: `header-${Date.now()}`,
          type: 'header',
          label: 'Header',
          zone: 'header',
          props: {
            layout: 'logo-nav-actions',
            logo: { type: 'text', text: 'YourBrand' },
            nav: [
              { label: 'Home', href: '/' },
              { label: 'Explore', href: '/discover' },
              { label: 'Store', href: '/products' },
              { label: 'Contact', href: '/contact' },
            ],
            showProfile: true,
            sticky: false,
            height: 64,
            background: 'hsl(var(--background))',
            textColor: 'hsl(var(--foreground))',
            collapseToBurger: true,
          },
        };
        
        onHeaderChange?.(newBlock);
        onSelectBlock?.(newBlock.id);
        toast.success('Header added to canvas');
      }
    } catch (error) {
      console.error('Header drop error:', error);
    }
  };

  const handleFooterDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setFooterDragOver(false);
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.type === 'component' && data.componentId === 'footer') {
        if (footerBlock) {
          toast.error('Only one footer per page');
          return;
        }
        
        const newBlock: CanvasBlock = {
          id: `footer-${Date.now()}`,
          type: 'footer',
          label: 'Footer',
          zone: 'footer',
          props: {
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
        };
        
        onFooterChange?.(newBlock);
        onSelectBlock?.(newBlock.id);
        toast.success('Footer added to canvas');
      }
    } catch (error) {
      console.error('Footer drop error:', error);
    }
  };

  const handleBodyDrop = (e: React.DragEvent, insertIndex: number) => {
    e.preventDefault();
    setBodyDragOverIndex(null);
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.type === 'component') {
        if (data.componentId === 'header' || data.componentId === 'footer') {
          toast.error(`${data.componentLabel} must be placed in its designated zone`);
          return;
        }
        
        const newBlock: CanvasBlock = {
          id: `${data.componentId}-${Date.now()}`,
          type: data.componentId,
          label: data.componentLabel,
          zone: 'body',
          props: {
            content: data.componentId === 'text' ? 'Enter your text here...' : '',
            link: '',
            src: '',
            alt: '',
          },
        };
        
        const newBlocks = [...safeBodyBlocks];
        newBlocks.splice(insertIndex, 0, newBlock);
        onBodyBlocksChange?.(newBlocks);
        onSelectBlock?.(newBlock.id);
        toast.success(`${data.componentLabel} added to canvas`);
      }
    } catch (error) {
      console.error('Body drop error:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleBack = () => {
    if (hasUnsavedChanges) {
      if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate('/dashboard');
      }
    } else {
      navigate('/dashboard');
    }
  };

  const handleSave = async () => {
    const draft = {
      header: headerBlock,
      body: safeBodyBlocks,
      footer: footerBlock,
    };
    
    // Save to database
    if (onSaveToDatabase) {
      try {
        await onSaveToDatabase(draft);
        setHasUnsavedChanges(false);
        toast.success('Changes saved to database');
      } catch (error) {
        toast.error('Failed to save to database');
        console.error('Save error:', error);
      }
    }
    
    // Keep localStorage as backup
    const localDraft = {
      id: `draft-${Date.now()}`,
      ...draft,
      layout: {
        headerOrder: headerBlock ? [headerBlock.id] : [],
        bodyOrder: safeBodyBlocks.map(b => b.id),
        footerOrder: footerBlock ? [footerBlock.id] : []
      }
    };
    localStorage.setItem('canvas-draft', JSON.stringify(localDraft));
  };

  const handlePreview = async () => {
    if (!headerBlock && safeBodyBlocks.length === 0 && !footerBlock) {
      toast.error('Add components before previewing');
      return;
    }
    
    // Save to database first
    await handleSave();
    
    // Give state a moment to update after save
    setTimeout(() => {
      if (currentSlug) {
        window.open(`/preview/${currentSlug}`, '_blank');
      } else {
        toast.error('Please save your page first to get a preview URL');
      }
    }, 300);
  };

  const handleDeleteHeader = () => {
    if (headerBlock) {
      const deleted = headerBlock;
      onHeaderChange?.(null);
      onSelectBlock?.(null);
      
      toast.success('Header deleted', {
        action: {
          label: 'Undo',
          onClick: () => {
            onHeaderChange?.(deleted);
          },
        },
      });
    }
  };

  const handleDeleteFooter = () => {
    if (footerBlock) {
      const deleted = footerBlock;
      onFooterChange?.(null);
      onSelectBlock?.(null);
      
      toast.success('Footer deleted', {
        action: {
          label: 'Undo',
          onClick: () => {
            onFooterChange?.(deleted);
          },
        },
      });
    }
  };

  const handleDeleteBody = (blockId: string) => {
    const deletedBlock = safeBodyBlocks.find(b => b.id === blockId);
    const newBlocks = safeBodyBlocks.filter(b => b.id !== blockId);
    onBodyBlocksChange?.(newBlocks);
    onSelectBlock?.(null);
    
    toast.success('Component deleted', {
      action: {
        label: 'Undo',
        onClick: () => {
          if (deletedBlock) {
            onBodyBlocksChange?.([...safeBodyBlocks, deletedBlock]);
          }
        },
      },
    });
  };

  const handleDuplicate = (blockId: string) => {
    const block = safeBodyBlocks.find(b => b.id === blockId);
    if (!block) return;
    
    const newBlock: CanvasBlock = {
      ...block,
      id: `${block.type}-${Date.now()}`,
      props: { ...block.props },
    };
    
    const index = safeBodyBlocks.findIndex(b => b.id === blockId);
    const newBlocks = [...safeBodyBlocks];
    newBlocks.splice(index + 1, 0, newBlock);
    onBodyBlocksChange?.(newBlocks);
    toast.success('Component duplicated');
  };

  const handleMoveUp = (blockId: string) => {
    const index = safeBodyBlocks.findIndex(b => b.id === blockId);
    if (index <= 0) return;
    
    const newBlocks = [...safeBodyBlocks];
    [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
    onBodyBlocksChange?.(newBlocks);
  };

  const handleMoveDown = (blockId: string) => {
    const index = safeBodyBlocks.findIndex(b => b.id === blockId);
    if (index >= safeBodyBlocks.length - 1) return;
    
    const newBlocks = [...safeBodyBlocks];
    [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    onBodyBlocksChange?.(newBlocks);
  };

  const scrollToHeader = () => {
    const headerEl = document.getElementById('canvas-header-zone');
    headerEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToFooter = () => {
    const footerEl = document.getElementById('canvas-footer-zone');
    footerEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;
      const isInputFocused = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
      
      if (e.key === 'Escape') {
        if (selectedBlockId) {
          onSelectBlock?.(null);
        } else {
          handleBack();
        }
        return;
      }
      
      if (isInputFocused) return;
      
      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        handlePreview();
        return;
      }
      
      if (!selectedBlockId) return;
      
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        if (headerBlock?.id === selectedBlockId) {
          handleDeleteHeader();
        } else if (footerBlock?.id === selectedBlockId) {
          handleDeleteFooter();
        } else {
          handleDeleteBody(selectedBlockId);
        }
        return;
      }
      
      if (ctrlOrCmd && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault();
        handleDuplicate(selectedBlockId);
        return;
      }
      
      if (ctrlOrCmd && e.key === 'ArrowUp') {
        e.preventDefault();
        handleMoveUp(selectedBlockId);
        return;
      }
      
      if (ctrlOrCmd && e.key === 'ArrowDown') {
        e.preventDefault();
        handleMoveDown(selectedBlockId);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [headerBlock, safeBodyBlocks, footerBlock, selectedBlockId]);

  return (
    <div className="flex-1 flex flex-col bg-muted/30">
      {/* Top Toolbar */}
      <div className="h-14 bg-background/95 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2" title="Press ESC to go back">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="flex items-center gap-1 bg-background/50 rounded-lg p-1">
          <Button
            variant={device === "desktop" ? "default" : "ghost"}
            size="sm"
            onClick={() => setDevice("desktop")}
            className="gap-2"
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant={device === "tablet" ? "default" : "ghost"}
            size="sm"
            onClick={() => setDevice("tablet")}
            className="gap-2"
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button
            variant={device === "mobile" ? "default" : "ghost"}
            size="sm"
            onClick={() => setDevice("mobile")}
            className="gap-2"
          >
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToHeader}
            disabled={!headerBlock}
            title="Scroll to Header"
          >
            Header
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToFooter}
            disabled={!footerBlock}
            title="Scroll to Footer"
          >
            Footer
          </Button>
          <select 
            value={zoom} 
            onChange={(e) => setZoom(Number(e.target.value))}
            className="bg-background/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm"
          >
            <option value={50}>50%</option>
            <option value={75}>75%</option>
            <option value={100}>100%</option>
            <option value={125}>125%</option>
            <option value={150}>150%</option>
          </select>
          <Button variant="outline" size="sm" className="gap-2" onClick={handleSave}>
            <Save className="w-4 h-4" />
            Save
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={handlePreview}
            disabled={!headerBlock && safeBodyBlocks.length === 0 && !footerBlock}
            title="Preview (P)"
          >
            <Eye className="w-4 h-4" />
            Preview
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-primary to-primary-dark gap-2">
            <Upload className="w-4 h-4" />
            Publish
          </Button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-auto bg-muted/30" style={{ height: "calc(100vh - 56px)" }}>
        <div className="min-h-full flex items-start justify-center py-8 px-4">
          <div 
            ref={canvasRef}
            className={cn(
              "bg-white shadow-2xl transition-all duration-300 min-h-[calc(100vh-120px)]",
              deviceSizes[device]
            )}
            style={{ 
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
              maxWidth: "1200px"
            }}
            onDragOver={handleDragOver}
          >
            <div className="min-h-[calc(100vh-120px)] p-8 pb-6">
              {/* HEADER ZONE */}
              <div id="canvas-header-zone" className="mb-4">
                <div className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">
                  Header Zone (Single Instance)
                </div>
                {!headerBlock ? (
                  <div
                    className={cn(
                      "border-2 border-dashed rounded-lg py-12 px-8 text-center transition-all",
                      headerDragOver
                        ? "border-primary bg-primary/10"
                        : "border-gray-300 hover:border-primary/50 hover:bg-primary/5"
                    )}
                    onDrop={handleHeaderDrop}
                    onDragEnter={() => setHeaderDragOver(true)}
                    onDragLeave={() => setHeaderDragOver(false)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'copy';
                    }}
                  >
                    <LayoutDashboard className="w-12 h-12 text-gray-300 mb-3 mx-auto" />
                    <p className="text-gray-600 font-medium mb-1">Drop Header Here</p>
                    <p className="text-xs text-gray-500">
                      Drag the Header component from the left sidebar
                    </p>
                  </div>
                ) : (
                  <ContextMenu>
                    <ContextMenuTrigger>
                      <div
                        className={cn(
                          "relative border-2 rounded-lg p-6 transition-all cursor-pointer group",
                          selectedBlockId === headerBlock.id
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-gray-300 hover:border-primary/50"
                        )}
                        onClick={() => onSelectBlock?.(headerBlock.id)}
                      >
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="h-7 px-2 text-xs text-destructive hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteHeader();
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <HeaderElement 
                          {...(headerBlock.props as any)}
                          isSelected={selectedBlockId === headerBlock.id} 
                        />
                      </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem onClick={() => onSelectBlock?.(headerBlock.id)}>
                        Edit
                      </ContextMenuItem>
                      <ContextMenuItem onClick={handleDeleteHeader} className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                )}
              </div>

              {/* BODY ZONE */}
              <div className="mb-4">
                <div className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">
                  Body Zone (Multi Instance)
                </div>
                {safeBodyBlocks.length === 0 ? (
                  <div
                    className={cn(
                      "border-2 border-dashed rounded-lg py-20 px-12 text-center transition-all min-h-[400px] flex flex-col items-center justify-center",
                      bodyDragOverIndex === 0
                        ? "border-primary bg-primary/10"
                        : "border-gray-300 hover:border-primary/50 hover:bg-primary/5"
                    )}
                    onDrop={(e) => handleBodyDrop(e, 0)}
                    onDragEnter={() => setBodyDragOverIndex(0)}
                    onDragLeave={() => setBodyDragOverIndex(null)}
                    onDragOver={handleDragOver}
                  >
                    <LayoutGrid className="w-16 h-16 text-gray-300 mb-4" />
                    <p className="text-gray-600 font-medium mb-2 text-lg">Start Building Your Profile</p>
                    <p className="text-sm text-gray-500">
                      Drag components from the left sidebar to begin
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div
                      className={cn(
                        "h-12 border-2 border-dashed rounded transition-all flex items-center justify-center",
                        bodyDragOverIndex === 0
                          ? "border-primary bg-primary/10"
                          : "border-transparent hover:border-primary/30"
                      )}
                      onDrop={(e) => handleBodyDrop(e, 0)}
                      onDragEnter={() => setBodyDragOverIndex(0)}
                      onDragLeave={() => setBodyDragOverIndex(null)}
                      onDragOver={handleDragOver}
                    >
                      {bodyDragOverIndex === 0 && (
                        <span className="text-xs text-primary font-medium">Drop here</span>
                      )}
                    </div>

                    {safeBodyBlocks.map((block, index) => (
                      <div key={block.id}>
                        <ContextMenu>
                          <ContextMenuTrigger>
                            <div
                              className={cn(
                                "relative border-2 rounded-lg p-6 transition-all cursor-pointer group",
                                selectedBlockId === block.id
                                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                  : "border-gray-300 hover:border-primary/50"
                              )}
                              onClick={() => onSelectBlock?.(block.id)}
                              onMouseEnter={() => setHoveredBlockId(block.id)}
                              onMouseLeave={() => setHoveredBlockId(null)}
                            >
                              {(hoveredBlockId === block.id || selectedBlockId === block.id) && (
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    className="h-7 px-2 text-xs"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onSelectBlock?.(block.id);
                                    }}
                                    title="Edit"
                                  >
                                    <Edit3 className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    className="h-7 px-2 text-xs"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDuplicate(block.id);
                                    }}
                                    title="Duplicate (Cmd+D)"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    className="h-7 px-2 text-xs text-destructive hover:text-destructive"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteBody(block.id);
                                    }}
                                    title="Delete (Del)"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              )}
                              
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                                  {block.type.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-gray-800">{block.label}</div>
                                  <div className="text-xs text-gray-500 capitalize mb-2">{block.type.replace('-', ' ')}</div>
                                  <div className="text-sm text-gray-700 line-clamp-2">
                                    {block.props?.content || 'Click to edit...'}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </ContextMenuTrigger>
                          <ContextMenuContent>
                            <ContextMenuItem onClick={() => onSelectBlock?.(block.id)}>
                              Edit
                            </ContextMenuItem>
                            <ContextMenuItem onClick={() => handleDuplicate(block.id)}>
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicate
                            </ContextMenuItem>
                            <ContextMenuItem 
                              onClick={() => handleMoveUp(block.id)}
                              disabled={index === 0}
                            >
                              <ChevronUp className="w-4 h-4 mr-2" />
                              Move Up
                            </ContextMenuItem>
                            <ContextMenuItem 
                              onClick={() => handleMoveDown(block.id)}
                              disabled={index === safeBodyBlocks.length - 1}
                            >
                              <ChevronDown className="w-4 h-4 mr-2" />
                              Move Down
                            </ContextMenuItem>
                            <ContextMenuItem 
                              onClick={() => handleDeleteBody(block.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </ContextMenuItem>
                          </ContextMenuContent>
                        </ContextMenu>

                        <div
                          className={cn(
                            "h-12 border-2 border-dashed rounded transition-all flex items-center justify-center mt-2",
                            bodyDragOverIndex === index + 1
                              ? "border-primary bg-primary/10"
                              : "border-transparent hover:border-primary/30"
                          )}
                          onDrop={(e) => handleBodyDrop(e, index + 1)}
                          onDragEnter={() => setBodyDragOverIndex(index + 1)}
                          onDragLeave={() => setBodyDragOverIndex(null)}
                          onDragOver={handleDragOver}
                        >
                          {bodyDragOverIndex === index + 1 && (
                            <span className="text-xs text-primary font-medium">Drop here</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* FOOTER ZONE */}
              <div id="canvas-footer-zone">
                <div className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">
                  Footer Zone (Single Instance)
                </div>
                {!footerBlock ? (
                  <div
                    className={cn(
                      "border-2 border-dashed rounded-lg py-12 px-8 text-center transition-all",
                      footerDragOver
                        ? "border-primary bg-primary/10"
                        : "border-gray-300 hover:border-primary/50 hover:bg-primary/5"
                    )}
                    onDrop={handleFooterDrop}
                    onDragEnter={() => setFooterDragOver(true)}
                    onDragLeave={() => setFooterDragOver(false)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'copy';
                    }}
                  >
                    <PanelBottom className="w-12 h-12 text-gray-300 mb-3 mx-auto" />
                    <p className="text-gray-600 font-medium mb-1">Drop Footer Here</p>
                    <p className="text-xs text-gray-500">
                      Drag the Footer component from the left sidebar
                    </p>
                  </div>
                ) : (
                  <ContextMenu>
                    <ContextMenuTrigger>
                      <div
                        className={cn(
                          "relative border-2 rounded-lg p-6 transition-all cursor-pointer group",
                          selectedBlockId === footerBlock.id
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-gray-300 hover:border-primary/50"
                        )}
                        onClick={() => onSelectBlock?.(footerBlock.id)}
                      >
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="h-7 px-2 text-xs text-destructive hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteFooter();
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <FooterElement 
                          {...(footerBlock.props as any)}
                          isSelected={selectedBlockId === footerBlock.id} 
                        />
                      </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem onClick={() => onSelectBlock?.(footerBlock.id)}>
                        Edit
                      </ContextMenuItem>
                      <ContextMenuItem onClick={handleDeleteFooter} className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};