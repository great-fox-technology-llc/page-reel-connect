import { ComponentLibrary } from "@/components/builder/ComponentLibrary";
import { Canvas, type CanvasBlock } from "@/components/builder/Canvas";
import { PropertiesPanel } from "@/components/builder/PropertiesPanel";
import { useState } from "react";

export default function ProfileBuilder() {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [headerBlock, setHeaderBlock] = useState<CanvasBlock | null>(null);
  const [bodyBlocks, setBodyBlocks] = useState<CanvasBlock[]>([]);
  const [footerBlock, setFooterBlock] = useState<CanvasBlock | null>(null);

  const updateBlockProps = (blockId: string, props: any) => {
    if (headerBlock?.id === blockId) {
      setHeaderBlock({ ...headerBlock, props: { ...headerBlock.props, ...props } });
      return;
    }
    
    if (footerBlock?.id === blockId) {
      setFooterBlock({ ...footerBlock, props: { ...footerBlock.props, ...props } });
      return;
    }
    
    setBodyBlocks(prev => prev.map(block => 
      block.id === blockId ? { ...block, props: { ...block.props, ...props } } : block
    ));
  };

  const selectedBlock = 
    headerBlock?.id === selectedBlockId ? headerBlock :
    footerBlock?.id === selectedBlockId ? footerBlock :
    bodyBlocks.find(b => b.id === selectedBlockId) || null;

  return (
    <div className="flex h-screen w-full bg-background">
      <ComponentLibrary />
      <Canvas 
        headerBlock={headerBlock}
        bodyBlocks={bodyBlocks}
        footerBlock={footerBlock}
        selectedBlockId={selectedBlockId}
        onSelectBlock={setSelectedBlockId}
        onHeaderChange={setHeaderBlock}
        onBodyBlocksChange={setBodyBlocks}
        onFooterChange={setFooterBlock}
      />
      <PropertiesPanel 
        selectedBlock={selectedBlock}
        onUpdateProps={updateBlockProps}
      />
    </div>
  );
}
