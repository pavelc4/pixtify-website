export type DeviceType = 'mobile' | 'desktop';

export interface Comment {
	id: string;
	userId: string;
	username: string;
	avatarUrl: string;
	content: string;
	createdAt: string;
}

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
	comments: Comment[];
	createdAt: string;
	isFeatured?: boolean;
}
