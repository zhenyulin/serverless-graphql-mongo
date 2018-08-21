import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserFollowUser = new Schema({
	followerId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: true,
	},
	followeeId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: true,
	},
});

if (process.env.IS_OFFLINE) {
	delete mongoose.connection.models.UserFollowUser;
}

export default mongoose.model('UserFollowUser', UserFollowUser);
