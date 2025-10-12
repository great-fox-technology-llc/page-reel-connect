import { ComponentLibrary } from "@/components/builder/ComponentLibrary";
import { Canvas, type CanvasBlock } from "@/components/builder/Canvas";
import { PropertiesPanel } from "@/components/builder/PropertiesPanel";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfilePages, useCreateProfilePage, useUpdateProfilePage } from "@/hooks/useProfilePages";
import { toast } from "sonner";
import { generateSlug } from "@/lib/format";
import { useSearchParams } from "react-router-dom";
import { getSelectedTemplate, clearSelectedTemplate } from "@/lib/templateStorage";

export default function ProfileBuilder() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [headerBlock, setHeaderBlock] = useState<CanvasBlock | null>(null);
  const [bodyBlocks, setBodyBlocks] = useState<CanvasBlock[]>([]);
  const [footerBlock, setFooterBlock] = useState<CanvasBlock | null>(null);
  const [currentPageId, setCurrentPageId] = useState<string | null>(null);
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);

  const { data: profilePages } = useProfilePages(user?.id);
  const createProfilePage = useCreateProfilePage();
  const updateProfilePage = useUpdateProfilePage();

  // Load template if specified in URL
  useEffect(() => {
    const templateId = searchParams.get('template');
    const mode = searchParams.get('mode');
    
    if (templateId) {
      const template = getSelectedTemplate();
      if (template) {
        console.log('[ProfileBuilder] Loading template:', template.name);
        setHeaderBlock(template.structure.header);
        setBodyBlocks(template.structure.body);
        setFooterBlock(template.structure.footer);
        clearSelectedTemplate();
        toast.success(`Template "${template.name}" loaded`);
      }
    } else if (mode === 'scratch') {
      console.log('[ProfileBuilder] Starting from scratch');
      setHeaderBlock(null);
      setBodyBlocks([]);
      setFooterBlock(null);
    }
  }, [searchParams]);

  // Load existing profile page on mount
  useEffect(() => {
    if (profilePages && profilePages.length > 0) {
      const latestPage = profilePages[0];
      setCurrentPageId(latestPage.id);
      setCurrentSlug(latestPage.slug);
      
      // Load blocks from database
      if (latestPage.header_block) {
        setHeaderBlock(latestPage.header_block as CanvasBlock);
      }
      if (latestPage.body_blocks && Array.isArray(latestPage.body_blocks)) {
        setBodyBlocks(latestPage.body_blocks as CanvasBlock[]);
      }
      if (latestPage.footer_block) {
        setFooterBlock(latestPage.footer_block as CanvasBlock);
      }
    }
  }, [profilePages]);

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

  const handleSaveToDatabase = async (draft: { header: CanvasBlock | null; body: CanvasBlock[]; footer: CanvasBlock | null }) => {
    if (!user) {
      toast.error('Please log in to save your profile page');
      return;
    }

    try {
      if (currentPageId) {
        // Update existing page
        await updateProfilePage.mutateAsync({
          id: currentPageId,
          header_block: draft.header,
          body_blocks: draft.body,
          footer_block: draft.footer,
        });
        // Ensure slug persists
        if (!currentSlug && profilePages?.[0]?.slug) {
          setCurrentSlug(profilePages[0].slug);
        }
      } else {
        // Create new page
        const slug = generateSlug(`${user.email}-profile`);
        const newPage = await createProfilePage.mutateAsync({
          user_id: user.id,
          slug,
          header_block: draft.header,
          body_blocks: draft.body,
          footer_block: draft.footer,
        });
        // Update both ID and slug immediately
        setCurrentPageId(newPage.id);
        setCurrentSlug(newPage.slug);
        console.log('Profile page created with slug:', newPage.slug);
      }
    } catch (error) {
      console.error('Failed to save to database:', error);
      throw error;
    }
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
        currentSlug={currentSlug}
        onSaveToDatabase={handleSaveToDatabase}
      />
      <PropertiesPanel 
        selectedBlock={selectedBlock}
        onUpdateProps={updateBlockProps}
      />
    </div>
  );
}
