import { Layers, Monitor, Tablet, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { headerProperties } from "@/config/properties/header";
import { footerProperties } from "@/config/properties/footer";
import { PropertyControls } from "./controls/PropertyControls";
import { TemplateSelector } from "./controls/TemplateSelector";
import { headerTemplates } from "@/config/templates/header";
import { footerTemplates } from "@/config/templates/footer";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface CanvasBlock {
  id: string;
  type: string;
  label: string;
  zone?: 'header' | 'body' | 'footer';
  props: {
    [key: string]: any;
  };
}

interface PropertiesPanelProps {
  selectedBlock?: CanvasBlock | null;
  onUpdateProps?: (blockId: string, props: any) => void;
}

type DeviceType = "desktop" | "tablet" | "mobile";

export const PropertiesPanel = ({ selectedBlock, onUpdateProps }: PropertiesPanelProps) => {
  const [showLayers, setShowLayers] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [openGroups, setOpenGroups] = useState<string[]>(["Content", "Style", "Advanced"]);

  const handlePropChange = (key: string, value: any) => {
    if (selectedBlock && onUpdateProps) {
      // Handle nested keys like 'logo.text'
      if (key.includes('.')) {
        const keys = key.split('.');
        const newProps: Record<string, any> = { ...selectedBlock.props };
        let current: any = newProps;
        
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) current[keys[i]] = {};
          current = current[keys[i]];
        }
        
        current[keys[keys.length - 1]] = value;
        onUpdateProps(selectedBlock.id, newProps);
      } else {
        onUpdateProps(selectedBlock.id, { [key]: value } as any);
      }
    }
  };

  const handleTemplateApply = (templateId: string) => {
    if (!selectedBlock || !onUpdateProps) return;

    const isHeader = selectedBlock.type === 'header';
    const templates: any = isHeader ? headerTemplates : footerTemplates;
    const template = templates.find((t: any) => t.id === templateId);

    if (template) {
      const updatedProps: any = template.apply(selectedBlock.props);
      onUpdateProps(selectedBlock.id, updatedProps);
    }
  };

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  const isHeader = selectedBlock?.type === 'header';
  const isFooter = selectedBlock?.type === 'footer';
  const propertyGroups = isHeader ? headerProperties : isFooter ? footerProperties : [];

  return (
    <div className="w-80 bg-background/95 backdrop-blur-xl border-l border-border/50 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-foreground">Properties</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLayers(!showLayers)}
            className="gap-2"
          >
            <Layers className="w-4 h-4" />
          </Button>
        </div>

        {/* Device Toggle */}
        <div className="flex gap-1 p-1 bg-muted/30 rounded-lg">
          <Button
            variant={device === "desktop" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setDevice("desktop")}
            className="flex-1 gap-2"
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant={device === "tablet" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setDevice("tablet")}
            className="flex-1 gap-2"
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button
            variant={device === "mobile" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setDevice("mobile")}
            className="flex-1 gap-2"
          >
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {selectedBlock ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="w-full grid grid-cols-3 bg-muted/30 m-4 mb-0">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            {/* Template Selector for Header/Footer */}
            {(isHeader || isFooter) && activeTab === "content" && (
              <div className="p-4 border-b border-border/50">
                <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  Layout Templates
                </h3>
                <TemplateSelector
                  templates={isHeader ? headerTemplates : footerTemplates}
                  value={selectedBlock.props.templateId}
                  onApply={handleTemplateApply}
                />
              </div>
            )}

            {/* Dynamic Property Groups */}
            <TabsContent value="content" className="p-4 space-y-4 mt-0">
              {propertyGroups
                .filter((group) => group.group === "Content")
                .map((group, index) => (
                  <Collapsible
                    key={index}
                    open={openGroups.includes(group.group)}
                    onOpenChange={() => toggleGroup(group.group)}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide hover:text-foreground transition-colors">
                      <span>{group.label || group.group}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${openGroups.includes(group.group) ? '' : '-rotate-90'}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-4 pt-2">
                      {group.controls.map((control) => (
                        <PropertyControls
                          key={control.key}
                          control={control}
                          value={getNestedValue(selectedBlock.props, control.key)}
                          onChange={(value) => handlePropChange(control.key, value)}
                        />
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
            </TabsContent>

            <TabsContent value="style" className="p-4 space-y-4 mt-0">
              {propertyGroups
                .filter((group) => group.group === "Style")
                .map((group, index) => (
                  <Collapsible
                    key={index}
                    open={openGroups.includes(group.group)}
                    onOpenChange={() => toggleGroup(group.group)}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide hover:text-foreground transition-colors">
                      <span>{group.label || group.group}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${openGroups.includes(group.group) ? '' : '-rotate-90'}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-4 pt-2">
                      {group.controls.map((control) => (
                        <PropertyControls
                          key={control.key}
                          control={control}
                          value={getNestedValue(selectedBlock.props, control.key)}
                          onChange={(value) => handlePropChange(control.key, value)}
                        />
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
            </TabsContent>

            <TabsContent value="advanced" className="p-4 space-y-4 mt-0">
              {propertyGroups
                .filter((group) => group.group === "Advanced")
                .map((group, index) => (
                  <Collapsible
                    key={index}
                    open={openGroups.includes(group.group)}
                    onOpenChange={() => toggleGroup(group.group)}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide hover:text-foreground transition-colors">
                      <span>{group.label || group.group}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${openGroups.includes(group.group) ? '' : '-rotate-90'}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-4 pt-2">
                      {group.controls.map((control) => (
                        <PropertyControls
                          key={control.key}
                          control={control}
                          value={getNestedValue(selectedBlock.props, control.key)}
                          onChange={(value) => handlePropChange(control.key, value)}
                        />
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
            </TabsContent>
          </div>
        </Tabs>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div className="space-y-3">
            <Layers className="w-12 h-12 mx-auto text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              Select an element to edit its properties
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
