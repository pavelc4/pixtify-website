<script lang="ts">
	let y = $state(0);
	let show = $derived(y > 300);

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:window bind:scrollY={y} />

<button
	onclick={scrollToTop}
	class="fixed bottom-8 right-8 z-40 btn btn-circle btn-primary shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 {show ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90'}"
	aria-label="Back to top"
>
	<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
		<path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
	</svg>
</button>
