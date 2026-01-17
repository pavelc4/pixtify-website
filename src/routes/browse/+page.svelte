<script lang="ts">
	import { page } from '$app/stores';
	import { mockWallpapers } from '$lib/mocks/wallpapers';
	import WallpaperGrid from '$lib/modules/wallpaper/components/WallpaperGrid.svelte';
	import { Search, Monitor, Smartphone, Grid, Filter, ChevronDown } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	// Query Params Initialization
	let searchQuery = $state($page.url.searchParams.get('q') || '');
	// Removed selectedTag state
	let selectedDevice = $state($page.url.searchParams.get('device') || 'All'); // All, Desktop, Mobile
	let sortBy = $state('popular'); // popular, newest, oldest

	// Derived unique tags (Removed as requested)
	
	// Filter Logic
	let filteredWallpapers = $derived(
		mockWallpapers
			.filter(w => {
				const matchesSearch = w.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
									  w.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
									  w.uploader.username.toLowerCase().includes(searchQuery.toLowerCase());
				// Removed explicit tag filter, now reliant on search
				const matchesDevice = selectedDevice === 'All' || w.deviceType === selectedDevice.toLowerCase();
				
				return matchesSearch && matchesDevice;
			})
			.sort((a, b) => {
				if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
				if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
				return b.likeCount - a.likeCount; // Default: Popular
			})
	);
</script>

<div class="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/5 pb-20 pt-24">
	<div class="max-w-[1600px] mx-auto px-4 md:px-6">
		

		<!-- Filters Bar - Material 3 Style -->
		<div class="sticky top-16 z-30 py-4 -mx-4 px-4 md:-mx-6 md:px-6 mb-6">
			<div class="flex items-center gap-4 overflow-x-auto no-scrollbar">
				
				<!-- M3 Segmented Button - Device Filter -->
				<div class="m3-segmented-button shrink-0">
					<button 
						class="m3-segment {selectedDevice === 'All' ? 'selected' : ''}"
						onclick={() => selectedDevice = 'All'}
					>
						<span class="m3-segment-label">All</span>
					</button>
					<button 
						class="m3-segment {selectedDevice === 'Desktop' ? 'selected' : ''}"
						onclick={() => selectedDevice = 'Desktop'}
						aria-label="Desktop Wallpapers"
					>
						<Monitor class="w-[18px] h-[18px]" />
						<span class="m3-segment-label hidden sm:inline">Desktop</span>
					</button>
					<button 
						class="m3-segment {selectedDevice === 'Mobile' ? 'selected' : ''}"
						onclick={() => selectedDevice = 'Mobile'}
						aria-label="Mobile Wallpapers"
					>
						<Smartphone class="w-[18px] h-[18px]" />
						<span class="m3-segment-label hidden sm:inline">Mobile</span>
					</button>
				</div>

				<!-- M3 Search Bar -->
				<div class="flex-1 min-w-[200px]">
					<div class="m3-search-bar">
						<Search class="w-5 h-5 text-[var(--md-on-surface-variant)] shrink-0" />
						<input 
							type="text" 
							bind:value={searchQuery}
							placeholder="Search wallpapers..." 
							class="m3-search-input"
						/>
					</div>
				</div>

				<!-- M3 Filter Chip - Sort -->
				<div class="shrink-0">
					<div class="m3-filter-chip">
						<select bind:value={sortBy} class="m3-chip-select">
							<option value="popular">Popular</option>
							<option value="newest">Newest</option>
							<option value="oldest">Oldest</option>
						</select>
						<ChevronDown class="w-4 h-4 text-[var(--md-on-surface-variant)] pointer-events-none" />
					</div>
				</div>
			</div>
		</div>

		<!-- Grid Results -->
		{#if filteredWallpapers.length > 0}
			<div in:fade={{ duration: 300 }}>
				<WallpaperGrid wallpapers={filteredWallpapers} />
			</div>
		{:else}
			<div class="py-20 text-center" in:fade>
				<div class="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6 text-base-content/30">
					<Search class="w-10 h-10" />
				</div>
				<h3 class="text-2xl font-bold mb-2">No wallpapers found</h3>
				<p class="text-base-content/60 max-w-md mx-auto mb-8">
					We couldn't find any wallpapers matching "{searchQuery}" with the current filters.
				</p>
				<button 
					class="btn btn-primary rounded-full px-8"
					onclick={() => { searchQuery = ''; selectedDevice = 'All'; }}
				>
					Clear Filters
				</button>
			</div>
		{/if}

	</div>
</div>

