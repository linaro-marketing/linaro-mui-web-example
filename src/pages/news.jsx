import React from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import newsImg from '../../public/images/news_sm.jpg';
import { Navbar } from '@linaro-marketing/linaro-mui-web/build';
import { getSortedPostsData } from "../lib/news";
// import Link from "next/link";
import NewsInfoCard from '../components/NewsInfoCard/index';
import { Container, width } from '@mui/system';
import Image from 'next/image';



export async function getStaticProps() {
    const allPostsData =await getSortedPostsData();
    console.log('data is :',allPostsData);
    return {
      props: {
        allPostsData,
      },
    };
  }

function News({allPostsData}){
    return(
        <div>
            <Navbar logoLink={'/'} pages={[]}/> 
          
            <Box
                content="News"
                sx={() => {
                    return {
                      position: 'relative',
                      height: 350,
                      width: '100%',
                    };
                }}
            >
					<Image
           layout="fill" 
           objectFit="cover"

						src={newsImg}
						alt={'News-hero-image'}
					/>
          <div style={{
                          position: 'absolute', 
                          color: 'white', 
                          top: 60, 
                          fontWeight: 700,
                          fontFamily:'inherit',
                          fontSize:'30px',
                          left: '50%', 
                          transform: 'translateX(-50%)'
                        }}><h1>News</h1></div>					
            </Box>
            <Box>
            <TextField sx={{mt:2 , width:"80%",ml:15}} label="Search" id="Search" />
            </Box>
                {allPostsData.map(({ id,to, date, title,description,tags,image }, index) => (
                  	<Container
                    key={id}
                    maxWidth={'lg'}
                    sx={{
                      padding: (theme) => theme.spacing(1, 1),
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                   	<Grid
                     container
                     sx={{
                       display: 'flex',
                       flexDirection: 'row',
                      //  justifyContent: 'flex-end',
                       alignItems: 'center',
                       width: '100%',
                     }}
                   >
                      <NewsInfoCard id={id} to={to}  date={date} title={title} description={description} tags={tags} coverImage={image} />
                     </Grid>
                     </Container>
                ))}
              
      </div>
    )
}
export default News;
