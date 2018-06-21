# GroupUp - Frontend

![Packagist](https://img.shields.io/badge/created%20on-June%202018-red.svg)
[![Build Status](https://travis-ci.org/Group-Up/backend.svg?branch=master)](https://travis-ci.org/groupUp/groupUp)
[![David](https://img.shields.io/david/expressjs/express.svg)](https://github.com/groupUp/groupUp)
[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://github.com/groupUp/groupUp)

![groupUp](src/assets/GroupUpLogo.png)

**Author**: Zachary Schumpert, Sarah Geyer, Carl Olson, Mario Flores Jr.

**Version**: 1.0.0

## Overview

The GroupUp application provides users with a common virtual meeting place where they can plan events, update agendas, send messages and keep track of any information a group would enjoy having easy access to. The user signs up for an account and creates a profile to interact in the application. Users can easily invite friends, family or coworkers by accessing their Google contacts directly from the GroupUp application.  Within your custom group, share locations you plan to meet, share photos of an event and message all the members in your group at once. The application is built with a RESTful HTTP server that utilizes basic authentication using Express and Google Oath. Mongoose and MongoDB are used for the Schema and database functionality. GroupUp will make any company event, convention, road-trip or party a breeze to plan.

#### In Your .env File:

* API_URL=http://localhost:3000
* NODE_ENV=development
* CDN_URL=/

## Getting Started

To install dependencies, run:

```npm i```

```nodemon``` or ```npm start``` This will start the server and tell you what port you're on

To start the db and test the routes, from the command line, enter:

```npm run dbon``` This turns MongoDB on

```npm run test``` Enter this line in a separate command line tab. This initiates the tests via jest

```npm run dboff``` This turns off MongoDB

## Components  // Zachary - do we want to include the file extension of each one? ex: app.js vs app.
```App.js```
- Renders all routes to the client.

```auth-form.js```
- Handles the login authorization for our users.  This is where username, email and password are checked for proper validation.   

**handleValidation** - Validates the username, email and password.  Validation is dependent on length and one special character, number or uppercase letter.

**handleChange** - Allows the user to input text in the appropriate field(s), changing the state depending on user input.

**handleSubmit** - Submits the username, email and password to the auth-landing component.

```auth-landing.js```
- This is the landing page for our application and enables the user to: signup/create an account and either login to an account created from within our GroupUp web application or login with a Google account.

**handleSignup** - Signup/create an account.

**handleLogin** - Login via an account created from within GroupUp or login via a Google account. 

```auth-redirect.js```
- Directs a user to the appropriate route/page, depending on the user’s authorization. 

 ```dashboard.js```
- Displays both public and private events the user has created and is a member of.  Recently created user posts are also displayed via this component, as well as displaying the user’s available Google contacts.  

```event-form.js```
- Allows the user to create an event and toggle if they’d like the event to be public(available for any additional users to join) or private(additional users are able to join via invite only).

**handleChange** - Allows the user to input text in the appropriate field(s), changing the state depending on user input.

**handleSubmit** - Submits the state of the newly created event (Event Title, Event Description, Date of the event and Event location) to the event-page component 
 // Zachary - is it really “newly created” I’m unsure if the event has truly been created at this point and this is merely “submitting the state of the event."

**handleToggle** - Sets the state of the event to allow either Public or Private access.

```event-item.js```
- This component represents the newly created event(s), allowing the event to then be rendered. 

```event-page.js```
- Displays each event the user is a member of and/or has created.

**handleClick** - Allows the user to delete an event form their dashboard.  
// Zachary - TODO confirm that when a user deletes a public event they’ve joined, it only removes the public event from that user’s dashboard and NOT the entire public event.

```header.js``` 
- Confirms whether or not the user is logged in to an account or is a guest and then ensures the appropriate information is displayed dependent on the user’s logged in state.

```image-form.js``` 
- Allows the user to find, select and upload an image.  

**handleChange** - Allows the user to input a caption for an image they select to upload.

**handleSubmit** - Submits the state of the image the user has selected to upload to the post-form component.

```post-form.js```
- Allows the user to create, update and submit a profile.

**handleValidation** - Validates whether or not the bio of the user profile is a String data type.  included a bio in their profile.

**handleChange** - Allows the user to input text into the appropriate profile fields. 

**handleSubmit** - Submits the state of the validated profile so that it can be rendered.

## Architecture

JavaScript, Node, Express, MongoDB, Mongoose, Travis, Heroku, superagent, winston, multer, http-errors, uuid, logger, jest, babel, dotenv, body-parser, crypto, bcrypt, jsonwebtoken, fs-extra, faker.
