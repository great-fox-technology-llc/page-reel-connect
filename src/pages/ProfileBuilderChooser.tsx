import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LayoutTemplate, Plus } from 'lucide-react';

export default function ProfileBuilderChooser() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'template') {
      navigate('/templates');
    } else if (mode === 'scratch') {
      navigate('/profile-builder?mode=scratch');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Start Building Your Page</h1>
          <p className="text-muted-foreground text-lg">Choose how you'd like to begin</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Choose Template */}
          <div className="glass rounded-2xl p-8 hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <LayoutTemplate className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Choose Template</h2>
            <p className="text-muted-foreground mb-6 flex-1">
              Pick a ready-made layout and customize it to match your vision. Perfect for getting started quickly.
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/templates')}
              className="w-full"
            >
              Browse Templates
            </Button>
          </div>

          {/* Start from Scratch */}
          <div className="glass rounded-2xl p-8 hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
              <Plus className="w-10 h-10 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Start from Scratch</h2>
            <p className="text-muted-foreground mb-6 flex-1">
              Begin with a blank page and add components one by one. Full creative control from the ground up.
            </p>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/profile-builder?mode=scratch')}
              className="w-full"
            >
              Start Building
            </Button>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button variant="ghost" onClick={() => navigate('/pages')}>
            ← Back to Pages
          </Button>
        </div>
      </div>
    </div>
  );
}
