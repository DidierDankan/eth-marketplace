import { useHooks, useWeb3 } from '@components/provider/web3';
import { Router, useRouter } from 'next/router';
import { useEffect } from 'react';

// check if we have any kind of data
const _isEmpty = (data) => {
	return (
		data == null || // with double equal operator we can check if data is null or undefined in the same statement
		data == '' ||
		(Array.isArray(data) && data.length === 0) ||
		(data.constructor === Object && Object.keys(data).length === 0)
	);
};

const enhanceHook = (swrRes) => {
	const { data, error } = swrRes;
	const hasInitialResponse = !!(data || error);
	const isEmpty = hasInitialResponse && _isEmpty(data);
	return {
		...swrRes,
		isEmpty,
		hasInitialResponse: hasInitialResponse,
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

export const useAdmin = ({ redirectTo }) => {
	const { account } = useAccount();

	const router = useRouter();
	useEffect(() => {
		if ((account.hasInitialResponse && !account.isAdmin) || account.isEmpty) {
			router.push(redirectTo);
		}
	}, [account, router, redirectTo]);

	return {
		account,
	};
};

export const useNetwork = () => {
	const swrRes = enhanceHook(useHooks((hooks) => hooks.useNetwork)());
	return {
		network: swrRes,
	};
};

export const useOwnedCourses = (...args) => {
	const resSWR = enhanceHook(
		useHooks((hooks) => hooks.useOwnedCourses)(...args)
	);
	return {
		ownedCourses: resSWR,
	};
};

export const useOwnedCourse = (...args) => {
	const resSWR = enhanceHook(
		useHooks((hooks) => hooks.useOwnedCourse)(...args)
	);
	return {
		ownedCourse: resSWR,
	};
};

export const useManageCourses = (...args) => {
	const resSWR = enhanceHook(
		useHooks((hooks) => hooks.useManageCourses)(...args)
	);
	return {
		manageCourses: resSWR,
	};
};

export const useWalletInfo = () => {
	const { account } = useAccount();
	const { network } = useNetwork();

	const isConnecting =
		!account.hasInitialResponse && !network.hasInitialResponse;

	const hasConnectedWallet = !!(account.data && network.isSupported);

	return {
		account,
		network,
		isConnecting,
		hasConnectedWallet,
	};
};
