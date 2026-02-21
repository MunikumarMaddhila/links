"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  ExternalLink, 
  Edit,
  Eye,
  EyeOff
} from "lucide-react"
import { LinkItem } from "@/hooks/use-dashboard-data"

interface EditPanelProps {
  links: LinkItem[]
  onAddLink: (link: Omit<LinkItem, "id" | "order">) => void
  onUpdateLink: (id: string, updates: Partial<LinkItem>) => void
  onDeleteLink: (id: string) => void
  onReorderLinks: (fromIndex: number, toIndex: number) => void
  onToggleActive: (id: string) => void
}

interface LinkFormData {
  title: string
  url: string
  isActive: boolean
}

export default function EditPanel({
  links,
  onAddLink,
  onUpdateLink,
  onDeleteLink,
  onReorderLinks,
  onToggleActive
}: EditPanelProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null)
  const [formData, setFormData] = useState<LinkFormData>({
    title: "",
    url: "",
    isActive: true
  })
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const resetForm = () => {
    setFormData({
      title: "",
      url: "",
      isActive: true
    })
  }

  const handleAddLink = () => {
    if (formData.title.trim() && formData.url.trim()) {
      onAddLink({
        title: formData.title.trim(),
        url: formData.url.trim(),
        isActive: formData.isActive
      })
      resetForm()
      setIsAddDialogOpen(false)
    }
  }

  const handleEditLink = (link: LinkItem) => {
    setEditingLink(link)
    setFormData({
      title: link.title,
      url: link.url,
      isActive: link.isActive
    })
  }

  const handleUpdateLink = () => {
    if (editingLink && formData.title.trim() && formData.url.trim()) {
      onUpdateLink(editingLink.id, {
        title: formData.title.trim(),
        url: formData.url.trim(),
        isActive: formData.isActive
      })
      setEditingLink(null)
      resetForm()
    }
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      onReorderLinks(draggedIndex, dropIndex)
    }
    setDraggedIndex(null)
  }

  const formatUrl = (url: string) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`
    }
    return url
  }

  return (
    <Card className="w-full bg-white border border-gray-200 rounded-xl shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-gray-900">
          <span className="text-lg font-semibold">Edit Links</span>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                size="sm" 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Link
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Link</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="add-title">Title</Label>
                  <Input
                    id="add-title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., My Website, Instagram, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-url">URL</Label>
                  <Input
                    id="add-url"
                    value={formData.url}
                    onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="add-active"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                  />
                  <Label htmlFor="add-active">Active</Label>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddLink}>
                    Add Link
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {links.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No links yet. Add your first link!</p>
          </div>
        ) : (
          links.map((link, index) => (
            <div
              key={link.id}
              className="group relative p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="cursor-grab hover:cursor-grabbing text-muted-foreground">
                    <GripVertical className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm truncate">{link.title}</h4>
                      {link.isActive ? (
                        <Eye className="h-3 w-3 text-green-600" />
                      ) : (
                        <EyeOff className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{link.url}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleActive(link.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {link.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditLink(link)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(formatUrl(link.url), '_blank')}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteLink(link.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Edit Dialog */}
        <Dialog open={!!editingLink} onOpenChange={() => setEditingLink(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Link</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., My Website, Instagram, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-url">URL</Label>
                <Input
                  id="edit-url"
                  value={formData.url}
                  onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://example.com"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-active"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                />
                <Label htmlFor="edit-active">Active</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditingLink(null)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateLink}>
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}