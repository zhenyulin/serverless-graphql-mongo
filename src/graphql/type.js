export default `
	type User {
		_id: ID!
		name: String
		email: String!
		followees: [User]
		followers: [User]
		likeItems: [Item]
	}

	input UserInput {
		name: String
		email: String
	}

	type Item {
		_id: ID!
		name: String!
		likedByUsers: [User]
	}

	input ItemInput {
		name: String
	}

	type Query {
		User(_id: ID!): User
		Users: [User]
		Item(_id: ID!): Item
		Items: [Item]
	}

	type Mutation {
		CreateUser(user: UserInput): User
		UpdateUser(_id: ID!, user: UserInput): User
		DeleteUser(_id: ID!): User
		CreateItem(item: ItemInput): Item
		UpdateItem(_id: ID!, item: ItemInput): Item
		DeleteItem(_id: ID!): Item
		UserFollowUser(followerId: ID!, followeeId: ID!): User
		UserUnfollowUser(followerId: ID!, followeeId: ID!): User
		UserLikeItem(userId: ID!, itemId: ID!): User
		UserDisplikeItem(userId: ID!, itemId: ID!): User
	}
`;
