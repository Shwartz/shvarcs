# News Archive - Dynamic Posts from Notion

This folder contains the SvelteKit routes for displaying dynamic news/blog posts sourced from a Notion database.

## Overview

Posts are fetched from Notion via the API, with content and metadata rendered dynamically.
Each post supports custom hero images hosted on Cloudflare Images for both on-page display and social media sharing (
Open Graph).

## Notion Database Setup

### Required Properties

- **Name** (Title): Post title, formatted as "text | additional info"
- **Summary** (Rich Text): Post description/excerpt for meta tags
- **Due Date** (Date): Publication date
- **Publish** (Checkbox): Controls visibility - only posts with this checked will appear
- **HeroImg** (Text): Cloudflare Image ID (e.g., `173963da-a755-4da7-1b1a-940c69a1a300`)
- **showHeroImg** (Checkbox): Toggle to show/hide hero image on post page

### Environment Variables

Required in `.env` file (not committed to git):

```
NOTION_TOKEN=secret_your_notion_integration_token
NOTION_DATABASE_ID=your_database_id
```

Get these from your Notion integration settings.

### Cover Images (Not Used)

Notion's built-in cover images are NOT used because uploaded images expire after 1 hour. External URLs could work, but we use Cloudflare Images for consistency and optimization.

## Cloudflare Images

### Why Cloudflare?

- Permanent URLs (no expiration issues like Notion-hosted files) 
- Automatic optimization (WebP, resizing, CDN delivery) 
- Variant-based sizing for responsive images

### Required Image Variants

Configure these width variants in Cloudflare Images:

- **320w**: Mobile devices
- **640w**: Standard desktop (matches max content width)
- **768w**: Tablet devices (optional)
- **1024w**: High-DPI displays (2x for 640px content)
- **1200w**: Open Graph social media images 

### Image Upload Workflow

1. Upload image to Cloudflare Images
2. Copy the image ID (e.g., `173963da-a755-4da7-1b1a-940c69a1a300`)
3. Paste ID into the **HeroImg** property in Notion
4. Toggle **showHeroImg** checkbox to display on post page

## Image Sizes

### Hero Image (On-Page Display)

- Max content width: **640px**
- Recommended implementation: Use `srcset` with 320w, 640w, 1024w variants 
- The 1024w variant supports Retina/high-DPI displays at 640px physical width

### Open Graph Images (Social Media)

- Standard size: **1200 × 630 pixels** (1.91:1 aspect ratio)
- Supported platforms: Facebook, Twitter/X, LinkedIn, Discord
- Always use **1200w** variant in OG meta tags for optimal quality

### Why 1200 × 630?

This is the universal standard that prevents cropping across all major social platforms
Smaller images (like 1024px) may be upscaled or appear lower quality.

## File Structure

- `+page.svelte`: News archive listing page with pagination
- `+page.server.ts`: Fetches posts from Notion API with cursor-based pagination
- `[slug]/+page.svelte`: Individual post display with hero image and OG meta tags
- `[slug]/+page.server.ts`: Fetches single post data and content blocks from Notion

## Caching

### Production Behavior

Posts are cached for **1 hour** using `p-memoize` with `expiry-map` to reduce Notion API calls and improve performance. The cache is managed in `/src/lib/notion/index.ts`.

### Disabling Cache for Development

When testing new Notion features, you may want fresh data on every request. To disable caching during development:

#### Option 1: Temporary Cache Duration (Recommended)

In `/src/lib/notion/index.ts`, uncomment the short cache time:

```typescript
// const expireCacheTime = 1000 * 60 * 60; // 1 hour - comment this out
const expireCacheTime = 1000; // 1 second - use this for dev
```

This gives you near-instant updates without completely removing cache logic.

#### Option 2: Environment-Based Caching

Add development detection:

```typescript
import { dev } from '$app/environment';

const expireCacheTime = dev ? 1000 : 1000 * 60 * 60; // 1 sec in dev, 1 hour in prod
```

This automatically disables caching in dev mode without manual changes.

#### Option 3: Remove Memoization Wrapper

Temporarily bypass `p-memoize` by changing the export:

```typescript
// export const getPaginatedPosts = pMemoize(...); // Comment this
export const getPaginatedPosts = async (startCursor?: string, pageSize: number = 20) => {
  // ...direct implementation without cache
};
```

**Note:** Remember to restore production caching before deployment to avoid hitting Notion API rate limits.

## API Considerations

### Notion API Rate Limits

- Notion has rate limits on API requests (typically 3 requests per second)
- The 1-hour cache helps stay well within these limits
- Multiple concurrent requests are handled by the memoization layer

### Best Practices

- Keep caching enabled in production
- Monitor Notion API status if posts fail to load
- Consider pagination size (currently 20 posts per page) based on content volume
- Use the `Publish` checkbox to draft posts without making them live

## Troubleshooting

### Posts Not Updating

1. Check if cache is enabled (1 hour delay expected)
2. Verify `Publish` checkbox is checked in Notion
3. Confirm environment variables are set correctly

### Images Not Loading

1. Verify Cloudflare Image ID is correct in `HeroImg` property
2. Check that required variants (320w, 640w, 1024w, 1200w) exist in Cloudflare
3. Ensure `showHeroImg` is checked if image should display on page

## Example Usage

### In `[slug]/+page.server.ts`

```typescript
const heroImg = postData.properties['HeroImg']?.rich_text?.[0]?.plain_text || '';
const showHeroImg = postData.properties['showHeroImg']?.checkbox || false;
