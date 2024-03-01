import { IComment } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { fetchComments, submitComment } from './commentsThunks.ts';

interface CommentsState {
  comments: IComment[];
  isLoading: boolean;
  isSingleCommentLoading: boolean;
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  isSingleCommentLoading: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, { payload: comments }) => {
      state.isLoading = false;
      if (comments) {
        state.comments = comments.comments;
      }
    });
    builder.addCase(submitComment.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(submitComment.pending, (state) => {
      state.isSingleCommentLoading = true;
    });
    builder.addCase(submitComment.fulfilled, (state) => {
      state.isSingleCommentLoading = false;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.isSingleCommentLoading = false;
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
export const commentsState = (state: RootState) => state.comments.comments;
export const isCommentsLoading = (state: RootState) => state.comments.isLoading;
export const isCommentSubmitting = (state: RootState) =>
  state.comments.isSingleCommentLoading;
