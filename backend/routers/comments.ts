import { Router } from 'express';
import { Types } from 'mongoose';
import Comment from '../models/Comment';
import auth, { RequestWithUser } from '../middleware/auth';
import { CommentData } from '../types';

const commentsRouter = Router()


commentsRouter.get('/:id', async(req, res, next)=>{
  try{
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const comments = await Comment.find({threadId: _id}).sort({datetime:-1})

    if (!comments){
      return res.send({message:
          'No comments have been made available at this time.'})
    }

    return res.send({message: `Successfully loaded comments`, comments})
  }catch (e) {
    next(e)
  }
})

commentsRouter.post('/:id', auth,async(req:RequestWithUser,res,next)=>{
  try{
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    if(req.user){
      const commentData: CommentData={
        threadId: _id,
        userId: req.user._id,
        content: req.body.content
      }

      const comment = new Comment(commentData)
      await comment.save()
      return res.send({message:'Successfully submitted comment', comment:commentData.content})
    }

  }catch (e) {
    next(e)
  }
})

export default commentsRouter