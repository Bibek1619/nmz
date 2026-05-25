# Trek Adventures - Professional Trekking Website
## Deployment Guide

### Project Overview
This is a fully functional professional trekking guide website built for Rahul Thapa, showcasing mountain trekking services in Nepal with modern design, smooth animations, and comprehensive content management capabilities.

### Website Features

#### Pages Included
1. **Homepage** (`/`) - Hero section with featured treks, guide profile, testimonials
2. **About** (`/about`) - Detailed information about Rahul with credentials and expertise
3. **Services** (`/services`) - Comprehensive service offerings with pricing
4. **Treks** (`/trek/[id]`) - Individual trek details (Annapurna, Mardi Himal, Everest)
5. **Gallery** (`/gallery`) - Photo gallery with lightbox
6. **FAQ** (`/faq`) - Comprehensive frequently asked questions
7. **Reviews** (`/reviews`) - Guest testimonials and ratings
8. **Contact** (`/contact`) - Contact form and information
9. **Booking** (`/booking`) - Trek booking form

#### Key Features
- **Responsive Design** - Mobile-first, fully responsive on all devices
- **Smooth Animations** - Framer Motion animations throughout
- **Color Scheme** - Nature-inspired green/blue/white palette
- **WhatsApp Integration** - Direct WhatsApp contact buttons on every page
- **Professional UI** - Clean, modern design with consistent styling
- **Fast Performance** - Optimized images and code splitting

### Technology Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Image Hosting**: Vercel Blob (for user uploads)
- **Fonts**: Geist (default Next.js font)

### Installation & Running Locally

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Visit `http://localhost:3000` in your browser.

### Deployment to Vercel

1. **Connect GitHub Repository**
   - Push code to GitHub
   - Go to https://vercel.com/new
   - Select your repository
   - Click "Deploy"

2. **Environment Variables** (if needed)
   ```
   No environment variables required for basic setup
   ```

3. **Custom Domain**
   - Add your domain in Vercel project settings
   - Update DNS records as instructed

### WhatsApp Configuration

The WhatsApp contact number is currently set to: `+977-9841234567`

To update:
1. Open `/components/navigation.tsx`
2. Find the `whatsappNumber` variable
3. Replace with your actual WhatsApp number
4. Update in all other pages (services, about, contact, etc.)

### Content Management

#### Update Profile Photo
- Replace `/public/profile.jpg` with your image
- Size: 400x500px recommended
- Format: JPG preferred

#### Update Trek Information
- Edit `/app/trek/[id]/page.tsx` to modify trek details
- Update pricing, descriptions, itineraries

#### Update Testimonials
- Edit `/app/reviews/page.tsx` to add new reviews
- Edit `/app/page.tsx` for homepage testimonials

#### Update Gallery Images
- Replace images in `/public/gallery-*.jpg`
- Add new images and update `/app/gallery/page.tsx`

### SEO Optimization

The website includes:
- Proper meta tags and descriptions
- Open Graph tags for social sharing
- Semantic HTML structure
- Mobile-friendly viewport settings

To enhance further:
1. Add Google Analytics
2. Create XML sitemap
3. Submit to Google Search Console
4. Add structured data (Schema.org)

### Performance Metrics

Current optimizations:
- Image optimization with Next.js Image component
- Code splitting with dynamic imports
- CSS minification via Tailwind
- Automatic HTTP/2 server push
- Vercel Edge Network for fast delivery

### Security

- No sensitive data stored in client code
- All forms are frontend only (add backend validation)
- HTTPS enforced on Vercel deployment
- CORS headers configured properly

### Maintenance

#### Regular Updates
- Update Trek content seasonally
- Add new testimonials from clients
- Update gallery with new trek photos
- Keep dependencies updated

#### Monitoring
- Monitor page performance in Vercel Analytics
- Check Core Web Vitals regularly
- Review error logs in Vercel Dashboard

### Support & Help

For questions about:
- **Hosting**: Visit https://vercel.com/docs
- **Next.js**: Visit https://nextjs.org/docs
- **Tailwind**: Visit https://tailwindcss.com/docs
- **Framer Motion**: Visit https://www.framer.com/motion/

---

**Last Updated**: 2024
**Built with ❤️ using v0**
