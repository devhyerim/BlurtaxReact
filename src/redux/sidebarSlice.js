import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isBodyActive: false
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    handleBodyClick: (state)=> {
      state.isBodyActive = !state.isBodyActive;
    }
  }
});

export const { handleBodyClick } = sidebarSlice.actions;

export default sidebarSlice.reducer;