import type { Wallpaper } from '$lib/modules/wallpaper/wallpaper.model';

export interface UserProfile {
	id: string;
	username: string;
	displayName: string;
	email: string;
	avatarUrl: string;
	bio: string;
	createdAt: string;
	stats: {
		uploads: number;
		likes: number;
		followers: number;
		following: number;
	};
}

export const mockUser: UserProfile = {
	id: 'user-1',
	username: 'creativemind',
	displayName: 'Creative Mind',
	email: 'creative@pixtify.com',
	avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=creativemind',
	bio: '✨ Digital artist & wallpaper enthusiast. Sharing beauty one pixel at a time.',
	createdAt: '2024-01-15',
	stats: {
		uploads: 24,
		likes: 156,
		followers: 89,
		following: 42
	}
};

// Helper to get user's uploaded wallpapers (mock: first 6)
export function getUserUploads(wallpapers: Wallpaper[]): Wallpaper[] {
	return wallpapers.slice(0, 6);
}

// Helper to get user's liked wallpapers (mock: wallpapers with even index)
export function getUserLiked(wallpapers: Wallpaper[]): Wallpaper[] {
	return wallpapers.filter((_, i) => i % 2 === 0);
}

// Helper to get user's saved wallpapers (mock: wallpapers with odd index)
export function getUserSaved(wallpapers: Wallpaper[]): Wallpaper[] {
	return wallpapers.filter((_, i) => i % 2 === 1);
}
