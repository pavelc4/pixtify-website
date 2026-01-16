<script lang="ts">
	// Landing page - will be expanded in Phase 2
</script>

<main class="container">
	<section class="hero">
		<h1>Pixtify</h1>
		<p>Discover and share stunning wallpapers for your devices</p>
	</section>
</main>

<style>
	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 80vh;
		text-align: center;
		gap: 1rem;
	}

	.hero h1 {
		font-size: 4rem;
		font-weight: 700;
		color: var(--md-sys-color-primary);
		letter-spacing: -0.02em;
	}

	.hero p {
		font-size: 1.25rem;
		color: var(--md-sys-color-on-surface-variant);
		max-width: 500px;
	}

	@media (min-width: 768px) {
		.hero h1 {
			font-size: 6rem;
		}

		.hero p {
			font-size: 1.5rem;
		}
	}
</style>
