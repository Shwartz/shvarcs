<script lang="ts">
	import { browser } from '$app/environment';
	import theme from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import Moon from '../../assets/svg/Moon.svelte';
	import Sun from '../../assets/svg/Sun.svelte';

	interface ThemeSwitcherProps {
		isMenuOpen: boolean;
	}

	let themeInUse: 'light' | 'dark' = $state('light');

	let { isMenuOpen = false }: ThemeSwitcherProps = $props();
	const getPreferredColorScheme = () => {
		if (browser) {
			return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}
		return 'light';
	};

	const getInitialTheme = () => {
		if (browser) {
			const storedTheme = localStorage.getItem('theme');
			if (storedTheme) {
				return storedTheme as 'dark' | 'light';
			}
			return getPreferredColorScheme();
		}
		return 'light';
	};

	const toggleTheme = () => {
		theme.update(currentTheme => {
			const newTheme = currentTheme === 'light' ? 'dark' : 'light';
			themeInUse = newTheme;
			if (browser) {
				localStorage.setItem('theme', newTheme);
			}
			return newTheme;
		});
	};

	onMount(() => {
		themeInUse = getInitialTheme();
		theme.set(themeInUse);

		if (browser) {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			const handleChange = () => {
				if (!localStorage.getItem('theme')) {
					theme.set(getPreferredColorScheme());
				}
			};

			mediaQuery.addEventListener('change', handleChange);

			return () => {
				mediaQuery.removeEventListener('change', handleChange);
			};
		}
	});

	$effect(() => {
		if (browser) {
			theme.subscribe(currentTheme => {
				document.documentElement.setAttribute('data-theme', currentTheme);
			});
		}
	});
</script>

<div class="flex">
	<button
		type="button"
		class="clean"
		onclick={toggleTheme}
		class:menu-open={isMenuOpen}
		tabindex={isMenuOpen ? 0 : -1}
		aria-label="Change theme"
	>
		<span>
			<Sun />
			<Moon />
		</span>
	</button>
	<span>Mode</span>
	<span class="mode">{themeInUse}</span>
</div>

<!-- svelte-ignore css_unused_selector -->
<style lang="scss" global>
  :global(html[data-theme='light'] .moon) {
    display: none;
  }

  :global(html[data-theme='dark'] .sun) {
    display: none;
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
      will-change: transform;
    }

    > * {
      transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    &:hover > * {
      transform: scale(1.2);
    }
  }

	.flex {
		display: flex;
		align-items: center;

    > span:last-child {
      margin-left: auto;
      color: var(--grey-text);
    }
	}

  /* HEADER MENU: Full Size > 768 | 48rem */
  @media(min-width: 48rem) {
		.flex {
			> span {
				display: none;
			}
		}
	}
</style>


