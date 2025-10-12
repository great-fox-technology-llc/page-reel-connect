import { Button } from '@/components/ui/button';
import { type Template } from '@/data/templates';

interface TemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
  deviceView: 'desktop' | 'mobile';
}

export const TemplateCard = ({ template, onSelect, deviceView }: TemplateCardProps) => {
  return (
    <div className="glass rounded-lg overflow-hidden group hover:scale-105 transition-all duration-300 hover:shadow-glow">
      {/* Thumbnail */}
      <div className={`relative bg-muted overflow-hidden ${deviceView === 'mobile' ? 'aspect-[9/16]' : 'aspect-video'}`}>
        <img
          src={template.thumbnail}
          alt={template.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
          <Button onClick={() => onSelect(template)} className="w-full">
            Use Template
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
      </div>
    </div>
  );
};
