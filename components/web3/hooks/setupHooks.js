import { handler as createAccountHook } from '@components/handlers/web3/accountHandler';
import { handler as createNetworkHook } from '@components/handlers/web3/networkHandler';

//use to return all hooks, so when we call {getHooks} from useWeb3() in provider/web3. this is what will be returned
export const setupHooks = (web3) => {
	return {
		useAccount: createAccountHook(web3),
		useNetwork: createNetworkHook(web3),
	};
};
