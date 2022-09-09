import { useHooks } from '@components/provider/web3';

//this is the useAccount hook we use on navbar to get the account
export const useTest = () => {
	return useHooks((hooks) => hooks.useTest)(); // () => {return {
	//     account, isAdmin
	//  }; this is what supposed to return when calling useAccount
};
