import cities from "../../../city.list.min.json";
import { connectDB } from "../db";
import { City } from "../models/City";

connectDB();

const importCities = async () => {
  try {
    await City.insertMany(cities) 
    console.log("City Data imported!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

importCities();

