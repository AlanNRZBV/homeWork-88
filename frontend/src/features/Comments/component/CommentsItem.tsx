import { Box, Typography } from '@mui/material';
import { IComment } from '../../../types';
import { FC } from 'react';
import moment from 'moment/moment';

const CommentsItem:FC<IComment> = ({datetime,userId,content}) => {
  const date = moment(datetime).format('MMM Do YY, h:mm a');
  return (
    <Box>
      <Box>
        <Typography>{userId.username}</Typography>
        <Typography>{date}</Typography>
      </Box>
      <Typography paragraph={true}>
        {content}
      </Typography>
    </Box>
  );
};

export default CommentsItem;