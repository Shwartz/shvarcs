<script>
	import reactLogo from '../../images/react-logo.png';
	import svelteLogo from '../../images/svelte-logo.png';

	const title = 'Svelte vs ReactJS | Post';
	const description = 'How different is Svelte vs ReactJS? What are the pros and cons of both libraries?';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content="{title}" />
	<meta name="description" content="{description}" />
	<meta property="og:title" content="{title}" />
	<meta property="og:description" content="{description}" />
	<meta property="twitter:title" content="{title}" />
	<meta property="twitter:description" content="{description}" />
	<meta name="robots" content="index,follow" />
</svelte:head>

<section class="post">
	<div>
		<h3>Summary</h3>
		<p>The Svelte vs React argument is straightforward when the project requirements are clearly defined.</p>

		<p>Use Svelte for your projects to achieve a smaller bundle size, maintainable code, and exceptional performance
			without
			the VDOM. Due to the framework's simplicity, Svelte enables developers to prepare a website faster.</p>

		<p>Using React for your projects will make it easier to hire developers. React makes it easy to maintain the
			stability
			of your application. An active community of React developers helps resolve doubts and bugs observed during
			development.</p>

		<p>The Svelte community is small, with only 11K developers, compared to more than 287K active React devs.
			(2022)</p>
	</div>
</section>
<section class="large">
	<div class="twoCols">
		<div>
			<h2 class="center">ReactJS</h2>
			<img src={reactLogo} alt="React Logo" width="200px" height="175px" />

			<p>React is a free and open-source front-end JavaScript library for building user interfaces based on UI
				components.</p>

			<p><b>Declarative</b> - React makes it painless to create interactive UIs and makes your code more
				predictable</p>

			<p><b>Component-Based</b> - Build encapsulated components that manage their own stage, then compose them to
				make complex UIs.</p>

			<p>React is a flexible component library that is perfect for state management. Thus, websites and apps that
				use React components can exchange data without reloading the page. React should be used for user
				interfaces that require a lot of user interaction.</p>

			<p>React corresponds to ‘view’ in the model-view-controller. Thus, managing lower-level algorithms with
				React is easy, and coding is required only for the interface’s view model. React’s Virtual DOM improves
				website performance and reduces lags to enhance loading times.</p>

			<h3>Good parts</h3>
			<ul class="list">
				<li>ReactJS is popular. According to
					<a href="https://www.statista.com/statistics/1124699/worldwide-developer-survey-most-used-frameworks-web/">Worldwide
						developer survey</a> ReactJS is the most used framework among developers (2022) 42.62%
				</li>
				<li><b>Easy scripting</b>. ReactJS offers a free extension, JSX, which simplifies the HTML markup in the
					library.
				</li>
				<li>Modular design. Easy to reuse the same components and assets without disturbing other components
				</li>
				<li>Easy to start coding with React, and a fantastic community</li>
				<li>One-way data binding</li>
				<li>Bundle size 42Kb</li>
			</ul>
			<h3>Disadvantages</h3>
			<ul class="list">
				<li>SEO. Unless you use server-side rendering before sending files to the user, there won't be much
					content for Search Engines to crawl.
				</li>
				<li>The architecture and learning process might become much harder to grasp for more extensive
					applications. Also, developers must learn the hooks concepts and state management.
				</li>
			</ul>
			<h3>Who uses ReactJS</h3>
			<p>Highly successful organisations like Facebook, Instagram, Salesforce, Shopify, Discord, Skype, and
				Pinterest use React to develop user interfaces. Due to the availability of many developers globally,
				companies prefer React to create the front-end part of their websites.</p>
		</div>
		<div>
			<h2 class="center">Svelte</h2>
			<img class="svelte" src={svelteLogo} alt="Svelte Logo" width="146px" height="175px" />
			<p>Svelte is a framework which can be built with SvelteKit, the official app framework from Svelte Team
				(currently Beta) </p>
			<p>Creator Rich Harris:</p>
			<blockquote>
				<p>“It’s a component framework, but it’s also a compiler, and it’s also a library of
					the things that you need when you’re building an application, and a philosophy of building web apps,
					I guess.”</p>
			</blockquote>
			<p>Svelte is a radical new approach to building user interfaces. Whereas traditional frameworks like React
				and Vue do the bulk of their work in the browser, Svelte shifts that work into a compile step that
				happens when you build your app.</p>
			<p>Instead of using techniques like virtual DOM diffing, Svelte writes code that surgically updates the DOM
				when the state of your app changes.</p>
			<h3>Good parts</h3>
			<ul class="list">
				<li>Easy to learn. If you know HTML and CSS, you can write Svelte immediately and learn as you go.</li>
				<li>Svelte is famous for DX advantages.</li>
				<li>Great performance</li>
				<li>Reduce code amount used for the same ReactJS vs Svelte components.</li>
				<li>SEO is supported out of the box</li>
				<li>Svelte is a newer framework.</li>
				<li>Bundle size 1.6Kb</li>
				<li>Svelte’s developers report high levels of satisfaction using Svelte. Many comments about moving from
					ReactJS to Svelte made work much easier and development faster.
				</li>
			</ul>
			<h3>Disadvantages</h3>
			<ul class="list">
				<li>The compiler architecture moves complexity from the runtime and source code to build time and tools.
					Behind Svelte’s simple APIs sits a beefy compiler. Frontend web development has become very
					tool-heavy in the web app era. In practice, this adds little cost beyond what developers like myself
					already pay, but increased build complexity is essential to acknowledge.
				</li>
				<li>Svelte is its own language, not plain HTML+CSS+JS - increasing the risks of adoption</li>
				<li>Young library ecosystem, fewer job opportunities, and fewer devs with knowledge of Svelte. Also, in
					2022, this might be less true, as Svelte’s name comes together with React, Angular, Vue and similar.
				</li>
			</ul>
			<h3>Who uses Svelte?</h3>

			<p>Major companies such as Yahoo, Rakuten, Bloomberg, Facebook, Apple, The New York Times, Square,
				ByteDance, Spotify, Reuters, Ikea, Brave, and others rely on Svelte for their websites. Companies prefer
				Svelte because it converts the application’s code to ideal JavaScript while coding. Thus, framework
				abstractions do not hamper the performance of apps written in Svelte.</p>
		</div>
	</div>
</section>
<section class="medium">
	<div>
		<h3>References</h3>
		<p>
			<a href="https://svelte.dev/blog/svelte-3-rethinking-reactivity">Rethinking Reactivity</a><br />
			<a href="https://github.com/feltcoop/why-svelte">Why Svelte?</a><br />
			<a
				href="https://www.turing.com/blog/svelte-vs-react-which-javascript-framework-should-you-choose/#:~:text=Which%20is%20faster%20Svelte%20or,not%20rely%20on%20VDOM%20diffing">Svelte
				VS ReactJS</a>
			<br />
			<a href="https://blog.logrocket.com/react-remix-vs-next-js-vs-sveltekit/">Remix vs NextJS vs SvelteKit</a>
		</p>
	</div>
</section>

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

@media only screen and (min-width: 800px) {
  .twoCols {
    display: flex;
    gap: 2rem;
  }
  .twoCols > div {
    flex-basis: 100%;
  }
}

img {
  max-width: 200px;
  margin: 1rem auto;
  display: block;
}
img.svelte {
  max-width: 146px;
}</style>
