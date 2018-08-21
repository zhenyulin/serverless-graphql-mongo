import { schemaComposer } from 'graphql-compose';

import { UserTC, ItemTC } from './type';

UserTC.addRelation('followers', {
	resolver: () => UserTC.getResolver('findByIds'),
	prepareArgs: {
		_ids: user => user.followers,
	},
	projection: { followers: 1 },
});

UserTC.addRelation('follows', {
	resolver: () => UserTC.getResolver('findByIds'),
	prepareArgs: {
		_ids: user => user.follows,
	},
	projection: { follows: 1 },
});

UserTC.addRelation('likes', {
	resolver: () => ItemTC.getResolver('findByIds'),
	prepareArgs: {
		_ids: user => user.likes,
	},
	projection: { likes: 1 },
});

ItemTC.addRelation('likedBy', {
	resolver: () => UserTC.getResolver('findByIds'),
	prepareArgs: {
		_ids: item => item.likedBy,
	},
	projection: { likedBy: 1 },
});

schemaComposer.Query.addFields({
	userById: UserTC.getResolver('findById'),
	userByIds: UserTC.getResolver('findByIds'),
	userOne: UserTC.getResolver('findOne'),
	userMany: UserTC.getResolver('findMany'),
	userCount: UserTC.getResolver('count'),
	itemById: ItemTC.getResolver('findById'),
	itemByIds: ItemTC.getResolver('findByIds'),
	itemOne: ItemTC.getResolver('findOne'),
	itemMany: ItemTC.getResolver('findMany'),
	itemCount: ItemTC.getResolver('count'),
});

schemaComposer.Mutation.addFields({
	userCreateOne: UserTC.getResolver('createOne'),
	userCreateMany: UserTC.getResolver('createMany'),
	userUpdateById: UserTC.getResolver('updateById'),
	userUpdateOne: UserTC.getResolver('updateOne'),
	userUpdateMany: UserTC.getResolver('updateMany'),
	userRemoveById: UserTC.getResolver('removeById'),
	userRemoveOne: UserTC.getResolver('removeOne'),
	userRemoveMany: UserTC.getResolver('removeMany'),
	itemCreateOne: ItemTC.getResolver('createOne'),
	itemCreateMany: ItemTC.getResolver('createMany'),
	itemUpdateById: ItemTC.getResolver('updateById'),
	itemUpdateOne: ItemTC.getResolver('updateOne'),
	itemUpdateMany: ItemTC.getResolver('updateMany'),
	itemRemoveById: ItemTC.getResolver('removeById'),
	itemRemoveOne: ItemTC.getResolver('removeOne'),
	itemRemoveMany: ItemTC.getResolver('removeMany'),
});

export default schemaComposer;
