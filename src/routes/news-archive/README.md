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
- **HeroImg** (Text): Cloudflare Image ID (e.g., `173963da-a755-4da7-1b1a-940c69a1a300`)
- **showHeroImg** (Checkbox): Toggle to show/hide hero image on post page

### Cover Images (Not Used)

Notion's built-in cover images are NOT used because uploaded images expire after 1 hour [web:23][web:24]. External URLs
could work, but we use Cloudflare Images for consistency and optimization [web:22][web:27].

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

- `+page.svelte`: Main post display component with hero image and OG meta tags
- `+page.server.ts`: Fetches post data from Notion API, extracts properties
- `PostFooter.svelte`: Navigation component

## Example Usage

### In `+page.server.ts`

```typescript
const heroImg = postData.properties['HeroImg']?.rich_text?.?.plain_text || '';
const showHeroImg = postData.properties['showHeroImg']?.checkbox || false;
