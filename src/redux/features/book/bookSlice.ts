import type { Book } from "@/types/book";
import { createSlice } from "@reduxjs/toolkit"


export interface BookUIState {
    selectedBook: Book | null;
}


const initialState: BookUIState = {
    selectedBook: null,
};

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {},
})

export default bookSlice.reducer;