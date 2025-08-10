import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import API from "../../lib/axios";
import type { Book } from "../../types/book";

interface BooksState {
	books: Book[] | null;
	totalItems: number;
	page: number;
	book: Book | null;
	suggested: Book[] | null;
	activeSuggestedCategory: string;
	searching: boolean;
	loading: boolean;
	error: string | null;
}

const categories = [
	"fiction",
	"biography",
	"science",
	"history",
	"psychology",
	"music",
];

const initialState: BooksState = {
	books: null,
	totalItems: 0,
	page: 0,
	book: null,
	suggested: null,
	activeSuggestedCategory: categories[0],
	searching: false,
	loading: false,
	error: null,
};

export const fetchBooks = createAsyncThunk(
	"books/fetchBooks",
	async (
		{ query, page = 1 }: { query: string; page?: number },
		{ rejectWithValue }
	) => {
		try {
			const maxResults = 10;
			const startIndex = Math.max(0, page * maxResults);

			const response = await API.get("/volumes", {
				params: {
					q: query,
					maxResults,
					startIndex,
				},
			});

			const data = response.data;

			const books: Book[] =
				data.items?.map((item: any) => ({
					id: item.id,
					title: item.volumeInfo.title,
					authors: item.volumeInfo.authors || ["Unknown author"],
					thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
					description:
						item.volumeInfo.description || "No description available",
					publishedDate: item.volumeInfo.publishedDate || undefined,
					categories: item.volumeInfo.categories || [],
					pageCount: item.volumeInfo.pageCount || undefined,
					averageRating: item.volumeInfo.averageRating || 4,
					previewLink: item.volumeInfo.previewLink || undefined,
				})) || [];

			return {
				books,
				totalItems: data.totalItems || 0,
				page,
			};
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data?.error || "Failed to fetch books"
			);
		}
	}
);
export const loadBooks = createAsyncThunk(
	"books/fetchBooks",
	async (
		{ query, page = 1 }: { query: string; page?: number },
		{ rejectWithValue }
	) => {
		try {
			const maxResults = 10;
			const startIndex = Math.max(0, page * maxResults);

			const response = await API.get("/volumes", {
				params: {
					q: query,
					maxResults,
					startIndex,
				},
			});

			const data = response.data;

			const books: Book[] =
				data.items?.map((item: any) => ({
					id: item.id,
					title: item.volumeInfo.title,
					authors: item.volumeInfo.authors || ["Unknown author"],
					thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
					description:
						item.volumeInfo.description || "No description available",
					publishedDate: item.volumeInfo.publishedDate || undefined,
					categories: item.volumeInfo.categories || [],
					pageCount: item.volumeInfo.pageCount || undefined,
					averageRating: item.volumeInfo.averageRating || 4,
					previewLink: item.volumeInfo.previewLink || undefined,
				})) || [];

			return {
				books,
				totalItems: data.totalItems || 0,
				page,
			};
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data?.error || "Failed to fetch books"
			);
		}
	}
);

export const fetchSuggested = createAsyncThunk(
	"books/fetchSuggested",
	async (category: string, { rejectWithValue }) => {
		try {
			const response = await API.get("/volumes", {
				params: {
					q: `subject:${category}`,
					orderBy: "newest",
					maxResults: 6,
				},
			});

			const data = response.data;

			const books: Book[] =
				data.items?.map((item: any) => ({
					id: item.id,
					title: item.volumeInfo.title,
					authors: item.volumeInfo.authors || ["Unknown author"],
					thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
					description:
						item.volumeInfo.description || "No description available",
					publishedDate: item.volumeInfo.publishedDate || undefined,
					categories: item.volumeInfo.categories || [],
					pageCount: item.volumeInfo.pageCount || undefined,
					averageRating: item.volumeInfo.averageRating || undefined,
					previewLink: item.volumeInfo.previewLink || undefined,
				})) || [];

			return books;
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data?.error || "Failed to fetch fresh reads"
			);
		}
	}
);

const booksSlice = createSlice({
	name: "books",
	initialState,
	reducers: {
		setBooks: (state, action) => {
			state.books = action.payload;
		},
		setBook: (state, action) => {
			state.book = action.payload;
		},
		setSuggestedCategory: (state, action: PayloadAction<string>) => {
			state.activeSuggestedCategory = action.payload;
		},
		setTotalItems: (state, action: PayloadAction<number>) => {
			state.totalItems = action.payload;
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// Search books
			.addCase(fetchBooks.pending, (state) => {
				state.searching = true;
				state.error = null;
			})
			.addCase(fetchBooks.fulfilled, (state, action) => {
				state.searching = false;
				state.books = action.payload.books;
				state.totalItems = action.payload.totalItems;
				state.page = action.payload.page;
			})
			.addCase(fetchBooks.rejected, (state, action) => {
				state.searching = false;
				state.error = action.payload as string;
			})

			// Fresh reads
			.addCase(fetchSuggested.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchSuggested.fulfilled, (state, action) => {
				state.loading = false;
				state.suggested = action.payload;
			})
			.addCase(fetchSuggested.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const {
	setSuggestedCategory,
	setBooks,
	setBook,
	setPage,
	setTotalItems,
} = booksSlice.actions;
export { categories };
export default booksSlice.reducer;
