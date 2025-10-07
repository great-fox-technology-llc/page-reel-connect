import { ComponentLibrary } from "@/components/builder/ComponentLibrary";
import { Canvas } from "@/components/builder/Canvas";
import { PropertiesPanel } from "@/components/builder/PropertiesPanel";
import { useState } from "react";

export default function ProfileBuilder() {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <ComponentLibrary />
      <Canvas onSelectBlock={setSelectedBlockId} />
      <PropertiesPanel selectedBlockId={selectedBlockId} />
    </div>
  );
}
