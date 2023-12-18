<script>
    import reactLogo from '$lib/images/react-logo.png';
    import svelteLogo from '$lib/images/svelte-logo.png';
</script>

<section class="medium">
    <div>
        <time datetime="09-2022">September, 2022</time>
        <h1>Svelte vs ReactJS</h1>
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
            <img src={reactLogo} alt="React Logo" width="200px" height="175px"/>

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
            <img class="svelte" src={svelteLogo} alt="Svelte Logo" width="146px" height="175px"/>
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
            <a href="https://svelte.dev/blog/svelte-3-rethinking-reactivity">Rethinking Reactivity</a><br/>
            <a href="https://github.com/feltcoop/why-svelte">Why Svelte?</a><br/>
            <a href="https://www.turing.com/blog/svelte-vs-react-which-javascript-framework-should-you-choose/#:~:text=Which%20is%20faster%20Svelte%20or,not%20rely%20on%20VDOM%20diffing">Svelte
                VS ReactJS</a>
            <br/>
            <a href="https://blog.logrocket.com/react-remix-vs-next-js-vs-sveltekit/">Remix vs NextJS vs SvelteKit</a>
        </p>
    </div>
</section>

<style lang='scss'>
  .twoCols {
    @media only screen and (min-width: 800px) {
      display: flex;
      gap: 2rem;

      > div {
        flex-basis: 100%;
      }
    }
  }

  img {
    max-width: 200px;
    margin: 1rem auto;
    display: block;

    &.svelte {
     max-width: 146px;
    }
  }
</style>
