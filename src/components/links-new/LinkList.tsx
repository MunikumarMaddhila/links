"use client";

import { useState } from 'react';
import { Reorder } from 'framer-motion';
import { LinkItem, LinkItemData } from './LinkItem';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const initialLinks: LinkItemData[] = [
  {
    id: '1',
    title: 'My Portfolio',
    url: 'https://portfolio.example.com',
    enabled: true,
    clicks: 2840,
    icon: '🎨',
  },
  {
    id: '2',
    title: 'Twitter / X',
    url: 'https://twitter.com/username',
    enabled: true,
    clicks: 2120,
    icon: '🐦',
  },
  {
    id: '3',
    title: 'Weekly Newsletter',
    url: 'https://newsletter.example.com',
    enabled: true,
    clicks: 1890,
    scheduled: true,
  },
  {
    id: '4',
    title: 'YouTube Channel',
    url: 'https://youtube.com/@username',
    enabled: false,
    clicks: 1540,
    icon: '📺',
  },
  {
    id: '5',
    title: 'Shop My Products',
    url: 'https://shop.example.com',
    enabled: true,
    clicks: 980,
    icon: '🛍️',
  },
];

export function LinkList() {
  const [links, setLinks] = useState<LinkItemData[]>(initialLinks);

  const handleToggle = (id: string) => {
    setLinks(links.map(link =>
      link.id === id ? { ...link, enabled: !link.enabled } : link
    ));
  };

  const handleEdit = (id: string) => {
    console.log('Edit link:', id);
  };

  const handleDelete = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Your Links</h2>
          <p className="text-sm text-muted-foreground">
            Drag and drop to reorder your links
          </p>
        </div>
        <Button className="gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Add Link
        </Button>
      </div>

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
    </div>
  );
}

export type { LinkItemData };
