<script>
	import {base} from "$app/paths";
	// import Meta from "$lib/components/Meta.svelte";
	const title = "Andris Shvarcs | Web developer";
	const description = "Web, latest Front-end news, blog";
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

<div class='wrap'>
	<div>
		<h1>Shvarcs</h1>
		<p>Under construction and some re-branding. In a meantime, there is a <a href="{base}/news-archive">News Archive</a></p>
	</div>
</div>

<style lang='scss'>
  .wrap {
    display: flex;
    justify-items: center;
    flex-direction: column;
    text-align: center;
    height: 100vh;
    background: linear-gradient(135deg, white 50%, black 50%);

    > div {
      margin: auto;
    }
  }

  h1 {
    font-size: clamp(4rem, 25vw, 25rem);
    font-weight: bold;
    justify-self: center;
		margin-top: -10rem;

    color: #fff;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-text-stroke: 2px #909090;
  }

	p {
    color: #909090;
	}
	a {
		text-decoration: underline;
	}
</style>
