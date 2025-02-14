<script lang="ts">
	import Header from '$lib/components/Header.svelte';
</script>

<div class="goodRead">
	<Header />
	<h1 class="frankTitle">good read</h1>
	<p class="intro">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
		pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
		laborum.</p>
</div>

<style lang="scss">
  .goodRead {
    flex-grow: 1;
  }

  .frankTitle {
    font-size: 9rem;
    color: var(--textLight);
    line-height: normal;
  }

  .intro {
    width: 100%;
  }

  @media (min-width: 600px) {
    .intro {
      width: 75%;
    }
  }

  @media (min-width: 1200px) {
    .intro {
      width: 50%;
    }
  }
</style>
