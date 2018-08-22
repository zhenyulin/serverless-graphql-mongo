import mongoose from 'mongoose';

import DB from 'models';

import * as mock from '__fixtures__';

export const connect = () =>
	mongoose.connect(
		process.env.MONGODB_URI_TEST,
		{
			useNewUrlParser: true,
		},
	);

export const disconnect = () => mongoose.disconnect();

export const loadUsers = () => DB.User.create(mock.USERS);
export const loadItems = () => DB.Item.create(mock.ITEMS);
export const loadUserFollowUsers = () =>
	DB.UserFollowUser.create(mock.USER_FOLLOW_USERS);
export const loadUserLikeItems = () =>
	DB.UserLikeItem.create(mock.USER_LIKE_ITEMS);

export const unloadUsers = () => DB.User.remove();
export const unloadItems = () => DB.Item.remove();
export const unloadUserFollowUsers = () => DB.UserFollowUser.remove();
export const unloadUserLikeItems = () => DB.UserFollowUser.remove();

export const loadAll = () =>
	Promise.all([
		loadUsers(),
		loadItems(),
		loadUserFollowUsers(),
		loadUserLikeItems(),
	]);

export const unloadAll = () =>
	Promise.all([
		unloadUsers(),
		unloadItems(),
		unloadUserFollowUsers(),
		unloadUserLikeItems(),
	]);
