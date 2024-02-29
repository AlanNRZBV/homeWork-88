import {Thread} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import { fetchThreads } from './threadsThunks.ts';

interface ThreadsState{
  threads: Thread[],
  isLoading: boolean
}

const initialState:ThreadsState={
  threads:[],
  isLoading: false
}

export const threadsSlice = createSlice({
  name:'threads',
  initialState,
  reducers:{},extraReducers:builder => {
    builder.addCase(fetchThreads.pending,(state)=>{
      state.isLoading = true
    });
    builder.addCase(fetchThreads.fulfilled,(state,{payload:threads})=>{
      state.isLoading = false
      if(threads){
        state.threads = threads.threads
      }
    });
    builder.addCase(fetchThreads.rejected,(state)=>{
      state.isLoading = false
    })
  }
})

export const threadsReducer = threadsSlice.reducer
export const threadsState = (state: RootState)=> state.threads.threads
export const isThreadsLoading = (state: RootState)=> state.threads.isLoading