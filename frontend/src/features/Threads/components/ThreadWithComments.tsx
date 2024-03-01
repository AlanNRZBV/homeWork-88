import Comments from '../../Comments/Comments.tsx';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAppSelector } from '../../../app/hooks.ts';
import { isSingleThreadLoading, singleThreadState } from '../threadsSlice.ts';
import { Image } from 'mui-image';
import { apiURL } from '../../../constants.ts';
import ForumIcon from '@mui/icons-material/Forum';
import moment from 'moment/moment';

const ThreadWithComments = () => {
  const thread = useAppSelector(singleThreadState);
  const isLoading = useAppSelector(isSingleThreadLoading);

  const date = moment(thread.datetime).format('MMM Do YY, h:mm a');

  console.log(thread)



  const threadBody = (
    <>
      {thread.image ? (
        <Image
          src={`${apiURL}/${thread.image}`}
          alt="Thread image"
          fit="cover"
          width="25%"
          showLoading={<CircularProgress />}
          style={{ borderRadius: '4px' }}
        />
      ) : (
        <ForumIcon fontSize="large" sx={{ flexGrow: 1 }} />
      )}
      <Typography>{thread.title}</Typography>
      <Typography>{date}</Typography>
      <Typography>{thread.userId.username}</Typography>
      <Typography paragraph={true}>{thread.description}</Typography>
    </>
  );

  return (
    <Box>
      <Box>{isLoading ? <CircularProgress /> : threadBody}</Box>
      <Comments />
    </Box>
  );
};

export default ThreadWithComments;