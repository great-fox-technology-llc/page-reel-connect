import { X, ChevronDown, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export const PropertiesPanel = () => {
  const [elementSelected, setElementSelected] = useState(false);
  const [showLayers, setShowLayers] = useState(false);

  return (
    <div className="w-80 bg-background/95 backdrop-blur-xl border-l border-white/10 flex flex-col h-full">
      {/* Header */}
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

      {/* Layers Panel (toggleable) */}
      {showLayers && (
        <div className="border-b border-white/10 bg-background/50">
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="font-medium">Page Structure</span>
              <Button variant="ghost" size="sm" className="h-6 text-xs">
                Collapse All
              </Button>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 cursor-pointer">
                <ChevronDown className="w-3 h-3" />
                <span>Hero Section</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 cursor-pointer ml-4">
                <span className="text-muted-foreground">Heading</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 cursor-pointer ml-4">
                <span className="text-muted-foreground">Button</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 cursor-pointer">
                <ChevronDown className="w-3 h-3" />
                <span>Content Section</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {elementSelected ? (
        <>
          {/* Property Tabs */}
          <Tabs defaultValue="content" className="flex-1 flex flex-col">
            <TabsList className="w-full grid grid-cols-3 bg-background/50">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="style">Style</TabsTrigger>
              <TabsTrigger value="behavior">Behavior</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto">
              <TabsContent value="content" className="p-4 space-y-4 mt-0">
                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Text Content</Label>
                  <Input placeholder="Enter text..." className="bg-background/50 border-white/10" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Link URL</Label>
                  <Input placeholder="https://..." className="bg-background/50 border-white/10" />
                </div>
              </TabsContent>

              <TabsContent value="style" className="p-4 space-y-6 mt-0">
                {/* Typography */}
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
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Weight</Label>
                      <select className="w-full bg-background/50 border border-white/10 rounded-lg px-3 py-2 text-sm">
                        <option value="400">Regular</option>
                        <option value="500">Medium</option>
                        <option value="600">Semibold</option>
                        <option value="700">Bold</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Colors */}
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
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Background</Label>
                      <div className="flex gap-2">
                        <Input type="color" defaultValue="#4368D9" className="w-12 h-10 p-1 bg-background/50 border-white/10" />
                        <Input defaultValue="#4368D9" className="flex-1 bg-background/50 border-white/10" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spacing */}
                <div>
                  <button className="w-full flex items-center justify-between mb-3 text-sm font-medium">
                    <span>Spacing</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="space-y-3 pl-2">
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Padding</Label>
                      <div className="grid grid-cols-4 gap-2">
                        <Input type="number" defaultValue="16" placeholder="Top" className="bg-background/50 border-white/10" />
                        <Input type="number" defaultValue="16" placeholder="Right" className="bg-background/50 border-white/10" />
                        <Input type="number" defaultValue="16" placeholder="Bottom" className="bg-background/50 border-white/10" />
                        <Input type="number" defaultValue="16" placeholder="Left" className="bg-background/50 border-white/10" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Border */}
                <div>
                  <button className="w-full flex items-center justify-between mb-3 text-sm font-medium">
                    <span>Border & Radius</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="space-y-3 pl-2">
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Border Radius</Label>
                      <div className="flex items-center gap-3">
                        <Slider defaultValue={[8]} max={50} step={1} className="flex-1" />
                        <span className="text-sm text-muted-foreground w-8">8px</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

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
                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Animation</Label>
                  <select className="w-full bg-background/50 border border-white/10 rounded-lg px-3 py-2 text-sm">
                    <option>None</option>
                    <option>Fade In</option>
                    <option>Slide Up</option>
                    <option>Zoom In</option>
                  </select>
                </div>
              </TabsContent>
            </div>
          </Tabs>

          {/* Global Styles Section */}
          <div className="p-4 border-t border-white/10">
            <h3 className="text-sm font-semibold mb-3">Global Styles</h3>
            <div className="space-y-2">
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">Primary Color</Label>
                <div className="flex gap-2">
                  <Input type="color" defaultValue="#4368D9" className="w-12 h-10 p-1 bg-background/50 border-white/10" />
                  <Input defaultValue="#4368D9" className="flex-1 bg-background/50 border-white/10" />
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">Secondary Color</Label>
                <div className="flex gap-2">
                  <Input type="color" defaultValue="#D9C143" className="w-12 h-10 p-1 bg-background/50 border-white/10" />
                  <Input defaultValue="#D9C143" className="flex-1 bg-background/50 border-white/10" />
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">Font Family</Label>
                <select className="w-full bg-background/50 border border-white/10 rounded-lg px-3 py-2 text-sm">
                  <option>Inter</option>
                  <option>Poppins</option>
                  <option>Roboto</option>
                </select>
              </div>
            </div>
          </div>
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
