<script lang="ts">
	import type { Wallpaper } from '../wallpaper.model';

	let { wallpaper, showOverlay = true } = $props<{ wallpaper: Wallpaper; showOverlay?: boolean }>();

	function formatCount(num: number): string {
		if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
		if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
		return num.toString();
	}
</script>

<a 
	href="/wallpaper/{wallpaper.id}" 
	class="card bg-base-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
>
	<figure class="relative {wallpaper.deviceType === 'mobile' ? 'aspect-[9/16]' : 'aspect-video'} overflow-hidden">
		<img 
			src={wallpaper.thumbnailUrl} 
			alt={wallpaper.title}
			loading="lazy"
			class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
		/>
		
		<!-- Device Badge - Floating Pill -->
		<div class="badge badge-sm border-none absolute top-3 right-3 backdrop-blur-md bg-base-100/60 text-base-content/80 gap-1 shadow-sm font-medium">
			{#if wallpaper.deviceType === 'mobile'}
				<svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
					<path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
				</svg>
				Mobile
			{:else}
				<svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
					<path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z"/>
				</svg>
				Desktop
			{/if}
		</div>

		<!-- Hover Overlay - Gradient Fade -->
		{#if showOverlay}
			<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
				<div class="p-4 text-white w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
					<h3 class="font-bold text-lg mb-1 drop-shadow-md leading-tight">{wallpaper.title}</h3>
					<div class="flex gap-4 text-sm font-medium opacity-90">
						<span class="flex items-center gap-1.5 bg-black/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
							<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
							</svg>
							{formatCount(wallpaper.likeCount)}
						</span>
						<span class="flex items-center gap-1.5 bg-black/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
							<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
								<path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
							</svg>
							{formatCount(wallpaper.downloadCount)}
						</span>
					</div>
				</div>
			</div>
		{/if}
	</figure>
</a>
