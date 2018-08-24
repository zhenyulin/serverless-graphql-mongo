import { graphql } from 'graphql';

import schema from 'graphql/schema';
import Mongo from 'models';

import * as testDB from './helpers/test-db-setup';

const testQuery = async query => {
	const result = await graphql(schema, query);
	expect(result).toMatchSnapshot();
};

describe('Mutation', () => {
	beforeAll(async () => {
		await testDB.connect();
	});

	afterAll(async () => {
		await testDB.disconnect();
	});

	beforeEach(async () => {
		await testDB.unloadAll();
		await testDB.loadAll();
	});

	describe('CreateUser', () => {
		it('return the created user', async () => {
			const initState = await Mongo.User.find({
				email: 'jack.daniel@test.com',
			});
			expect(initState).toHaveLength(0);
			await testQuery(`
				mutation {
					CreateUser(user: { name: "Jack Daniel", email: "jack.daniel@test.com" }) {
						name
					}
				}
			`);
			const result = await Mongo.User.find({ email: 'jack.daniel@test.com' });
			expect(result).toHaveLength(1);
		});

		it('throws error if email already existed', async () => {
			await testQuery(`
				mutation {
					CreateUser(user: { name: "Jack Daniel", email: "john.cage@test.com" }) {
						name
						email
					}
				}
			`);
		});

		it('throws error if email is missing', async () => {
			await testQuery(`
				mutation {
					CreateUser(user: { name: "Jack Daniel" }) {
						name
						email
					}
				}
			`);
		});
	});

	describe('UpdateUser', () => {
		it('return the updated user', async () => {
			await testQuery(`
				mutation {
					UpdateUser(_id: "4edd40c86762e0fb12000004", user: { name: "John Lemon" }){
						_id
						name
					}
				}
			`);
			const result = await Mongo.User.findById('4edd40c86762e0fb12000004');
			expect(result.name).toBe('John Lemon');
		});
	});

	describe('DeleteUser', () => {
		it('return the deleted user', async () => {
			await testQuery(`
				mutation {
					DeleteUser(_id: "4edd40c86762e0fb12000004"){
						_id
						name
					}
				}
			`);
			const result = await Mongo.User.findById('4edd40c86762e0fb12000004');
			expect(result).toBe(null);
		});
	});

	describe('CreateItem', () => {
		it('return the created item', async () => {
			await testQuery(`
				mutation {
					CreateItem(item: { name: "2046" }){
						name
					}
				}
			`);
			const result = await Mongo.Item.find({ name: '2046' });
			expect(result).toHaveLength(1);
		});

		it('throw error if name is missing', async () => {
			await testQuery(`
				mutation {
					CreateItem(item: {}){
						name
					}
				}
			`);
		});
	});

	describe('UpdateItem', () => {
		it('return the updated item', async () => {
			await testQuery(`
				mutation {
					UpdateItem(_id: "4edd40c86762e0fb12000013", item: { name: "Working Class Hero" }){
						_id
						name
					}
				}
			`);
			const result = await Mongo.Item.findById('4edd40c86762e0fb12000013');
			expect(result.name).toBe('Working Class Hero');
		});
	});

	describe('DeleteItem', () => {
		it('return the deleted item', async () => {
			await testQuery(`
				mutation {
					DeleteItem(_id: "4edd40c86762e0fb12000013"){
						_id
						name
					}
				}
			`);
			const result = await Mongo.Item.findById('4edd40c86762e0fb12000013');
			expect(result).toBe(null);
		});
	});

	describe('UserFollowUser', () => {
		it('return the updated follower', async () => {
			await testQuery(`
				mutation {
					UserFollowUser(followerId: "4edd40c86762e0fb12000005", followeeId: "4edd40c86762e0fb12000004"){
						_id
						name
						followees {
							name
						}
					}
				}
			`);
		});

		it('will not create duplicated follow connections', async () => {
			const query = `
				mutation {
					UserFollowUser(followerId: "4edd40c86762e0fb12000005", followeeId: "4edd40c86762e0fb12000004"){
						_id
						name
						followees {
							name
						}
					}
				}
			`;
			await graphql(schema, query);
			await graphql(schema, query);
			const connections = await Mongo.UserFollowUser.find({
				followerId: '4edd40c86762e0fb12000005',
				followeeId: '4edd40c86762e0fb12000004',
			});
			expect(connections).toHaveLength(1);
		});
	});

	describe('UserUnfollowUser', () => {
		it('return the updated follower', async () => {
			await testQuery(`
				mutation {
					UserUnfollowUser(followerId: "4edd40c86762e0fb12000004", followeeId: "4edd40c86762e0fb12000003"){
						_id
						name
						followees {
							name
						}
					}
				}
			`);
			const connections = await Mongo.UserFollowUser.find({
				followerId: '4edd40c86762e0fb12000004',
				followeeId: '4edd40c86762e0fb12000003',
			});
			expect(connections).toHaveLength(0);
		});
	});

	describe('UserLikeItem', () => {
		it('return the updated user', async () => {
			await testQuery(`
				mutation {
					UserLikeItem(userId: "4edd40c86762e0fb12000005", itemId: "4edd40c86762e0fb12000013"){
						_id
						name
						likeItems {
							name
						}
					}
				}
			`);
		});

		it('will not create duplicated like connections', async () => {
			const query = `
				mutation {
					UserLikeItem(userId: "4edd40c86762e0fb12000005", itemId: "4edd40c86762e0fb12000013"){
						_id
						name
						likeItems {
							name
						}
					}
				}
			`;
			await graphql(schema, query);
			await graphql(schema, query);
			const connections = await Mongo.UserLikeItem.find({
				userId: '4edd40c86762e0fb12000005',
				itemId: '4edd40c86762e0fb12000013',
			});
			expect(connections).toHaveLength(1);
		});
	});

	describe('UserDislikeItem', () => {
		it('return the updated user', async () => {
			const initialState = await Mongo.UserLikeItem.find({
				userId: '4edd40c86762e0fb12000004',
				itemId: '4edd40c86762e0fb12000014',
			});
			expect(initialState).toHaveLength(1);
			await testQuery(`
				mutation {
					UserDislikeItem(userId: "4edd40c86762e0fb12000004", itemId: "4edd40c86762e0fb12000014"){
						_id
						name
						likeItems {
							name
						}
					}
				}
			`);
			const connections = await Mongo.UserLikeItem.find({
				userId: '4edd40c86762e0fb12000004',
				itemId: '4edd40c86762e0fb12000014',
			});
			expect(connections).toHaveLength(0);
		});
	});
});
