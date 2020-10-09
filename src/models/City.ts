import mongoose, { Document, Schema } from "mongoose";

export interface CityModel extends Document {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  }
}

const CitySchema = new Schema<CityModel>({
  id: Number,
  name: String,
  state: String,
  country: String,
  coord: Object,
});

export const City = mongoose.model<CityModel>("city", CitySchema);
