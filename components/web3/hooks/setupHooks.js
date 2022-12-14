import { handler as createAccountHook } from '@components/handlers/web3/accountHandler';
import { handler as createNetworkHook } from '@components/handlers/web3/networkHandler';
import { handler as createOwnedCoursesHook } from '@components/handlers/web3/ownedCoursesHandler';
import { handler as createOwnedCourseHook } from '@components/handlers/web3/ownedCourseHandler';
import { handler as createManageCoursesHook } from '@components/handlers/web3/manageCoursesHandler';

//use to return all hooks, so when we call {getHooks} from useWeb3() in provider/web3. this is what will be returned
export const setupHooks = ({ web3, provider, contract }) => {
	return {
		useAccount: createAccountHook(web3, provider),
		useNetwork: createNetworkHook(web3, provider),
		useOwnedCourses: createOwnedCoursesHook(web3, contract),
		useOwnedCourse: createOwnedCourseHook(web3, contract),
		useManageCourses: createManageCoursesHook(web3, contract),
	};
};
