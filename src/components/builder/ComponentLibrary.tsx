import { 
  Search, 
  ChevronDown,
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
  Mail,
  LayoutDashboard,
  PanelBottom
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface ComponentItem {
  id: string;
  label: string;
}

const iconMap: Record<string, React.ReactNode> = {
  header: <LayoutDashboard className="w-5 h-5" />,
  footer: <PanelBottom className="w-5 h-5" />,
  heading: <Type className="w-5 h-5" />,
  text: <AlignLeft className="w-5 h-5" />,
  image: <ImageIcon className="w-5 h-5" />,
  video: <Video className="w-5 h-5" />,
  button: <SquareMousePointer className="w-5 h-5" />,
  icon: <Star className="w-5 h-5" />,
  divider: <Minus className="w-5 h-5" />,
  spacer: <MoveVertical className="w-5 h-5" />,
  card: <LayoutPanelTop className="w-5 h-5" />,
  "button-group": <Rows3 className="w-5 h-5" />,
  feed: <Newspaper className="w-5 h-5" />,
  stories: <Clapperboard className="w-5 h-5" />,
  reels: <PlaySquare className="w-5 h-5" />,
  "product-grid": <Grid3X3 className="w-5 h-5" />,
  form: <FileText className="w-5 h-5" />,
  comments: <MessageSquare className="w-5 h-5" />,
  container: <Box className="w-5 h-5" />,
  columns: <Columns2 className="w-5 h-5" />,
  grid: <LayoutGrid className="w-5 h-5" />,
  section: <RectangleHorizontal className="w-5 h-5" />,
  hero: <Rocket className="w-5 h-5" />,
  portfolio: <Palette className="w-5 h-5" />,
  contact: <Mail className="w-5 h-5" />,
};

const componentGroups = [
  {
    title: "STRUCTURE COMPONENTS",
    isPro: false,
    items: [
      { id: "header", label: "Header" },
      { id: "footer", label: "Footer" },
    ]
  },
  {
    title: "BASIC COMPONENTS",
    isPro: false,
    items: [
      { id: "heading", label: "Heading" },
      { id: "text", label: "Text" },
      { id: "image", label: "Image" },
      { id: "video", label: "Video" },
      { id: "button", label: "Button" },
      { id: "icon", label: "Icon" },
      { id: "divider", label: "Divider" },
      { id: "spacer", label: "Spacer" },
    ]
  },
  {
    title: "PREMIUM COMPONENTS",
    isPro: true,
    items: [
      { id: "button-group", label: "Button Group" },
      { id: "card", label: "Card" },
      { id: "feed", label: "Feed" },
      { id: "stories", label: "Stories" },
      { id: "reels", label: "Reels" },
      { id: "product-grid", label: "Product Grid" },
      { id: "form", label: "Form" },
      { id: "comments", label: "Comments" },
    ]
  },
  {
    title: "LAYOUT",
    isPro: false,
    items: [
      { id: "container", label: "Container" },
      { id: "columns", label: "Columns" },
      { id: "grid", label: "Grid" },
      { id: "section", label: "Section" },
    ]
  },
  {
    title: "TEMPLATES",
    isPro: false,
    items: [
      { id: "hero", label: "Hero Section" },
      { id: "portfolio", label: "Portfolio Grid" },
      { id: "contact", label: "Contact Form" },
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
                      onDragStart={(e) => {
                        e.dataTransfer.effectAllowed = 'copy';
                        e.dataTransfer.setData('application/json', JSON.stringify({
                          type: 'component',
                          componentId: item.id,
                          componentLabel: item.label,
                        }));
                      }}
                      className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-background/50 hover:bg-primary/10 border border-muted transition-all cursor-move group"
                    >
                      <div className="text-primary/70 group-hover:text-primary group-hover:scale-110 transition-all">
                        {iconMap[item.id]}
                      </div>
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

    </div>
  );
};
