import { Footer, Navbar } from '@components/ui/common';

const BaseLayout = ({ children }) => {
	return (
		<>
			<div className="max-w-7xl mx-auto px-4">
				<Navbar />
				<div className="fit">{children}</div>
			</div>
			<Footer />
		</>
	);
};

export default BaseLayout;
