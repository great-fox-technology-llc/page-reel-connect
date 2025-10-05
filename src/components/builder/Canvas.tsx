import { Monitor, Smartphone, Tablet, ArrowLeft, Save, Eye, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type DeviceType = "desktop" | "tablet" | "mobile";

interface CanvasBlock {
  id: string;
  type: string;
  label: string;
  icon: string;
  content?: any;
}

export const Canvas = () => {
  const navigate = useNavigate();
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [zoom, setZoom] = useState(100);
  const [blocks, setBlocks] = useState<CanvasBlock[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

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
          icon: data.componentIcon,
        };
        
        const newBlocks = [...blocks];
        newBlocks.splice(insertIndex, 0, newBlock);
        setBlocks(newBlocks);
        setSelectedBlockId(newBlock.id);
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

  // Keyboard shortcut: ESC to go back to dashboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [blocks]);

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
          <Button variant="outline" size="sm" className="gap-2">
            <Save className="w-4 h-4" />
            Save
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
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
      <div className="flex-1 overflow-auto p-8 bg-muted/30">
        <div 
          className={cn(
            "mx-auto bg-white shadow-2xl rounded-lg transition-all duration-300",
            deviceSizes[device]
          )}
          style={{ 
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
            minHeight: "800px"
          }}
          onDragOver={handleDragOver}
        >
          {/* Browser Chrome */}
          <div className="h-10 bg-gray-100 rounded-t-lg border-b flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500">
              yoursite.socialbuilder.com
            </div>
          </div>

          {/* Canvas Content */}
          <div className="min-h-[760px] p-8">
            {blocks.length === 0 ? (
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-12 text-center transition-all",
                  dragOverIndex === 0
                    ? "border-primary bg-primary/10"
                    : "border-gray-300 hover:border-primary/50 hover:bg-primary/5"
                )}
                onDrop={(e) => handleDrop(e, 0)}
                onDragEnter={() => setDragOverIndex(0)}
                onDragLeave={() => setDragOverIndex(null)}
              >
                <div className="text-6xl mb-4">🎨</div>
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
                    <div
                      className={cn(
                        "border-2 rounded-lg p-6 transition-all cursor-pointer",
                        selectedBlockId === block.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-300 hover:border-primary/30"
                      )}
                      onClick={() => setSelectedBlockId(block.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{block.icon}</div>
                        <div>
                          <div className="font-medium text-gray-800">{block.label}</div>
                          <div className="text-sm text-gray-500">{block.type}</div>
                        </div>
                      </div>
                    </div>

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
  );
};
