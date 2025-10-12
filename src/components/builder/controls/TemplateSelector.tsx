import { LayoutTemplate } from '@/types/layout';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  templates: LayoutTemplate<any>[];
  value?: string;
  onApply: (templateId: string) => void;
}

export const TemplateSelector = ({ templates, value, onApply }: TemplateSelectorProps) => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onApply(template.id)}
            className={`relative p-3 rounded-lg border-2 transition-all hover:border-primary/50 ${
              value === template.id
                ? 'border-primary bg-primary/10'
                : 'border-border/50 bg-background/50'
            }`}
          >
            {value === template.id && (
              <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-3 h-3 text-primary-foreground" />
              </div>
            )}
            <div className="aspect-video bg-muted/30 rounded mb-2 flex items-center justify-center">
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-full object-cover rounded opacity-60"
              />
            </div>
            <p className="text-xs font-medium text-center">{template.name}</p>
          </button>
        ))}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const minimalTemplate = templates.find((t) => t.name === 'Minimal');
          if (minimalTemplate) onApply(minimalTemplate.id);
        }}
        className="w-full text-xs"
      >
        Reset to Minimal
      </Button>
    </div>
  );
};
