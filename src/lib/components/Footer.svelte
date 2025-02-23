<script>
	import { base } from '$app/paths';
</script>

<footer>
	<div class="wrapper">
		<div class="bio">
			<h3>Andris Švarcs</h3>
			<p>Somehow, I've survived over 15 years as a web developer without losing my interest in the craft. Quite the opposite, with so many great improvements in the Web standards, what was nearly impossible now is easy to make.</p>
			<p>My career has been a wild ride through small agencies and big corporations, building everything from finance apps to health dashboards.
			</p>
			<p>I'm that annoying person who needs to understand products beyond just slinging code. I ask questions like 'Why is this feature important?' and 'How will this improve the customer journey?' – you know, the kind of questions that make project managers reach for the <s>pint</s> aspirin.
				This curiosity has led me down the rabbit holes of design, accessibility, and SEO. Because apparently, making websites pretty, usable, and findable wasn't challenging enough on its own.
			</p>
			<p>P.S. If this bio sounds too polished, blame my evil AI twin. I'm still working on teaching it sarcasm.</p>
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
			<!--<p>link to be added</p>
			<p>link to be added</p>
			<p>link to be added</p>-->
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
    border-color: rgba(0, 0, 0, 0);
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
      font-size: var(--step--1);
    }

    h3 {
      margin-bottom: 1.5rem;
    }

		.bio h3 {
			font-size: var(--step-0);
		}

    p {
      margin-top: 0.5rem;
    }

    a {
      color: var(--text-color);

      &:hover, &:focus {
        background-size: 0 2px, 100% 2px;
      }
    }

		.smallText {
			margin-top: 2rem;
			font-size: var(--step--2);
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
		"pages links connect . bio bio bio bio";
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

