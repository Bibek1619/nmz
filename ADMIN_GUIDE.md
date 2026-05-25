# Admin Dashboard Guide

## Access Admin Dashboard

Navigate to `/admin/dashboard` to access the complete admin panel.

**URL:** `http://localhost:3000/admin/dashboard` (development)

No authentication required - fully accessible admin interface.

## Dashboard Sections

### 1. Hero Section
Manage the homepage hero banner:
- **Hero Title** - Main headline text
- **Hero Subtitle** - Secondary description
- **Hero Image** - Upload and change the background image

### 2. About Section
Edit your guide profile:
- **About Title** - Section title
- **About Description** - Long-form biography
- **Profile Image** - Your profile photo
- **Achievements** - Edit 4 key achievements with icons and descriptions:
  - Number of successful treks
  - Number of trek routes
  - Rating and reviews
  - Safety certifications

### 3. Treks Management
Full CRUD operations for trek listings:
- **View All Treks** - See all 3 trek offerings
- **Edit Trek** - Update name, difficulty, duration, and price
- **Delete Trek** - Remove trek from listings
- **Add Trek** - Create new trek offerings with:
  - Trek ID
  - Trek Name
  - Difficulty Level (Easy/Moderate/Hard)
  - Duration
  - Price

Current Treks:
- Annapurna Base Camp - $1,200 (7-8 days, Moderate)
- Mardi Himal - $900 (5-6 days, Easy)
- Everest Base Camp - $2,500 (14 days, Hard)

### 4. Gallery Management
Update photo gallery:
- **View All Images** - See all 4 gallery images
- **Edit Image Titles** - Update each photo description
- **Change Images** - Upload new photos
- **Delete Images** - Remove photos from gallery
- **Add Images** - Upload new gallery images

### 5. FAQ Management
Manage frequently asked questions:
- **View All FAQs** - See all current questions and answers
- **Add FAQ** - Create new question/answer pairs
- **Edit FAQ** - Update existing questions and answers
- **Delete FAQ** - Remove outdated FAQs

### 6. Contact Information
Update contact details:
- **Phone Number** - Primary contact number
- **WhatsApp Number** - WhatsApp business number
- **Email Address** - Email for inquiries
- **Location** - City/location display
- **Full Address** - Complete physical address

### 7. Reviews Management
Manage customer testimonials:
- **View Reviews** - See all 5-star reviews
- **Delete Reviews** - Remove reviews
- **Add Reviews** - Create new customer testimonials with:
  - Customer name
  - Location/Country
  - Review text
  - Star rating (1-5)

## Features

✓ Real-time form editing
✓ Image upload support
✓ Add/Edit/Delete operations
✓ Mobile-responsive interface
✓ Clean, intuitive UI
✓ No authentication required
✓ Saves in real-time (state-based)

## Data Storage

Currently, all changes are stored in component state. To persist data to a database, integrate with:
- Supabase (recommended)
- Firebase
- MongoDB
- PostgreSQL with API routes

## Navigation

The admin dashboard is accessible via:
- Direct URL: `/admin/dashboard`
- Navigation menu: Small "Admin" link in top navigation (hidden on mobile by default)

## Tips

1. **Backup Images** - Keep copies of original images before uploading
2. **Test Changes** - Verify changes appear on public pages before finalizing
3. **FAQ Organization** - Keep questions short and answers clear
4. **Price Updates** - Remember to update prices across all platforms
5. **Gallery Titles** - Use descriptive titles for better presentation

## Future Enhancements

- Database integration for persistent storage
- Image cropping and optimization
- Bulk upload for gallery
- Review moderation
- Analytics dashboard
- Booking management interface
- Email notification settings
