import { configureStore } from '@reduxjs/toolkit'
import bankSlice from './bankSlice'
import sidebarSlice from './sidebarSlice'
import docrequestSlice from './docrequestSlice'

export const store = configureStore({
  reducer: {
    bank: bankSlice,
    sidebar: sidebarSlice,
    docrequest : docrequestSlice,
  }
})