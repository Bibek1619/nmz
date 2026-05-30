# Blog System Guide

## Overview
The blog system allows admins to create rich-formatted blog posts with headings, bold text, italic text, and bullet points - similar to MS Word.

## How It Works

### 1. Blog Structure
Each blog post has:
- **ID**: URL-friendly identifier (e.g., `altitude-sickness-guide`)
- **Title**: Main headline (e.g., "Understanding Altitude Sickness")
- **Subtext**: Short description supporting the headline
- **Category**: Blog category (e.g., "Health & Safety", "Trek Tips")
- **Content**: Rich formatted content using simple markdown
- **Cover Image**: Optional header image
- **Featured**: Show on homepage
- **Published**: Make visible to public

### 2. Content Formatting

Admins use simple markdown-like syntax:

```
## Symptoms of Altitude Sickness
This creates a heading

**Bold Text** - Wrap text in double asterisks
*Italic Text* - Wrap text in single asterisks
• Bullet point - Use bullet character

Example:
## Prevention Tips
**1. Acclimatization** - Take time to adjust gradually.
*Important:* Ascend slowly and take rest days.

• Drink plenty of water
• Avoid alcohol
• Listen to your body
```

### 3. Formatting Toolbar
The editor provides buttons for:
- **Heading** (##) - Creates section headings
- **Bold** (**text**) - Makes text bold
- **Italic** (*text*) - Makes text italic
- **Bullet** (•) - Creates bullet points

### 4. Blog Display

**On /blog page:**
- Shows list of all published blogs
- Displays: Title, Subtext, Category, Cover Image
- Click to read full blog

**On /blog/[id] page:**
- Shows full blog content
- Formatted content with:
  - Headings rendered as `<h2>`
  - Bold text rendered as `<strong>`
  - Italic text rendered as `<em>`
  - Bullet points rendered as `<ul><li>`

## Next Steps to Complete

### 1. Add Blog API Routes
Create `/api/admin/blog/route.ts`:
```typescript
// GET - Fetch all blogs
// POST - Create new blog
// PUT - Update blog
// DELETE - Delete blog
```

### 2. Add Blog State to Admin Dashboard
In `app/admin/dashboard/page.tsx`, add:
```typescript
const [blogData, setBlogData] = useState<IBlog[]>([])
const [loadingBlogs, setLoadingBlogs] = useState(false)
const [editingBlog, setEditingBlog] = useState<IBlog | null>(null)
const [showBlogEditor, setShowBlogEditor] = useState(false)
```

### 3. Add Blog Section to Admin Dashboard
After the reviews section, add:
```typescript
{activeSection === 'blog' && (
  <div className="space-y-4">
    {/* Blog list and editor */}
  </div>
)}
```

### 4. Create Blog Display Pages
- `/app/blog/page.tsx` - List all published blogs
- `/app/blog/[id]/page.tsx` - Display single blog with formatted content

### 5. Content Renderer
Create a component to convert markdown to HTML:
```typescript
function renderContent(content: string) {
  return content
    .replace(/## (.*)/g, '<h2>$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/• (.*)/g, '<li>$1</li>')
}
```

## Files Created
- ✅ `models/Blog.ts` - Updated blog model
- ✅ `components/BlogEditor.tsx` - Rich text editor component
- ✅ Admin sidebar updated with Blog menu item

## Files Needed
- ⏳ `/api/admin/blog/route.ts` - Blog CRUD API
- ⏳ `/app/blog/page.tsx` - Blog list page
- ⏳ `/app/blog/[id]/page.tsx` - Single blog page
- ⏳ `components/BlogContent.tsx` - Content renderer

## Usage Example

Admin creates a blog:
1. Go to Admin Dashboard → Blog
2. Click "Add New Blog"
3. Fill in:
   - ID: `altitude-sickness-guide`
   - Title: `Understanding Altitude Sickness`
   - Subtext: `Essential guide for trekkers`
   - Category: `Health & Safety`
4. Write content using toolbar:
   ```
   ## What is Altitude Sickness?
   Altitude sickness occurs when you ascend too quickly.
   
   ## Symptoms
   • Headache
   • Nausea
   • Dizziness
   
   ## Prevention
   **1. Acclimatization** - Take your time ascending.
   *Remember:* Climb high, sleep low.
   ```
5. Upload cover image (optional)
6. Check "Published" to make visible
7. Save

Users see:
- `/blog` - List of all blogs with cards
- `/blog/altitude-sickness-guide` - Full formatted article
