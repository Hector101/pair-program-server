import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

// import graphql schema
import schema from './schema';

// import mongoose models
import { Session } from 'models';

// initialize loading an environment variable
dotenv.config();

const app = express();

mongoose.Promise = require('bluebird');
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;

// database connection event handlers
db.once('open', () => {
  console.log('Successfully connected to the database, Have Fun!!!');
});
db.on('error', () => {
  console.log('Couldn\'t connect to the database');
});

// app middlewares
app.use(cors());
app.use('/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      Session
    }
  })
);
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.get('/', (req, res) => {
  return res.json('Welcome home');
});

app.get('*', (req, res) => {
  res.send('Oops! Seems like you are lost.');
});

export default app;
