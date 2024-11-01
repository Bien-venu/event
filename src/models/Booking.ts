import mongoose, { Document, Schema, Model } from "mongoose";

interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  name: string;
  seatsBooked: number;
}

const bookingSchema = new Schema<IBooking>({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  seatsBooked: {
    type: Number,
    required: true,
  },
});

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;
