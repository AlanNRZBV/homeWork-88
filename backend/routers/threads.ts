import { Router } from 'express';
import Thread from '../models/Thread';
import auth, { RequestWithUser } from '../middleware/auth';
import { ThreadDataWithId } from '../types';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';

const threadsRouter = Router();

threadsRouter.get('/', async (req, res, next) => {
  try {
    if (Object.keys(req.query).length === 0) {
      const threads = await Thread.find()
        .sort({ datetime: 1 })
        .populate({ path: 'userId', select: 'username -_id' });

      const message =
        threads.length === 0
          ? 'No threads to load. Create one!'
          : `${threads.length} threads successfully loaded`;

      return res.send({ message: message, threads });
    }

    const value = req.query.threadById;

    const thread = await Thread.findById(value).populate({
      path: 'userId',
      select: 'username -_id',
    });

    if (!thread) {
      return res.send({ message: 'Something went wrong', thread });
    }

    return res.send({ message: 'Thread successfully loaded', thread });
  } catch (e) {
    next(e);
  }
});

threadsRouter.post(
  '/',
  auth,
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
    const errorMsg = 'An image or description is required.';
    try {
      if (!req.file && !req.body.description) {
        return res.send({ error: errorMsg });
      }

      const threadData: ThreadDataWithId = {
        userId: req.user?.id,
        title: req.body.title,
        description: req.body.description ? req.body.description : null,
        image: req.file ? req.file.filename : null,
      };

      const thread = new Thread(threadData);
      await thread.save();

      return res.send({ message: 'Thread has been successfully created.' });
    } catch (e) {
      if (e instanceof mongoose.Error) {
        return res.status(422).send({ error: e.message });
      }
      next(e);
    }
  },
);

export default threadsRouter;
