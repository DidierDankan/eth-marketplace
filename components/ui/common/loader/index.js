const SIZES = {
	sm: 'w-6 h-6',
	md: 'w-8 h-8',
	lg: 'w-16 h-16',
};

export default function Loader({ size = 'md' }) {
	return (
		<div className="flex justify-center items-center">
			<div className={`sk-fading-circle ${SIZES[size]}`}>
				{Array.from({ length: 12 }).map((_, i) => (
					<div key={`dot-${i}`} className={`sk-circle${i + 1} sk-circle`} />
				))}
			</div>
		</div>
	);
}
