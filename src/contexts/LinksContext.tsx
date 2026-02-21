"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { LinkItemData } from '@/components/links/LinkItem';
import { LinksService } from '@/services/links.service';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface LinksContextType {
  links: LinkItemData[];
  setLinks: (links: LinkItemData[]) => void;
  isLoading: boolean;
  handleToggle: (id: string) => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  handleAddLink: (linkData: { title: string; url: string; icon: string }) => void;
  handleUpdateLink: (linkData: { linkId: string; title: string; url: string; icon: string; iconName: string }) => void;
  editingLink: LinkItemData | null;
  setEditingLink: (link: LinkItemData | null) => void;
}

const LinksContext = createContext<LinksContextType | undefined>(undefined);

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItemData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingLink, setEditingLink] = useState<LinkItemData | null>(null);
  const { user } = useAuth();

  // Derive pageId from user (using user.id as pageId)
  const pageId = user?.id || '';

  // Fetch links on mount
  const fetchLinks = useCallback(async () => {
    if (!pageId) return;
    try {
      setIsLoading(true);
      const response = await LinksService.getLinks(pageId);
      const data = response.data?.data || response.data || [];
      const mapped: LinkItemData[] = Array.isArray(data)
        ? data.map((item: any) => ({
            id: item.id || item._id || item.linkId,
            title: item.title || '',
            url: item.url || '',
            enabled: item.enabled !== undefined ? item.enabled : true,
            clicks: item.clicks || 0,
            icon: item.icon || item.iconName || '',
            iconColor: item.iconColor || '',
          }))
        : [];
      setLinks(mapped);
    } catch (error: any) {
      console.error('[Links] Failed to fetch links:', error);
      // If GET endpoint doesn't exist, start with empty list
      setLinks([]);
    } finally {
      setIsLoading(false);
    }
  }, [pageId]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  // Toggle enable/disable (local only for now)
  const handleToggle = (id: string) => {
    setLinks(links.map(link =>
      link.id === id ? { ...link, enabled: !link.enabled } : link
    ));
  };

  // Open edit dialog
  const handleEdit = (id: string) => {
    const linkToEdit = links.find(link => link.id === id);
    if (linkToEdit) {
      setEditingLink(linkToEdit);
    }
  };

  // Delete link via API
  const handleDelete = async (id: string) => {
    if (!pageId) return;
    try {
      await LinksService.deleteLink(pageId, id);
      setLinks(links.filter(link => link.id !== id));
      toast.success('Link deleted successfully');
    } catch (error: any) {
      console.error('[Links] Failed to delete link:', error);
      toast.error('Failed to delete link');
    }
  };

  // Add link via API
  const handleAddLink = async (linkData: { title: string; url: string; icon: string }) => {
    if (!pageId) return;

    // Find icon name from icon value
    const iconName = linkData.icon.charAt(0).toUpperCase() + linkData.icon.slice(1);

    try {
      const response = await LinksService.createLink(pageId, {
        icon: linkData.icon,
        iconName: iconName,
        title: linkData.title,
        url: linkData.url,
      });

      const newLinkData = response.data?.data || response.data;
      const newLink: LinkItemData = {
        id: newLinkData?.id || newLinkData?._id || newLinkData?.linkId || Date.now().toString(),
        title: linkData.title,
        url: linkData.url,
        icon: linkData.icon,
        enabled: true,
        clicks: 0,
      };
      setLinks([...links, newLink]);
      toast.success('Link created successfully');
    } catch (error: any) {
      console.error('[Links] Failed to create link:', error);
      toast.error('Failed to create link');
    }
  };

  // Update link via API
  const handleUpdateLink = async (linkData: { linkId: string; title: string; url: string; icon: string; iconName: string }) => {
    if (!pageId) return;
    try {
      await LinksService.updateLink(pageId, {
        linkId: linkData.linkId,
        icon: linkData.icon,
        iconName: linkData.iconName,
        title: linkData.title,
        url: linkData.url,
      });

      setLinks(links.map(link =>
        link.id === linkData.linkId
          ? { ...link, title: linkData.title, url: linkData.url, icon: linkData.icon }
          : link
      ));
      setEditingLink(null);
      toast.success('Link updated successfully');
    } catch (error: any) {
      console.error('[Links] Failed to update link:', error);
      toast.error('Failed to update link');
    }
  };

  return (
    <LinksContext.Provider
      value={{
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
      }}
    >
      {children}
    </LinksContext.Provider>
  );
}

export function useLinks() {
  const context = useContext(LinksContext);
  if (context === undefined) {
    throw new Error('useLinks must be used within a LinksProvider');
  }
  return context;
}
