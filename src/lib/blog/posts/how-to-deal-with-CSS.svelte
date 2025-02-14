<script>
  import complicatedFrontend from '$lib/images/complicated-frontend.jpg';

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

<style lang='scss'>
  img {
    max-width: 519px;
    margin: 0 auto;
    display: block;
  }

  li {
    list-style: outside disc;
    margin-left: 1rem;
  }
</style>
