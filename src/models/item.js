import mongoose from 'mongoose';

const { Schema } = mongoose;

const Item = new Schema({
	name: String,
});

if (process.env.IS_OFFLINE) {
	delete mongoose.connection.models.Item;
}

export default mongoose.model('Item', Item);