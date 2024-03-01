import Comments from '../../Comments/Comments.tsx';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { isSingleThreadLoading, singleThreadState } from '../threadsSlice.ts';
import { Image } from 'mui-image';
import { apiURL } from '../../../constants.ts';
import ForumIcon from '@mui/icons-material/Forum';
import moment from 'moment/moment';
import AddCommentForm from '../../Comments/component/AddCommentForm.tsx';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchComments } from '../../Comments/commentsThunks.ts';
import { fetchSingleThread } from '../threadsThunks.ts';

const ThreadWithComments = () => {
  const dispatch = useAppDispatch();
  const thread = useAppSelector(singleThreadState);
  const isLoading = useAppSelector(isSingleThreadLoading);

  const threadId = useParams();
  useEffect(() => {
    dispatch(fetchComments(threadId.id as string));
    dispatch(fetchSingleThread(threadId.id as string));
  }, [dispatch, threadId.id]);

  const submitHandler = async () => {
    dispatch(fetchComments(threadId.id as string));
    dispatch(fetchSingleThread(threadId.id as string));
  };

  const date = moment(thread.datetime).format('MMM Do YY, h:mm a');

  const threadBody = (
    <>
      <Box flexBasis="50%">
        {thread.image ? (
          <Image
            src={`${apiURL}/${thread.image}`}
            alt="Thread image"
            fit="cover"
            width="50%"
            showLoading={<CircularProgress />}
            style={{ borderRadius: '4px' }}
          />
        ) : (
          <ForumIcon fontSize="large" sx={{ flexGrow: 1 }} />
        )}
      </Box>
      <Box flexGrow="1">
        <Box
          display="flex"
          justifyContent="space-between"
          pb={2}
          mb={2}
          sx={{ borderBottom: '1px solid grey' }}
        >
          <Typography color="grey" fontStyle="italic" mr={2}>
            {date}
          </Typography>
          <Typography sx={{ textTransform: 'uppercase' }}>
            {thread.userId.username}
          </Typography>
        </Box>
        <Typography>{thread.title}</Typography>
        <Typography paragraph={true}>{thread.description}</Typography>
      </Box>
    </>
  );

  return (
    <Box>
      <Box
        display="flex"
        pb={2}
        mt={2}
        mb={2}
        sx={{ borderBottom: '2px solid grey' }}
      >
        {isLoading ? <CircularProgress /> : threadBody}
      </Box>
      <Comments />
      <AddCommentForm submitHandlerFromProps={submitHandler} />
    </Box>
  );
};

export default ThreadWithComments;
