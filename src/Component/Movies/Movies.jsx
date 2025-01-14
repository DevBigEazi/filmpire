import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectGenre } from '../../features/currentGenres';
import { useGetMoviesQuery } from '../Services/TMDB';
import { Movielist } from '..';

const Movies = () => {
  const [page, setPage] = useState(1)
  const {genreIdOrCategoryName, searchQuery} = useSelector((state) => state.currentGenres)
  const {data, error, isFetching} = useGetMoviesQuery({genreIdOrCategoryName, page, searchQuery})

 if(isFetching) {
   return (
     <Box display='flex'>
       <CircularProgress size='4rem'/>
     </Box>
   )
 }

 if(!data.results.length) {
   return (
     <Box display='flex' alignItems='center' mt="20px">
       <Typography variant='h4'>NO movies that match that name.
       <br/>
       Please search for something else.
       </Typography>
     </Box>
   );
 }

 if (error) return 'An error has occurred'
 return (
   <div>
     <Movielist movies={data}/>
   </div>
 )
}

export default Movies