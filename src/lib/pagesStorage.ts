export interface PageItem {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  templateId?: string;
}

const STORAGE_KEY = 'pages:list';

export const getPages = (): PageItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('[Pages Storage] Failed to get pages:', error);
    return [];
  }
};

export const getPageById = (id: string): PageItem | null => {
  const pages = getPages();
  return pages.find(p => p.id === id) || null;
};

export const getPageBySlug = (slug: string): PageItem | null => {
  const pages = getPages();
  return pages.find(p => p.slug === slug) || null;
};

const savePages = (pages: PageItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
  } catch (error) {
    console.error('[Pages Storage] Failed to save pages:', error);
    throw error;
  }
};

export const createPage = (data: Omit<PageItem, 'id' | 'createdAt' | 'updatedAt'>): PageItem => {
  const pages = getPages();
  
  // Ensure slug is unique
  let slug = data.slug;
  let counter = 1;
  while (pages.some(p => p.slug === slug)) {
    slug = `${data.slug}-${counter}`;
    counter++;
  }
  
  const newPage: PageItem = {
    ...data,
    id: crypto.randomUUID(),
    slug,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  pages.unshift(newPage);
  savePages(pages);
  console.log('[Pages Storage] Created page:', newPage.slug);
  return newPage;
};

export const updatePage = (id: string, data: Partial<PageItem>): PageItem | null => {
  const pages = getPages();
  const index = pages.findIndex(p => p.id === id);
  
  if (index === -1) {
    console.error('[Pages Storage] Page not found:', id);
    return null;
  }
  
  pages[index] = {
    ...pages[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  
  savePages(pages);
  console.log('[Pages Storage] Updated page:', pages[index].slug);
  return pages[index];
};

export const deletePage = (id: string): boolean => {
  const pages = getPages();
  const filtered = pages.filter(p => p.id !== id);
  
  if (filtered.length === pages.length) {
    console.error('[Pages Storage] Page not found:', id);
    return false;
  }
  
  savePages(filtered);
  console.log('[Pages Storage] Deleted page:', id);
  return true;
};

export const duplicatePage = (id: string): PageItem | null => {
  const page = getPageById(id);
  if (!page) return null;
  
  return createPage({
    title: `${page.title} (Copy)`,
    slug: `${page.slug}-copy`,
    status: 'draft',
    templateId: page.templateId,
  });
};

export const togglePublishStatus = (id: string): PageItem | null => {
  const page = getPageById(id);
  if (!page) return null;
  
  return updatePage(id, {
    status: page.status === 'published' ? 'draft' : 'published',
  });
};
