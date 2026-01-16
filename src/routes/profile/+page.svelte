<script lang="ts">
	import { mockWallpapers } from '$lib/mocks/wallpapers';
	import { mockUser, getUserUploads, getUserLiked, getUserSaved } from '$lib/mocks/user';
	import WallpaperGrid from '$lib/modules/wallpaper/components/WallpaperGrid.svelte';
	import { Upload, Heart, Bookmark, Settings, Image, Share2, MessageCircle } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	// Tabs
	let activeTab = $state<'uploads' | 'liked' | 'saved'>('uploads');

	// Get wallpapers based on active tab
	let displayedWallpapers = $derived(() => {
		switch (activeTab) {
			case 'uploads': return getUserUploads(mockWallpapers);
			case 'liked': return getUserLiked(mockWallpapers);
			case 'saved': return getUserSaved(mockWallpapers);
			default: return [];
		}
	});

	const tabs = [
		{ id: 'uploads' as const, icon: Upload, count: mockUser.stats.uploads },
		{ id: 'liked' as const, icon: Heart, count: mockUser.stats.likes },
		{ id: 'saved' as const, icon: Bookmark, count: 12 }
	];
</script>

<div class="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/5 pb-20">
	
	<!-- TikTok Style Profile Header -->
	<div class="pt-24 pb-6 px-4">
		<div class="flex flex-col items-center text-center max-w-lg mx-auto">
			
			<!-- Avatar -->
			<img 
				src={mockUser.avatarUrl} 
				alt={mockUser.displayName}
				class="w-24 h-24 rounded-full bg-[#EBE6CF] border-2 border-white shadow-lg mb-3"
			/>

			<!-- Username -->
			<h1 class="text-lg font-semibold text-[#2D3326] mb-0.5">@{mockUser.username}</h1>
			<p class="text-[#2D3326]/60 text-sm mb-4">{mockUser.displayName}</p>

			<!-- Stats Row - TikTok Style -->
			<div class="flex items-center justify-center gap-5 mb-4">
				<div class="text-center px-3">
					<div class="text-lg font-bold text-[#2D3326]">{mockUser.stats.following}</div>
					<div class="text-xs text-[#2D3326]/50">Following</div>
				</div>
				<div class="w-px h-8 bg-[#2D3326]/10"></div>
				<div class="text-center px-3">
					<div class="text-lg font-bold text-[#2D3326]">{mockUser.stats.followers}</div>
					<div class="text-xs text-[#2D3326]/50">Followers</div>
				</div>
				<div class="w-px h-8 bg-[#2D3326]/10"></div>
				<div class="text-center px-3">
					<div class="text-lg font-bold text-[#2D3326]">{mockUser.stats.likes}</div>
					<div class="text-xs text-[#2D3326]/50">Likes</div>
				</div>
			</div>

			<!-- Action Buttons - TikTok Style -->
			<div class="flex items-center gap-2 mb-4">
				<button class="btn bg-[#89986D] text-white border-none rounded-md px-10 h-9 min-h-0 text-sm font-semibold hover:bg-[#628141]">
					Follow
				</button>
				<button class="btn btn-ghost rounded-md h-9 w-9 min-h-0 p-0 border border-[#2D3326]/20 text-[#2D3326]/70 hover:bg-[#EBE6CF]">
					<MessageCircle class="w-4 h-4" />
				</button>
				<button class="btn btn-ghost rounded-md h-9 w-9 min-h-0 p-0 border border-[#2D3326]/20 text-[#2D3326]/70 hover:bg-[#EBE6CF]">
					<Share2 class="w-4 h-4" />
				</button>
			</div>

			<!-- Bio -->
			<p class="text-[#2D3326]/70 text-sm leading-relaxed max-w-xs">{mockUser.bio}</p>
		</div>
	</div>

	<!-- Tabs - TikTok Style (Icon Only) -->
	<div class="mb-4">
		<div class="flex items-center justify-center gap-8">
			{#each tabs as tab}
				<button
					class="flex flex-col items-center gap-1 py-2 transition-all {activeTab === tab.id 
						? 'text-[#2D3326]' 
						: 'text-[#2D3326]/40 hover:text-[#2D3326]/60'}"
					onclick={() => activeTab = tab.id}
				>
					<tab.icon class="w-5 h-5" />
					<span class="text-xs font-medium">{tab.count}</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- Content Grid -->
	<div class="max-w-[1400px] mx-auto px-4 md:px-6 pt-4">
		{#key activeTab}
			<div in:fade={{ duration: 150 }}>
				{#if displayedWallpapers().length > 0}
					<WallpaperGrid wallpapers={displayedWallpapers()} />
				{:else}
					<div class="py-16 text-center">
						<div class="w-16 h-16 bg-[#EBE6CF] rounded-full flex items-center justify-center mx-auto mb-4">
							<Image class="w-6 h-6 text-[#2D3326]/30" />
						</div>
						<p class="text-[#2D3326]/50 text-sm">No content yet</p>
					</div>
				{/if}
			</div>
		{/key}
	</div>
</div>
