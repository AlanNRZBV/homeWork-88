import { Box, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { isThreadsLoading, threadsState } from './threadsSlice.ts';
import ThreadsItem from './components/ThreadsItem.tsx';
import { useEffect } from 'react';
import { fetchThreads } from './threadsThunks.ts';

const Threads = () => {
  const dispatch = useAppDispatch();
  const threads = useAppSelector(threadsState);
  const isLoading = useAppSelector(isThreadsLoading);

  useEffect(() => {
    dispatch(fetchThreads());
  }, [dispatch]);

  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} mt={2}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        threads.map((item) => (
          <ThreadsItem
            key={item._id}
            _id={item._id}
            userId={item.userId}
            title={item.title}
            description={item.description}
            image={item.image}
            datetime={item.datetime}
          />
        ))
      )}
    </Box>
  );
};

export default Threads;
