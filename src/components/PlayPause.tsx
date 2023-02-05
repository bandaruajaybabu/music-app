import React from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) =>
  isPlaying && activeSong?.title === song.title ? (
    <div className="rounded-full bg-black">
      <FaPauseCircle
        size={50}
        className="text-spotify_green fa-duotone"
        onClick={handlePause}
      />
    </div>
  ) : (
    <div
      className="rounded-full bg-black "
    >
      <FaPlayCircle
        size={50}
        className="text-spotify_green bg-clip-border"
        onClick={handlePlay}
      />
    </div>
  );

export default PlayPause;
