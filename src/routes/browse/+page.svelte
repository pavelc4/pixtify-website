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
		

		<!-- Filters Bar (Sticky & Clean) -->
		<div class="sticky top-16 z-30 bg-[#F6F0D7]/95 backdrop-blur-xl py-3 -mx-4 px-4 md:-mx-6 md:px-6 border-b border-[#89986D]/10 mb-6 shadow-sm">
			<div class="flex items-center gap-3 overflow-x-auto no-scrollbar">
				
				<!-- Device Filter -->
				<div class="flex items-center bg-[#EBE6CF] p-1 gap-1 rounded-full shrink-0 border border-[#89986D]/15">
					<button 
						class="btn btn-sm rounded-full px-4 font-medium border-none {selectedDevice === 'All' ? 'bg-[#89986D] text-white shadow-md' : 'bg-transparent text-[#2D3326]/70 hover:bg-[#DFDAC5]'}"
						onclick={() => selectedDevice = 'All'}
					>
						All
					</button>
					<button 
						class="btn btn-sm rounded-full px-3 border-none {selectedDevice === 'Desktop' ? 'bg-[#89986D] text-white shadow-md' : 'bg-transparent text-[#2D3326]/70 hover:bg-[#DFDAC5]'}"
						onclick={() => selectedDevice = 'Desktop'}
						aria-label="Desktop Wallpapers"
					>
						<Monitor class="w-4 h-4" color={selectedDevice === 'Desktop' ? '#ffffff' : '#2D3326'} />
					</button>
					<button 
						class="btn btn-sm rounded-full px-3 border-none {selectedDevice === 'Mobile' ? 'bg-[#89986D] text-white shadow-md' : 'bg-transparent text-[#2D3326]/70 hover:bg-[#DFDAC5]'}"
						onclick={() => selectedDevice = 'Mobile'}
						aria-label="Mobile Wallpapers"
					>
						<Smartphone class="w-4 h-4" color={selectedDevice === 'Mobile' ? '#ffffff' : '#2D3326'} />
					</button>
				</div>

				<!-- Search Bar -->
				<div class="flex-1 min-w-[200px]">
					<div class="flex items-center gap-3 bg-[#EBE6CF] border border-[#89986D]/15 rounded-full px-4 py-2 focus-within:bg-white focus-within:border-[#89986D]/30 focus-within:shadow-md transition-all">
						<Search class="w-4 h-4 text-[#2D3326]/40 shrink-0" />
						<input 
							type="text" 
							bind:value={searchQuery}
							placeholder="Search wallpapers..." 
							class="grow bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-sm text-[#2D3326] placeholder:text-[#2D3326]/40"
						/>
					</div>
				</div>

				<!-- Sort Dropdown -->
				<div class="shrink-0">
					<select bind:value={sortBy} class="bg-[#EBE6CF] border border-[#89986D]/15 rounded-full px-4 py-2 text-sm text-[#2D3326]/80 font-medium focus:outline-none focus:bg-white focus:border-[#89986D]/30 cursor-pointer">
						<option value="popular">Popular</option>
						<option value="newest">Newest</option>
						<option value="oldest">Oldest</option>
					</select>
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
