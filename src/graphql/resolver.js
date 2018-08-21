import Mongo from '../models';

export default {
	Query: {
		User: (_, { _id }) => Mongo.User.findById(_id),
		Users: () => Mongo.User.find(),
		Item: (_, { _id }) => Mongo.Item.findById(_id),
		Items: () => Mongo.Item.find(),
	},
	User: {
		followees: async ({ _id }) => {
			const userFollows = await Mongo.UserFollowUser.find({
				followerId: _id,
			});
			const followeeIds = userFollows.map(follow => follow.followeeId);
			const followees = await Mongo.User.find({ _id: { $in: followeeIds } });
			return followees;
		},
		followers: async ({ _id }) => {
			const userFollowed = await Mongo.UserFollowUser.find({
				followeeId: _id,
			});
			const followerIds = userFollowed.map(follow => follow.followerId);
			const followers = await Mongo.User.find({ _id: { $in: followerIds } });
			return followers;
		},
		likeItems: async ({ _id }) => {
			const likes = await Mongo.UserLikeItem.find({
				userId: _id,
			});
			const itemIds = likes.map(like => like.itemId);
			const items = await Mongo.Item.find({ _id: { $in: itemIds } });
			return items;
		},
	},
	Item: {
		likedByUsers: async ({ _id }) => {
			const likes = await Mongo.UserLikeItem.find({
				itemId: _id,
			});
			const userIds = likes.map(like => like.userId);
			const users = await Mongo.User.find({ _id: { $in: userIds } });
			return users;
		},
	},
	Mutation: {
		CreateUser: (_, { user }) => Mongo.User.create(user),
		UpdateUser: (_, { _id, user }) => Mongo.User.findByIdAndUpdate(_id, user),
		DeleteUser: (_, { _id }) => Mongo.User.findOneAndDelete(_id),
		CreateItem: (_, { item }) => Mongo.Item.create(item),
		UpdateItem: (_, { _id, item }) => Mongo.Item.findByIdAndUpdate(_id, item),
		DeleteItem: (_, { _id }) => Mongo.Item.findOneAndDelete(_id),
		UserFollowUser: async (_, { followerId, followeeId }) => {
			await Mongo.UserFollowUser.create({
				followerId,
				followeeId,
			});
			const user = await Mongo.User.findById(followerId);
			return user;
		},
		UserUnfollowUser: async (_, { followerId, followeeId }) => {
			await Mongo.UserFollowUser.findOneAndDelete({ followerId, followeeId });
			const user = await Mongo.User.findById(followerId);
			return user;
		},
		UserLikeItem: async (_, { userId, itemId }) => {
			await Mongo.UserLikeItem.create({
				userId,
				itemId,
			});
			const user = await Mongo.User.findById(userId);
			return user;
		},
		UserDisplikeItem: async (_, { userId, itemId }) => {
			await Mongo.UserFollowUser.findOneAndDelete({ userId, itemId });
			const user = await Mongo.User.findById(userId);
			return user;
		},
	},
};
