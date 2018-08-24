import { Types } from 'mongoose';

const { ObjectId } = Types;

export default [
	{
		_id: ObjectId('4edd40c86762e0fb12000003'),
		name: 'John Cage',
		email: 'john.cage@test.com',
	},
	{
		_id: ObjectId('4edd40c86762e0fb12000004'),
		name: 'John Lennon',
		email: 'john.lennon@test.com',
	},
	{
		_id: ObjectId('4edd40c86762e0fb12000005'),
		name: 'Miles Davis',
		email: 'miles.davis@test.com',
	},
];
