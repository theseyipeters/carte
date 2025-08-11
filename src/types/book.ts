export interface Book {
	id: string;
	title: string;
	authors: string[];
	thumbnail: string;
	description: string;
	publishedDate?: string;
	publisher?: string;
	categories?: string[];
	pageCount?: number;
	averageRating?: number;
	previewLink?: string;
}
