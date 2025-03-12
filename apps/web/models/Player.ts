import mongoose, { Document, Schema, Types } from 'mongoose';

interface IAttendance extends Document {
  sessionId: Types.ObjectId,
  attendance: boolean,
}
interface ICharacter extends Document {
  name: string;
  class?: string;
  race?: string;
  bio?: string;
  equipment?: string;
  campaignId: Types.ObjectId;
}
export interface IPlayer extends Document {
  userId: Types.ObjectId,
  name: string,
  notes?: string,
  attendance?: IAttendance[],
  characters?: ICharacter[],
}

const AttendanceSchema: Schema = new Schema({
  sessionId: {
    type: Types.ObjectId,
    required: true,
  },
  attendance: {
    type: Boolean,
    required: true,
    default: false,
  }
})

const CharacterSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  race: {
    type: String,
    required: false,
  },
  equipment: {
    type: String,
    required: false,
  },
  campaignId: {
    type: Types.ObjectId,
    required: true,
  }
})

const PlayerSchema: Schema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
  attendance: [AttendanceSchema],
  characters: [CharacterSchema]
});


export default mongoose.models.Player as mongoose.Model<IPlayer> ||
mongoose.model<IPlayer>('Player', PlayerSchema);
