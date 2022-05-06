import { CityModel } from "../models/City";
import { UserModel } from "../models/User";

export const normalizeUser = (user: UserModel) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    loginMethod: user.loginMethod,
  };
};

export const normalizeCity = (city: CityModel) => {
  return {
    id: city._id,
    name: city.name,
    country: city.country,
    state: city.state,
    coord: city.coord,
  };
};
