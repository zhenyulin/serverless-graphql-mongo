import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';

const { Schema } = mongoose;

const UserLikeItem = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: true,
	},
	itemId: {
		type: Schema.Types.ObjectId,
		ref: 'Item',
		index: true,
	},
});

UserLikeItem.plugin(findOrCreate);

if (process.env.IS_OFFLINE) {
	delete mongoose.connection.models.UserLikeItem;
}

export default mongoose.model('UserLikeItem', UserLikeItem);
