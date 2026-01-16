<script lang="ts">
import { page } from '$app/stores';
	import { mockWallpapers, featuredWallpapers } from '$lib/mocks/wallpapers';
	import WallpaperGrid from '$lib/modules/wallpaper/components/WallpaperGrid.svelte';
	import { Heart, Download, Share2, ChevronDown, Check, Send } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	// Get ID from URL
	$: id = $page.params.id;
	
	// Find wallpaper (mock logic)
	$: wallpaper = mockWallpapers.find(w => w.id === id) || mockWallpapers[0]; // Fallback to first if not found for demo
	
	// Mock related - just filter out current
	$: relatedWallpapers = featuredWallpapers.filter(w => w.id !== id).slice(0, 4);

	let isLiked = false;
	let isInfoExpanded = false;
</script>

<div class="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/5 pb-20">
	
	<!-- Back Navigation moved inside the card image for better integration -->

	<div class="max-w-5xl mx-auto px-4 md:px-6 pt-24 md:pt-28 pb-16">
		
		<!-- Main Pinterest-style Card -->
		<div class="bg-base-100 rounded-[24px] shadow-2xl overflow-hidden flex flex-col md:flex-row">
			
			<!-- Left: Image Section (Expanded to 60%) -->
			<div class="relative w-full md:w-[60%] bg-base-300 min-h-[400px] md:max-h-[85vh]">
				<img 
					src={wallpaper.originalUrl} 
					alt={wallpaper.title}
					class="w-full h-full object-cover"
				/>
				
				<!-- Back Button (Overlay) -->
				<div class="absolute top-4 left-4 z-10">
					<a href="/" aria-label="Go back" class="btn btn-circle bg-base-100/50 hover:bg-base-100/80 backdrop-blur-md border-none text-base-content shadow-lg transition-all">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
					</a>
				</div>
			</div>

			<!-- Right: Info Panel (Compact to 40%) -->
			<div class="w-full md:w-[40%] bg-base-100 flex flex-col relative text-left">
				
				<!-- Top Action Bar -->
				<div class="p-5 pb-0 flex items-center justify-between">
					<div class="flex gap-1">
						<button class="btn btn-circle btn-sm btn-ghost hover:bg-base-200 tooltip tooltip-bottom" data-tip="Share" aria-label="Share">
							<Share2 class="w-5 h-5" />
						</button>
						<button class="btn btn-circle btn-sm btn-ghost hover:bg-base-200 tooltip tooltip-bottom" data-tip="More options" aria-label="More options">
							<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
						</button>
					</div>
					<button 
						class="btn btn-sm md:btn-md rounded-full px-6 text-base font-bold shadow-none hover:shadow-lg transition-all {isLiked ? 'btn-neutral' : 'btn-primary text-primary-content'}"
						onclick={() => isLiked = !isLiked}
					>
						{isLiked ? 'Saved' : 'Save'}
					</button>
				</div>

				<!-- Content -->
				<div class="p-6 flex-1">
					<h1 class="text-2xl md:text-3xl font-extrabold mb-2 leading-tight text-base-content">{wallpaper.title}</h1>
					
					<!-- Uploader -->
					<div class="flex items-center gap-3 mb-6">
						<div class="avatar">
							<div class="w-8 h-8 rounded-full">
								<img src={wallpaper.uploader.avatarUrl} alt={wallpaper.uploader.username} />
							</div>
						</div>
						<div class="flex flex-col">
							<!-- Removed 'Uploaded by' label for cleaner look, just bold username -->
							<a href="/user/{wallpaper.uploader.username}" class="font-bold hover:underline text-sm text-base-content">{wallpaper.uploader.username}</a>
							<span class="text-[10px] text-base-content/50 uppercase tracking-wide">12.5k followers</span>
						</div>
					</div>
					
					<!-- Stats Badges (Subtle) -->
					<!-- <div class="flex flex-wrap gap-2 mb-6">
						<span class="text-sm font-medium text-base-content/70">
							{wallpaper.downloadCount.toLocaleString()} downloads
						</span>
						<span class="text-base-content/30">•</span>
						<span class="text-sm font-medium text-base-content/70">
							4K Resolution
						</span>
					</div> -->

					<!-- Tags (Smaller) -->
					<div class="flex flex-wrap gap-1.5 mb-8">
						{#each wallpaper.tags as tag}
							<a href="/browse?tag={tag}" class="badge border-none bg-base-200 hover:bg-base-300 p-2.5 px-3 text-xs font-bold cursor-pointer transition-colors text-base-content/70">
								#{tag}
							</a>
						{/each}
					</div>
				</div>

				<!-- Bottom Action (Sticky) -->
				<div class="p-5 pt-0 mt-auto bg-base-100 sticky bottom-0">
					<a href={wallpaper.originalUrl} download class="btn btn-neutral rounded-full w-full font-bold shadow-lg hover:-translate-y-0.5 transition-transform">
						Download
					</a>
				</div>
			</div>
		</div>

		<!-- Comments Card (Dedicated) -->
		<div class="bg-base-100/80 backdrop-blur-sm rounded-[24px] shadow-xl p-6 md:p-8 mt-6 border border-base-content/5">
			<h3 class="font-bold text-xl mb-6">Comments ({wallpaper.comments.length})</h3>
			
			<!-- List -->
			<div class="space-y-6 mb-8">
				{#each wallpaper.comments as comment}
					<div class="flex gap-4">
						<div class="avatar">
							<div class="w-10 h-10 rounded-full bg-base-200">
								<img src={comment.avatarUrl} alt={comment.username} />
							</div>
						</div>
						<div class="flex flex-col gap-1">
							<div class="flex items-baseline gap-2">
								<span class="font-bold text-sm">{comment.username}</span>
								<span class="text-xs text-base-content/40">2h ago</span>
							</div>
							<p class="text-base-content/80 text-sm leading-relaxed">{comment.content}</p>
						</div>
					</div>
				{/each}
			</div>

			<!-- Input Area (Redesigned) -->
			<div class="flex gap-3 items-center mt-2">
				<div class="avatar placeholder">
					<div class="bg-neutral/10 text-neutral-content rounded-full w-10 h-10 ring-1 ring-base-content/5">
						<span class="text-xs font-bold text-base-content/70">ME</span>
					</div>
				</div>
				<div class="flex-1 relative group">
					<input 
						type="text" 
						placeholder="Add a comment..." 
						class="input w-full rounded-full bg-base-200/50 border border-base-content/5 focus:border-base-content/20 focus:outline-none focus:bg-base-200 focus:ring-2 focus:ring-base-content/5 h-12 pl-5 pr-12 text-sm transition-all" 
					/>
					<!-- Input Icons -->
					<div class="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 opacity-60 group-focus-within:opacity-100 transition-opacity">
						<button class="btn btn-primary btn-circle btn-sm text-primary-content shadow-sm scale-90 hover:scale-100 transition-transform" aria-label="Send comment">
							<Send class="w-4 h-4 ml-0.5" />
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Related Grid -->
		<div class="mt-16 text-center">
			<h3 class="text-lg font-bold mb-4">More like this</h3>
			<WallpaperGrid wallpapers={relatedWallpapers} columns={4} />
		</div>
	</div>
</div>
