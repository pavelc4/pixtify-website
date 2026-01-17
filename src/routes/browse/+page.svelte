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

<style>
	/* M3 Design Tokens */
	:global(:root) {
		--md-surface: #F6F0D7;
		--md-surface-container: #EBE6CF;
		--md-surface-container-high: #E5E0C9;
		--md-surface-container-highest: #DFDAC5;
		--md-on-surface: #1B211A;
		--md-on-surface-variant: #44483E;
		--md-outline: #74796D;
		--md-outline-variant: #C4C8B9;
		--md-primary: #89986D;
		--md-on-primary: #FFFFFF;
		--md-secondary-container: #D8E7BE;
		--md-on-secondary-container: #131F08;
	}

	/* M3 Segmented Button */
	.m3-segmented-button {
		display: flex;
		border: 1px solid var(--md-outline);
		border-radius: 20px;
		overflow: hidden;
		background: transparent;
	}

	.m3-segment {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 10px 16px;
		border: none;
		background: transparent;
		color: var(--md-on-surface);
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		position: relative;
		transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
	}

	.m3-segment:not(:last-child) {
		border-right: 1px solid var(--md-outline);
	}

	.m3-segment:hover {
		background: color-mix(in oklch, var(--md-on-surface), transparent 92%);
	}

	.m3-segment.selected {
		background: var(--md-secondary-container);
		color: var(--md-on-secondary-container);
	}

	.m3-segment.selected:hover {
		background: color-mix(in oklch, var(--md-secondary-container), var(--md-on-secondary-container) 8%);
	}

	.m3-segment-label {
		font-variation-settings: 'wght' 500;
	}

	/* M3 Search Bar */
	.m3-search-bar {
		display: flex;
		align-items: center;
		gap: 12px;
		background: var(--md-surface-container-highest);
		border-radius: 28px;
		padding: 12px 16px;
		transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
	}

	.m3-search-bar:focus-within {
		background: var(--md-surface);
		box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.3);
	}

	.m3-search-input {
		flex: 1;
		background: transparent;
		border: none;
		padding: 0;
		font-size: 16px;
		color: var(--md-on-surface);
		outline: none;
	}

	.m3-search-input::placeholder {
		color: var(--md-on-surface-variant);
	}

	/* M3 Filter Chip */
	.m3-filter-chip {
		display: flex;
		align-items: center;
		gap: 4px;
		background: var(--md-surface-container-high);
		border: 1px solid var(--md-outline-variant);
		border-radius: 8px;
		padding: 8px 12px;
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
	}

	.m3-filter-chip:hover {
		background: color-mix(in oklch, var(--md-surface-container-high), var(--md-on-surface) 8%);
	}

	.m3-chip-select {
		background: transparent;
		border: none;
		color: var(--md-on-surface);
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		outline: none;
		appearance: none;
		padding-right: 4px;
	}

	/* Hide scrollbar for Chrome, Safari and Opera */
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	/* Hide scrollbar for IE, Edge and Firefox */
	.no-scrollbar {
		-ms-overflow-style: none;  /* IE and Edge */
		scrollbar-width: none;  /* Firefox */
	}
</style>
