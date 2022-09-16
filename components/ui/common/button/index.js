export default function Button({
	children,
	className,
	variant,
	hoverable = true,
	...rest
}) {
	const variants = {
		white: `text-black bg-white`,
		purple: `text-white bg-indigo-600 ${hoverable && 'hover:bg-indigo-700'}`,
		green: `text-white bg-lime-500`,
		lightBlue: 'text-indigo-700 bg-indigo-100',
		red: `text-white bg-red-500 ${hoverable && 'hover:bg-red-600'}`,
	};
	return (
		<button
			{...rest}
			className={`disabled:opacity-50 disabled:cursor-not-allowed xs:px-8 xs:py-3 border rounded-md text-base font-medium ${className} ${variants[variant]}`}
		>
			{children}
		</button>
	);
}
