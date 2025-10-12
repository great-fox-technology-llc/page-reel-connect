import { useState, useMemo } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CreatePageModal } from '@/components/pages/CreatePageModal';
import { EmptyState } from '@/components/shared/EmptyState';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { getPages, duplicatePage, deletePage, togglePublishStatus } from '@/lib/pagesStorage';
import { Plus, Search, Filter, ArrowUpDown, MoreHorizontal, Edit, Copy, Eye, EyeOff, Trash2, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export default function Pages() {
  const navigate = useNavigate();
  const [pages, setPages] = useState(getPages());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published'>('all');
  const [sortBy, setSortBy] = useState<'alphabetical' | 'lastEdited' | 'created'>('lastEdited');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const refreshPages = () => {
    setPages(getPages());
  };

  const handleDuplicate = (id: string) => {
    const newPage = duplicatePage(id);
    if (newPage) {
      toast.success(`Page duplicated: ${newPage.title}`);
      refreshPages();
    } else {
      toast.error('Failed to duplicate page');
    }
  };

  const handleDelete = (id: string) => {
    const success = deletePage(id);
    if (success) {
      toast.success('Page deleted');
      refreshPages();
      setDeleteConfirm(null);
    } else {
      toast.error('Failed to delete page');
    }
  };

  const handleTogglePublish = (id: string) => {
    const updated = togglePublishStatus(id);
    if (updated) {
      toast.success(`Page ${updated.status === 'published' ? 'published' : 'unpublished'}`);
      refreshPages();
    } else {
      toast.error('Failed to update page status');
    }
  };

  const filteredAndSortedPages = useMemo(() => {
    let result = [...pages];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(query) || p.slug.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      result = result.filter((p) => p.status === filterStatus);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'lastEdited':
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

    return result;
  }, [pages, searchQuery, filterStatus, sortBy]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Pages</h1>
            <p className="text-muted-foreground">Create and manage your site pages</p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search pages..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  {filterStatus === 'all' ? 'All Pages' : filterStatus === 'draft' ? 'Draft' : 'Published'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilterStatus('all')}>All Pages</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('draft')}>Draft</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('published')}>Published</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <ArrowUpDown className="w-4 h-4" />
                  {sortBy === 'alphabetical' ? 'A-Z' : sortBy === 'created' ? 'Created' : 'Last Edited'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy('alphabetical')}>Alphabetical</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('lastEdited')}>Last Edited</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('created')}>Created Date</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* New Page Button */}
            <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              New Page
            </Button>
          </div>

          {/* Pages List */}
          {filteredAndSortedPages.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No pages yet"
              description="Create your first page to start building your site"
              actionLabel="Create your first page"
              onAction={() => setIsCreateModalOpen(true)}
            />
          ) : (
            <div className="glass rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Page Title</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Path/URL</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Last Edited</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredAndSortedPages.map((page) => (
                      <tr key={page.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium">{page.title}</div>
                        </td>
                        <td className="px-6 py-4">
                          <code className="text-sm text-muted-foreground">/preview/{page.slug}</code>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
                            {page.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {format(new Date(page.updatedAt), 'MMM d, yyyy h:mm a')}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => navigate('/profile-builder')}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDuplicate(page.id)}>
                                <Copy className="w-4 h-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleTogglePublish(page.id)}>
                                {page.status === 'published' ? (
                                  <>
                                    <EyeOff className="w-4 h-4 mr-2" />
                                    Unpublish
                                  </>
                                ) : (
                                  <>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Publish
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setDeleteConfirm(page.id)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <CreatePageModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this page. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
