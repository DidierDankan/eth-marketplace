import { useHooks } from '@components/provider/web3';

//this is the useAccount hook we use on navbar to get the account
export const useAccount = () => {
	return useHooks((hooks) => hooks.useAccount)(); // () => {return {
	//     account, isAdmin
	//  }; this is what supposed to return when calling useAccount
};
