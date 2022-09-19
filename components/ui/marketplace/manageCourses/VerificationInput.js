import { Button } from '@components/ui/common';
import { useState } from 'react';

const VerificationInput = ({ onVerify }) => {
	const [email, setEmail] = useState('');

	return (
		<div className="flex mr-2 relative rounded-md">
			<input
				value={email}
				onChange={({ target: { value } }) => setEmail(value)}
				type="text"
				name="account"
				id="account"
				className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
				placeholder="0x2341ab..."
			/>
			<Button
				variant="purple"
				onClick={() => {
					onVerify(email);
				}}
			>
				Verify
			</Button>
		</div>
	);
};

export default VerificationInput;
