<script>
	import { base } from '$app/paths';
</script>

<footer>
	<div class="wrapper">
		<div class="bio">
			<h3>Andris Švarcs</h3>
			<p>I have been working as a web developer for over 15 years. I call myself a Product-minded engineer. I worked in
				small agencies and enterprise-level companies during my career. The products I built or worked on as a team
				include domains like finance, tourism, health, dashboard web apps and more.</p>
			<p>I like to understand products beyond the code. I like to ask lots of Why questions. Why this feature is
				important? How will this improve the customer journey? Because of this interest, I also deep dive into design,
				accessibility and SEO topics.</p>
			<p class="smallText">Copyright &copy; since 2021, <span>Andris Švarcs.</span> <span>All rights reserved.</span></p>
		</div>
		<div class="pages">
			<h3>Pages</h3>
			<p><a href="{base}/thoughts">blog</a></p>
			<p><a href="{base}/news-archive">news archive</a></p>
			<p><a href="{base}/good-read">good read</a></p>
		</div>
		<div class="links">
			<h3>Links</h3>
			<p>link to be added</p>
			<p>link to be added</p>
			<p>link to be added</p>
		</div>
		<div class="connect">
			<h3>Lets connect</h3>
			<p><a href="https://bsky.app/profile/andrissvarcs.bsky.social">bluesky</a></p>
			<p><a href="https://www.youtube.com/@CodingWithAndris">youtube</a></p>
			<p><a href="https://www.linkedin.com/in/shvarcs/">linkedin</a></p>
		</div>
	</div>
</footer>

<!-- svelte-ignore css_unused_selector -->
<style>/* svelte-ignore css-unused-selector */
/** Kudos to Josh Comeau: https://www.joshwcomeau.com/css/custom-css-reset/ */
/* 1. Use a more-intuitive box-sizing model */
*, *::before, *::after {
  box-sizing: border-box;
}

/* 2. Remove default margin */
* {
  margin: 0;
}

body {
  /* 3. Add accessible line-height */
  line-height: 1.5;
  /* 4. Improve text rendering */
  -webkit-font-smoothing: antialiased;
}

/* 5. Improve media defaults */
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

/* 6. Inherit fonts for form controls */
input, button, textarea, select {
  font: inherit;
}

/* 7. Avoid text overflows */
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

/* 8. Improve line wrapping */
p {
  text-wrap: pretty;
}

h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
}

/*
  9. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}

:root {
  /** colors */
  --clr-white: white;
  --lime: lime;
  --_sudo-private-property-example: red;
  --pastel-cream: #F0EBD5;
  --pastel-yellow: #FCF3A4;
  --pastel-orange: #FFD79F;
  --pastel-pink: #FFC9C9;
  --pastel-rose: #FFA3B6;
  --pastel-purple: #8f172e;
  --pastel-blue: #CCDFFD;
  --pastel-aqua: #B8DFE6;
  --pastel-mint: #D1E2CF;
  --pastel-lime: #D6F1BB;
  --grid-color: #FF060033;
  --background-color: #FFF;
  --text: #222;
  --textLight: rgba(34, 34, 34, 0.4);
  --code-color: #9f3d51;
  --post-width: 40.125rem;
  --post-l-width: 64rem;
  --pastel-cream-light-mode: #F0EBD580;
  --pastel-cream-dark-mode: #F0EBD505;
  --table-row-bg: var(--pastel-cream-light-mode);
  /** fonts */
  --step--2: clamp(0.7813rem, 0.7747rem + 0.0326vi, 0.8rem);
  --step--1: clamp(0.9375rem, 0.9158rem + 0.1087vi, 1rem);
  --step-0: clamp(1.125rem, 1.0815rem + 0.2174vi, 1.25rem);
  --step-1: clamp(1.35rem, 1.2761rem + 0.3696vi, 1.5625rem);
  --step-2: clamp(1.62rem, 1.5041rem + 0.5793vi, 1.9531rem);
  --step-3: clamp(1.944rem, 1.771rem + 0.8651vi, 2.4414rem);
  --step-4: clamp(2.3328rem, 2.0827rem + 1.2504vi, 3.0518rem);
  --step-5: clamp(2.7994rem, 2.4462rem + 1.7658vi, 3.8147rem);
  --ff-family: Blanco,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  --ff-code: Consolas, Menlo, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
}

/** theme dark */
html[data-theme=dark] {
  color-scheme: dark;
  --background-color: #222;
  --text: #FFF;
  --textLight: rgba(255, 255, 255, 0.4);
  --code-color: var(--pastel-purple);
  --table-row-bg: var(--pastel-cream-dark-mode);
}

footer {
  margin-top: 6rem;
  border-top: 1px dotted var(--grid-color);
}

.wrapper {
  margin-top: 1.5rem;
  border-top: 1px dotted var(--grid-color);
}

:global(.gridOff) :is(footer, .wrapper) {
  border-top-color: rgba(0, 0, 0, 0);
}

/* footer style */
.wrapper {
  display: grid;
  gap: 1.5rem;
  grid-template-areas: "pages connect" "links connect" "bio  bio";
  grid-template-columns: repeat(2, minmax(0, 1fr)); /* Equal-width columns */
}
.wrapper h3, .wrapper p {
  font-size: 1rem;
}
.wrapper h3 {
  margin-bottom: 1.5rem;
}
.wrapper p {
  margin-top: 0.5rem;
}
.wrapper a {
  display: block;
}
.wrapper .smallText {
  font-size: 0.75rem;
  color: var(--textLight);
}
@media (min-width: 37.5rem) {
  .wrapper {
    grid-template-areas: "pages links connect ." "bio  bio bio .";
    grid-template-columns: repeat(4, minmax(0, 1fr)); /* Equal-width columns */
  }
}
@media (min-width: 50rem) {
  .wrapper {
    grid-template-areas: "pages pages links links connect connect" "bio  bio bio bio . .";
    grid-template-columns: repeat(6, minmax(0, 1fr)); /* Equal-width columns */
  }
}
@media (min-width: 73.25rem) {
  .wrapper {
    grid-template-areas: "pages links connect . bio bio bio .";
    grid-template-columns: repeat(8, minmax(0, 1fr)); /* Equal-width columns */
  }
}

.bio, .pages, .links, .connect {
  min-width: 0; /* Prevents content overflow */
  width: 100%; /* Ensures full column width usage */
  margin-bottom: 1.5rem;
}

.bio {
  grid-area: bio;
}
.bio span {
  display: inline-block;
}

.pages {
  grid-area: pages;
}

.links {
  grid-area: links;
}

.connect {
  grid-area: connect;
}</style>

