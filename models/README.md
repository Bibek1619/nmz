# MongoDB Models

This directory contains TypeScript interfaces and schemas for all MongoDB collections used in the NMZ Rahul trekking website.

## Models

### 1. Hero (`Hero.ts`)
Manages the hero section content on the homepage.

**Fields:**
- `title`: Main heading text
- `subtitle`: Subheading/badge text
- `description`: Description text
- `backgroundImage`: Hero background image path
- `ctaButtons`: Primary and secondary call-to-action buttons
- `badge`: Icon and text for the badge
- `isActive`: Whether this hero is currently active

### 2. About (`About.ts`)
Manages the "Meet Your Guide" section content.

**Fields:**
- `title`: Section title
- `description`: Guide description
- `profileImage`: Guide profile image path
- `stats`: Statistics (successful treks, routes, rating, years of experience)
- `badges`: Available status and experience years
- `isActive`: Whether this about section is active

### 3. Trek (`Trek.ts`)
Manages trek packages and details.

**Fields:**
- `id`: URL-friendly identifier (e.g., 'annapurna')
- `name`: Trek name
- `difficulty`: Easy | Moderate | Hard | Extreme
- `days`: Duration (e.g., "7-8 days")
- `altitude`: Maximum altitude
- `distance`: Total distance
- `price`: Price in USD
- `image`: Trek cover image
- `description`: Full description
- `bestSeason`: Best time to trek
- `highlights`: Array of trek highlights
- `itinerary`: Day-by-day itinerary
- `included`: What's included in the package
- `notIncluded`: What's not included
- `featured`: Whether to show on homepage
- `isActive`: Whether trek is available for booking

### 4. Blog (`Blog.ts`)
Manages blog posts and articles.

**Fields:**
- `id`: URL-friendly identifier
- `title`: Blog post title
- `slug`: URL slug
- `excerpt`: Short preview text
- `content`: Full blog content (Markdown supported)
- `coverImage`: Cover image path
- `author`: Author details (name, avatar, bio)
- `category`: Blog category
- `tags`: Array of tags
- `featured`: Whether to feature on homepage
- `published`: Publication status
- `views`: View count
- `readTime`: Estimated read time
- `publishedAt`: Publication date

### 5. Contact (`Contact.ts`)
Manages contact form submissions and inquiries.

**Fields:**
- `name`: Contact name
- `email`: Contact email
- `phone`: Optional phone number
- `subject`: Message subject
- `message`: Message content
- `trekInterest`: Trek they're interested in (optional)
- `preferredDate`: Preferred trek date (optional)
- `numberOfPeople`: Group size (optional)
- `status`: new | read | replied | archived
- `replied`: Whether admin has replied
- `replyMessage`: Admin's reply (optional)
- `repliedAt`: Reply timestamp (optional)

## Database Utilities

### `lib/db.ts`
Provides helper functions for CRUD operations:

```typescript
import { db } from '@/lib/db';
import { TrekCollection, ITrek } from '@/models';

// Find all treks
const treks = await db.findAll<ITrek>(TrekCollection);

// Find one trek by ID
const trek = await db.findById<ITrek>(TrekCollection, 'annapurna');

// Insert a new trek
await db.insertOne(TrekCollection, newTrek);

// Update a trek
await db.updateById(TrekCollection, 'annapurna', { price: '$1,300' });

// Delete a trek
await db.deleteById(TrekCollection, 'annapurna');

// Count treks
const count = await db.count(TrekCollection, { featured: true });
```

## Seeding the Database

To populate the database with initial data:

```bash
npm run seed
```

This will create:
- 1 Hero section
- 1 About section
- 3 Trek packages (Annapurna, Mardi Himal, Everest)
- 2 Blog posts

## Collection Names

- Heroes: `heroes`
- About: `about`
- Treks: `treks`
- Blogs: `blogs`
- Contacts: `contacts`

## Timestamps

All models automatically include:
- `createdAt`: Document creation timestamp
- `updatedAt`: Last update timestamp

These are managed automatically by the `db` utility functions.
