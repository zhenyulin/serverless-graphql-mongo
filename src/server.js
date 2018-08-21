import { ApolloServer } from 'apollo-server-lambda';
import mongoose from 'mongoose';

import schema from './graphql/schema';

mongoose.connect(process.env.MONGODB_URI);

const server = new ApolloServer({
	schema,
	tracing: true,
	playground: {
		settings: {
			'editor.cursorShape': 'line',
		},
	},
});

const handler = server.createHandler();

export default handler;
