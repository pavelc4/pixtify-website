<script lang="ts">
	import type { Wallpaper } from '../wallpaper.model';
	import WallpaperCard from './WallpaperCard.svelte';

	let { 
		wallpapers, 
		title = '', 
		columns = 4,
		showViewAll = false,
		viewAllHref = '/browse' 
	} = $props<{ 
		wallpapers: Wallpaper[]; 
		title?: string; 
		columns?: 2 | 3 | 4;
		showViewAll?: boolean;
		viewAllHref?: string;
	}>();

	const columnClasses: Record<2 | 3 | 4, string> = {
		2: 'columns-1 sm:columns-2',
		3: 'columns-1 sm:columns-2 lg:columns-3',
		4: 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4'
	};
</script>

<section class="w-full">
	{#if title}
		<div class="flex justify-between items-center mb-6">
			<h2 class="text-2xl font-bold">{title}</h2>
			{#if showViewAll}
				<a href={viewAllHref} class="btn btn-ghost btn-sm gap-1 text-primary">
					View All
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			{/if}
		</div>
	{/if}

	<!-- Masonry Layout using CSS Columns -->
	<div class="{columnClasses[columns as 2 | 3 | 4]} gap-5 space-y-5">
		{#each wallpapers as wallpaper (wallpaper.id)}
			<div class="break-inside-avoid mb-5">
				<WallpaperCard {wallpaper} />
			</div>
		{/each}
	</div>
</section>
