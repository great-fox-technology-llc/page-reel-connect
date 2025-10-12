import { templates, type Template } from '@/data/templates';

const SELECTED_TEMPLATE_KEY = 'builder:selectedTemplate';

export const getTemplates = (category?: string): Template[] => {
  if (!category) return templates;
  return templates.filter(t => t.category === category);
};

export const getTemplateById = (id: string): Template | null => {
  return templates.find(t => t.id === id) || null;
};

export const saveSelectedTemplate = (id: string): void => {
  try {
    localStorage.setItem(SELECTED_TEMPLATE_KEY, id);
    console.log('[Template Storage] Selected template:', id);
  } catch (error) {
    console.error('[Template Storage] Failed to save selected template:', error);
  }
};

export const getSelectedTemplate = (): Template | null => {
  try {
    const id = localStorage.getItem(SELECTED_TEMPLATE_KEY);
    if (!id) return null;
    return getTemplateById(id);
  } catch (error) {
    console.error('[Template Storage] Failed to get selected template:', error);
    return null;
  }
};

export const clearSelectedTemplate = (): void => {
  try {
    localStorage.removeItem(SELECTED_TEMPLATE_KEY);
    console.log('[Template Storage] Cleared selected template');
  } catch (error) {
    console.error('[Template Storage] Failed to clear selected template:', error);
  }
};
