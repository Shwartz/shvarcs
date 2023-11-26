<script>
	import {base} from "$app/paths";
	import Meta from "$lib/components/Meta.svelte";
</script>

<svelte:head>
	<Meta
			title="Andris Shvarcs | Web developer"
			description="Web, latest Front-end news, blog"
	/>
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
