import { CourseFilter, OwnedCourseCard } from '@components/ui/course';
import { BaseLayout } from '@components/ui/layout';
import { WalletHeader } from '@components/ui/marketplace';
import { Button } from '@components/ui/common';

export default function OwnedCourses() {
	return (
		<div>
			<WalletHeader />
			<section className="grid grid-cols-1">
				<OwnedCourseCard>
					{/* <Message>
						My custom message!
					</Message> */}
					<Button variant="purple">Watch the course</Button>
				</OwnedCourseCard>
			</section>
		</div>
	);
}

OwnedCourses.Layout = BaseLayout;
