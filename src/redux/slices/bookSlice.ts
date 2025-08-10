import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import API from "../../lib/axios";
import type { Book } from "../../types/book";

interface BooksState {
	books: Book[] | null;
	book: Book | null;
	freshReads: Book[] | null;
	activeFreshCategory: string;
	loading: boolean;
	error: string | null;
}

const categories = ["fiction", "biography", "science", "history"];

const initialState: BooksState = {
	books: null,
	book: null,
	freshReads: null,
	activeFreshCategory: categories[0],
	loading: false,
	error: null,
};

export const fetchBooks = createAsyncThunk(
	"books/fetchBooks",
	async (query: string, { rejectWithValue }) => {
		try {
			const response = await API.get("/volumes", {
				params: {
					q: query,
					maxResults: 10,
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

			return books;
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data?.error || "Failed to fetch books"
			);
		}
	}
);

export const fetchFreshReads = createAsyncThunk(
	"books/fetchFreshReads",
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
		setFreshCategory: (state, action: PayloadAction<string>) => {
			state.activeFreshCategory = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// Search books
			.addCase(fetchBooks.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchBooks.fulfilled, (state, action) => {
				state.loading = false;
				state.books = action.payload;
			})
			.addCase(fetchBooks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			// Fresh reads
			.addCase(fetchFreshReads.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchFreshReads.fulfilled, (state, action) => {
				state.loading = false;
				state.freshReads = action.payload;
			})
			.addCase(fetchFreshReads.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { setFreshCategory, setBooks } = booksSlice.actions;
export { categories };
export default booksSlice.reducer;
