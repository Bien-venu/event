import mongoose, { Document, Schema } from "mongoose";

interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  seats: number;
  availableSeats: number;
}

const eventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  seats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
});

export default mongoose.models.Event ||
  mongoose.model<IEvent>("Event", eventSchema);
