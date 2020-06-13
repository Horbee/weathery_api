import { google } from "googleapis";

import { AppConfig } from "../config/appconfig";

const oauth2Client = new google.auth.OAuth2(
  AppConfig.googleClientID,
  AppConfig.googleClientSecret
);

export const verify = (idToken: string) =>
  oauth2Client.verifyIdToken({
    idToken,
    audience: AppConfig.googleClientID
  });
