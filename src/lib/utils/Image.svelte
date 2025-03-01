<script lang="ts">
	// type ImageVariant = '320w' | '640w' | '768w' | '1024w' | '1920w' | '2560w' | 'public';

	interface ImageProps {
		imgId: string;
		alt: string;
		imgType?: 'post' | undefined;
		className?: string;
	}

	const { imgId, imgType, className, alt }: ImageProps = $props();

	const url = 'https://imagedelivery.net/OsbYeWCzhRDS5xpqlDmBXA';
</script>

{#if imgType === 'post'}
<img width="100%" src="{url}/{imgId}/public"
		 srcset="{url}/{imgId}/320w 320w,
		 			{url}/{imgId}/640w 640w,
		 			{url}/{imgId}/768w 768w,
		 			{url}/{imgId}/1024w 1024w,
		 			{url}/{imgId}/1920w 1920w,
		 			{url}/{imgId}/2560w 2560w"
		 sizes="(min-width: 1000px) 1024px,
		 (min-width: 700px) calc(100vw - 64px),
		 calc(100vw - 32px)"
		 alt="{alt}"
		 class="{className}"
		 loading="lazy">
	{:else}
	<!--Fallback image-->
	<img width="100%" src="{url}/{imgId}/public"
			 srcset="{url}/{imgId}/320w 320w,
		 			{url}/{imgId}/640w 640w,
		 			{url}/{imgId}/768w 768w,
		 			{url}/{imgId}/1024w 1024w,
		 			{url}/{imgId}/1920w 1920w,
		 			{url}/{imgId}/2560w 2560w"
			 sizes="(min-width: 1000px) 1024px,
		 		(min-width: 700px) calc(100vw - 64px),
		 		calc(100vw - 32px)"
			 alt="{alt}"
			 class="{className}"
			 loading="lazy">
	{/if}
