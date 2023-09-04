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
    /*
    setSlips : (state, action)=>{
      state.requestWhat = "slips";
      state.wholeSlips = [...action.payload];
      
      //state.slips = [];                 // 초기화
      console.log(state.banks);
      console.log(state.wholeSlips);
      
      state.banks.map((bank)=>{
        // 은행코드 일치하는 것 찾아서 slips에 넣기
        const filteredSlips = state.wholeSlips.filter(slip => {
          return slip.bankcode === bank.bankcode;
        });

        console.log(filteredSlips);
        // 기존에 출력된 내용이라면 제외하기
        const uniqueFilteredSlips = filteredSlips.filter(
          slip => !state.slips.some(existingSlip => existingSlip.slipcode === slip.slipcode)
        );

        // res.data.bankcode === bank.bankcode 이렇게 접근하면 안 된다.
        // res.data는 배열 형태로 접근해야 bankcode를 가져올 수 있다.
        state.slips = [...state.slips, ...uniqueFilteredSlips];
      });

    }*/
  }
});

export const { setSelectedBizno, setStartDate, setEndDate, setNumber,
  setWholeBanks, setWholeSlips, setBanks, setRequestWhat } = bankSlice.actions;

export default bankSlice.reducer;