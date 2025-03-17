import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  selectedCategory: string;
  selectedStatus: "all" | "completed" | "active";
  currentPage: number;
  itemsPerPage: number;
}

const initialState: FilterState = {
  selectedCategory: "all",
  selectedStatus: "all",
  currentPage: 1,
  itemsPerPage: 5,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1; // Reset to first page when category changes
    },
    setStatus: (
      state,
      action: PayloadAction<"all" | "completed" | "active">,
    ) => {
      state.selectedStatus = action.payload;
      state.currentPage = 1; // Reset to first page when status changes
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1; // Reset to first page when items per page changes
    },
  },
});

export const { setCategory, setStatus, setCurrentPage, setItemsPerPage } =
  filterSlice.actions;
export default filterSlice.reducer;
