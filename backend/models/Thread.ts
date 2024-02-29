import mongoose, { Types } from 'mongoose';
import User from './User';

const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
  userId:{
    type: Schema.Types.ObjectId,
    ref:'User ',
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist!',
    },
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  image: {
    type: String
  },
  datetime:{
    type: Date,
    required: true,
    default:() => new Date()
  }
})

ThreadSchema.pre('save',  function(){
  if(!this.image && !this.description){
      throw new mongoose.Error('You must provide image or description')
  }
})

const Thread = mongoose.model('Thread', ThreadSchema);

export default Thread;