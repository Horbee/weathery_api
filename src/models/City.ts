import mongoose, { Document, Schema } from "mongoose";

export interface CityModel extends Document {
  id: number;
  name: string;
  country: string;
  lat: string;
  lng: string;
}

const CitySchema = new Schema<CityModel>({
  id: Number,
  name: String,
  country: String,
  lat: String,
  lng: String,
});

export const City = mongoose.model<CityModel>("city", CitySchema);
