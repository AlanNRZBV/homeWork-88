import {Grid} from "@mui/material";
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { threadsState } from './threadsSlice.ts';
import ThreadsItem from './ThreadsItem.tsx';
import { useEffect } from 'react';
import { fetchThreads } from './threadsThunks.ts';

const Threads = () => {

  const dispatch = useAppDispatch();
  const threads = useAppSelector(threadsState)

  useEffect(() => {
    dispatch(fetchThreads())
  }, [dispatch]);

  return (
      <Grid container spacing={2} mt={2}>
        {threads.map((item)=>(
          <ThreadsItem key={item._id} _id={item._id} title={item.title} description={item.description} image={item.image} datetime={item.datetime}/>
          )
        )}
      </Grid>
  );
};

export default Threads;