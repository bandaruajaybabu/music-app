import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Route, Routes } from 'react-router-dom';

import { Searchbar, Sidebar, MusicPlayer } from './components';
import {  TopArtists, AroundYou, Discover, Search, TopCharts } from './pages';
// import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  const { activeSong } = useSelector((state) => (state as any).player);

  return (
    <div className="relative flex ">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-[#282a2a] to-[#040b0f]">
        <Searchbar />

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Outlet />
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            {/* <TopPlay /> */}
          </div>
        </div>
      </div>

      {activeSong?.title && (
        <div className="absolute z-50 h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#03030a] backdrop-blur-md">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
