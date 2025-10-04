import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const componentGroups = [
  {
    title: "BASIC COMPONENTS",
    isPro: false,
    items: [
      { id: "heading", label: "Heading", icon: "H" },
      { id: "text", label: "Text", icon: "¶" },
      { id: "image", label: "Image", icon: "🖼️" },
      { id: "video", label: "Video", icon: "🎥" },
      { id: "button", label: "Button", icon: "▭" },
      { id: "icon", label: "Icon", icon: "★" },
      { id: "divider", label: "Divider", icon: "─" },
      { id: "spacer", label: "Spacer", icon: "⬜" },
    ]
  },
  {
    title: "PREMIUM COMPONENTS",
    isPro: true,
    items: [
      { id: "button-group", label: "Button Group", icon: "▭▭" },
      { id: "card", label: "Card", icon: "📋" },
      { id: "feed", label: "Feed", icon: "📰" },
      { id: "stories", label: "Stories", icon: "⭕" },
      { id: "reels", label: "Reels", icon: "🎬" },
      { id: "product-grid", label: "Product Grid", icon: "⊞" },
      { id: "form", label: "Form", icon: "📝" },
      { id: "comments", label: "Comments", icon: "💬" },
    ]
  },
  {
    title: "LAYOUT",
    isPro: false,
    items: [
      { id: "container", label: "Container", icon: "▢" },
      { id: "columns", label: "Columns", icon: "⫴" },
      { id: "grid", label: "Grid", icon: "⊞" },
      { id: "section", label: "Section", icon: "▭" },
    ]
  },
  {
    title: "TEMPLATES",
    isPro: false,
    items: [
      { id: "hero", label: "Hero Section", icon: "🚀" },
      { id: "portfolio", label: "Portfolio Grid", icon: "🎨" },
      { id: "contact", label: "Contact Form", icon: "📧" },
    ]
  },
];

export const ComponentLibrary = () => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    componentGroups.map(g => g.title)
  );

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  return (
    <div className="w-64 bg-background/95 backdrop-blur-xl border-r border-white/10 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <h2 className="font-bold mb-3">Components</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search components..." 
            className="pl-9 bg-background/50 border-white/10 focus:border-primary/50"
          />
        </div>
      </div>

      {/* Component Groups */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {componentGroups.map((group) => {
          const isExpanded = expandedGroups.includes(group.title);
          
          return (
            <div key={group.title}>
              <button
                onClick={() => toggleGroup(group.title)}
                className="w-full flex items-center justify-between px-2 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span>{group.title}</span>
                  {group.isPro && <Badge className="text-[10px] px-1.5 py-0 bg-accent-orange/20 text-accent-orange border-accent-orange/30">PRO</Badge>}
                </div>
                <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? '' : '-rotate-90'}`} />
              </button>
              
              {isExpanded && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      draggable
                      className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-background/50 hover:bg-primary/10 hover:border-primary/50 border border-white/10 transition-all cursor-move group"
                    >
                      <div className="text-2xl">{item.icon}</div>
                      <span className="text-xs text-center group-hover:text-primary transition-colors">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Media Library */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-muted-foreground">MEDIA LIBRARY</h3>
          <Badge className="text-[10px] px-1.5 py-0 bg-primary/20 text-primary border-primary/30">Upload</Badge>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square rounded-lg bg-background/50 border border-white/10" />
          ))}
          <button className="aspect-square rounded-lg bg-background/50 border border-dashed border-white/20 hover:border-primary/50 flex items-center justify-center text-2xl text-muted-foreground hover:text-primary transition-colors">
            +
          </button>
        </div>
      </div>
    </div>
  );
};
