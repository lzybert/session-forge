import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ISession extends Document {
  campaignId: Types.ObjectId,
  date: Date,
  summary: string,
  attendees: Types.ObjectId[],
  notes?: Types.ObjectId[],
  events?: string[],
}


const SessionSchema: Schema = new Schema({
  campaignId: {
    type: Types.ObjectId,
    required: true,
    ref: 'Campaign',
  },
  date: {
    type: Date,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  attendees: {
    type: [Types.ObjectId],
    required: true,
    ref: 'Player',
  },
  notes: {
    type: [Types.ObjectId],
    required: false,
    ref: 'Note',
  },
  events: {
    type: [String],
    required: false,
  }
});


export default mongoose.models.Session as mongoose.Model<ISession> ||
mongoose.model<ISession>('Session', SessionSchema);
