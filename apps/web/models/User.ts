import mongoose, { Schema, Document } from 'mongoose';

// Define User Interface
export interface IUser extends Document {
  email: string;
  password?: string;
  provider: 'credentials' | 'google';
  createdAt: Date;
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
});

// Export the model
export default mongoose.models.User as mongoose.Model<IUser> ||
  mongoose.model<IUser>('User', UserSchema);
