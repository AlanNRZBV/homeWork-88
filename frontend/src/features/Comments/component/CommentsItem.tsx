import { Box, Typography } from '@mui/material';
import { IComment } from '../../../types';
import { FC } from 'react';
import moment from 'moment/moment';

const CommentsItem:FC<IComment> = ({datetime,userId,content}) => {
  const date = moment(datetime).format('MMM Do YY, h:mm a');
  return (
    <Box p={1} mb={2} sx={{border:'1px solid black', borderRadius:'12px'}}>
      <Box display="flex" pb={1} mb={1} sx={{borderBottom:'1px solid grey'}}>
        <Typography color="grey" fontStyle="italic" mr={2}>{date}</Typography>
        <Typography sx={{textTransform:'uppercase'}}>{userId.username}</Typography>
      </Box>
      <Typography paragraph={true}>
        {content}
      </Typography>
    </Box>
  );
};

export default CommentsItem;