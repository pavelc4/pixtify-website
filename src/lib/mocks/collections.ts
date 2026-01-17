import type { Collection, CollectionWithWallpapers } from '$lib/modules/collection/collection.model';

export const mockCollections: Collection[] = [
	{
		id: 'col-1',
		name: 'Nature Vibes',
		description: 'Beautiful landscapes and nature photography',
		coverImages: [
			'https://picsum.photos/seed/nature1/400/600',
			'https://picsum.photos/seed/nature2/400/600',
			'https://picsum.photos/seed/nature3/400/600',
		],
		pinCount: 24,
		isPrivate: false,
		createdAt: '2024-01-15T10:00:00Z',
		updatedAt: '2024-03-10T15:30:00Z',
	},
	{
		id: 'col-2',
		name: 'Minimal Dark',
		description: 'Clean, dark, and minimal wallpapers',
		coverImages: [
			'https://picsum.photos/seed/dark1/400/600',
			'https://picsum.photos/seed/dark2/400/600',
			'https://picsum.photos/seed/dark3/400/600',
		],
		pinCount: 18,
		isPrivate: false,
		createdAt: '2024-02-01T09:00:00Z',
		updatedAt: '2024-03-08T12:00:00Z',
	},
	{
		id: 'col-3',
		name: 'Abstract Art',
		description: 'Creative and artistic abstract designs',
		coverImages: [
			'https://picsum.photos/seed/abstract1/400/600',
			'https://picsum.photos/seed/abstract2/400/600',
			'https://picsum.photos/seed/abstract3/400/600',
		],
		pinCount: 32,
		isPrivate: false,
		createdAt: '2024-01-20T14:00:00Z',
		updatedAt: '2024-03-12T18:45:00Z',
	},
	{
		id: 'col-4',
		name: 'City Nights',
		description: 'Urban landscapes and night city views',
		coverImages: [
			'https://picsum.photos/seed/city1/400/600',
			'https://picsum.photos/seed/city2/400/600',
			'https://picsum.photos/seed/city3/400/600',
		],
		pinCount: 15,
		isPrivate: false,
		createdAt: '2024-02-10T11:00:00Z',
		updatedAt: '2024-03-05T16:20:00Z',
	},
	{
		id: 'col-5',
		name: 'Personal Favorites',
		description: 'My private collection of favorites',
		coverImages: [
			'https://picsum.photos/seed/fav1/400/600',
			'https://picsum.photos/seed/fav2/400/600',
			'https://picsum.photos/seed/fav3/400/600',
		],
		pinCount: 8,
		isPrivate: true,
		createdAt: '2024-03-01T08:00:00Z',
		updatedAt: '2024-03-14T10:00:00Z',
	},
];

// Collection with wallpaper mappings (for detail view)
export const collectionWallpaperMap: Record<string, string[]> = {
	'col-1': ['aurora-1', 'forest-2', 'mountain-4', 'nature-9', 'nature-12'],
	'col-2': ['dark-10', 'gradient-8', 'abstract-3'],
	'col-3': ['abstract-3', 'art-11', 'neon-waves'],
	'col-4': ['city-5', 'tokyo-nights'],
	'col-5': ['aurora-1', 'space-6', 'ocean-7'],
};

export function getCollectionById(id: string): Collection | undefined {
	return mockCollections.find(c => c.id === id);
}

export function getCollectionWallpaperIds(collectionId: string): string[] {
	return collectionWallpaperMap[collectionId] || [];
}
