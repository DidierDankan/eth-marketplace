export default function Button({ children, className, variant, ...rest }) {
	const variants = {
		purple: 'text-white bg-indigo-600 hover:bg-indigo-700',
		green: 'text-white bg-lime-500',
		lightBlue: 'text-indigo-700 bg-indigo-100',
		red: 'text-red-700 bg-red-100',
	};
	return (
		<button
			{...rest}
			className={`disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 border text-base rounded-lg ${className} ${variants[variant]}`}
		>
			{children}
		</button>
	);
}
