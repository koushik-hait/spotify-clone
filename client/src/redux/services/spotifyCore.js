import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const spotifyCoreApi = createApi({
  reducerPath: 'spotifyCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://spotify81.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '449b621110msha8d35fbf8a874d0p1d66c9jsn16a898bf0008');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPlayList: builder.query({ query: (id) => `playlist?id=${id}` }),//id=37i9dQZF1DX4Wsb4d7NKfP
    getPlayListTracks: builder.query({ query: (id) => `playlist_tracks?id=${id}&offset=0&limit=100` }),//id=37i9dQZF1DX4Wsb4d7NKfP
    getArtists: builder.query({query: (id) => `artists?id=${id}`}),//id=2w9zwq3AktTeYYMuhMjju8
    getSearch: builder.query({ query: (q) => `search?q=${q}&type=multi&offset=0&limit=10&numberOfTopResults=20` }),
    getTopArtistByFollower: builder.query({ query: () => `top_20_by_followers` }),//
    getGlobalTopSongs:  builder.query({ query: () => `top_200_tracks` }),
    getSongDetails: builder.query({ query: (id) => `playlist?ids=${id}` }),//ids=4WNcduiCmDNfmTEz7JvmLv
  }),
});

export const {
  useGetPlayListQuery,
  useGetPlayListTracksQuery,
  useGetSearchQuery,
  useGetTopArtistByFollowerQuery,
  useGetGlobalTopSongsQuery,
  useGetSongDetailsQuery,
} = spotifyCoreApi;