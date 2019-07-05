import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { mergedSchema } from '../components/graphql/mergedSchema';
import middleware from './middleware';
import errorHandlers from './middleware/errorHandlers';
import { applyMiddleware } from './utils';
import express = require('express');
import bodyParser = require('body-parser');

export const app = express();
applyMiddleware(middleware, app);

app.use(express.json());

app.use(
	'/graphiql', (req, res, next) => {
		return graphiqlExpress({
			endpointURL: '/graphql',
			
		})
	}
);

// TODO: look into merging schemas

app.use('/', bodyParser.json(), (req, res, next) => graphqlExpress({ schema: mergedSchema, context: req})(req, res, next));
applyMiddleware(errorHandlers, app);
