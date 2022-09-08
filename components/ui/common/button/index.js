export default function Button({
	children,
	className = 'text-white bg-indigo-600 hover:bg-indigo-700',
	...rest
}) {
	return (
		<button
			{...rest}
			className={`disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 border text-base rounded-lg ${className}`}
		>
			{children}
		</button>
	);
}
