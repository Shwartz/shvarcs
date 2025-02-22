<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { Icon } from 'svelte-icons-pack';
	import { TrOutlineMenu2, TrOutlineX } from 'svelte-icons-pack/tr';
	import { debounce } from '$lib/utils/debounce.js';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import GridLines from '../../assets/svg/GridLines.svelte';

	// Retrieve context from any parent layout, routes/+layout.svelte
	const { toggleGrid, isGridOn } = $props();
	let isHamburgerOn = $state(false);
	let isAnimated = $state(false);
	let isDesktop = $state(false);
	let windowWidth = $state(0);
	let isTabbingAvailable = $derived(isDesktop ? true : isHamburgerOn);
	const menuId = 'main-nav-menu';

	const toggleHamburger = () => {
		if (!isAnimated) {
			isAnimated = !isAnimated; // invoke once
		}
		isHamburgerOn = !isHamburgerOn;
	};

	afterNavigate(() => {
		isHamburgerOn = false;
	});

	$effect(() => {
		if (isHamburgerOn) {
			const menu = document.getElementById(menuId);
			menu?.focus();
		}
	});

	$effect(() => {
		isDesktop = windowWidth >= 768;
		// Update your menu state or other UI elements based on isDesktop
	});

	onMount(() => {
		windowWidth = window.innerWidth;

		const handleResize = debounce(() => {
			windowWidth = window.innerWidth;
		}, 250);

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest('#topHead')) {
				isHamburgerOn = false;
			}
		};
		const handleKeydown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isHamburgerOn) {
				isHamburgerOn = false;
			}
		};
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', handleKeydown);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.addEventListener('keydown', handleKeydown);
		};
	});
</script>

