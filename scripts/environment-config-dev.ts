#!/usr/bin/env -S npx ts-node

import * as fs from "fs";
import * as path from "path";
import crypto from "crypto";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

function generateConfig(args: typeof argv) {
  const { publicKey, privateKey } = generateRSAKeys();

  const EnvVariables = {
    NODE_ENV: "development",
    PORT: 5000,
    MONGO_URI:
      "mongodb://root:example@localhost:27017/ygt-db?authSource=admin&directConnection=true",
    OPENWEATHER_API: args.OPENWEATHER_API,
    ALLOWED_HOSTS: "http://localhost:3000;",
    API_URL: "http://localhost:5000",
    APP_ID: generateRandomId(10),
    APP_NAME: "Weathery",
    JWT_PRIVATE_KEY: privateKey,
    JWT_PUBLIC_KEY: publicKey,
    EMAIL_FROM: "noreply@example.com",
    EMAIL_SERVER: "smtp://localhost:1025",
    CLIENT_URL: "http://localhost:3000",
    GOOGLE_CLIENT_ID: args.GOOGLE_CLIENT_ID ?? "",
    GOOGLE_CLIENT_SECRET: args.GOOGLE_CLIENT_SECRET ?? "",
    FACEBOOK_CLIENT_ID: args.FACEBOOK_CLIENT_ID ?? "",
    FACEBOOK_CLIENT_SECRET: args.FACEBOOK_CLIENT_SECRET ?? "",
  };

  const envContent = Object.entries(EnvVariables)
    .map(([key, value]) => `${key}="${value}"`)
    .join("\n");

  try {
    const destinationPath = path.join(__dirname, "../", "config.env");
    fs.writeFileSync(destinationPath, envContent);

    console.log("'config.env' file created successfully.");
  } catch (error: any) {
    console.error("Error:", error.message);
  }
}

function generateRandomId(length: number) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

function generateRSAKeys() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048, // Key size in bits
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });

  return { publicKey, privateKey };
}

const argv = yargs(hideBin(process.argv))
  .scriptName("environment-config-dev.ts")
  .option("OPENWEATHER_API", {
    describe: "API key for the Openweather API",
    demandOption: true,
    type: "string",
  })
  .option("GOOGLE_CLIENT_ID", {
    describe: "ClientId for Google OAuth",
    demandOption: true,
    type: "string",
  })
  .option("GOOGLE_CLIENT_SECRET", {
    describe: "Client Secret for Google OAuth",
    demandOption: true,
    type: "string",
  })
  .option("FACEBOOK_CLIENT_ID", {
    describe: "ClientId for Facebook OAuth",
    demandOption: true,
    type: "string",
  })
  .option("FACEBOOK_CLIENT_SECRET", {
    describe: "Client Secret for Facebook OAuth",
    demandOption: true,
    type: "string",
  })
  .help()
  .parseSync();

generateConfig(argv);
