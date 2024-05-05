# Weathery API

Weathery API is a NodeJS application, which fetches weather information from [OpenweatherAPI](https://openweathermap.org/api).

Available routes: `/swagger-ui`

## Getting Started

To get the project running locally:

```bash
# Clone the project
git clone https://github.com/Horbee/weathery_api.git

# Start the Docker containers for MongoDB, MongoDB Express and MailHog
docker compose up -d

# Install project dependencies
npm install

# Generate config.env file
./scripts/environment-config-dev.ts --OPENWEATHER_API <your API key> --GOOGLE_CLIENT_ID <id> --GOOGLE_CLIENT_SECRET <id> --FACEBOOK_CLIENT_ID <id> --FACEBOOK_CLIENT_SECRET <id>

# Seed city data to database
npm run data:import

# Run dev server with nodemon
npm run dev
```

- Change variables in the `config.env` file if necessary.
- Go to `localhost:5000/swagger-ui` to see available routes.

## Prod deployment

- Update environment variables in `config.env` file
- Run `npm build` to generate the javascript files and run `npm start` to start the server in production.

## License

[MIT](https://choosealicense.com/licenses/mit/)
