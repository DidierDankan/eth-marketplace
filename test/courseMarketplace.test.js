const CourseMarketplace = artifacts.require('Marketplace');
const { catchRevert } = require('./utils/exceptions');

const getBalance = async (address) => web3.eth.getBalance(address);
const toBN = (value) => web3.utils.toBN(value);

const getGas = async (result) => {
	//to get the price of gas, result.tx is the hash of the transaction
	const TX = await web3.eth.getTransaction(result.tx);
	//gas used on transaction
	const gasUsed = toBN(result.receipt.gasUsed);
	//actual gas price
	const gasPrice = toBN(TX.gasPrice);
	// gas used * gas price
	const gas = gasUsed.mul(gasPrice);

	return gas;
};

contract('CourseMarketplace', (accounts) => {
	const courseId = '0x00000000000000000000000000003130';
	const proof =
		'0x0000000000000000000000000000313000000000000000000000000000003130';

	const courseId2 = '0x00000000000000000000000000002130';
	const proof2 =
		'0x0000000000000000000000000000213000000000000000000000000000002130';

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

	describe('DEACTIVATE COURSE', () => {
		let courseHash2 = null;
		const index = 1;
		before(async () => {
			await _contract.purchaseCourse(courseId2, proof2, {
				from: buyer,
				value: price,
			});
			courseHash2 = await _contract.getCourseHashAtIndex(index);
		});

		it('should not be able to deactivate the course by not contract owner', async () => {
			await catchRevert(
				_contract.deactivateCourse(courseHash2, { from: buyer })
			);
		});

		it('should have status of deactivated and price zero(0)', async () => {
			const beforeTxBuyerBalance = await getBalance(buyer);
			const beforeTxContractBalance = await getBalance(_contract.address);
			const beforeTxOwnerBalance = await getBalance(contractOwner);

			const result = await _contract.deactivateCourse(courseHash2, {
				from: contractOwner,
			});

			const afterTxBuyerBalance = await getBalance(buyer);
			const afterTxContractBalance = await getBalance(_contract.address);
			const afterTxOwnerBalance = await getBalance(contractOwner);

			const gas = await getGas(result);

			const course = await _contract.getCourseByHash(courseHash2);
			const expectedState = 2;
			const expectedPrice = 0;

			assert.equal(
				course.state,
				expectedState,
				'Course state is not deactivated!'
			);
			assert.equal(course.price, expectedPrice, 'Course price is not zero(0)!');
			assert.equal(
				toBN(beforeTxOwnerBalance).sub(gas).toString(),
				afterTxOwnerBalance,
				'Owner balance is not correct'
			);
			assert.equal(
				toBN(beforeTxBuyerBalance).add(toBN(price)).toString(),
				afterTxBuyerBalance,
				'Buyer balance is not correct'
			);

			assert.equal(
				toBN(beforeTxContractBalance).sub(toBN(price)).toString(),
				afterTxContractBalance,
				'Contract balance is not correct'
			);
		});

		it('should not be able to ACTIVATE a deactivated course', async () => {
			await catchRevert(
				_contract.deactivateCourse(courseHash2, { from: contractOwner })
			);
		});
	});

	describe('RE-PURCHASE COURSE', () => {
		let courseHash2 = null;
		const index = 1;
		before(async () => {
			courseHash2 = await _contract.getCourseHashAtIndex(index);
		});

		it('should NOT re-purchased when the course doesnt exist', async () => {
			const notExistingHash =
				'0x5348fb94a5f97f19ced7d9bcde544e78d4738923635adaf277e6d1421945e580';
			await catchRevert(
				_contract.repurchasedCourse(notExistingHash, { from: buyer })
			);
		});

		it('should NOT re-purchased with NOT course owner', async () => {
			const notOwnerAddress = accounts[3];
			await catchRevert(
				_contract.repurchasedCourse(courseHash2, { from: notOwnerAddress })
			);
		});

		it('should be able to re-purchased with the original buyer', async () => {
			const beforeTxBuyerBalance = await getBalance(buyer);
			const beforeTxContractBalance = await getBalance(_contract.address);
			const result = await _contract.repurchasedCourse(courseHash2, {
				from: buyer,
				value: price,
			});

			const afterTxBuyerBalance = await getBalance(buyer);
			const afterTxContractBalance = await getBalance(_contract.address);

			const course = await _contract.getCourseByHash(courseHash2);
			const expectedState = 0;
			const gas = await getGas(result);

			assert.equal(
				course.state,
				expectedState,
				'Course state is not on purchased state'
			);
			assert.equal(
				course.price,
				price,
				`course price is not equal to ${price}`
			);
			assert.equal(
				toBN(beforeTxBuyerBalance).sub(toBN(price)).sub(gas).toString(),
				afterTxBuyerBalance,
				'client balance is not correct!'
			);

			assert.equal(
				toBN(beforeTxContractBalance).add(toBN(price)).toString(),
				afterTxContractBalance,
				'contract balance is not correct!'
			);
		});

		it('should NOT be able to re-purchase purchased course', async () => {
			await catchRevert(
				_contract.repurchasedCourse(courseHash2, { from: buyer })
			);
		});
	});
});
