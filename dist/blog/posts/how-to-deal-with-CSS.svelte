<script>
  import complicatedFrontend from '../../images/complicated-frontend.jpg';

  const title = "How to deal with CSS | Post";
  const description = "The common pitfalls with CSS and different approaches to making sense of the project's design, front-end and maintenance.";
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="title" content="{title}"/>
    <meta name="description" content="{description}"/>
    <meta property="og:title" content="{title}"/>
    <meta property="og:description" content="{description}"/>
    <meta property="twitter:title" content="{title}"/>
    <meta property="twitter:description" content="{description}"/>
    <meta name="robots" content="index,follow"/>
</svelte:head>

<section class="post">
    <div>
        <h3>Summary</h3>
        <p>The common pitfalls with CSS and different approaches to make sense of the project's design, front-end and
            maintenance. This is a more philosophical post where I overview my experience dealing with CSS and
            to find the best approach (methodology) for the project.</p>
    </div>
</section>
<section class="post">
    <div>
        <img src={complicatedFrontend} alt="Comic complicated frontend" width="519px" height="480px"/>
        <p>I believe no Front-end developer manages to escape from using Bootstrap CSS in at least one project.
            Sometimes, I notice this pattern:</p>
        <ul>
            <li>First is Bootstrap CSS</li>
            <li>Plugins for Bootstrap CSS</li>
            <li>Bootstrap Theme overrides CSS</li>
            <li>Overrides to accommodate some specific design changes CSS</li>
            <li>Other overrides for some components changed over time, and nobody is sure which CSS should be
                refactored, so there is a lot of CSS.
            </li>
        </ul>
        <p>And the list goes on.</p>
        <p>A long time ago, I joined a project that had ~1 MB of CSS (minified). That was a simple marketing website,
            which wasn’t too big. I mean, the size of the CSS is the same as a medium-sized Web App. Imagine the pain
            for the users on a mobile device without good internet to load a website.</p>
        <p>Does that mean that Bootstrap is the wrong choice? Of course not. A Bootstrap is a tool. It works for many
            cases but probably not for all. More important, however, is how the team is using Bootstrap. Usually, with
            Bootstrap (or a similar framework), the first steps are rapid. Layout and primary structure, menu,
            dropdowns, and forms fly in and out. Happy times.</p>
        <p>However, after some time in those projects, I notice custom CSS is added with something like this:</p>
        <code>margin-bottom: 8px, display: none, text-align: right</code>
        <p>instead of using the classes for elements like so:</p>
        <p><code>mb-2 d-none text-end</code>, and I wonder why?</p>
        <p>
            If the project uses Bootstrap, the logical step is to reuse all its goodies. For example, look at what you
            can do with text alone:
            <a href="https://getbootstrap.com/docs/5.0/utilities/text/">Bootstrap Text</a>.
            Now you can add media queries like <code>text-&#123;media&#125;-end</code> where media could be <code>sm,
            md, lg</code>, you got an idea..
        </p>
        <p>With SCSS Bootstrap, you can reduce the size by choosing only those Components you will use in your project.
            That way, you can slim the size of your project even more.</p>
        <p>My approach is to re-use as much as possible from the Framework and use additional CSS for describing
            exceptional design cases like background images, custom-made components like Carousel or Slides and similar.
            That way, CSS would be lean and more manageable. Also, that would help remove unused CSS, especially if we
            keep each component in a separate SCSS file.</p>

        <h3>Why use Framework?</h3>
        <p>Well, it is convenient. There is some structure, team members have good documentation, and all those forms,
            dropdowns, layouts, and grids are defined and ready for use, right?</p>
        <p>There is also a downside. Design is boxed in the Framework paradigm. It should be. Otherwise, what’s the
            point? I don’t think it is a big issue, but aligning with the design team is essential. Also, there should
            be an agreement with designers to consider a specific Framework before the design is created.</p>

        <h3>Different approach</h3>
        <p>You can choose to work from scratch, which gives complete freedom; however, some rules must be set even then.
            Also, it will be a bit slower at the start as you have to define layout, grid, and typography by
            yourself.</p>
        <p>I'm unsure how to describe it better, but it is more about setting a mental framework and agreeing on rules
            with the team on usage, naming convention and folder structure. It is important.</p>
        <p>For example, this old post from 2016 about the 8-point grid system is still relevant today.</p>
        <p><a href="https://medium.com/built-to-adapt/intro-to-the-8-point-grid-system-d2573cde8632">Intro to the
            8-point grid system</a></p>
        <p>So, this tiny agreement with the team (designers and developers) to use an 8pt grid makes life simpler for
            all. There are plenty of articles. Google “8pt grid system” and dig in!</p>

        <h3>What is the value of the 8pt system?</h3>
        <p><i><b>For designers:</b> Efficiency means fewer decisions to make while maintaining a quality rhythm between
            your elements.</i></p>
        <p><i><b>For Teams:</b> An easy communication system between designers and developers (no fussing over pixels).
            A developer can quickly eyeball an 8-point increment instead of measuring each time.</i></p>
        <p><i><b>For Users:</b> Consistent aesthetics for the brand they trust. No blurry half-pixel offsets on their
            preferred device.</i></p>
        <p>By the way, you can also adopt Bootstrap for the 8-point grid system by changing the grid-gutter-width from
            30px to 16px. There are probably a few more settings to adjust.</p>

        <h3>Methodology</h3>
        <p>Ok, so we are speaking about methodology, not Framework.</p>
        <p>There has to be an agreed approach on how to tackle design tasks.</p>
        <p>For example, take a look at CUBE: <a href="https://cube.fyi/composition.html#examples">CUBE examples</a></p>
        <p><i>"CUBE CSS is a CSS methodology that’s orientated towards simplicity, pragmatism and consistency. It’s
            designed to work with the medium you’re working in—often the browser—rather than against it.”</i></p>
        <p>Here is a long read about Cube’s approach: <a href="https://piccalil.li/blog/cube-css/">CUBE CSS</a></p>
        <p>Not entirely sure about this writing style of CSS: <br><code>&lt;div class="[ card__content ] [ flow
            ]"&gt;</code></p>
        <p>This a bit oldish post (2014), but don’t be fooled and it does explain flow ideas and how to write them in
            detail:
            <a href="https://alistapart.com/article/axiomatic-css-and-lobotomized-owls/">Axiomatic CSS and Lobotomized
                Owls</a></p>
        <p>On a side note, have you noticed that all examples use margin-top to separate elements from each other? At
            first, it feels counterintuitive, but it is not. When a component/element goes on the page, it doesn’t know
            if the below will be a title, gallery or form. That means that the margin-bottom could be wrong. However,
            the element itself knows how far it should be from the element above. Gallery maybe margin-top:0, where h1
            title margin-top: 2em;</p>
        <p>No, I’m not a CUBE fan, but it is the closest to my “own Methodology”. I am not as brave as CUBE. I do
            slightly bloat CSS as I add a specific file for each component, but it gives me a clear understanding of
            what is where.</p>
        <p>From my experience, maintenance is also essential. It is so satisfying to delete an old component and remove
            all CSS and know that there won’t be any damage done for the rest of the project.</p>

        <h3>Epilogue</h3>
        <p>The primary purpose was to stress that CSS is neither simple nor easy. It gives a lot of freedom, but that
            comes with a price. There are loads of good CSS Frameworks, each with its own methodology. Once you pick
            one, it makes sense to learn it, use it, apply design and think in a way that Frame is designed.</p>
        <p>What is your favourite approach to tackling CSS?</p>
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

img {
  max-width: 519px;
  margin: 0 auto;
  display: block;
}

li {
  list-style: outside disc;
  margin-left: 1rem;
}</style>
