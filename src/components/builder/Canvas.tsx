import { Monitor, Smartphone, Tablet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

type DeviceType = "desktop" | "tablet" | "mobile";

export const Canvas = () => {
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [zoom, setZoom] = useState(100);

  const deviceSizes = {
    desktop: "w-full",
    tablet: "w-[768px]",
    mobile: "w-[375px]",
  };

  return (
    <div className="flex-1 flex flex-col bg-muted/30">
      {/* Top Toolbar */}
      <div className="h-14 bg-background/95 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">← Undo</Button>
          <Button variant="ghost" size="sm">Redo →</Button>
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
          <Button variant="outline" size="sm">💾 Save</Button>
          <Button variant="outline" size="sm">👁️ Preview</Button>
          <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
            ✓ Publish
          </Button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-auto p-8">
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
        >
          {/* Browser Chrome */}
          <div className="h-10 bg-gray-100 rounded-t-lg border-b flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500">
              sarahchen.socialbuilder.com
            </div>
          </div>

          {/* Canvas Content */}
          <div className="min-h-[760px] p-8">
            {/* Hero Drop Zone */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 mb-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
              <div className="text-primary mb-2">👤</div>
              <p className="text-gray-600 font-medium mb-1">Drop components here to build your hero section</p>
              <p className="text-sm text-gray-400">Start with a heading or image</p>
            </div>

            {/* Image Drop Zone */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                <div className="text-gray-400 mb-2">🖼️</div>
                <p className="text-sm text-gray-500">Drop an image component</p>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                <div className="text-gray-400 mb-2">📖</div>
                <p className="text-sm text-gray-500">Add your story here</p>
              </div>
            </div>

            {/* Heading Drop Zone */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
              <div className="text-gray-400 mb-2">H</div>
              <p className="text-sm text-gray-500">Add section heading</p>
            </div>

            {/* Product Grid Drop Zone */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 mb-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
              <div className="text-gray-400 mb-2">⊞</div>
              <p className="text-gray-600 font-medium mb-1">Drop a Product Grid or Feed component here</p>
              <p className="text-sm text-gray-400">Showcase your work and projects</p>
            </div>

            {/* Services Section */}
            <div className="border-t-2 border-gray-200 pt-6 mb-6">
              <p className="text-center text-gray-400 text-sm mb-4">Services heading</p>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                    <div className="text-gray-400 mb-2">📄</div>
                    <p className="text-xs text-gray-500">Service card</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Feed Drop Zone */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 mb-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
              <div className="text-gray-400 mb-2">📰</div>
              <p className="text-gray-600 font-medium mb-1">Drop a Feed component here</p>
              <p className="text-sm text-gray-400">Display your latest social media posts</p>
            </div>

            {/* Contact Section */}
            <div className="grid grid-cols-2 gap-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                <div className="text-gray-400 mb-2">📝</div>
                <p className="text-sm text-gray-500">Drop a form component</p>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                <div className="text-gray-400 mb-2">📍</div>
                <p className="text-sm text-gray-500">Contact Information</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Layers Panel */}
      <div className="h-12 bg-background/95 backdrop-blur-xl border-t border-white/10 flex items-center justify-between px-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary" /> Hero Section
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-secondary" /> About
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-accent-orange" /> Portfolio
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary" /> Services
          </span>
        </div>
        <Button variant="ghost" size="sm">Layers</Button>
      </div>
    </div>
  );
};
