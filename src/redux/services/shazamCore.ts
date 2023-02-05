import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
  
    export const shazamCoreApi = createApi({
        reducerPath:'shazamCoreApi',
        baseQuery:fetchBaseQuery({
            baseUrl:'https://shazam-core.p.rapidapi.com/v1',
            prepareHeaders:(headers)=>{
                headers.set('X-RapidAPI-Key','9e873b33b4msh2de88c5936e8c12p18038ajsn4cd91d27952b');
                return headers;
            },
        }),
        endpoints: (builder)=>({
            getTopCharts:builder.query({query:()=> '/charts/world'}),  
            getSongsByGenre: builder.query({ query: (genre) => `/charts/genre-world?genre_code=${genre}` }),
            getSongsBySearch: builder.query({ query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` }),
        }),
    });

    export const{
        useGetTopChartsQuery,
        useGetSongsByGenreQuery,
        useGetSongsBySearchQuery,
    }= shazamCoreApi;
    