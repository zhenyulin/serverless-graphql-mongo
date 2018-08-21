import { composeWithMongoose } from 'graphql-compose-mongoose/node8';

import User from '../models/user';
import Item from '../models/item';

export const UserTC = composeWithMongoose(User);
export const ItemTC = composeWithMongoose(Item);
