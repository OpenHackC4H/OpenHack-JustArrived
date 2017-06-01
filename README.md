# OpenHack-JustArrived
Our submission for the OpenHack Uppsala 2017 JustArrived challenge.

## Testing Locally
To test the server locally, make sure you have [NodeJS](https://nodejs.org/en/) installed and added to path on your machine.

Install [MongoDB](https://docs.mongodb.com/manual/installation/), and create a `data` folder inside the project directory. If you're on Windows, you can then run `./mongo.bat` in CMD to start the MongoDB server, otherwise just copy the command in mongo.bat and run in the shell of your choice.

Make sure to run `npm install` once before trying to start the server, then run the server with:
`node app.js`.
