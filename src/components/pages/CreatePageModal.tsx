import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { createPage } from '@/lib/pagesStorage';
import { toast } from 'sonner';

interface CreatePageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreatePageModal = ({ open, onOpenChange }: CreatePageModalProps) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [buildMode, setBuildMode] = useState<'scratch' | 'template'>('scratch');

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error('Please enter a page title');
      return;
    }

    if (!slug.trim()) {
      toast.error('Please enter a page slug');
      return;
    }

    try {
      const page = createPage({
        title: title.trim(),
        slug: slug.trim(),
        status,
      });

      toast.success(`Page "${page.title}" created successfully`);
      onOpenChange(false);

      // Navigate based on build mode
      if (buildMode === 'scratch') {
        navigate('/profile-builder/new?mode=scratch');
      } else {
        navigate('/profile-builder/new?mode=template');
      }

      // Reset form
      setTitle('');
      setSlug('');
      setStatus('draft');
      setBuildMode('scratch');
    } catch (error) {
      toast.error('Failed to create page');
      console.error('[CreatePageModal] Error:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Page</DialogTitle>
          <DialogDescription>
            Set up your new page. Choose how you'd like to start building.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Page Title</Label>
            <Input
              id="title"
              placeholder="e.g., My Portfolio"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">Page Slug</Label>
            <Input
              id="slug"
              placeholder="e.g., my-portfolio"
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">
              URL: {window.location.origin}/preview/{slug || 'page-slug'}
            </p>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Visibility</Label>
            <RadioGroup value={status} onValueChange={(v) => setStatus(v as 'draft' | 'published')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="draft" id="draft" />
                <Label htmlFor="draft" className="font-normal cursor-pointer">
                  Draft - Only visible to you
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="published" id="published" />
                <Label htmlFor="published" className="font-normal cursor-pointer">
                  Published - Visible to everyone
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Build Mode */}
          <div className="space-y-2">
            <Label>How would you like to start?</Label>
            <RadioGroup value={buildMode} onValueChange={(v) => setBuildMode(v as 'scratch' | 'template')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="scratch" id="scratch" />
                <Label htmlFor="scratch" className="font-normal cursor-pointer">
                  Start from Scratch - Begin with a blank canvas
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="template" id="template" />
                <Label htmlFor="template" className="font-normal cursor-pointer">
                  Choose a Template - Pick a ready-made layout
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Create Page
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
