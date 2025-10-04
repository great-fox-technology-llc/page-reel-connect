import { ComponentLibrary } from "@/components/builder/ComponentLibrary";
import { Canvas } from "@/components/builder/Canvas";
import { PropertiesPanel } from "@/components/builder/PropertiesPanel";

export default function ProfileBuilder() {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <ComponentLibrary />
      <Canvas />
      <PropertiesPanel />
    </div>
  );
}
