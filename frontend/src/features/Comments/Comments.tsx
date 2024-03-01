import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { commentsState, isCommentsLoading } from './commentsSlice.tsx';
import { Box, CircularProgress } from '@mui/material';
import CommentsItem from './component/CommentsItem.tsx';
import { useEffect } from 'react';
import { fetchComments } from './commentsThunks.ts';
import { useParams } from 'react-router-dom';
import { fetchSingleThread } from '../Threads/threadsThunks.ts';

const Comments = () => {

  const dispatch = useAppDispatch()
  const comments = useAppSelector(commentsState)
  const isLoading = useAppSelector(isCommentsLoading)
  // const threadId = useParams();
  // useEffect(() => {
  //   dispatch(fetchComments(threadId.id as string))
  //   dispatch(fetchSingleThread(threadId.id as string))
  // }, [dispatch, threadId.id]);
  return (
    <Box display="flex" flexDirection="column">
      {isLoading ? (<CircularProgress/>) : (
        comments.map((item)=>(
          <CommentsItem key={item._id} userId={item.userId} content={item.content} datetime={item.datetime}/>
        ))
      )}
    </Box>
  );
};

export default Comments;