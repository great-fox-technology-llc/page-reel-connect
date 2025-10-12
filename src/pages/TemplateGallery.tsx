import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { templates, type Template } from '@/data/templates';
import { saveSelectedTemplate } from '@/lib/templateStorage';
import { Search, Monitor, Smartphone, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type Category = 'profile' | 'landing' | 'portfolio' | 'store' | 'blog' | 'creator' | 'agency' | 'event';

const categories: { id: Category; label: string }[] = [
  { id: 'profile', label: 'Profile Templates' },
  { id: 'landing', label: 'Landing' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'store', label: 'Store' },
  { id: 'blog', label: 'Blog' },
  { id: 'creator', label: 'Creator' },
  { id: 'agency', label: 'Agency' },
  { id: 'event', label: 'Event' },
];

export default function TemplateGallery() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Category>('profile');
  const [searchQuery, setSearchQuery] = useState('');
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');

  const filteredTemplates = useMemo(() => {
    let result = templates.filter((t) => t.category === selectedCategory);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) => t.name.toLowerCase().includes(query) || t.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  const handleSelectTemplate = (template: Template) => {
    saveSelectedTemplate(template.id);
    toast.success(`Template "${template.name}" selected`);
    navigate(`/profile-builder?template=${template.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/profile-builder/new')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl font-bold mb-2">Template Gallery</h1>
          <p className="text-muted-foreground">Choose a professional template to start your page</p>
        </div>

        {/* Category Chips */}
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat.id)}
                className="whitespace-nowrap"
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* View Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Device Toggle */}
          <div className="flex gap-2">
            <Button
              variant={deviceView === 'desktop' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setDeviceView('desktop')}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={deviceView === 'mobile' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setDeviceView('mobile')}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length === 0 ? (
          <div className="glass rounded-lg p-12 text-center">
            <p className="text-muted-foreground text-lg">
              {selectedCategory === 'profile' ? 'No templates found' : 'Templates coming soon'}
            </p>
          </div>
        ) : (
          <div className={cn(
            "grid gap-6",
            deviceView === 'mobile' 
              ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          )}>
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={handleSelectTemplate}
                deviceView={deviceView}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
