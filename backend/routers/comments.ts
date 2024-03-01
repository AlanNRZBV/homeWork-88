import { Router } from 'express';
import { Types } from 'mongoose';
import Comment from '../models/Comment';
import auth, { RequestWithUser } from '../middleware/auth';
import { CommentData } from '../types';
import Thread from '../models/Thread';

const commentsRouter = Router();

commentsRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const comments = await Comment.find({ threadId: _id })
      .sort({ datetime: -1 })
      .populate([
        { path: 'userId', select: 'username -_id' },
        { path: 'threadId', select: 'title -_id' },
      ]);

    if (!comments) {
      return res.send({
        message: 'No comments have been made available at this time.',
      });
    }

    return res.send({ message: `Successfully loaded comments`, comments });
  } catch (e) {
    next(e);
  }
});

commentsRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (req.user) {
      const thread = await Thread.findById(req.body.threadId);

      if (!thread) {
        return res.send('Wrong thread id');
      }

      const commentData: CommentData = {
        threadId: thread._id as Types.ObjectId,
        userId: req.user._id,
        content: req.body.content,
      };

      const comment = new Comment(commentData);
      await comment.save();
      return res.send({
        message: 'Successfully submitted comment',
        comment: commentData.content,
      });
    }
  } catch (e) {
    next(e);
  }
});

export default commentsRouter;
