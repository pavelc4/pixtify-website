export interface Collection {
	id: string;
	name: string;
	description?: string;
	coverImages: string[]; // Last 3-4 images for mosaic cover
	pinCount: number;
	isPrivate: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface CollectionWithWallpapers extends Collection {
	wallpaperIds: string[];
}
