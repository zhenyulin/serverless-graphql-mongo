import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserLikeItem = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	itemId: {
		type: Schema.Types.ObjectId,
		ref: 'Item',
	},
});

if (process.env.IS_OFFLINE) {
	delete mongoose.connection.models.UserLikeItem;
}

export default mongoose.model('UserLikeItem', UserLikeItem);
