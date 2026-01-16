<script lang="ts">
	import WallpaperGrid from '$lib/modules/wallpaper/components/WallpaperGrid.svelte';
	import { featuredWallpapers, trendingWallpapers } from '$lib/mocks/wallpapers';
</script>

<!-- Hero Section -->
<section class="hero min-h-[85vh] bg-gradient-to-br from-primary/10 via-base-100 to-secondary/5">
	<div class="hero-content text-center py-16 pt-32 md:pt-40">
		<div class="max-w-2xl">
			<h1 class="text-5xl md:text-7xl font-bold leading-tight mb-6 text-neutral">
				<span class="text-primary">Discover</span> 
				Beautiful Wallpapers
			</h1>
			<p class="text-lg md:text-xl text-neutral/80 mb-8 max-w-lg mx-auto">
				Explore thousands of stunning wallpapers for every device. Find your perfect backdrop today.
			</p>
			<div class="flex flex-wrap gap-4 justify-center mb-12">
				<a href="/browse" class="btn btn-primary btn-lg gap-2">
					<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
						<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
					</svg>
					Explore Wallpapers
				</a>
				<a href="/register" class="btn btn-neutral btn-lg text-neutral-content shadow-md hover:shadow-lg transition-all">Get Started</a>
			</div>
			

		</div>
	</div>
</section>

<!-- Featured Section -->
<section class="py-16 px-4 md:px-8">
	<div class="max-w-7xl mx-auto">
		<WallpaperGrid 
			wallpapers={featuredWallpapers} 
			title="Featured Wallpapers"
			showViewAll
			viewAllHref="/browse/featured"
		/>
	</div>
</section>

<!-- Trending Section -->
<section class="py-16 px-4 md:px-8">
	<div class="max-w-7xl mx-auto">
		<WallpaperGrid 
			wallpapers={trendingWallpapers} 
			title="Trending Now"
			showViewAll
			viewAllHref="/browse/trending"
		/>
	</div>
</section>

<!-- CTA Section -->
<section class="py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
	<div class="max-w-2xl mx-auto text-center">
		<h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Screen?</h2>
		<p class="text-lg text-base-content/70 mb-8">
			Join thousands of users who've found their perfect wallpaper on Pixtify
		</p>
		<a href="/browse" class="btn btn-primary btn-lg gap-2">
			Start Exploring
			<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M5 12h14M12 5l7 7-7 7"/>
			</svg>
		</a>
	</div>
</section>