<header>
	<div id="topHead" class="headerWrap" class:slideMenuIn={isHamburgerOn}>
		<a href="{base}/" class="me">Andris Švarcs</a>
		<div class="hamburger">
			<button
				onclick={toggleHamburger}
				type="button"
				class="clean"
				aria-expanded={isHamburgerOn}
				aria-controls={menuId}
				aria-label={isHamburgerOn ? "Close menu" : "Open menu"}
			>
				{#if isHamburgerOn}
					<Icon size="24" color="var(--text)" src={TrOutlineX} />
				{:else}
					<Icon size="24" color="var(--text)" src={TrOutlineMenu2} />
				{/if}
			</button>
		</div>
		<div class="menu" class:isAnimated>
			<nav
				id={menuId}
				aria-label="Main menu"
				class={isHamburgerOn ? 'slideMenuIn' : ''}
				aria-hidden={!isHamburgerOn && !isDesktop}
			>
				<a
					href="{base}/thoughts"
					tabindex={isTabbingAvailable ? 0 : -1}
					aria-current={$page.url.pathname === '/thoughts' ? 'page' : undefined}
				>blog</a>
				<a
					href="{base}/news-archive"
					tabindex={isTabbingAvailable ? 0 : -1}
					aria-current={$page.url.pathname === '/news-archive' ? 'page' : undefined}
				>news archive</a>
				<a
					href="{base}/good-read"
					tabindex={isTabbingAvailable ? 0 : -1}
					aria-current={$page.url.pathname === '/good-read' ? 'page' : undefined}
				>good read</a>
			</nav>

			<div class="settings">
				<div class="flex">
					<button
						type="button"
						class={`clean ${isGridOn ? 'on' : ''}`}
						class:isGridOn
						onclick={toggleGrid}
						tabindex={isTabbingAvailable ? 0 : -1}
						title="Grid"
					>
						<GridLines {isGridOn} />
					</button>
					<span>Grid</span>
					<span>{isGridOn ? 'on': 'off'}</span>
				</div>
				<ThemeSwitcher isMenuOpen={isTabbingAvailable} />
			</div>
		</div>
	</div>
</header>

<!-- svelte-ignore css_unused_selector -->
<style lang="scss">
  /* HEADER MENU */
  .headerWrap {
    display: grid;
    align-items: center;
    margin-bottom: 1.5rem;
    border-bottom: 1px dotted var(--grid-color);
    grid-template-areas:
	"a c"
	"b b";

    a {
      color: var(--text);
      text-decoration: none;

      &:hover,
      &:focus {
        text-decoration: underline;
      }
    }

    .me {
      font-weight: bold;

      &:hover {
        text-decoration: none;
      }
    }
  }

  :global(.gridOff) :is(header, .headerWrap) {
    border-color: rgba(0, 0, 0, 0);
  }

  .me {
    grid-area: a;
  }

  .menu {
    grid-area: b;
  }

  .hamburger {
    grid-area: c;
    justify-self: right;
    align-self: center;
  }

  /* HEADER MENU: MOBILE*/
  .headerWrap {
    --navTop: 13rem;
    position: relative;

    .menu {
      position: absolute;
      display: flex;
      flex-direction: column;
      width: 100%;
      transform: translate3d(110%, 0, 0);
      transition: none;
      background: var(--background-color);
      border: 1px dotted var(--grid-color);
      visibility: hidden;

      &.isAnimated {
        visibility: visible;
        z-index: 1;
      }
    }

    &.slideMenuIn .menu {
      animation: slideInWithBounce 0.5s forwards;
    }

    &:not(.slideMenuIn) .menu {
      animation: slideOutWithBounce 0.5s forwards;
    }
  }

  nav {
    display: flex;
    flex-direction: column;
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px dotted var(--grid-color);

    a {
      display: block;
      padding: 0.4rem 0;
      font-size: var(--step-3);
      font-weight: 600;
    }
  }

  .settings {
    display: flex;
    flex-direction: column;
    border-top: 1px dotted var(--grid-color);
    padding: 1.5rem 0;

		.flex {
			display: flex;
			align-items: center;

			span:last-child {
				margin-left: auto;
				color: var(--grey-text);
			}
		}

    button {
      width: 44px;
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      cursor: pointer;
      overflow: hidden;

      span {
        display: flex;
        padding: 2px;
        width: 20px;
        height: 20px;
        border-radius: 4px;
        border: 1px solid var(--text);
        will-change: transform;
      }

      > * {
        transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
      }

      &:hover > * {
        transform: scale(1.2);
      }
    }
  }

  .hamburger {
    button {
      width: 44px;
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      cursor: pointer;
      overflow: hidden;
    }
  }

  :global(.gridOff) :is(.menu, nav, .settings) {
    border-color: rgba(0, 0, 0, 0);

  }

  /* HEADER MENU: > 500 | 31.25rem */
  /*@media(min-width: 31.25rem) {}*/

  /* HEADER MENU: Full Size > 768 | 48rem */
  @media(min-width: 48rem) {
    .headerWrap {
      grid-template-areas:
	"a b";

      .menu {
        --navTop: 24px;
        position: relative;
        padding: 0;
        visibility: visible;
        transform: none;
        background: none;
        animation: none;
        box-shadow: none;

        border: none;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
      }

      &.slideMenuIn .menu {
        animation: none;
      }

      &:not(.slideMenuIn) .menu {
        animation: none;
      }

      a {
        font-size: var(--step--1);
        font-weight: 400;
      }

      nav {
        flex-direction: row;
        gap: 2rem;
        padding: 0;
        margin: 0;
        border: none;
      }

      .settings {
        flex-direction: row;
        padding: 0;
        border: none;

				.flex span {
					display: none;
				}
      }
    }

    nav {
      flex-direction: row;
      gap: 2rem;
    }

    .hamburger {
      display: none;
    }
  }

  nav[aria-hidden="false"] {
    visibility: visible;
    opacity: 1;
  }

  @keyframes slideInWithBounce {
    0% {
      transform: translate3d(-110%, var(--navTop), 0);
    }
    60% {
      transform: translate3d(4%, var(--navTop), 0);
    }
    80% {
      transform: translate3d(-2%, var(--navTop), 0);
    }
    100% {
      transform: translate3d(0, var(--navTop), 0);
    }
  }

  @keyframes slideOutWithBounce {
    0% {
      transform: translate3d(0, var(--navTop), 0);
    }
    20% {
      transform: translate3d(4%, var(--navTop), 0);
    }
    40% {
      transform: translate3d(-2%, var(--navTop), 0);
    }
    100% {
      transform: translate3d(-110%, var(--navTop), 0);
    }
  }
</style>
