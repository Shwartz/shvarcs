<script>
  import "./globalStyles.css";
  import "./temp-style.css";
  import {fade} from 'svelte/transition';
  import {navigationIsDelayed} from "$lib/utils/NavigationIsDelayed.ts";
  import {base} from "$app/paths";
  import {page} from "$app/stores";
  import ThemeSwitcher from "$lib/components/theme/ThemeSwitcher.svelte";

  $:url = $page.url.pathname.split("/")[1];
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
                <ThemeSwitcher/>
            </li>
        </ul>
    </nav>
    <slot/>
    <footer>
        <div>
            <p>&copy;2024 <a href="https://shvarcs.com">Andris Švarcs</a> | Get in touch: <a href="https://fosstodon.org/@shvarcs" target="_blank">Mastodon</a></p>
        </div>
    </footer>
</div>

<style lang='scss'>
  .page {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  nav {
    --s: 40px;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      height: 0.4rem;
      bottom: -0.4rem;
      left: 0;
      right: 0;

      background: repeating-conic-gradient(var(--bg) 0 25%, var(--disabled) 0 50%) 0 0/var(--s) var(--s) round;
      pointer-events: none;
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      width: 100%;
      margin: 1rem 0;

      li {
        display: flex;
      }

      li:first-child {
        width: 100%;
        margin-right: auto;
      }

      li:last-child {
        margin-left: auto;
      }

      a.active {
        text-decoration: underline;
      }
    }
  }

  footer {
    p {
      margin: 1.5rem 0;
    }
  }

  @media only screen and (min-width: 800px) {
    nav ul {
      flex-wrap: nowrap;


      li:first-child {
        width: auto;
      }

      li:last-child {
        margin-left: 1rem;
      }
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
</style>

