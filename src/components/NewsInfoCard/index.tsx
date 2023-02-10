import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { Typography } from '@mui/material';
import DateItem from '../Date/index';
 import Linked from '../Linked';
import Events from '../../pages/events';
import { prependPath } from '../../lib/lang';


interface NewsInfoCardProps{
	id:string,
	to:string,
    title: string,
	coverImage: string,
	date: string,
	tags: [],
	slug: string,
	category?: string,
	description:string,
	
}

const NewsInfoCard:React.FC<NewsInfoCardProps>=(props)=>{
    const { id,title,to, coverImage, date, slug,tags ,category, description} = props;
return(
	<Card
	       key={id}
			sx={{
				backgroundColor: 'pink',
				border:'2px solid red' ,
				height: '100%',
				width: '300px',
				position: 'relative',
				overflow: 'hidden',
			}}
			//  component={Linked}
			//  to={prependPath(`/events/${to}`)}
			//  href={prependPath(`/events/${to}`)}
		>
            <Box
				sx={{
					position: 'absolute',
					height: '100%',
					width: '100%',
				}}
			>
				<Image alt={`${title} image`} src={coverImage} layout="fill" objectFit="cover" />
			</Box>
			<CardActionArea
					sx={{
						position: 'relative',
						height: '100%',
						width: '100%',
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						transition: 'all 0.3s ease',
						backgroundColor: '#00000067',
						color: 'white',
						'&:hover': {
							backgroundColor: '#00000067',
							backdropFilter: 'blur(4px)',
						},
						padding: (theme) => theme.spacing(1),
					}}
			>
				<Box>
					<Typography
						component="span"
						variant="h6"
						sx={{
							width: '100%',
							position: 'relative',
							zIndex: 1,
							fontWeight: 'bold',
						}}
					>
						{title}
					</Typography>
					<Box
						sx={{
							mt: 2,
							wdith: '100%',
							fontWeight: 'bold',
						}}
					>
						<DateItem dateString={date} />
					</Box>
				</Box>
				
				
			
				
			</CardActionArea>
        </Card>
)
}
export default NewsInfoCard;