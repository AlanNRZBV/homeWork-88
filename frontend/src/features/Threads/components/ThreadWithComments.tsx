import moment from 'moment/moment';
import { Image } from 'mui-image';
import { useEffect } from 'react';
import { apiURL } from '../../../constants.ts';
import Comments from '../../Comments/Comments.tsx';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { isSingleThreadLoading, singleThreadState } from '../threadsSlice.ts';
import ForumIcon from '@mui/icons-material/Forum';
import AddCommentForm from '../../Comments/component/AddCommentForm.tsx';
import { NavLink, useParams } from 'react-router-dom';
import { fetchComments } from '../../Comments/commentsThunks.ts';
import { fetchSingleThread } from '../threadsThunks.ts';
import { selectUser } from '../../Users/usersSlice.ts';

const ThreadWithComments = () => {
  const dispatch = useAppDispatch();
  const thread = useAppSelector(singleThreadState);
  const isLoading = useAppSelector(isSingleThreadLoading);
  const user = useAppSelector(selectUser);

  const threadId = useParams();
  useEffect(() => {
    dispatch(fetchComments(threadId.id as string));
    dispatch(fetchSingleThread(threadId.id as string));
  }, [dispatch, threadId.id]);

  const submitHandler = async () => {
    dispatch(fetchComments(thread._id));
    dispatch(fetchSingleThread(thread._id));
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
    <Box display="flex" flexDirection="column" position="relative">
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
      {user ? (
        <AddCommentForm submitHandlerFromProps={submitHandler} />
      ) : (
        <Box display="flex" alignSelf="center">
          <Typography component={NavLink} to="/register">
            Sign up
          </Typography>
          <Typography mx={2}> or</Typography>
          <Typography component={NavLink} to="/login" mr={2}>
            Sign in
          </Typography>
          <Typography> to add comment</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ThreadWithComments;
