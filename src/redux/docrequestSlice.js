import { createSlice } from "@reduxjs/toolkit"

const docrequestSlice = createSlice({
  name: 'docrequest',
  initialState : {
    docrequestList: []
  },
  reducers: {
    addDocrequest: (state, action) => {
      // 기존 항목을 찾는 조건을 정의합니다. 예를 들어, ID를 사용하거나 고유한 식별자를 활용할 수 있습니다.
      const existingDocIndex = state.docrequestList.findIndex(doc => doc.docreqno === action.payload.docreqno);
    
      if (existingDocIndex !== -1) {
        // 기존 항목을 찾은 경우, 해당 항목을 업데이트합니다.
        const updatedDocList = [...state.docrequestList];
        updatedDocList[existingDocIndex] = action.payload;
    
        return {
          ...state,
          docrequestList: updatedDocList,
        };
      } else {
        // 기존 항목이 없는 경우, 새로운 항목을 추가합니다.
        return {
          ...state,
          docrequestList: [...state.docrequestList, action.payload],
        };
      }
    },
    removeDocrequest: (state, action) => {
      state.docrequestList = state.docrequestList.filter(doc => doc.docreqno !== action.payload);
    },
  },
});

export const { addDocrequest, removeDocrequest } = docrequestSlice.actions;

export default docrequestSlice.reducer;