import mongoose, { Document, Schema, Types } from 'mongoose';

export interface INote extends Document {
  campaignId: Types.ObjectId,
  sessionId: Types.ObjectId,
  authorId: Types.ObjectId,
  title: string,
  content: string,
  createdAt: Date,
}


const NoteSchema: Schema = new Schema({
  campaignId: {
    type: Types.ObjectId,
    required: true,
    ref: 'Campaign',
  },
  sessionId: {
    type: Types.ObjectId,
    required: true,
    ref: 'Session',
  },
  authorId: {
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  }
});


export default mongoose.models.Note as mongoose.Model<INote> ||
mongoose.model<INote>('Note', NoteSchema);
