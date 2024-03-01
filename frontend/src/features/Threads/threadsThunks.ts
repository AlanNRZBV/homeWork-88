import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThreadMutation, ThreadsFetchResponse } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { RootState } from '../../app/store.ts';

export const fetchThreads = createAsyncThunk('threads/fetch', async () => {
  try {
    const response = await axiosApi.get<ThreadsFetchResponse>('/threads');
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log('Caught on try - FETCH THREADS - ', e);
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
  return response.data
});
