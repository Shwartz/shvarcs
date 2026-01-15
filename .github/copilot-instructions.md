# Project Context for AI Assistant

## Project Overview
- **Project Name:** Shvarcs
- **Framework:** SvelteKit 2.x
- **Language:** TypeScript
- **Deployment Platform:** Vercel (planned migration to Cloudflare Pages)
- **Adapter:** `@sveltejs/adapter-vercel` (will change to `@sveltejs/adapter-cloudflare`)
- **Styling:** Sass/SCSS
- **Node Version:** >=20.0.0

## Key Architecture Details

### Routing
- Uses SvelteKit's file-based routing in `/src/routes`
- Main routes:
  - `/` - Home page
  - `/thoughts` - Blog/thoughts section (pre-rendered static pages)
  - `/thoughts/[slug]` - Individual blog posts
  - `/news-archive` - Dynamic news feed from Notion DB (server-side rendered)
  - `/news-archive/[slug]` - Individual news article pages
  - `/good-read` - Bookmarks/reading list

### Static Assets
- Located in `/static` folder
- Served directly at root path (e.g., `/static/favicon.ico` → `/favicon.ico`)
- Custom fonts: `@fontsource-variable/inter`, `@fontsource/frank-ruhl-libre`
- Icons and SVG components in `/src/assets/svg/`

### External Integrations

#### Notion API
- **Purpose:** Dynamic content management for news/articles
- **Client Library:** `@notionhq/client` (Official Notion SDK)
- **API Wrapper:** `/src/lib/notion/api.ts` and `/src/lib/notion/index.ts`
- **Features:**
  - Fetches posts from Notion database filtered by "Publish" checkbox
  - Pagination support with cursor-based navigation
  - Caching with `p-memoize` and `expiry-map` (1 hour cache)
  - Server-side only (credentials never exposed to client)
- **Used in:** `/news-archive` route with infinite scroll/load more functionality

### Configuration
- **svelte.config.js:** 
  - Currently using Vercel adapter with Node.js 20.x runtime
  - Pre-renders static blog posts from `/thoughts` route for performance
- **Environment Variables:**
  - `NOTION_TOKEN` - Notion integration secret token
  - `NOTION_DATABASE_ID` - ID of the news posts database
  - Stored in `.env` file (not committed to git)

### Key Dependencies
- **Content Management:**
  - `@notionhq/client` - Official Notion API client
  - `notion-utils` - Notion block utilities
  - `p-memoize` - Memoization for API calls
  - `expiry-map` - Time-based cache expiration
- **UI/UX:**
  - `svelte-icons-pack` - Icon components
  - `svelte-loading-spinners` - Loading indicators
  - `svelte-highlight` - Code syntax highlighting
  - `sveltekit-embed` - Embed components
- **Forms & Validation:**
  - `sveltekit-superforms` - Form handling (ready for future contact form)
  - `zod` - Schema validation
- **Styling:**
  - `sass` - SCSS preprocessing
  - `svelte-preprocess` - Svelte preprocessing

## Development Workflow
- **Dev Server:** `npm run dev`
- **Build:** `npm run build` (also runs package step)
- **Preview:** `npm run preview`
- **Type Checking:** `npm run check` or `npm run check:watch`
- **Testing:** 
  - Unit: `npm run test:unit` or `npm test`
  - Integration: `npm run test:integration` (Playwright)
- **Linting:** `npm run lint`
- **Deploy:** Automatic via Vercel on git push to main branch

## AI Assistant Guidelines
1. **Always check project files directly** - You can read any file in the workspace without asking the user to provide it
2. **Context First:** Review relevant files before making changes
3. **SvelteKit Conventions:** Follow SvelteKit 2.x patterns (not React/Next.js)
4. **TypeScript:** Use proper TypeScript types
5. **Server-Side Data Fetching:** Use `+page.server.ts` for API calls (especially Notion) to keep credentials secure
6. **Performance:** Consider edge deployment optimization (important for future Cloudflare migration)
7. **Testing:** Run `npm run check` after significant changes

## Common Patterns in This Project
- Server-side logic in `+page.server.ts` files
- Client-side pages in `+page.svelte` files
- Shared layout in `+layout.svelte`
- Notion API calls handled server-side with caching
- Static blog posts pre-rendered at build time
- Dynamic news content fetched from Notion at runtime
- SVG components as Svelte components in `/src/assets/svg/`

## Cloudflare Migration (Future)

### Planned Changes
- Migrate from Vercel to Cloudflare Pages
- Update adapter to `@sveltejs/adapter-cloudflare`
- Create `wrangler.toml` for Cloudflare Pages configuration
- Migrate environment variables to Cloudflare Pages settings
- Test Notion API calls within Cloudflare Workers runtime limits
- Implement contact form using Cloudflare Email Routing or Workers

### Contact Form Plans
- **Planned Feature:** Contact form on website
- **Implementation:** Will use Cloudflare's native features (Email Routing, Workers, or similar)
- **Validation:** Use existing `zod` and `sveltekit-superforms` dependencies
- **Processing:** Server-side form handling in `+page.server.ts`

## Known Issues & Considerations
- **Notion API Rate Limits:** Consider rate limiting and caching strategy for production
- **Notion API Availability:** News archive depends on external service
- **Cache Duration:** Currently set to 1 hour for Notion posts - adjust based on content update frequency
- **Pre-rendering:** Static blog posts in `/thoughts` are pre-rendered at build time - requires rebuild to update
- **Migration Compatibility:** Ensure all current features work with Cloudflare Workers runtime when migrating
