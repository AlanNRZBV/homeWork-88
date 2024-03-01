import { useAppSelector } from '../../app/hooks.ts';
import { commentsState, isCommentsLoading } from './commentsSlice.tsx';
import { Box, CircularProgress } from '@mui/material';
import CommentsItem from './component/CommentsItem.tsx';

const Comments = () => {
  const comments = useAppSelector(commentsState);
  const isLoading = useAppSelector(isCommentsLoading);
  return (
    <Box display="flex" flexDirection="column">
      {isLoading ? (
        <CircularProgress />
      ) : (
        comments.map((item) => (
          <CommentsItem
            key={item._id}
            userId={item.userId}
            content={item.content}
            datetime={item.datetime}
          />
        ))
      )}
    </Box>
  );
};

export default Comments;