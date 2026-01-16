<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/shared/components/layout/Navbar.svelte';

	import BackToTop from '$lib/shared/components/ui/BackToTop.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Pixtify - Beautiful Wallpapers</title>
	<meta name="description" content="Discover and share stunning wallpapers for your devices" />
</svelte:head>

<div class="min-h-screen flex flex-col" data-theme="pixtify">
	<Navbar />
	<main class="flex-1">
		{@render children()}
	</main>

	<BackToTop />
</div>
