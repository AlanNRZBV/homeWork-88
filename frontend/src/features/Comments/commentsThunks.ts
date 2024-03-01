import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { CommentsFetchResponse, ICommentMutation } from '../../types';
import { RootState } from '../../app/store.ts';

export const fetchComments = createAsyncThunk<CommentsFetchResponse | undefined,string>('comments/fetch',
  async(arg)=>{
  try{
    const response = await axiosApi.get<CommentsFetchResponse>(`/comments/${arg}`)
    return response.data
  }catch (e) {
    console.log('Caught on try - FETCH COMMENTS - ', e)
  }
  })

export const submitComment = createAsyncThunk<void, ICommentMutation, {state: RootState}>('comments/submit',
  async(arg, {getState})=>{
  try {
    const token = getState().users.user?.token;

    const commentData = {
      threadId:arg.threadId,
      content:arg.content
    }

     await axiosApi.post('/comments', commentData, {headers:{
       Authorization:`Bearer ${token}`
       }})
  }catch (e) {
    console.log('Caught on try - SUBMIT COMMENT - ',e)
  }
  })
