import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  SingleThreadFetchResponse,
  ThreadMutation,
  ThreadsFetchResponse,
} from '../../types';
import axiosApi from '../../axiosApi.ts';
import { RootState } from '../../app/store.ts';

export const fetchThreads = createAsyncThunk('threads/fetch', async () => {
  try {
    const response = await axiosApi.get<ThreadsFetchResponse>('/threads');
    return response.data;
  } catch (e) {
    console.log('Caught on try - FETCH THREADS - ', e);
  }
});

export const fetchSingleThread = createAsyncThunk<
  SingleThreadFetchResponse | undefined,
  string
>('threads/fetchSingle', async (arg) => {
  try {
    const response = await axiosApi.get<SingleThreadFetchResponse>(
      `/threads?threadById=${arg}`,
    );

    return response.data;
  } catch (e) {
    console.log('Caught on try - FETCH SINGLE THREAD - ', e);
  }
});

export const submitThread = createAsyncThunk<
  null,
  ThreadMutation,
  { state: RootState }
>('threads/submit', async (arg, { getState }) => {
  const token = getState().users.user?.token;
  const formData = new FormData();
  const keys = Object.keys(arg) as (keyof ThreadMutation)[];
  keys.forEach((key) => {
    const value = arg[key];
    if (value !== null) {
      formData.append(key, value);
    }
  });

  const response = await axiosApi.post('/threads', formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});
