# slack-lunch
=============
> A simple backend to support a Slack command and solve the eternal problem of figuring out where to have lunch

## What is this project about?
This project is an HTTP API implemented using [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/), largely based on https://zellwk.com/blog/crud-express-mongodb/ and https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4. This API exposes endpoints that responds to Slack commands.

## Pre-requisites
* You need to have [Node.js](http://nodejs.com) installed to be able to run this project.
* You need to set an environment variable called `MONGO_URI`, pointing to the URL where your MongoDB instance is running. E.g.: `mongodb://<user>:<pwd>@<server>:45370/lunch`
* Optionally, you may set a `PORT` environment variable. If none is set, the application by default will start on port 3000.

## Running locally
After checking out the code, the first thing you need to do is run `npm install`. This will download all the dependencies.

Next, the simplest way of running this project locally is using `node server` (don't forget to set the previously mentioned environment variables). This will start the app on port 3000 (usually) and from there on you can start `POST`ing to the API. E.g.: `curl -X POST -H "Content-Type: application/json" -d '{"user_name": "felipecao"}' "http://localhost:3000/places/show/"`.

But `node server` has a downside: every time you make a change, you'll need to restart the app.

To get rid of this hassle, use `npm run dev`. Now every time you change a file, [nodemon](https://nodemon.io/) will take care of recompiling and reloading the app.

## TODO list
* Add unit tests
* Respond to Slack using JSON
* Make responses visible to the entire channel
* Add information about teams to data model
* Check token id vs team provided on request
