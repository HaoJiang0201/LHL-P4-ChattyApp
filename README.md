# Tweeter Project - Hao Jiang

Tweeter is a simple, single-page Twitter clone.

This repository is the project completed by Hao Jiang in Lighthouse lab.

## Getting Started (Checked!)

1. Install dependencies using the `npm install` command.
2. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
3. And the server will connect to `mongodb://localhost:27017/tweeter` database.
4. Go to <http://localhost:8080/> in the browser to view the Tweeter App.

## Dependencies

#### Client Side
- babel-core
- babel-loader
- babel-preset-es2015
- babel-preset-react
- css-loader
- node-sass
- sass-loader
- sockjs-client
- style-loader
- webpack
- webpack-dev-server
- react
- react-dom

#### Server Side
- express
- ws
- uuid

This list can be found inside package.json file.

## ScreenShots:
!["Screenshot of Chatty App"](https://github.com/Polatouche0201/Lighthouse_Week3/blob/master/tweeter/docs/ComposeNewTweet.jpg)
# Chatty App - Hao Jiang

Many of the web applications that you use today have real-time functionality where the user does not have to reload the page in order to see updates. Major examples of these include Slack, Twitter and Facebook.

This app, Chatty, will allow users to communicate with each other without having to register accounts. It will use React, a popular front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel.

## Getting Started (Checked!)

1. Install dependencies using the `npm install` command under both "Chatty_App" and "Chatty_App_Serverr" folders.
2. Start the web server using the `npm start` command. The app will be served at <http://localhost:3001/>
3. Start the client side using the `npm start` command. The app will be served at <http://localhost:3000/>.
4. Go to <http://localhost:3000/> in the browser to view the Chatty App.
5. Multiple client side can be opened in the browser to view a real time communication style.

## Dependencies

- Express 4.13.4
- Node 5.10.x or above
- Body Parser 1.15.2
- Chance 1.0.2
- Md5 2.1.0
- Mongodb 2.2.36

This list can be found inside package.json file.

## ScreenShots:
!["Screenshot of tweet compose box"](https://github.com/Polatouche0201/Lighthouse_Week3/blob/master/tweeter/docs/ComposeNewTweet.jpg)
!["Screenshot of tweets"](https://github.com/Polatouche0201/Lighthouse_Week3/blob/master/tweeter/docs/TweetsList.jpg)
