import mongoose, { Document,Schema } from 'mongoose';

// Define User Interface
export interface IUser extends Document {
  email: string;
  password?: string;
  provider: 'credentials' | 'google';
  createdAt: Date;
  profile: {
    username?: string;
    avatar?: string;
  },
  stats: {
    totalSessions: number;
    totalCampaigns: number;
  },
  settings: {
    theme: "dark" | "light",
    notifications: boolean,
  }
}

// Define Schema
const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  provider: {
    type: String,
    enum: ['credentials', 'google'],
    default: 'credentials',
  },
  createdAt: { type: Date, default: Date.now },
  profile: {
    username: { type: String, required: false, unique: true },
    avatar: { type: String, required: false, unique: false },
  },
  stats: {
    totalSessions: {
      type: Number,
      default: 0,
    },
    totalCampaigns: {
      type: Number,
      default: 0,
    }
  },
  settings: {
    theme: {
      type: String,
      enum: ['dark', 'light'],
      default: 'dark',
    },
    notifications: {
      type: Boolean,
      default: false,
    }
  }
});

// Export the model
export default mongoose.models.User as mongoose.Model<IUser> ||
  mongoose.model<IUser>('User', UserSchema);
