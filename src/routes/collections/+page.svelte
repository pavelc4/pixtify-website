<script lang="ts">
	import { mockCollections } from '$lib/mocks/collections';
	import { Plus, Lock, MoreHorizontal } from 'lucide-svelte';
	import { fade, scale } from 'svelte/transition';

	let showCreateModal = $state(false);
</script>

<div class="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/5 pt-20 pb-12">
	<div class="max-w-6xl mx-auto px-4">
		
		<!-- Header -->
		<div class="flex items-center justify-between mb-8">
			<div>
				<h1 class="text-2xl font-semibold text-[var(--md-on-surface)]">Your Boards</h1>
				<p class="text-[var(--md-on-surface-variant)] text-sm mt-1">Organize your favorite wallpapers</p>
			</div>
			<button 
				onclick={() => showCreateModal = true}
				class="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--md-primary)] text-white font-medium hover:brightness-110 transition-all"
			>
				<Plus class="w-5 h-5" />
				<span class="hidden sm:inline">Create Board</span>
			</button>
		</div>

		<!-- Boards Grid -->
		{#if mockCollections.length > 0}
			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
				{#each mockCollections as collection, i}
					<a 
						href="/collection/{collection.id}"
						class="board-card group"
						in:fade={{ delay: i * 50, duration: 200 }}
					>
						<!-- Mosaic Cover -->
						<div class="board-cover">
							{#if collection.coverImages.length >= 3}
								<div class="main-image">
									<img src={collection.coverImages[0]} alt="" class="w-full h-full object-cover" />
								</div>
								<div class="side-images">
									<img src={collection.coverImages[1]} alt="" class="w-full h-full object-cover" />
									<img src={collection.coverImages[2]} alt="" class="w-full h-full object-cover" />
								</div>
							{:else}
								<div class="single-image">
									<img src={collection.coverImages[0] || 'https://picsum.photos/400/600'} alt="" class="w-full h-full object-cover" />
								</div>
							{/if}
							
							<!-- Hover Overlay -->
							<div class="board-overlay">
								<button 
									class="p-2 rounded-full bg-white/90 text-[var(--md-on-surface)] opacity-0 group-hover:opacity-100 transition-opacity"
									onclick={(e) => { e.preventDefault(); e.stopPropagation(); }}
								>
									<MoreHorizontal class="w-5 h-5" />
								</button>
							</div>
						</div>
						
						<!-- Info -->
						<div class="p-3">
							<div class="flex items-center gap-2">
								<h3 class="font-semibold text-[var(--md-on-surface)] truncate">{collection.name}</h3>
								{#if collection.isPrivate}
									<Lock class="w-3.5 h-3.5 text-[var(--md-on-surface-variant)] shrink-0" />
								{/if}
							</div>
							<p class="text-sm text-[var(--md-on-surface-variant)]">{collection.pinCount} Pins</p>
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<!-- Empty State -->
			<div class="text-center py-20">
				<div class="w-20 h-20 rounded-full bg-[var(--md-surface-container)] flex items-center justify-center mx-auto mb-4">
					<Plus class="w-8 h-8 text-[var(--md-on-surface-variant)]" />
				</div>
				<h3 class="text-xl font-semibold text-[var(--md-on-surface)] mb-2">No boards yet</h3>
				<p class="text-[var(--md-on-surface-variant)] mb-6">Create your first board to start organizing</p>
				<button 
					onclick={() => showCreateModal = true}
					class="px-6 py-3 rounded-full bg-[var(--md-primary)] text-white font-medium hover:brightness-110"
				>
					Create Your First Board
				</button>
			</div>
		{/if}
	</div>
</div>

<!-- Create Board Modal -->
{#if showCreateModal}
	<div 
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
		onclick={() => showCreateModal = false}
		in:fade={{ duration: 150 }}
	>
		<div 
			class="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl"
			onclick={(e) => e.stopPropagation()}
			in:scale={{ duration: 200, start: 0.95 }}
		>
			<h2 class="text-xl font-semibold text-[var(--md-on-surface)] mb-6 text-center">Create Board</h2>
			
			<div class="space-y-4">
				<div>
					<label class="block text-sm font-medium text-[var(--md-on-surface)] mb-1.5">Name</label>
					<input 
						type="text" 
						placeholder='Like "Nature Vibes" or "Dark Minimal"'
						class="w-full px-4 py-3 rounded-xl border border-[var(--md-outline-variant)] bg-[var(--md-surface)] focus:outline-none focus:border-[var(--md-primary)] focus:ring-2 focus:ring-[var(--md-primary)]/20"
					/>
				</div>
				
				<label class="flex items-center gap-3 cursor-pointer">
					<input type="checkbox" class="w-5 h-5 rounded accent-[var(--md-primary)]" />
					<span class="text-sm text-[var(--md-on-surface)]">Keep this board private</span>
				</label>
			</div>
			
			<div class="flex gap-3 mt-6">
				<button 
					onclick={() => showCreateModal = false}
					class="flex-1 py-3 rounded-full border border-[var(--md-outline-variant)] text-[var(--md-on-surface)] font-medium hover:bg-[var(--md-surface-container)]"
				>
					Cancel
				</button>
				<button 
					class="flex-1 py-3 rounded-full bg-[var(--md-primary)] text-white font-medium hover:brightness-110"
				>
					Create
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.board-card {
		display: block;
		border-radius: 1rem;
		overflow: hidden;
		background: var(--md-surface);
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.board-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.15);
	}

	.board-cover {
		position: relative;
		display: grid;
		grid-template-columns: 2fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 2px;
		aspect-ratio: 1 / 1;
		background: var(--md-surface-container);
		overflow: hidden;
	}

	.main-image {
		grid-row: 1 / 3;
		grid-column: 1;
		overflow: hidden;
	}

	.main-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.side-images {
		grid-column: 2;
		grid-row: 1 / 3;
		display: flex;
		flex-direction: column;
		gap: 2px;
		overflow: hidden;
	}

	.side-images img {
		flex: 1;
		min-height: 0;
		width: 100%;
		object-fit: cover;
	}

	.single-image {
		grid-column: 1 / 3;
		grid-row: 1 / 3;
		overflow: hidden;
	}

	.single-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.board-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%);
		display: flex;
		justify-content: flex-end;
		padding: 0.75rem;
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	.board-card:hover .board-overlay {
		opacity: 1;
	}
</style>
