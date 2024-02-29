import { FC } from 'react';
import moment from 'moment';
import { apiURL } from '../../constants.ts';
import { Thread } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../Users/usersSlice.ts';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import { Image } from 'mui-image';
const ThreadsItem: FC<Thread> = ({
  _id,
  image,
  title,
  description,
  datetime,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const date = moment(datetime).format('MMMM Do YYYY, h:mm:ss a');

  const addCommentFeature = (
    <Box>
      <Button color="primary" variant="outlined">
        Add comment
      </Button>
    </Box>
  );

  return (
    <Grid item xs={4}>
      <Box
        display="flex"
        alignItems="center"
        p={1}
        sx={{ border: '1px solid grey', borderRadius: '12px', flexGrow: 1 }}
      >
        {image ? (
          <Image
            src={`${apiURL}/${image}`}
            alt="Thread image"
            width="150px"
            showLoading={<CircularProgress />}
            style={{ borderRadius: '4px'}}
          />
        ) : (
          <ForumIcon fontSize="large" />
        )}
        <Box display="flex" alignSelf="start" flexDirection="column" ml={2}>
          <Typography variant="h6">{title}</Typography>
          <Typography color="gray" variant="caption">{date}</Typography>
          <Typography variant="body2">{description}</Typography>
        </Box>
        {user ? addCommentFeature : <></>}
      </Box>
    </Grid>
  );
};

export default ThreadsItem;
