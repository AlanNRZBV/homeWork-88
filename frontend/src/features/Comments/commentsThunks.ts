import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { CommentsFetchResponse } from '../../types';

export const fetchComments = createAsyncThunk<CommentsFetchResponse | undefined,string>('comments/fetch',
  async(arg)=>{
  try{
    const response = await axiosApi.get<CommentsFetchResponse>(`/comments/${arg}`)
    return response.data
  }catch (e) {
    console.log('Caught on try - FETCH COMMENTS - ', e)
  }
  })