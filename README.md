# Randomized Chore Scheduling for the Mastercard WeWork

The demo can be found [here](https://fervent-saha-b4b2b7.netlify.com/).

## At a Glance

This is a full-stack application for managing the chore assignments for the Mastercard WeWork NY team.

## What Is It For

We wanted a way for people to be randomly and automatically assigned to chores at a set cadence. So this app lets you specify a chore as happening on a day of the week, and the app will ensure that for the next 5 weeks, all "chore assignments" have been made. It performs this check every 2 weeks, so that people are able to see the schedule far ahead.

## Technical Stack: NodeJS, TypeScript, React, Gatsby, PostgreSQL, Apollo

- The **front-end** is built using React (TypeScript) with heavy reliance on a [personal component library](https://github.com/nickjmorrow/react-component-library). The front-end is deployed to Netlify because I've found that easiest.
- For **state management**, I'm using Apollo. This isn't a state-heavy app, and the mutations / fetches are fairly simple, otherwise I would've favored Redux.
- For the **back-end**, I'm using a NodeJS app deployed to Heroku and written in TypeScript. I knew the app was going to stay small and just handle a few requests, so NodeJS felt like the natural tool to turn to.
- For the **database**, I'm using PostgreSQL. No strong reason why, I just wanted to use something relational for this given the data makes sense to store relationally as opposed to the NoSQL route.

## Additions

It would be cool to make this more generalized. Enable other companies to set up their own chore systems using the application. But for now, it'll stay specific to the NY Mastercard WeWork.

## What are the expectations of it

I fully intend for this to just be a hobby project that I check up on now and then.

## How to run it

To initialize the database, run the [script found here](https://github.com/nickjmorrow/wework-scheduler/blob/master/server/src/infrastructure/database/initialize_data_model.sql).

Create an `.env` file at `server/.env` to hold environment variables. This can be based off `server/.env.example`.

For the front-end:

```
cd client

npm run dev
```

For the back-end:

```
cd server

npm run dev
```
