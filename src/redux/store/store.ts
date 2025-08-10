import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../slices/bookSlice";
import dialogsReducer from "../slices/dialogSlice";

export const store = configureStore({
	reducer: {
		books: booksReducer,
		dialogs: dialogsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
