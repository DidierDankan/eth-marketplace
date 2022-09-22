import { toast } from 'react-toastify';
import { Loader } from '@components/ui/common';

export const notify = (promise) => {
	toast.promise(
		promise,
		{
			pending: {
				render() {
					return (
						<div className="p-6 py-2 flex items-center">
							<p className="ml-2 mb-2">Your transaction is being processed.</p>
						</div>
					);
				},
				icon: (
					<>
						<Loader size="sm" />
					</>
				),
			},
			success: {
				render({ data }) {
					return (
						<div>
							<p className="font-bold">
								Tx: {data.transactionHash.slice(0, 20)}...
							</p>
							<p>Has been succesfuly processed.</p>
							<a
								href={`https://ropsten.etherscan.io/tx/${data.transactionHash}`}
								target="_blank"
								rel="noreferrer"
							>
								<i className="text-indigo-600 underline">See Tx Details</i>
							</a>
						</div>
					);
				},
				// other options
				icon: '👌',
			},
			error: {
				render({ data }) {
					// When the promise reject, data will contains the error
					return <div>{data.message ?? 'Transaction has failed!'}</div>;
				},
				// other options
				icon: '🤯',
			},
		},
		{
			closeButton: true,
			position: toast.POSITION.TOP_CENTER,
		}
	);
};
