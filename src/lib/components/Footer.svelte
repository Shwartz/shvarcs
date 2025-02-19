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
<style lang="scss">
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
    grid-template-areas:
		"pages connect"
		"links connect"
		"bio  bio";
    grid-template-columns: repeat(2, minmax(0, 1fr)); /* Equal-width columns */

    h3, p {
      font-size: px-to-rem(16px);
    }

    h3 {
      margin-bottom: 1.5rem;
    }

    p {
      margin-top: 0.5rem;
    }

    a {
      display: block;
      color: var(--text-color);
      text-decoration: none;
      padding-bottom: 1px; /* Underline distance from the text */
      background:
              linear-gradient(to right, var(--pastel-purple), var(--pastel-orange), var(--pastel-orange)) 100% 100% no-repeat,
              linear-gradient(to right, var(--pastel-purple), var(--pastel-pink), var(--pastel-purple)) 0 100% no-repeat;
      background-size: 100% 2px, 0 2px;
      transition: background-size 400ms;

      &:hover, &:focus {
        background-size: 0 2px, 100% 2px;
      }
    }

		.smallText {
			font-size: 0.75rem;
			color: var(--textLight);
		}

    @media (min-width: px-to-rem(600px)) {
      grid-template-areas:
		"pages links connect ."
		"bio  bio bio .";
      grid-template-columns: repeat(4, minmax(0, 1fr)); /* Equal-width columns */
    }

    @media (min-width: px-to-rem(800px)) {
      grid-template-areas:
		"pages pages links links connect connect"
		"bio  bio bio bio . .";
      grid-template-columns: repeat(6, minmax(0, 1fr)); /* Equal-width columns */
    }

    @media (min-width: px-to-rem(1172px)) {
      grid-template-areas:
		"pages links connect . bio bio bio .";
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

		span {
			display: inline-block;
		}
  }

  .pages {
    grid-area: pages;
  }

  .links {
    grid-area: links;
  }

  .connect {
    grid-area: connect;
  }

</style>

