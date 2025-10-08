import { ComponentLibrary } from "@/components/builder/ComponentLibrary";
import { Canvas, type CanvasBlock } from "@/components/builder/Canvas";
import { PropertiesPanel } from "@/components/builder/PropertiesPanel";
import { useState } from "react";

export default function ProfileBuilder() {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<CanvasBlock[]>([]);

  const updateBlockProps = (blockId: string, props: any) => {
    setBlocks(prev => prev.map(block => 
      block.id === blockId ? { ...block, props: { ...block.props, ...props } } : block
    ));
  };

  const selectedBlock = blocks.find(b => b.id === selectedBlockId) || null;

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <ComponentLibrary />
      <Canvas 
        onSelectBlock={setSelectedBlockId} 
        onBlocksChange={setBlocks}
      />
      <PropertiesPanel 
        selectedBlock={selectedBlock}
        onUpdateProps={updateBlockProps}
      />
    </div>
  );
}
