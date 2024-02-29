import { createAsyncThunk } from '@reduxjs/toolkit';
import {  ThreadsFetchResponse } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const fetchThreads = createAsyncThunk('threads/fetch',
  async()=>{
  try {
    const response = await axiosApi.get<ThreadsFetchResponse>('/threads')
    console.log(response.data)
    return response.data
  }catch (e) {
    console.log('Caught on try - FETCH THREADS - ', e)
  }
  })