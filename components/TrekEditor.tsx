'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { X, Plus } from 'lucide-react'

type TrekItem = {
  id: string
  name: string
  subtext?: string
  difficulty: string
  days: string
  price: string
  image?: string
  description?: string
  bestSeason?: string
  height?: string
  distance?: string
  highlights?: string[]
  itinerary?: { day: string; title: string; description: string }[]
  included?: string[]
  notIncluded?: string[]
}

interface TrekEditorProps {
  trek: TrekItem | null
  onSave: (trek: TrekItem) => void
  onCancel: () => void
}

export function TrekEditor({ trek, onSave, onCancel }: TrekEditorProps) {
  const [formData, setFormData] = useState<TrekItem>(
    trek || {
      id: '',
      name: '',
      subtext: '',
      difficulty: 'Moderate',
      days: '',
      price: '',
      image: '',
      description: '',
      bestSeason: '',
      height: '',
      distance: '',
      highlights: [],
      itinerary: [],
      included: [],
      notIncluded: [],
      featured: false,
    }
  )

  const updateField = (field: keyof TrekItem, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  // Highlights management
  const addHighlight = () => {
    updateField('highlights', [...(formData.highlights || []), ''])
  }

  const updateHighlight = (index: number, value: string) => {
    const updated = [...(formData.highlights || [])]
    updated[index] = value
    updateField('highlights', updated)
  }

  const removeHighlight = (index: number) => {
    updateField('highlights', formData.highlights?.filter((_, i) => i !== index))
  }

  // Itinerary management
  const addDay = () => {
    const dayNum = (formData.itinerary?.length || 0) + 1
    updateField('itinerary', [
      ...(formData.itinerary || []),
      { day: `Day ${dayNum}`, title: '', description: '' },
    ])
  }

  const updateItinerary = (index: number, field: 'day' | 'title' | 'description', value: string) => {
    const updated = [...(formData.itinerary || [])]
    updated[index] = { ...updated[index], [field]: value }
    updateField('itinerary', updated)
  }

  const removeDay = (index: number) => {
    updateField('itinerary', formData.itinerary?.filter((_, i) => i !== index))
  }

  // Included management
  const addIncluded = () => {
    updateField('included', [...(formData.included || []), ''])
  }

  const updateIncluded = (index: number, value: string) => {
    const updated = [...(formData.included || [])]
    updated[index] = value
    updateField('included', updated)
  }

  const removeIncluded = (index: number) => {
    updateField('included', formData.included?.filter((_, i) => i !== index))
  }

  // Not Included management
  const addNotIncluded = () => {
    updateField('notIncluded', [...(formData.notIncluded || []), ''])
  }

  const updateNotIncluded = (index: number, value: string) => {
    const updated = [...(formData.notIncluded || [])]
    updated[index] = value
    updateField('notIncluded', updated)
  }

  const removeNotIncluded = (index: number) => {
    updateField('notIncluded', formData.notIncluded?.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    if (!formData.id || !formData.name) {
      alert('Please fill in ID and Name')
      return
    }
    onSave(formData)
  }

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold text-lg">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">ID *</label>
            <Input
              placeholder="e.g., annapurna"
              value={formData.id}
              onChange={(e) => updateField('id', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Trek Name *</label>
            <Input
              placeholder="e.g., Annapurna Base Camp Trek"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Subtext</label>
          <Input
            placeholder="Short tagline below title"
            value={formData.subtext || ''}
            onChange={(e) => updateField('subtext', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image Path</label>
          <Input
            placeholder="/trek-annapurna.jpg"
            value={formData.image || ''}
            onChange={(e) => updateField('image', e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured || false}
            onChange={(e) => updateField('featured', e.target.checked)}
            className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
          />
          <label htmlFor="featured" className="text-sm font-medium cursor-pointer">
            Feature this trek on homepage
          </label>
        </div>
      </Card>

      {/* Trek Details */}
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold text-lg">Trek Details</h3>
        <div>
          <label className="block text-sm font-medium mb-1">Overview/Description</label>
          <Textarea
            rows={4}
            placeholder="Main description of the trek"
            value={formData.description || ''}
            onChange={(e) => updateField('description', e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Best Season</label>
            <Input
              placeholder="e.g., September - November, March - May"
              value={formData.bestSeason || ''}
              onChange={(e) => updateField('bestSeason', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Days</label>
            <Input
              placeholder="e.g., 7-8 days"
              value={formData.days}
              onChange={(e) => updateField('days', e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Difficulty</label>
            <select
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
              value={formData.difficulty}
              onChange={(e) => updateField('difficulty', e.target.value)}
            >
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Hard">Hard</option>
              <option value="Extreme">Extreme</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Height</label>
            <Input
              placeholder="e.g., 4,130 m"
              value={formData.height || ''}
              onChange={(e) => updateField('height', e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Distance</label>
            <Input
              placeholder="e.g., 40 km"
              value={formData.distance || ''}
              onChange={(e) => updateField('distance', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <Input
              placeholder="e.g., $1,200"
              value={formData.price}
              onChange={(e) => updateField('price', e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Trek Highlights */}
      <Card className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">Trek Highlights</h3>
          <Button size="sm" variant="outline" onClick={addHighlight}>
            <Plus size={16} className="mr-1" /> Add Highlight
          </Button>
        </div>
        {formData.highlights?.map((highlight, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder={`Highlight ${index + 1}`}
              value={highlight}
              onChange={(e) => updateHighlight(index, e.target.value)}
            />
            <Button
              size="icon"
              variant="destructive"
              onClick={() => removeHighlight(index)}
            >
              <X size={16} />
            </Button>
          </div>
        ))}
        {(!formData.highlights || formData.highlights.length === 0) && (
          <p className="text-sm text-muted-foreground">No highlights added yet</p>
        )}
      </Card>

      {/* Detailed Itinerary */}
      <Card className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">Detailed Itinerary</h3>
          <Button size="sm" variant="outline" onClick={addDay}>
            <Plus size={16} className="mr-1" /> Add Day
          </Button>
        </div>
        {formData.itinerary?.map((day, index) => (
          <Card key={index} className="p-4 space-y-3 bg-muted/50">
            <div className="flex justify-between items-center">
              <Input
                className="w-32"
                placeholder="Day 1"
                value={day.day}
                onChange={(e) => updateItinerary(index, 'day', e.target.value)}
              />
              <Button
                size="sm"
                variant="destructive"
                onClick={() => removeDay(index)}
              >
                <X size={16} className="mr-1" /> Remove
              </Button>
            </div>
            <Input
              placeholder="Day title"
              value={day.title}
              onChange={(e) => updateItinerary(index, 'title', e.target.value)}
            />
            <Textarea
              rows={3}
              placeholder="Day description"
              value={day.description}
              onChange={(e) => updateItinerary(index, 'description', e.target.value)}
            />
          </Card>
        ))}
        {(!formData.itinerary || formData.itinerary.length === 0) && (
          <p className="text-sm text-muted-foreground">No itinerary added yet</p>
        )}
      </Card>

      {/* What's Included */}
      <Card className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">What&apos;s Included</h3>
          <Button size="sm" variant="outline" onClick={addIncluded}>
            <Plus size={16} className="mr-1" /> Add Item
          </Button>
        </div>
        {formData.included?.map((item, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder={`Included item ${index + 1}`}
              value={item}
              onChange={(e) => updateIncluded(index, e.target.value)}
            />
            <Button
              size="icon"
              variant="destructive"
              onClick={() => removeIncluded(index)}
            >
              <X size={16} />
            </Button>
          </div>
        ))}
        {(!formData.included || formData.included.length === 0) && (
          <p className="text-sm text-muted-foreground">No items added yet</p>
        )}
      </Card>

      {/* What's NOT Included */}
      <Card className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">What&apos;s NOT Included</h3>
          <Button size="sm" variant="outline" onClick={addNotIncluded}>
            <Plus size={16} className="mr-1" /> Add Item
          </Button>
        </div>
        {formData.notIncluded?.map((item, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder={`Not included item ${index + 1}`}
              value={item}
              onChange={(e) => updateNotIncluded(index, e.target.value)}
            />
            <Button
              size="icon"
              variant="destructive"
              onClick={() => removeNotIncluded(index)}
            >
              <X size={16} />
            </Button>
          </div>
        ))}
        {(!formData.notIncluded || formData.notIncluded.length === 0) && (
          <p className="text-sm text-muted-foreground">No items added yet</p>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3 sticky bottom-4 bg-background p-4 border rounded-lg shadow-lg">
        <Button className="flex-1" onClick={handleSave}>
          Save Trek
        </Button>
        <Button variant="outline" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
