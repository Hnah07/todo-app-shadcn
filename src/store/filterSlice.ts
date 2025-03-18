import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  selectedCategory: string;
  selectedStatus: "all" | "completed" | "active";
}

const initialState: FilterState = {
  selectedCategory: "all",
  selectedStatus: "all",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setStatus: (
      state,
      action: PayloadAction<"all" | "completed" | "active">,
    ) => {
      state.selectedStatus = action.payload;
    },
  },
});

export const { setCategory, setStatus } = filterSlice.actions;
export default filterSlice.reducer;
