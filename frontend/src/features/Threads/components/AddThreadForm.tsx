import { Box, Button, TextField, Typography } from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput.tsx';
import React, { FC, useState } from 'react';
import { ThreadMutation } from '../../../types';
import { useAppDispatch } from '../../../app/hooks.ts';
import { fetchThreads, submitThread } from '../threadsThunks.ts';

interface Props{

  closeHandler:()=>void
}


const AddThreadForm:FC<Props> = ({closeHandler}) => {
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
      setState(
        {image:null,
        title:'',
        description:''}
      )
      closeHandler()
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
          sx={{marginBottom:'16px'}}
        ></TextField>
        <TextField
          type="text"
          id="description"
          label="Description"
          value={state.description}
          onChange={inputChangeHandler}
          name="description"
          sx={{marginBottom:'16px'}}
        ></TextField>
        <FileInput
          label="Image"
          name="image"
          onChange={fileInputChangeHandler}

        />

        <Button type="submit" variant="contained" sx={{marginTop:'16px'}}>Submit</Button>
      </Box>
    </>
  );
};

export default AddThreadForm;