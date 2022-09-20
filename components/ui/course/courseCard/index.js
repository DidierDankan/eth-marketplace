import Image from 'next/image';
import Link from 'next/link';
import { STATE_COLORS } from '@helpers/stateColor';

const CourseCard = ({ course, disabled, Footer, state }) => {
	const stateColor = STATE_COLORS[state];

	return (
		<div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
			<div className="flex h-full">
				<div className="flex-1 h-full next-image-wrapper">
					<Image
						className={`object-cover ${disabled && 'filter grayscale'}`}
						src={course.coverImage}
						layout="responsive"
						width="200"
						height="215"
						alt={course.title}
					/>
				</div>
				<div className="p-8 pb-4 flex-2">
					<div className="flex items-center">
						<div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
							{course.type}
						</div>
						<span
							className={`text-xs text-${stateColor}-800 bg-${stateColor}-200 rounded-full px-2  ml-2`}
						>
							{state}
						</span>
					</div>
					<Link href={`/courses/${course.slug}`}>
						<a className="h-12 block mt-1 text-sm sm:text-lg leading-tight font-medium text-black hover:underline">
							{course.title}
						</a>
					</Link>
					<p className="mt-2 text-sm sm:text-base text-gray-500">
						{course.description.substring(0, 70)}...
					</p>
					{Footer && <Footer />}
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
