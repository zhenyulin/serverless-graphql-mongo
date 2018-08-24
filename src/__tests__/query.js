import { graphql } from 'graphql';

import schema from 'graphql/schema';

import * as testDB from './helpers/test-db-setup';

const testCases = cases => {
	Object.keys(cases).forEach(caseName => {
		it(caseName, async () => {
			const query = cases[caseName];
			const result = await graphql(schema, query);
			expect(result).toMatchSnapshot();
		});
	});
};

describe('Query', () => {
	beforeAll(async () => {
		await testDB.connect();
		await testDB.unloadAll();
		await testDB.loadAll();
	});

	afterAll(async () => {
		await testDB.disconnect();
	});

	describe('User', () => {
		testCases({
			'get user by _id': `
				query {
					User(_id: "4edd40c86762e0fb12000003") {
						_id
						name
						followees {
							name
						}
						followers {
							name
						}
						likeItems {
							name
						}
					}
				}
			`,
			'return null if user not found': `
				query {
					User(_id: "4edd40c86762e0fb12000099") {
						_id
						name
					}
				}
			`,
			'throw error if _id is not provided': `
				query {
					User() {
						_id
						name
					}
				}
			`,
			'throw error if _id is not valid mongodb id': `
				query {
					User(_id: "random") {
						_id
						name
					}
				}
			`,
		});
	});

	describe('Users', () => {
		testCases({
			'get all users': `
				query {
					Users {
						_id
						name
						followees {
							name
						}
						followers {
							name
						}
						likeItems {
							name
						}
					}
				}
			`,
		});
	});

	describe('Item', () => {
		testCases({
			'get item by _id': `
				query {
					Item(_id: "4edd40c86762e0fb12000015") {
						_id
						name
						likedByUsers {
							name
						}
					}
				}
			`,
			'return null if item not found': `
				query {
					Item(_id: "4edd40c86762e0fb12000099") {
						_id
						name
					}
				}
			`,
			'throw error if _id is not provided': `
				query {
					Item() {
						_id
						name
					}
				}
			`,
			'throw error if _id is not valid mongodb id': `
				query {
					Item(_id: "random") {
						_id
						name
					}
				}
			`,
		});
	});

	describe('Items', () => {
		testCases({
			'get all items': `
				query {
					Items {
						_id
						name
						likedByUsers {
							name
						}
					}
				}
			`,
		});
	});
});
