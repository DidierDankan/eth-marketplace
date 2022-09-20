const SIZE = {
	sm: 'p-2 text-sm xs:px-4',
	md: 'p-3 text-base xs:px-8',
	lg: 'p-3 text-lg xs:px-8',
};

export default function Button({
	children,
	className,
	size = 'md',
	variant,
	hoverable = true,
	...rest
}) {
	const sizeClass = SIZE[size];
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
			className={`disabled:opacity-50 disabled:cursor-not-allowed ${sizeClass} border rounded-md font-medium ${className} ${variants[variant]}`}
		>
			{children}
		</button>
	);
}
