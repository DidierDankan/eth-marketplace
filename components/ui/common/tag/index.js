export default function Tag({ variant = 'activated', children }) {
	const variants = {
		pending: `text-orange-800 bg-orange-200`,
		activated: `text-green-800 bg-green-200`,
		deactivated: `text-red-800 bg-red-200`,
	};

	return (
		<span
			className={`text-xs ${variants[variant]} ${
				variant === 'pending' && 'blink'
			} rounded-full px-2 ml-2`}
		>
			{children}
		</span>
	);
}
