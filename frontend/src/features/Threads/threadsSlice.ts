import { Thread } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { fetchSingleThread, fetchThreads } from './threadsThunks.ts';

interface ThreadsState {
  threads: Thread[];
  singleThread: Thread;
  isLoading: boolean;
  isSingleThreadLoading: boolean;
}

const initialState: ThreadsState = {
  threads: [],
  singleThread: {
    userId: '',
    _id: '',
    image: '',
    title: '',
    datetime: '',
    description: '',
  },
  isLoading: false,
  isSingleThreadLoading: false,
};

export const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchThreads.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchThreads.fulfilled, (state, { payload: threads }) => {
      state.isLoading = false;
      if (threads) {
        state.threads = threads.threads;
      }
    });
    builder.addCase(fetchThreads.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchSingleThread.pending, (state) => {
      state.isSingleThreadLoading = true;
    });
    builder.addCase(
      fetchSingleThread.fulfilled,
      (state, { payload: thread }) => {
        state.isSingleThreadLoading = false;
        if (thread) {
          state.singleThread = {
            userId: thread.thread.userId,
            _id: thread.thread._id,
            image: thread.thread.image,
            title: thread.thread.title,
            datetime: thread.thread.datetime,
            description: thread.thread.description,
          };
        }
      },
    );
    builder.addCase(fetchSingleThread.rejected, (state) => {
      state.isSingleThreadLoading = false;
    });
  },
});

export const threadsReducer = threadsSlice.reducer;
export const threadsState = (state: RootState) => state.threads.threads;
export const singleThreadState = (state: RootState) =>
  state.threads.singleThread;
export const isThreadsLoading = (state: RootState) => state.threads.isLoading;
export const isSingleThreadLoading = (state: RootState) =>
  state.threads.isSingleThreadLoading;
