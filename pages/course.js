import { BaseLayout } from '@components/layout';
import { Lecture, Keypoint, Hero } from '@components/course';
import { Modal } from '@components/common';

export default function Course() {
	return (
		<>
			<div className="py-4">
				<Hero />
			</div>
			<Keypoint />
			<Lecture />
			<Modal />
		</>
	);
}

Course.Layout = BaseLayout;
