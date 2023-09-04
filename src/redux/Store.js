import { configureStore } from '@reduxjs/toolkit'
import bankSlice from './bankSlice'
import sidebarSlice from './sidebarSlice'

export const store = configureStore({
  reducer: {
    bank: bankSlice,
    sidebar: sidebarSlice
  }
})