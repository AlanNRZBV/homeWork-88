import { Box, Button, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks.ts';
import React, { FC, useState } from 'react';
import { ICommentMutation } from '../../../types';
import { submitComment } from '../commentsThunks.ts';
import { useParams } from 'react-router-dom';

interface Props{
  submitHandlerFromProps: ()=>void
}

const AddCommentForm:FC<Props> = ({submitHandlerFromProps}) => {
  const dispatch = useAppDispatch();
  const threadId = useParams();

  const [state, setState] = useState<ICommentMutation>({
    threadId: '',
    content: '',
  });

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setState((prevState) => ({
        ...prevState,
        threadId: threadId.id as string,
      }));
      await dispatch(submitComment(state)).unwrap();
      submitHandlerFromProps()
    } catch (e) {
      console.log('Caught on try - SUBMIT COMMENT FORM - ', e);
    }
  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  return (
    <>
      <Typography variant="body1" mb={2}>
        Add Comment
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        onSubmit={submitHandler}
      >
        <TextField
          type="text"
          id="content"
          label="Title"
          value={state.content}
          onChange={inputChangeHandler}
          name="content"
          required
          sx={{ marginBottom: '16px' }}
        ></TextField>

        <Button type="submit" variant="contained" sx={{ marginTop: '16px' }}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default AddCommentForm;
