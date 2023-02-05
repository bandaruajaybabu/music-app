import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-[210px]  p-2">
      <div className={`  relative w-48 h-48 group  mt-1   `}>
        <div className={`absolute top-[8.5rem] left-[8.5rem] animate-slideup z-10 justify-center items-center hover:bg-opacity-50  group-hover:flex ${activeSong?.title === song.title ? 'flex opacity:50  ' : 'hidden'}`}>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}

          />
        </div>
        <img alt="song_img" src={song.images?.coverart} className={`w-full h-full rounded-lg group-hover:opacity-50  ${activeSong?.title === song.title &&  "  opacity-50   "   }  `} />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          {/* <Link to={`/songs/${song?.key}`}> */}
            {song.title}
          {/* </Link> */}
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          {/* <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}> */}
            {song.subtitle}
          {/* </Link> */}
        </p>
      </div>
    </div>
  );
};

export default SongCard;

