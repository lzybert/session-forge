import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ICampaign extends Document {
  gm: Types.ObjectId;
  title: string;
  system: string;
  createdAt: Date;
  description?: string;
  players?: Types.ObjectId[];
  sessions?: Types.ObjectId[];
  generalNotes?: string;
  status: 'active' | 'planning' | 'finished' | 'on hold';
}

const CampaignSchema: Schema = new Schema({
  gm: {
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  system: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: false,
  },
  players: {
    type: [Types.ObjectId],
    required: false,
    ref: 'Player',
  },
  sessions: {
    type: [Types.ObjectId],
    required: false,
    ref: 'Session',
  },
  generalNotes: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['active', 'planning', 'finished', 'on hold'],
    default: 'planning',
  },
});

export default (mongoose.models.Campaign as mongoose.Model<ICampaign>) ||
  mongoose.model<ICampaign>('Campaign', CampaignSchema);
