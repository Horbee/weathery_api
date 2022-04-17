import { City, CityModel } from "../models/City";
import { UserModel } from "../models/User";
import { Nullable } from "../utils/nullable";

export const findCityById = async (
  cityId: string
): Promise<Nullable<CityModel>> => {
  return await City.findById(cityId);
};

export const findAllCitiesByName = async (
  name: string
): Promise<CityModel[]> => {
  const nameReg = new RegExp("^" + name.toLowerCase(), "i");
  return await City.find({ name: { $regex: nameReg } });
};

export const findAllCitiesOfUser = async (
  user: UserModel
): Promise<CityModel[]> => {
  return await City.find({ _id: { $in: user.cities } });
};

export const attachCityToUser = async (
  city: CityModel,
  user: UserModel
): Promise<UserModel> => {
  if (user.cities.includes(city._id)) return user;

  if (user.cities.length >= 10) {
    user.cities.shift();
  }

  user.cities.push(city._id);
  return await user.save();
};

export const removeCityFromUser = async (
  cityId: string,
  user: UserModel
): Promise<UserModel> => {
  user.cities = user.cities.filter((city) => city.toString() !== cityId);
  return await user.save();
};
