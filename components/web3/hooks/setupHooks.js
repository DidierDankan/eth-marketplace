import { handler as createUseAccount } from '@components/hooks/web3/accountHandler';

//use to return all hooks, so when we call useWeb3. this is what will be returned
export const setupHooks = (web3) => {
	return {
		useAccount: createUseAccount(web3),
	};
};
