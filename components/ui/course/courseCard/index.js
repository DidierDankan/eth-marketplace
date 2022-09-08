import Image from 'next/image';
import Link from 'next/link';

const CourseCard = ({ type, title, description, image, slug }) => {
	return (
		<div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
			<div className="flex h-full">
				<div className="flex h-full">
					<Image
						width="200"
						height="215"
						layout="fixed"
						className="object-cover "
						src={image}
						alt={title}
					/>
				</div>
				<div className="p-8">
					<div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
						{type}
					</div>
					<Link passHref href={`/courses/${slug}`}>
						<a className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
							{title}
						</a>
					</Link>
					<p className="mt-2 text-gray-500">{description}</p>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
