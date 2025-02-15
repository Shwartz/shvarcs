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
	<label for="toggleCompact" class="theme-toggle">
		<input class="visually-hidden" id="toggleCompact" type="checkbox" {checked} onchange={toggleCompact} />
		<span aria-hidden="true" class="magic"><Icon size="12" color="var(--text)" src={TrOutlineArrowsDiagonal} /></span>
		<span aria-hidden="true" class="comfortable">comfortable</span>&nbsp;/&nbsp;
		<span aria-hidden="true" class="compact">compact</span>
	</label>
</div>

<style>
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
    .theme-toggle:has(input[type="checkbox"]:not(:checked)) .compact {
				color: var(--textLight);
    }

    /* Checkbox true */
    .theme-toggle:has(input[type="checkbox"]:checked) .comfortable {
        color: var(--textLight);
    }

    .theme-toggle:hover:has(input[type="checkbox"]) .compact,
    .theme-toggle:hover:has(input[type="checkbox"]) .comfortable {
				color: var(--text);
		}


</style>
