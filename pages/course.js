import Hero from '@components/course/Hero';
import Keypoint from '@components/course/Keypoint';
import Lecture from '@components/course/Lecture';
import Modal from '@components/course/Modal';

export default function Course() {
	return (
		<div className="relative max-w-7xl mx-auto px-4">
			<Hero />
			<Keypoint />
			<Lecture />

			<Modal />
		</div>
	);
}
