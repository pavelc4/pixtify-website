export type DeviceType = 'mobile' | 'desktop';

export interface Wallpaper {
	id: string;
	title: string;
	thumbnailUrl: string;
	originalUrl: string;
	deviceType: DeviceType;
	likeCount: number;
	downloadCount: number;
	tags: string[];
	uploader: {
		id: string;
		username: string;
		avatarUrl?: string;
	};
	createdAt: string;
	isFeatured?: boolean;
}
