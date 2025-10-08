import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
  content?: any;
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
  const [blocks, setBlocks] = useState<CanvasBlock[]>([]);

  useEffect(() => {
    const savedDraft = localStorage.getItem('canvas-draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        // Handle both old format (array) and new format (object with components)
        const components = Array.isArray(draft) ? draft : (draft.components || []);
        setBlocks(components);
        console.info('Preview loaded', { draftId, componentCount: components.length });
      } catch (error) {
        console.error('Failed to load draft:', error);
      }
    }
  }, [draftId]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-12">
        {blocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <div className="text-gray-300 mb-6">
              <LayoutGrid className="w-24 h-24" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Nothing to preview yet</h2>
            <p className="text-gray-500 text-center">
              Add components to your canvas and save to see them here
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {blocks.map((block) => {
              const props = block.content?.content || block.props?.content || block.content;
              const link = block.content?.link || block.props?.link;
              
              return (
                <div key={block.id} className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="text-primary flex-shrink-0">
                      {iconMap[block.type] || <Box className="w-8 h-8" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-gray-900 mb-2">{block.label}</h3>
                      <p className="text-sm text-gray-500 mb-4 capitalize">{block.type.replace('-', ' ')}</p>
                      {props && (
                        <div className="text-gray-700 whitespace-pre-wrap">
                          {link ? (
                            <a href={link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              {props}
                            </a>
                          ) : (
                            props
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
    </div>
  );
}
