const links = [
	{
		href: '/marketplace',
		text: 'Buy',
		requireAdmin: false,
	},

	{
		href: '/marketplace/courses/owned',
		text: 'Owned Courses',
		requireAdmin: false,
	},

	{
		href: '/marketplace/courses/manage',
		text: 'Manage Courses',
		requireAdmin: true,
	},
];

export default links;
