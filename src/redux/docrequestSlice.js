import { createSlice } from "@reduxjs/toolkit"

const docrequestSlice = createSlice({
  name: 'docrequest',
  initialState : {
    docrequestList: []
  },
  reducers: {
    addDocrequest: (state, action) => {
      state.docrequestList.push(action.payload);
    },
    removeDocrequest: (state, action) => {
      state.docrequestList = state.docrequestList.filter(doc => doc.docreqno !== action.payload);
    },
  },
});

export const { addDocrequest, removeDocrequest } = docrequestSlice.actions;

export default docrequestSlice.reducer;