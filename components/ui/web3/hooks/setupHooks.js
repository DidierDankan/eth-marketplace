import { handler as createUseAccount } from './useAccount';

//use to return all hooks, so when we call hooks.useAccount() this is what will be returned
export const setupHooks = (web3) => {
	return {
		useAccount: createUseAccount(web3), // () => {return {
		//     account: web3 ? 'Test Account' : 'null',
		//  }; this is what supposed to return when calling useAccount
	};
};
