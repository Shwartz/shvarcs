<script>
	import "./globalStyles.css";
	import "./temp-style.css"
	import {navigationIsDelayed} from "$lib/utils/NavigationIsDelayed.ts";
</script>

<div class='page'>
	{#if $navigationIsDelayed}
		<div class="loader"></div>
	{/if}
	<slot/>
</div>

<style lang='scss'>
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

