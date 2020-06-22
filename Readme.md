# Weathery API

Weathery API is a NodeJS application, which fetches weather information from OpenweatherAPI.

Available routes: http://localhost:5000/swagger-ui

## Getting Started

To get the project running locally,

- Clone this repository
- Run `npm install` to install all project dependencies.
- Run `npm run dev` to start the development server via Nodemon.
- Run `npm build` to generate the javascript files and run `npm start` to start the server.

## Setup environment variables

Before starting the project, you should set the required environment variables. These can be found in the file: `example.config.env`.

Rename this file to: `config.env` and fill the required variables. The application will look for that file and sets up the AppConfig object.

`cp example.config.env config.env`

```env
NODE_ENV=development  # environment setup
PORT=5000             # server port
MONGO_URI=            # MongoDB database URI
OPENWEATHER_API=      # Openweather API key
ALLOWED_HOSTS=http://localhost:3000; # For CORS setup: list of urls separated with ";"
CLUSTER_MODE=false    # The cluster module allows creation of child processes that all share server ports and take advantage of multi-core systems.

# For Swagger
API_URL=http://localhost:5000

# JWT
APP_ID=8df5eb5092
APP_NAME=Weathery
# Private and Public RSA keys in the following format:
JWT_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n[...content...]\n-----END RSA PRIVATE KEY-----"
JWT_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\n[...content...]\n-----END PUBLIC KEY-----"

# EMAIL SYSTEM (SENDGRID)
MAIL_SYSTEM=true    # turn on / off sending emails
MAIL_API=           # sendgrid API key
MAIL_FROM=          # sendgrid verified sender
FORGOT_PW_TEMPLATE= # id of the forgot password email template
CLIENT_URL=http://localhost:3000 # the actual CLIENT URL

# Google Oauth
CLIENT_ID=
CLIENT_SECRET=

```

## License

[MIT](https://choosealicense.com/licenses/mit/)
