import { useHooks } from '@components/provider/web3';

const enhanceHook = (swrRes) => {
	return {
		...swrRes,
		hasInitialResponse: swrRes.data || swrRes.error,
	};
};

//this is the useAccount hook we use on navbar to get the account
export const useAccount = () => {
	const swrRes = enhanceHook(useHooks((hooks) => hooks.useAccount)());
	// () => {return {
	// account: {
	// 		data: data,
	// 		mutate,
	// 		...swrRes,
	// 		isAdmin: (data && adminAddresses[data]) ?? false,
	//	}
	//  }; this is what supposed to return when calling useAccount
	return {
		account: swrRes,
	};
};

export const useNetwork = () => {
	const swrRes = enhanceHook(useHooks((hooks) => hooks.useNetwork)());
	return {
		network: swrRes,
	};
};

export const useOwnedCourses = (...args) => {
	const res = enhanceHook(useHooks((hooks) => hooks.useOwnedCourses)(...args));

	return {
		ownedCourses: res,
	};
};

export const useWalletInfo = () => {
	const { account } = useAccount();
	const { network } = useNetwork();

	const canPurchaseCourse = !!(account.data && network.isSupported);

	return {
		account,
		network,
		canPurchaseCourse,
	};
};
