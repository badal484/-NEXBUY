import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  address: String,
  isApproved: {
    type: Boolean,
    default: true // keep true for now (no admin approval yet)
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: [Number]
  }
});

shopSchema.index({ location: "2dsphere" });

export default mongoose.model("Shop", shopSchema);



