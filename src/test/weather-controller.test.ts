import express from "express";
import moxios from "moxios";
import request from "supertest";

import { getWeatherInfoByCity } from "../controllers/weather.controller";

const initExpressApp = (mockFunction: jest.Mock<any, any>) => {
  const app = express();
  app.use((req, res, next) => {
    (req as any).user = { updateOne: mockFunction };
    next();
  });
  app.route("/api/weather/:city").get(getWeatherInfoByCity);
  //app.use(getWeatherInfoByCity);
  return app;
};

describe("Weather Controller", () => {
  // ARRANGE
  const weatherResponse = { weather: "good" };

  beforeEach(() => {
    moxios.install();

    // Mocking the Openweather API call
    moxios.stubRequest(/api.openweathermap.org/, {
      status: 200,
      response: weatherResponse
    });
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("should return the mock city info", async () => {
    // ARRANGE
    const testCity = "fuerth";
    const app = initExpressApp(jest.fn());

    // ACT
    const res = await request(app).get(`/api/weather/${testCity}`);
    // ASSERT
    expect(res.body).toEqual({
      success: true,
      data: weatherResponse
    });
  });

  it("should update the city info of the logged in user", async () => {
    // ARRANGE: mock the authenticated user's updateOne function
    const updateOne = jest.fn();
    const app = initExpressApp(updateOne);
    const testCity = "nurenberg";

    // ACT
    await request(app).get(`/api/weather/${testCity}`);
    // ASSERT
    expect(updateOne).toBeCalledWith({ city: testCity });
  });
});
