import type { Wallpaper } from '$lib/modules/wallpaper/wallpaper.model';

const createMockWallpaper = (
	id: string,
	title: string,
	deviceType: 'mobile' | 'desktop',
	likeCount: number,
	tags: string[],
	isFeatured = false
): Wallpaper => ({
	id,
	title,
	thumbnailUrl: deviceType === 'mobile' 
		? `https://picsum.photos/seed/${id}/400/800`
		: `https://picsum.photos/seed/${id}/800/450`,
	originalUrl: deviceType === 'mobile'
		? `https://picsum.photos/seed/${id}/1080/2400`
		: `https://picsum.photos/seed/${id}/2560/1440`,
	deviceType,
	likeCount,
	downloadCount: Math.floor(likeCount * 0.7),
	tags,
	uploader: {
		id: `user-${id}`,
		username: `artist_${id}`,
		avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`
	},
	createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
	isFeatured
});

export const mockWallpapers: Wallpaper[] = [
	createMockWallpaper('aurora-1', 'Northern Lights', 'desktop', 2847, ['nature', 'aurora', 'night'], true),
	createMockWallpaper('forest-2', 'Misty Forest', 'desktop', 1923, ['nature', 'forest', 'minimal'], true),
	createMockWallpaper('abstract-3', 'Neon Waves', 'mobile', 3412, ['abstract', 'neon', 'colorful'], true),
	createMockWallpaper('mountain-4', 'Alpine Sunrise', 'desktop', 2156, ['nature', 'mountain', 'sunrise'], true),
	createMockWallpaper('city-5', 'Tokyo Nights', 'mobile', 4521, ['city', 'night', 'japan']),
	createMockWallpaper('space-6', 'Nebula Dreams', 'desktop', 3876, ['space', 'nebula', 'cosmic']),
	createMockWallpaper('ocean-7', 'Deep Blue', 'mobile', 2934, ['ocean', 'underwater', 'blue']),
	createMockWallpaper('gradient-8', 'Sunset Gradient', 'mobile', 5123, ['gradient', 'minimal', 'warm']),
	createMockWallpaper('nature-9', 'Cherry Blossom', 'desktop', 4287, ['nature', 'flowers', 'spring']),
	createMockWallpaper('dark-10', 'Dark Minimal', 'mobile', 3654, ['dark', 'minimal', 'amoled']),
	createMockWallpaper('art-11', 'Digital Art', 'desktop', 2743, ['art', 'digital', 'fantasy']),
	createMockWallpaper('nature-12', 'Autumn Path', 'desktop', 3421, ['nature', 'autumn', 'forest']),
];

export const featuredWallpapers = mockWallpapers.filter(w => w.isFeatured);
export const trendingWallpapers = mockWallpapers.sort((a, b) => b.likeCount - a.likeCount).slice(0, 8);
