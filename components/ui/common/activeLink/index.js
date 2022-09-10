import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

export default function ActiveLink({ children, ...props }) {
	const { pathname } = useRouter();
	let className = children.props.className || '';

	console.log('pathname', pathname);
	console.log('PROPS.HREF', props.href);

	if (pathname === props.href) {
		console.log('inside');
		className = `${className} text-yellow-500`;
		console.log('className', className);
	}

	return <Link {...props}>{React.cloneElement(children, { className })}</Link>;
}
