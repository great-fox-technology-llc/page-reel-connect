import { Monitor, Smartphone, Tablet, ArrowLeft, Save, Eye, Upload, MoreVertical, Copy, Trash2, ChevronUp, ChevronDown, LayoutGrid, Edit3 } from "lucide-react";
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

type DeviceType = "desktop" | "tablet" | "mobile";

interface CanvasBlock {
  id: string;
  type: string;
  label: string;
  props: {
    content?: string;
    link?: string;
    src?: string;
    alt?: string;
    [key: string]: any;
  };
}

interface ContextMenuState {
  show: boolean;
  x: number;
  y: number;
  blockId: string | null;
}

interface CanvasProps {
  blocks: CanvasBlock[];
  selectedBlockId: string | null;
  onSelectBlock?: (blockId: string | null) => void;
  onBlocksChange?: (blocks: CanvasBlock[]) => void;
}

export type { CanvasBlock };

export const Canvas = ({ blocks, selectedBlockId, onSelectBlock, onBlocksChange }: CanvasProps) => {
  const navigate = useNavigate();
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [zoom, setZoom] = useState(100);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [hoveredBlockId, setHoveredBlockId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Auto-save whenever blocks change
  useEffect(() => {
    if (blocks.length > 0) {
      const draft = {
        id: `draft-${Date.now()}`,
        components: blocks,
        layout: { order: blocks.map(b => b.id) }
      };
      localStorage.setItem('canvas-draft', JSON.stringify(draft));
      console.info('Draft auto-saved', { id: draft.id, componentCount: blocks.length });
    }
  }, [blocks]);

  const deviceSizes = {
    desktop: "w-full",
    tablet: "w-[768px]",
    mobile: "w-[375px]",
  };

  const handleDrop = (e: React.DragEvent, insertIndex: number) => {
    e.preventDefault();
    setDragOverIndex(null);
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.type === 'component') {
        const newBlock: CanvasBlock = {
          id: `${data.componentId}-${Date.now()}`,
          type: data.componentId,
          label: data.componentLabel,
          props: {
            content: data.componentId === 'text' ? 'Enter your text here...' : '',
            link: '',
            src: '',
            alt: '',
          },
        };
        
        const newBlocks = [...blocks];
        newBlocks.splice(insertIndex, 0, newBlock);
        onBlocksChange?.(newBlocks);
        onSelectBlock?.(newBlock.id);
        toast.success(`${data.componentLabel} added to canvas`);
      }
    } catch (error) {
      console.error('Drop error:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleBack = () => {
    if (blocks.length > 0) {
      if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate('/dashboard');
      }
    } else {
      navigate('/dashboard');
    }
  };

  const handleSave = () => {
    const draft = {
      id: `draft-${Date.now()}`,
      components: blocks,
      layout: { order: blocks.map(b => b.id) }
    };
    localStorage.setItem('canvas-draft', JSON.stringify(draft));
    console.info('Previewing draft', { id: draft.id, componentCount: blocks.length });
    toast.success('Draft saved successfully');
  };

  const handlePreview = () => {
    if (blocks.length === 0) {
      toast.error('Add components before previewing');
      return;
    }
    
    // Save draft synchronously
    const draft = {
      id: `draft-${Date.now()}`,
      components: blocks,
      layout: { order: blocks.map(b => b.id) }
    };
    localStorage.setItem('canvas-draft', JSON.stringify(draft));
    console.info('Preview draft saved', { id: draft.id, componentCount: blocks.length, draft });
    
    // Small delay to ensure localStorage write completes
    setTimeout(() => {
      window.open('/preview?draftId=' + draft.id, '_blank');
    }, 100);
  };

  const handleDelete = (blockId: string) => {
    const deletedBlock = blocks.find(b => b.id === blockId);
    const newBlocks = blocks.filter(b => b.id !== blockId);
    onBlocksChange?.(newBlocks);
    onSelectBlock?.(null);
    
    toast.success('Component deleted', {
      action: {
        label: 'Undo',
        onClick: () => {
          if (deletedBlock) {
            const restored = [...blocks, deletedBlock];
            onBlocksChange?.(restored);
          }
        },
      },
    });
  };

  const handleDuplicate = (blockId: string) => {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;
    
    const newBlock: CanvasBlock = {
      ...block,
      id: `${block.type}-${Date.now()}`,
      props: { ...block.props },
    };
    
    const index = blocks.findIndex(b => b.id === blockId);
    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, newBlock);
    onBlocksChange?.(newBlocks);
    toast.success('Component duplicated');
  };

  const handleMoveUp = (blockId: string) => {
    const index = blocks.findIndex(b => b.id === blockId);
    if (index <= 0) return;
    
    const newBlocks = [...blocks];
    [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
    onBlocksChange?.(newBlocks);
  };

  const handleMoveDown = (blockId: string) => {
    const index = blocks.findIndex(b => b.id === blockId);
    if (index >= blocks.length - 1) return;
    
    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    onBlocksChange?.(newBlocks);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;
      const isInputFocused = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
      
      // ESC to go back or clear selection
      if (e.key === 'Escape') {
        if (selectedBlockId) {
          onSelectBlock?.(null);
        } else {
          handleBack();
        }
        return;
      }
      
      if (isInputFocused) return;
      
      // P for preview
      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        handlePreview();
        return;
      }
      
      if (!selectedBlockId) return;
      
      // Delete/Backspace to remove selected
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        handleDelete(selectedBlockId);
        return;
      }
      
      // Cmd/Ctrl + D to duplicate
      if (ctrlOrCmd && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault();
        handleDuplicate(selectedBlockId);
        return;
      }
      
      // Cmd/Ctrl + Arrow Up to move up
      if (ctrlOrCmd && e.key === 'ArrowUp') {
        e.preventDefault();
        handleMoveUp(selectedBlockId);
        return;
      }
      
      // Cmd/Ctrl + Arrow Down to move down
      if (ctrlOrCmd && e.key === 'ArrowDown') {
        e.preventDefault();
        handleMoveDown(selectedBlockId);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [blocks, selectedBlockId]);

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
            disabled={blocks.length === 0}
            title={blocks.length === 0 ? "Save a draft to preview" : "Preview (P)"}
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
            {/* Canvas Content */}
            <div className="min-h-[calc(100vh-120px)] p-8 pb-6">
              {blocks.length === 0 ? (
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg py-20 px-12 text-center transition-all min-h-[400px] flex flex-col items-center justify-center",
                    dragOverIndex === 0
                      ? "border-primary bg-primary/10"
                      : "border-gray-300 hover:border-primary/50 hover:bg-primary/5"
                  )}
                  onDrop={(e) => handleDrop(e, 0)}
                  onDragEnter={() => setDragOverIndex(0)}
                  onDragLeave={() => setDragOverIndex(null)}
                >
                  <LayoutGrid className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-600 font-medium mb-2 text-lg">Start Building Your Profile</p>
                  <p className="text-sm text-gray-500">
                    Drag components from the left sidebar to begin
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {/* Top drop zone */}
                  <div
                    className={cn(
                      "h-12 border-2 border-dashed rounded transition-all flex items-center justify-center",
                      dragOverIndex === 0
                        ? "border-primary bg-primary/10"
                        : "border-transparent hover:border-primary/30"
                    )}
                    onDrop={(e) => handleDrop(e, 0)}
                    onDragEnter={() => setDragOverIndex(0)}
                    onDragLeave={() => setDragOverIndex(null)}
                    onDragOver={handleDragOver}
                  >
                    {dragOverIndex === 0 && (
                      <span className="text-xs text-primary font-medium">Drop here</span>
                    )}
                  </div>

                  {/* Existing blocks */}
                  {blocks.map((block, index) => (
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
                            onClick={() => {
                              onSelectBlock?.(block.id);
                            }}
                            onMouseEnter={() => setHoveredBlockId(block.id)}
                            onMouseLeave={() => setHoveredBlockId(null)}
                          >
                            {/* Hover toolbar */}
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
                                    handleDelete(block.id);
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
                          <ContextMenuItem onClick={() => {
                            onSelectBlock?.(block.id);
                          }}>
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
                            disabled={index === blocks.length - 1}
                          >
                            <ChevronDown className="w-4 h-4 mr-2" />
                            Move Down
                          </ContextMenuItem>
                          <ContextMenuItem 
                            onClick={() => handleDelete(block.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>

                      {/* Drop zone after each block */}
                      <div
                        className={cn(
                          "h-12 border-2 border-dashed rounded transition-all flex items-center justify-center my-2",
                          dragOverIndex === index + 1
                            ? "border-primary bg-primary/10"
                            : "border-transparent hover:border-primary/30"
                        )}
                        onDrop={(e) => handleDrop(e, index + 1)}
                        onDragEnter={() => setDragOverIndex(index + 1)}
                        onDragLeave={() => setDragOverIndex(null)}
                        onDragOver={handleDragOver}
                      >
                        {dragOverIndex === index + 1 && (
                          <span className="text-xs text-primary font-medium">Drop here</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
