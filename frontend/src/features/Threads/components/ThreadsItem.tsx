import { FC } from 'react';
import moment from 'moment';
import { apiURL } from '../../../constants.ts';
import { Thread } from '../../../types';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import { Image } from 'mui-image';
import { NavLink } from 'react-router-dom';

const ThreadsItem: FC<Thread> = ({
  _id,
  image,
  title,
  description,
  datetime,
  userId,
}) => {
  const date = moment(datetime).format('MMM Do YY, h:mm a');

  return (
    <Box
      gridColumn="span 4"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={1}
      sx={{ border: '1px solid grey', borderRadius: '12px' }}
    >
      {image ? (
        <Image
          src={`${apiURL}/${image}`}
          alt="Thread image"
          fit="cover"
          width="25%"
          showLoading={<CircularProgress />}
          style={{ borderRadius: '4px' }}
        />
      ) : (
        <ForumIcon fontSize="large" sx={{ flexGrow: 1 }} />
      )}
      <Box
        display="flex"
        alignSelf="stretch"
        flexDirection="column"
        flexBasis="75%"
        ml={2}
        overflow="hidden"
      >
        <Typography variant="h6">{title}</Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography color="gray" variant="caption">
            {date}
          </Typography>
          <Typography color="gray" variant="caption">
            {`by ${userId?.username}`}
          </Typography>
        </Box>
        {description ? (
          <Typography
            component={NavLink}
            to={`/threads/${_id}`}
            variant="body2"
            mt={2}
            mb={2}
            noWrap={true}
          >
            {description}
          </Typography>
        ) : (
          <Button component={NavLink} to={`/threads/${_id}`}>
            View thread
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ThreadsItem;
