<script lang="ts">
	import { TrOutlineArrowsDiagonal } from 'svelte-icons-pack/tr';
	import { Icon } from 'svelte-icons-pack';

	interface ToggleCompactProps {
		checked: boolean;
		toggleCompact: () => void;
	}

	let { checked, toggleCompact }: ToggleCompactProps = $props();

</script>

<div role="switch" aria-checked={checked} tabindex="0" onkeydown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleCompact();
  }
}}>
	<label for="toggleGridList" class="theme-toggle">
		<input class="visually-hidden" id="toggleGridList" type="checkbox" {checked} onchange={toggleCompact} />
		<span aria-hidden="true" class="magic"><Icon size="12" color="var(--text)" src={TrOutlineArrowsDiagonal} /></span>
		<span aria-hidden="true" class="list">list</span>&nbsp;/&nbsp;
		<span aria-hidden="true" class="grid">grid</span>
	</label>
</div>

<style>
		div {
        display: none;
		}
    /* 768 | 48rem */
    @media(min-width: 48rem) {
        div {
            display: block;
        }
    }
    .magic {
        outline: 1px solid var(--text);
        border-radius: 2px;
        outline-offset: 1px;
        margin-right: 4px;
    }

    .theme-toggle {
        display: flex;
        align-items: center;
        gap: 2px;
        cursor: pointer;
    }

    /* Checkbox false */
    .theme-toggle:has(input[type="checkbox"]:not(:checked)) .list {
				color: var(--textLight);
    }

    /* Checkbox true */
    .theme-toggle:has(input[type="checkbox"]:checked) .grid {
        color: var(--textLight);
    }

		.theme-toggle:has(input[type="checkbox"]) {
        .grid:hover,
        .list:hover {
            color: var(--text);
        }
		}

</style>
