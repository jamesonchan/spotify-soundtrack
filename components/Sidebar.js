import React, { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import {playlistIdState} from '../atoms/playlistAtom'

function Sidebar() {
  const { data: session } = useSession();

  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4">
        <button className="sideBarIcon">
          <HomeIcon className="w-5 h-5" />
          <p>Home</p>
        </button>
        <button className="sideBarIcon">
          <SearchIcon className="w-5 h-5" />
          <p>Search</p>
        </button>
        <button className="sideBarIcon">
          <LibraryIcon className="w-5 h-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="sideBarIcon">
          <PlusCircleIcon className="w-5 h-5" />
          <p>Create Playlist</p>
        </button>
        <button className="sideBarIcon">
          <HeartIcon className="w-5 h-5" />
          <p>Liked Songs</p>
        </button>
        <button className="sideBarIcon">
          <RssIcon className="w-5 h-5" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlists... */}
        {playlists.map((playlist)=>(
          <p onClick={()=>setPlaylistId(playlist.id)} key={playlist.id} className='cursor-pointer hover:text-white'>{playlist.name}</p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
