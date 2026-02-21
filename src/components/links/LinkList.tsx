"use client";

import { useState } from 'react';
import { Reorder } from 'framer-motion';
import { LinkItem } from './LinkItem';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { AddLinkDialog } from './AddLinkDialog';
import { EditLinkDialog } from './EditLinkDialog';
import { LinkPreview } from './LinkPreview';
import { useLinks } from '@/contexts/LinksContext';

export function LinkList({ showPreview = false }: { showPreview?: boolean }) {
  const {
    links,
    setLinks,
    isLoading,
    handleToggle,
    handleEdit,
    handleDelete,
    handleAddLink,
    handleUpdateLink,
    editingLink,
    setEditingLink,
  } = useLinks();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // If this is a preview, just show the preview
  if (showPreview) {
    return <LinkPreview links={links} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Your Links</h2>
          <p className="text-sm text-muted-foreground">
            Drag and drop to reorder your links
          </p>
        </div>
        <Button className="text-white shadow-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: '#3b82f6' }} onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Link
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          <span className="ml-3 text-muted-foreground">Loading links...</span>
        </div>
      ) : links.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg font-medium">No links yet</p>
          <p className="text-sm mt-1">Click &ldquo;Add Link&rdquo; to create your first link</p>
        </div>
      ) : (
        <Reorder.Group
          axis="y"
          values={links}
          onReorder={setLinks}
          className="space-y-0"
        >
          {links.map((link) => (
            <LinkItem
              key={link.id}
              link={link}
              onToggle={handleToggle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </Reorder.Group>
      )}

      <AddLinkDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSave={handleAddLink}
      />

      <EditLinkDialog
        open={!!editingLink}
        onOpenChange={(open) => { if (!open) setEditingLink(null); }}
        link={editingLink}
        onSave={handleUpdateLink}
      />
    </div>
  );
}
