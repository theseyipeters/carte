import { createSlice } from "@reduxjs/toolkit";

interface DialogState {
	bookDetailsOpen: boolean;
}

const initialState: DialogState = {
	bookDetailsOpen: false,
};

const dialogSlice = createSlice({
	name: "dialog",
	initialState,
	reducers: {
		toggleBookDetails(state, action) {
			state.bookDetailsOpen = action.payload;
		},
	},
});

export const { toggleBookDetails } = dialogSlice.actions;

export default dialogSlice.reducer;
