<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Pixtify - Beautiful Wallpapers</title>
	<meta name="description" content="Discover and share stunning wallpapers for your devices" />
</svelte:head>

{@render children()}
