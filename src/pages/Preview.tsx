import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface CanvasBlock {
  id: string;
  type: string;
  label: string;
  icon: string;
  content?: any;
}

export default function Preview() {
  const [searchParams] = useSearchParams();
  const draftId = searchParams.get('draftId');
  const [blocks, setBlocks] = useState<CanvasBlock[]>([]);

  useEffect(() => {
    // Load draft from localStorage or API
    const savedDraft = localStorage.getItem('canvas-draft');
    if (savedDraft) {
      try {
        setBlocks(JSON.parse(savedDraft));
      } catch (error) {
        console.error('Failed to load draft:', error);
      }
    }
  }, [draftId]);

  return (
    <div className="min-h-screen bg-white">
      {/* Render blocks as they would appear on live site */}
      <div className="max-w-7xl mx-auto">
        {blocks.length === 0 ? (
          <div className="flex items-center justify-center min-h-screen">
            <p className="text-gray-500">No content to preview</p>
          </div>
        ) : (
          <div className="space-y-0">
            {blocks.map((block) => (
              <div key={block.id} className="p-6">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{block.icon}</div>
                  <div>
                    <div className="font-medium text-gray-800">{block.label}</div>
                    <div className="text-sm text-gray-500">{block.type}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
