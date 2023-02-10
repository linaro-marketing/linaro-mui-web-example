import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
interface LinkedProps{
	to: string,
	textLink?: boolean,
	options?: {},
	newTab?: boolean,
	target?:string,
	href:string,
	children?:React.ReactNode
}
/**
 * Custom implementation of the Next.js Link component.
 *
 * @param {object} props
 * @component
 */
const Linked:React.FC<LinkedProps> = React.forwardRef((props, ref) => {
	const { to, textLink, options,href, target = null, ...rest } = props;
	return (
		<Link
			href={{
				pathname: to,
				...options,
			}}
		>
			<Box
				component="a"
				{...rest}
				sx={[
					{ color: 'inherit' },
					textLink && {
						color: (theme) => theme.palette.primary.main,
					},
				]}
				ref={ref}
				target={to.startsWith('/') && !target ? '_self' : target ? target : '_blank'}
				href={to}
			/>
		</Link>
	);
});
Linked.displayName = 'Linked';
export default Linked;
