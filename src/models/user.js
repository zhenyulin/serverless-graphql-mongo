import mongoose from 'mongoose';

const { Schema } = mongoose;

const User = new Schema({
	name: String,
	email: {
		type: String,
		required: true,
	},
});

if (process.env.IS_OFFLINE) {
	delete mongoose.connection.models.User;
}

export default mongoose.model('User', User);
