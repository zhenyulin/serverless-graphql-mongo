import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';

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

UserFollowUser.plugin(findOrCreate);

/* istanbul ignore next */
if (process.env.IS_OFFLINE) {
	delete mongoose.connection.models.UserFollowUser;
}

export default mongoose.model('UserFollowUser', UserFollowUser);
