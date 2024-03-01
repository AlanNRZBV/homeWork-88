import mongoose, { Types } from 'mongoose';
import User from './User';
import Thread from './Thread';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  userId:{
    type: Schema.Types.ObjectId,
    ref:'User',
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist!',
    },
  },
  threadId:{
    type: Schema.Types.ObjectId,
    ref:'Thread',
    validate:{
      validator:async (value: Types.ObjectId)=>{
        const thread = await Thread.findById(value)
        return Boolean(thread);
      },
      message: 'Thread does not exist!',
    }
  },
  content: {
    type:String,
    required: true
  },
  datetime:{
    type:Date,
    required: true,
    default:()=> new Date()
  }
})

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment