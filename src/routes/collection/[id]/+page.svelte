<script lang="ts">
	import { page } from '$app/stores';
	import { getCollectionById, getCollectionWallpaperIds } from '$lib/mocks/collections';
	import { mockWallpapers } from '$lib/mocks/wallpapers';
	import WallpaperGrid from '$lib/modules/wallpaper/components/WallpaperGrid.svelte';
	import { ArrowLeft, Lock, MoreHorizontal, Share2, Pencil } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	// Get collection from URL param
	const collectionId = $page.params.id;
	const collection = getCollectionById(collectionId);
	
	// Get wallpapers for this collection
	const wallpaperIds = getCollectionWallpaperIds(collectionId);
	const wallpapers = mockWallpapers.filter(w => wallpaperIds.includes(w.id));
</script>

<div class="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/5 pt-20 pb-12">
	{#if collection}
		<div class="max-w-6xl mx-auto px-4">
			
			<!-- Back Button -->
			<a 
				href="/collections" 
				class="inline-flex items-center gap-2 text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)] mb-6 transition-colors"
			>
				<ArrowLeft class="w-5 h-5" />
				<span>Back to Boards</span>
			</a>

			<!-- Collection Header -->
			<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
				<div>
					<div class="flex items-center gap-3">
						<h1 class="text-3xl font-semibold text-[var(--md-on-surface)]">{collection.name}</h1>
						{#if collection.isPrivate}
							<div class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--md-surface-container)] text-[var(--md-on-surface-variant)] text-sm">
								<Lock class="w-3.5 h-3.5" />
								<span>Private</span>
							</div>
						{/if}
					</div>
					{#if collection.description}
						<p class="text-[var(--md-on-surface-variant)] mt-2 max-w-xl">{collection.description}</p>
					{/if}
					<p class="text-sm text-[var(--md-on-surface-variant)] mt-2">
						{collection.pinCount} Pins
					</p>
				</div>
				
				<!-- Actions -->
				<div class="flex items-center gap-2">
					<button class="p-2.5 rounded-full hover:bg-[var(--md-surface-container)] transition-colors">
						<Share2 class="w-5 h-5 text-[var(--md-on-surface-variant)]" />
					</button>
					<button class="p-2.5 rounded-full hover:bg-[var(--md-surface-container)] transition-colors">
						<Pencil class="w-5 h-5 text-[var(--md-on-surface-variant)]" />
					</button>
					<button class="p-2.5 rounded-full hover:bg-[var(--md-surface-container)] transition-colors">
						<MoreHorizontal class="w-5 h-5 text-[var(--md-on-surface-variant)]" />
					</button>
				</div>
			</div>

			<!-- Wallpapers Grid -->
			{#if wallpapers.length > 0}
				<div in:fade={{ duration: 200 }}>
					<WallpaperGrid {wallpapers} />
				</div>
			{:else}
				<!-- Empty State -->
				<div class="text-center py-20 bg-[var(--md-surface-container)] rounded-3xl">
					<div class="w-16 h-16 rounded-full bg-[var(--md-surface-container-high)] flex items-center justify-center mx-auto mb-4">
						<svg class="w-7 h-7 text-[var(--md-on-surface-variant)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
							<circle cx="8.5" cy="8.5" r="1.5"/>
							<polyline points="21 15 16 10 5 21"/>
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-[var(--md-on-surface)] mb-2">No Pins yet</h3>
					<p class="text-[var(--md-on-surface-variant)] mb-6">Start adding wallpapers to this board</p>
					<a 
						href="/browse"
						class="inline-block px-6 py-3 rounded-full bg-[var(--md-primary)] text-white font-medium hover:brightness-110"
					>
						Browse Wallpapers
					</a>
				</div>
			{/if}
		</div>
	{:else}
		<!-- Not Found -->
		<div class="text-center py-20">
			<h1 class="text-2xl font-semibold text-[var(--md-on-surface)] mb-4">Board not found</h1>
			<a href="/collections" class="text-[var(--md-primary)] hover:underline">Back to Boards</a>
		</div>
	{/if}
</div>
