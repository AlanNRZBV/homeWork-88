import { Box, Button, TextField, Typography } from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput.tsx';
import React, { useState } from 'react';
import { ThreadMutation } from '../../../types';
import { useAppDispatch } from '../../../app/hooks.ts';
import { fetchThreads, submitThread } from '../threadsThunks.ts';

const AddThreadForm = () => {
  const dispatch = useAppDispatch();

  const [state, setState] = useState<ThreadMutation>({
    image: null,
    title: '',
    description: '',
  });

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(submitThread(state)).unwrap();
      await dispatch(fetchThreads())
    } catch (e) {
      console.log('Caught on try - SUBMIT FORM - ', e);
    }
  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <>
      <Typography variant="body1" mb={2}>
        Create thread!
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        onSubmit={submitHandler}
      >
        <TextField
          type="text"
          id="title"
          label="Title"
          value={state.title}
          onChange={inputChangeHandler}
          name="title"
          required
        ></TextField>
        <TextField
          type="text"
          id="description"
          label="Description"
          value={state.description}
          onChange={inputChangeHandler}
          name="description"
        ></TextField>
        <FileInput
          label="Image"
          name="image"
          onChange={fileInputChangeHandler}
        />

        <Button type="submit">Submit</Button>
      </Box>
    </>
  );
};

export default AddThreadForm;