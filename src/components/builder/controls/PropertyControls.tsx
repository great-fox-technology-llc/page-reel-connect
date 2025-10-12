import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropertyControl } from '@/config/properties/header';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

interface PropertyControlsProps {
  control: PropertyControl;
  value: any;
  onChange: (value: any) => void;
}

export const PropertyControls = ({ control, value, onChange }: PropertyControlsProps) => {
  switch (control.type) {
    case 'text':
      return (
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">{control.label}</Label>
          <Input
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={control.placeholder}
            className="bg-background/50 border-border/50"
          />
        </div>
      );

    case 'select':
      return (
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">{control.label}</Label>
          <Select value={value || ''} onValueChange={onChange}>
            <SelectTrigger className="bg-background/50 border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {control.options?.map((option) => (
                <SelectItem key={option.value} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );

    case 'toggle':
      return (
        <div className="flex items-center justify-between py-2">
          <Label className="text-xs text-muted-foreground">{control.label}</Label>
          <Switch checked={value || false} onCheckedChange={onChange} />
        </div>
      );

    case 'slider':
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">{control.label}</Label>
            <span className="text-xs font-mono">{value || control.min}</span>
          </div>
          <Slider
            value={[value || control.min || 0]}
            onValueChange={(vals) => onChange(vals[0])}
            min={control.min}
            max={control.max}
            step={control.step}
            className="w-full"
          />
        </div>
      );

    case 'color':
      return (
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">{control.label}</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={value || '#000000'}
              onChange={(e) => onChange(e.target.value)}
              className="w-16 h-10 p-1 bg-background/50 border-border/50"
            />
            <Input
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="hsl(var(--primary))"
              className="flex-1 bg-background/50 border-border/50"
            />
          </div>
        </div>
      );

    case 'image':
      return (
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">{control.label}</Label>
          <Input
            type="url"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://..."
            className="bg-background/50 border-border/50"
          />
        </div>
      );

    case 'list':
      return <ListControl label={control.label} value={value} onChange={onChange} />;

    default:
      return null;
  }
};

const ListControl = ({ label, value, onChange }: { label: string; value: any[]; onChange: (value: any[]) => void }) => {
  const items = value || [];

  const addItem = () => {
    onChange([...items, { label: '', href: '#' }]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, val: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: val };
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="space-y-2">
        {items.map((item: any, index: number) => (
          <div key={index} className="flex gap-2 items-start p-2 bg-muted/20 rounded-md">
            <div className="flex-1 space-y-1">
              <Input
                value={item.label || ''}
                onChange={(e) => updateItem(index, 'label', e.target.value)}
                placeholder="Label"
                className="bg-background/50 border-border/50 text-xs h-8"
              />
              <Input
                value={item.href || item.url || ''}
                onChange={(e) => updateItem(index, item.href !== undefined ? 'href' : 'url', e.target.value)}
                placeholder="URL"
                className="bg-background/50 border-border/50 text-xs h-8"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(index)}
              className="h-8 w-8 shrink-0"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={addItem}
          className="w-full gap-2"
        >
          <Plus className="w-3 h-3" />
          Add Item
        </Button>
      </div>
    </div>
  );
};
