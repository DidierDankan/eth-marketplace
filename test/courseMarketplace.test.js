const CourseMarketplace = artifacts.require('Marketplace');
const { catchRevert } = require('./utils/exceptions');

contract('CourseMarketplace', (accounts) => {
	const courseId = '0x00000000000000000000000000003130';
	const proof =
		'0x0000000000000000000000000000313000000000000000000000000000003130';
	const price = '1000000000';

	let _contract = null;
	let contractOwner = null;
	let buyer = null;
	let courseHash = null;

	before(async () => {
		_contract = await CourseMarketplace.deployed();

		contractOwner = accounts[0];
		buyer = accounts[1];
	});

	describe('PURCHASE OF NEW COURSE', () => {
		before(async () => {
			await _contract.purchaseCourse(courseId, proof, {
				from: buyer,
				value: price,
			});
		});

		it('should not allow to repurchase the owned course', async () => {
			await catchRevert(
				_contract.purchaseCourse(courseId, proof, {
					from: buyer,
					value: price,
				})
			);
		});

		it('can get the purchased course hash by index', async () => {
			const index = 0;
			courseHash = await _contract.getCourseHashAtIndex(index);

			const expectedHash = web3.utils.soliditySha3(
				{ type: 'bytes16', value: courseId },
				{ type: 'address', value: buyer }
			);

			assert.equal(
				courseHash,
				expectedHash,
				'Course hash is not matching with expected hash'
			);
		});

		it('should match the data of the course purchased by buyer ', async () => {
			const expectedIndex = 0;
			const expectedState = 0;

			const course = await _contract.getCourseByHash(courseHash);

			assert.equal(
				course.id,
				expectedIndex,
				`course index should be ${expectedIndex}`
			);
			assert.equal(course.price, price, `course price should be ${price}`);
			assert.equal(course.proof, proof, `course proof should be ${proof}`);
			assert.equal(course.owner, buyer, `course buyer should be ${buyer}`);
			assert.equal(
				course.state,
				expectedState,
				`course state should be ${expectedState}`
			);
		});
	});

	describe('ACTIVATE THE PURCHASE COURSE', () => {
		it('should NOT be able to activate course by NOT contract owner', async () => {
			await catchRevert(_contract.activateCourse(courseHash, { from: buyer }));
		});

		it('should have activated status', async () => {
			await _contract.activateCourse(courseHash, { from: contractOwner });
			const course = await _contract.getCourseByHash(courseHash);
			const expectedState = 1;

			assert.equal(
				course.state,
				expectedState,
				'course should have activated state'
			);
		});
	});

	describe('TRANSFER OWNERSHIP', () => {
		let currentOwner = null;

		before(async () => {
			currentOwner = await _contract.getContractOwner();
		});

		it('getContractOwner should return deployer address', () => {
			assert.equal(
				contractOwner,
				currentOwner,
				'contract owner is not matching the one from getContractOwner function'
			);
		});

		it('should not transfer ownership when contract owner is not the one sending TX', async () => {
			await catchRevert(
				_contract.transferOwnership(accounts[3], { from: accounts[4] })
			);
		});

		it('should be able to transfer account when is contract owner sending TX', async () => {
			await _contract.transferOwnership(accounts[2], { from: contractOwner });
			const newOwner = await _contract.getContractOwner();
			assert(newOwner, accounts[2], 'contract owner is not second account');
		});

		it('should transfer ownership back to initial contract owner', async () => {
			await _contract.transferOwnership(contractOwner, { from: accounts[2] });
			const newOwner = await _contract.getContractOwner();
			assert(
				newOwner,
				contractOwner,
				'contract owner is not initial contract owner'
			);
		});
	});
});
