import { IComment } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { fetchComments } from './commentsThunks.ts';

interface CommentsState {
  comments: IComment[];
  isLoading: boolean;
}

const initialState: CommentsState={
  comments:[],
  isLoading: false
}

export const commentsSlice = createSlice({
  name:'comments',
  initialState,
  reducers:{},extraReducers:builder => {
  builder.addCase(fetchComments.pending,(state)=>{
    state.isLoading = true
  });
  builder.addCase(fetchComments.fulfilled,(state,{payload:comments})=>{
    state.isLoading = false
    if(comments){
      state.comments = comments.comments
    }
  });
  builder.addCase(fetchComments.rejected,(state)=>{
    state.isLoading = false
  })
}
})

export const  commentsReducer = commentsSlice.reducer
export const commentsState = (state: RootState)=> state.comments.comments
export const isCommentsLoading = (state: RootState)=> state.comments.isLoading
