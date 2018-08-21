import mongoose from 'mongoose';

const { Schema } = mongoose;

const User = new Schema({
	name: String,
	email: {
		type: String,
		required: true,
	},
	follows: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	followers: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	likes: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Item',
		},
	],
});

if (process.env.IS_OFFLINE) {
	delete mongoose.connection.models.User;
}

export default mongoose.model('User', User);
