import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  selectedBizno: "",  // 조회 기업
  startDate: "",      // 조회 시작 날짜
  endDate: "",        // 조회 끝 날짜
  all: "",            // 상태별 전표 개수
  can: "",
  confirmed: "",
  except: "",
  remove: "",
  total: [],          // 전체 잔액, 차액
  wholeBanks: [],     // 전체 은행 내역
  banks: [],          // 선택 은행 내역
  wholeSlips: [],     // 전체 전표 내역
  slips: [],          // 선택 전표 내역
  requestWhat: "",    // write or show
}

const bankSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {
    setSelectedBizno: (state, action)=>{
      state.selectedBizno = action.payload;
    },
    setStartDate: (state, action)=>{
      state.startDate = action.payload;
    },
    setEndDate: (state, action)=>{
      state.endDate = action.payload;
    },
    setWholeBanks: (state, action)=>{
      //state.wholeBanks = action.payload;  -> 변경 불가. 오류
      state.wholeBanks = [...action.payload];
    },
    setWholeSlips: (state, action)=>{
      state.wholeSlips = [...action.payload];
    },
    setNumber : (state, action)=>{
      state.all = action.payload.all;
      state.can = action.payload.can;
      state.confirmed = action.payload.confirmed;
      state.except = action.payload.except;
      state.remove = action.payload.remove;
      state.total = action.payload.total;
    },
    // 전표입력 -> 파라미터로 받은 bank 가져오기
    setBanks : (state, action)=>{
      // state.banks.push(action.payload) -> 출력 안됨
      state.banks = [...action.payload];
    },
    setRequestWhat : (state, action)=>{
      state.requestWhat = action.payload;
    }
  }
});

export const { setSelectedBizno, setStartDate, setEndDate, setNumber,
  setWholeBanks, setWholeSlips, setBanks, setRequestWhat } = bankSlice.actions;

export default bankSlice.reducer;