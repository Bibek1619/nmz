# Trek Image Upload & Subtext Display - Complete

## Overview
Updated the trek system to show subtext below titles and added Cloudinary image upload functionality in the admin dashboard.

## What Was Implemented

### 1. Subtext Display in Trek Cards
**File**: `components/trek-card.tsx`

**Changes**:
- Added subtext display below trek title
- Styled as italic, muted text
- Only shows if subtext exists
- Appears on both `/treks` page and homepage featured treks

**Visual Layout**:
```
┌─────────────────────────┐
│      [Trek Image]       │
├─────────────────────────┤
│ Trek Name               │
│ Subtext in italic       │
│                         │
│ Description text...     │
│                         │
│ [Duration] [Difficulty] │
│ [Height]   [Price]      │
│                         │
│ [View Details]          │
└─────────────────────────┘
```

### 2. Image Upload in TrekEditor
**File**: `components/TrekEditor.tsx`

**New Features**:
- ✅ File input for image selection
- ✅ Image preview before saving
- ✅ Upload to Cloudinary
- ✅ Automatic optimization (f_auto, q_auto)
- ✅ File validation (type and size)
- ✅ Loading state during upload
- ✅ Remove/replace image option
- ✅ Stored in `nmz-rahul/treks` folder

**Upload Flow**:
```
1. Click "Choose Trek Image"
2. Select image from computer
3. Validate file (image type, max 10MB)
4. Upload to Cloudinary
5. Show preview
6. Save Cloudinary URL to database
```

## Features

### Image Upload:
- **File Selection**: Click button to choose from computer
- **Validation**: 
  - Only image files accepted
  - Maximum 10MB file size
  - Error messages for invalid files
- **Preview**: Shows selected image before saving
- **Remove**: X button to remove and choose different image
- **Cloudinary**: Automatic upload and optimization
- **Loading State**: Shows "Uploading..." during upload

### Subtext Display:
- **Trek Cards**: Shows below title in italic
- **Homepage**: Featured treks show subtext
- **Treks Page**: All treks show subtext
- **Optional**: Only displays if subtext exists

## UI Components

### Image Upload Section (TrekEditor):
```
┌─────────────────────────────────────┐
│ Trek Image                          │
├─────────────────────────────────────┤
│ [📤 Choose Trek Image]              │
│ Upload an image from your computer  │
│ (max 10MB)                          │
└─────────────────────────────────────┘
```

### With Image Preview:
```
┌─────────────────────────────────────┐
│ Trek Image                     [X]  │
├─────────────────────────────────────┤
│  ┌───────────────────────────┐      │
│  │                           │      │
│  │    Image Preview          │      │
│  │                           │      │
│  └───────────────────────────┘      │
└─────────────────────────────────────┘
```

### Trek Card with Subtext:
```
┌─────────────────────────────────────┐
│         [Trek Image]                │
├─────────────────────────────────────┤
│ Annapurna Base Camp Trek            │
│ Surrounded by massive peaks         │ ← Subtext
│                                     │
│ Trek to the stunning base camp...   │
│                                     │
│ ⏰ 7-8 days    📈 Moderate          │
│ ⛰️ 4,130 m     💰 $1,200            │
└─────────────────────────────────────┘
```

## Technical Implementation

### Image Upload Handler:
```typescript
const handleImageUpload = async (e) => {
  const file = e.target.files?.[0]
  
  // Validate
  if (!file.type.startsWith('image/')) return
  if (file.size > 10MB) return
  
  // Upload to Cloudinary
  const formData = new FormData()
  formData.append('file', file)
  formData.append('folder', 'nmz-rahul/treks')
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  })
  
  const data = await response.json()
  updateField('image', data.url)
}
```

### Subtext Display:
```typescript
{subtext && (
  <p className="text-sm text-muted-foreground italic mb-3">
    {subtext}
  </p>
)}
```

## Cloudinary Integration

### Upload Endpoint:
- **Route**: `/api/upload`
- **Method**: POST
- **Folder**: `nmz-rahul/treks`
- **Transformations**: 
  - `quality: 'auto'` - Optimal quality
  - `fetch_format: 'auto'` - Best format (WebP, AVIF)

### Image Storage:
- **Original**: Uploaded to Cloudinary
- **Optimized**: Automatic format/quality optimization
- **CDN**: Fast delivery worldwide
- **URL**: Stored in MongoDB

## User Experience

### For Admin:
1. Go to Admin Dashboard → Treks
2. Click "Add Trek" or "Edit" existing trek
3. Fill in trek details including subtext
4. Click "Choose Trek Image"
5. Select image from computer
6. See preview immediately
7. Click "Save Trek"
8. Image uploaded to Cloudinary
9. Trek saved with Cloudinary URL

### For Visitors:
1. Visit `/treks` or homepage
2. See trek cards with images
3. Title displayed prominently
4. Subtext shown below title in italic
5. All images loaded from Cloudinary CDN

## Validation

### File Type:
```typescript
if (!file.type.startsWith('image/')) {
  toast({
    title: 'Invalid File',
    description: 'Please select an image file',
    variant: 'destructive'
  })
}
```

### File Size:
```typescript
if (file.size > 10 * 1024 * 1024) {
  toast({
    title: 'File Too Large',
    description: 'Please select an image smaller than 10MB',
    variant: 'destructive'
  })
}
```

## Benefits

### Cloudinary Upload:
- ✅ No manual image path entry
- ✅ Automatic optimization
- ✅ Fast CDN delivery
- ✅ Format conversion (WebP, AVIF)
- ✅ Quality optimization
- ✅ Organized in folders

### Subtext Display:
- ✅ Better trek descriptions
- ✅ More context for users
- ✅ Professional appearance
- ✅ Consistent across pages

## Files Modified

1. ✅ `components/TrekEditor.tsx` - Added image upload
2. ✅ `components/trek-card.tsx` - Added subtext display

## Usage Instructions

### Adding Trek with Image:
1. Admin Dashboard → Treks → Add Trek
2. Enter ID and Name (required)
3. Enter Subtext (e.g., "Surrounded by massive peaks")
4. Click "Choose Trek Image"
5. Select image from computer
6. Wait for upload (shows "Uploading...")
7. Preview appears
8. Fill other details
9. Click "Save Trek"

### Editing Trek Image:
1. Click "Edit" on existing trek
2. See current image preview
3. Click X to remove
4. Click "Choose Trek Image" for new image
5. Select new image
6. Click "Save Trek"

## Example Data

### Trek with Subtext:
```json
{
  "id": "annapurna",
  "name": "Annapurna Base Camp Trek",
  "subtext": "Surrounded by massive Himalayan peaks",
  "image": "https://res.cloudinary.com/djded5kbg/image/upload/v.../nmz-rahul/treks/annapurna.jpg",
  "description": "Trek to the stunning base camp...",
  "featured": true
}
```

## Status
✅ **COMPLETE** - Trek image upload and subtext display fully functional
- Image upload from computer
- Cloudinary integration
- Image preview
- File validation
- Subtext display on trek cards
- Works on homepage and /treks page
- No compilation errors

Now admins can upload trek images directly from their computer, and subtexts appear below trek titles! 🎉📸
