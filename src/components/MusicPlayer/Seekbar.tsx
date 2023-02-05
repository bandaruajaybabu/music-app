import React from "react";

const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime }) => {
  // converts the time to format 0:00
  const getTime = (time) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  return (
    <div className="hidden sm:flex flex-col items-center ">
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="md:block w-24 md:w-full  2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg"
      />
      <div className="flex justify-between w-full px-2">
        <div className="flex ">
          <button
            type="button"
            onClick={() => setSeekTime(appTime - 5)}
            className="hidden lg:mr-4 lg:block text-white"
          >
            -
          </button>
          <p className="text-white">{value === 0 ? "0:00" : getTime(value)}</p>
        </div>

        <div className="flex">
          <p className="text-white">{max === 0 ? "0:00" : getTime(max)}</p>
          <button
            type="button"
            onClick={() => setSeekTime(appTime + 5)}
            className="hidden lg:ml-4 lg:block text-white"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Seekbar;
