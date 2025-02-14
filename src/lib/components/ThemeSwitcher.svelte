<script lang="ts">
	import { browser } from '$app/environment';
	import { TrOutlineMoonStars, TrOutlineSun } from 'svelte-icons-pack/tr';
	import { Icon } from 'svelte-icons-pack';
	import theme from '$lib/stores/theme';
	import { onMount } from 'svelte';

	interface ThemeSwitcherProps {
		isMenuOpen: boolean;
	}

	let {isMenuOpen = false}: ThemeSwitcherProps = $props();
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
			if (browser) {
				localStorage.setItem('theme', newTheme);
			}
			return newTheme;
		});
	};

	onMount(() => {
		theme.set(getInitialTheme());

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

<button
	type="button"
	class="clean"
	onclick={toggleTheme}
	class:menu-open={isMenuOpen}
	tabindex={isMenuOpen ? 0 : -1}
	aria-label="Change theme"
>
		<span>
			<Icon className="sun" size="21" color="var(--text)" src={TrOutlineSun} />
			<Icon className="moon" size="21" color="var(--text)" src={TrOutlineMoonStars} />
		</span>
</button>

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
</style>


