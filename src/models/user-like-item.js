import mongoose from 'mongoose';

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

if (process.env.IS_OFFLINE) {
	delete mongoose.connection.models.UserLikeItem;
}

export default mongoose.model('UserLikeItem', UserLikeItem);
