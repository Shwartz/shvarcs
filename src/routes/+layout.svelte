<script>
  import "./globalStyles.css";
  import "./temp-style.css";
  import {fade} from 'svelte/transition';
  import {navigationIsDelayed} from "$lib/utils/NavigationIsDelayed.ts";
  import {base} from "$app/paths";
  import {page} from "$app/stores";
  import {onMount} from "svelte";
  import {ThemeSwitcher} from "$lib/components/theme/ThemeSwitcher.ts";

  $:url = $page.url.pathname.split("/")[1];

  onMount(() => {
    ThemeSwitcher.init();
  });

</script>

<div class='page'>
    {#if $navigationIsDelayed}
        <div class="loader" transition:fade={{duration:200}}></div>
    {/if}
    <nav class="section large">
        <ul>
            <li>
                <a href="{base}/">Andris Švarcs</a>
            </li>
            <li>
                <a class:active={url === 'thoughts'} href="{base}/thoughts">Thoughts</a>
            </li>
            <li>
                <a class:active={url === 'news-archive'} href="{base}/news-archive">News Archive</a>
            </li>
            <li>
                <button data-id="theme-switcher" class="theme-switcher" aria-label="Turn off dark mode">
                    <img alt="moon" width="20px" height="20px" src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NCIgaGVpZ2h0PSI0NCIgZmlsbD0iI2UyZDJhZSIgY2xhc3M9ImJpIGJpLW1vb24tc3RhcnMiIHZpZXdCb3g9IjAgMCAxNiAxNiIgaWQ9Imljb24tbW9vbi1zdGFycy00Ij48cGF0aCBkPSJNNiAuMjc4YS43NjguNzY4IDAgMCAxIC4wOC44NTggNy4yMDggNy4yMDggMCAwIDAtLjg3OCAzLjQ2YzAgNC4wMjEgMy4yNzggNy4yNzcgNy4zMTggNy4yNzcuNTI3IDAgMS4wNC0uMDU1IDEuNTMzLS4xNmEuNzg3Ljc4NyAwIDAgMSAuODEuMzE2LjczMy43MzMgMCAwIDEtLjAzMS44OTNBOC4zNDkgOC4zNDkgMCAwIDEgOC4zNDQgMTZDMy43MzQgMTYgMCAxMi4yODYgMCA3LjcxIDAgNC4yNjYgMi4xMTQgMS4zMTIgNS4xMjQuMDZBLjc1Mi43NTIgMCAwIDEgNiAuMjc4ek00Ljg1OCAxLjMxMUE3LjI2OSA3LjI2OSAwIDAgMCAxLjAyNSA3LjcxYzAgNC4wMiAzLjI3OSA3LjI3NiA3LjMxOSA3LjI3NmE3LjMxNiA3LjMxNiAwIDAgMCA1LjIwNS0yLjE2MmMtLjMzNy4wNDItLjY4LjA2My0xLjAyOS4wNjMtNC42MSAwLTguMzQzLTMuNzE0LTguMzQzLTguMjkgMC0xLjE2Ny4yNDItMi4yNzguNjgxLTMuMjg2eiI+PC9wYXRoPjxwYXRoIGQ9Ik0xMC43OTQgMy4xNDhhLjIxNy4yMTcgMCAwIDEgLjQxMiAwbC4zODcgMS4xNjJjLjE3My41MTguNTc5LjkyNCAxLjA5NyAxLjA5N2wxLjE2Mi4zODdhLjIxNy4yMTcgMCAwIDEgMCAuNDEybC0xLjE2Mi4zODdhMS43MzQgMS43MzQgMCAwIDAtMS4wOTcgMS4wOTdsLS4zODcgMS4xNjJhLjIxNy4yMTcgMCAwIDEtLjQxMiAwbC0uMzg3LTEuMTYyQTEuNzM0IDEuNzM0IDAgMCAwIDkuMzEgNi41OTNsLTEuMTYyLS4zODdhLjIxNy4yMTcgMCAwIDEgMC0uNDEybDEuMTYyLS4zODdhMS43MzQgMS43MzQgMCAwIDAgMS4wOTctMS4wOTdsLjM4Ny0xLjE2MnpNMTMuODYzLjA5OWEuMTQ1LjE0NSAwIDAgMSAuMjc0IDBsLjI1OC43NzRjLjExNS4zNDYuMzg2LjYxNy43MzIuNzMybC43NzQuMjU4YS4xNDUuMTQ1IDAgMCAxIDAgLjI3NGwtLjc3NC4yNThhMS4xNTYgMS4xNTYgMCAwIDAtLjczMi43MzJsLS4yNTguNzc0YS4xNDUuMTQ1IDAgMCAxLS4yNzQgMGwtLjI1OC0uNzc0YTEuMTU2IDEuMTU2IDAgMCAwLS43MzItLjczMmwtLjc3NC0uMjU4YS4xNDUuMTQ1IDAgMCAxIDAtLjI3NGwuNzc0LS4yNThjLjM0Ni0uMTE1LjYxNy0uMzg2LjczMi0uNzMyTDEzLjg2My4xeiI+PC9wYXRoPjwvc3ZnPg==" />
                    <img alt="sun" width="24px" height="24px" src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NCIgaGVpZ2h0PSI0NCIgZmlsbD0iIzYwN2Q4YiIgY2xhc3M9ImJpIGJpLXN1biIgdmlld0JveD0iMCAwIDE2IDE2IiBpZD0iaWNvbi1zdW4tNSI+PHBhdGggZD0iTTggMTFhMyAzIDAgMSAxIDAtNiAzIDMgMCAwIDEgMCA2em0wIDFhNCA0IDAgMSAwIDAtOCA0IDQgMCAwIDAgMCA4ek04IDBhLjUuNSAwIDAgMSAuNS41djJhLjUuNSAwIDAgMS0xIDB2LTJBLjUuNSAwIDAgMSA4IDB6bTAgMTNhLjUuNSAwIDAgMSAuNS41djJhLjUuNSAwIDAgMS0xIDB2LTJBLjUuNSAwIDAgMSA4IDEzem04LTVhLjUuNSAwIDAgMS0uNS41aC0yYS41LjUgMCAwIDEgMC0xaDJhLjUuNSAwIDAgMSAuNS41ek0zIDhhLjUuNSAwIDAgMS0uNS41aC0yYS41LjUgMCAwIDEgMC0xaDJBLjUuNSAwIDAgMSAzIDh6bTEwLjY1Ny01LjY1N2EuNS41IDAgMCAxIDAgLjcwN2wtMS40MTQgMS40MTVhLjUuNSAwIDEgMS0uNzA3LS43MDhsMS40MTQtMS40MTRhLjUuNSAwIDAgMSAuNzA3IDB6bS05LjE5MyA5LjE5M2EuNS41IDAgMCAxIDAgLjcwN0wzLjA1IDEzLjY1N2EuNS41IDAgMCAxLS43MDctLjcwN2wxLjQxNC0xLjQxNGEuNS41IDAgMCAxIC43MDcgMHptOS4xOTMgMi4xMjFhLjUuNSAwIDAgMS0uNzA3IDBsLTEuNDE0LTEuNDE0YS41LjUgMCAwIDEgLjcwNy0uNzA3bDEuNDE0IDEuNDE0YS41LjUgMCAwIDEgMCAuNzA3ek00LjQ2NCA0LjQ2NWEuNS41IDAgMCAxLS43MDcgMEwyLjM0MyAzLjA1YS41LjUgMCAxIDEgLjcwNy0uNzA3bDEuNDE0IDEuNDE0YS41LjUgMCAwIDEgMCAuNzA4eiI+PC9wYXRoPjwvc3ZnPg==" />
                </button>
            </li>
        </ul>
    </nav>
    <slot/>
</div>

<style lang='scss'>
  nav ul {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;

    li {
      display: flex;
    }

    li:first-child {
      margin-right: auto;
    }

    a.active {
      text-decoration: underline;
    }
  }

  .loader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: #4c432b;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 4px;
      width: 100%;
      background: #ffb300;
      transform: translate3d(-100%, 0, 0);
      animation: 10s moveSlide forwards;
    }
  }

  @keyframes moveSlide {
    0% {
      transform: translate3d(-100%, 0, 0);
    }

    30% {
      transform: translate3d(-90%, 0, 0);
    }

    60% {
      transform: translate3d(-50%, 0, 0);
    }

    80% {
      transform: translate3d(-40%, 0, 0);
    }

    100% {
      transform: translate3d(0%, 0, 0);
    }
  }

  .theme-switcher {
    text-transform: capitalize;
    background: none;
    border: none;
    margin: 0;
    padding: 0.2rem;

    &:empty {
      display: none;
    }

    img {
      display: none;
      width: 24px;
      height: 24px;
      min-width: 20px;
    }
  }

  html[data-theme='light'] {
    .theme-switcher img[alt='sun'] {
      display: block;
    }
  }

  html[data-theme='dark'] {
    .theme-switcher img[alt='moon'] {
      display: block;
      width: 20px;
      height: 20px;
    }
  }
</style>

