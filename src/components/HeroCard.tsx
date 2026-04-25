import { useState } from "react";
import { useAppContext } from "../context/useAppContext";
import { MdStar } from "react-icons/md";
import { MdEvent, MdPlayArrow } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { ColorRing } from "react-loader-spinner";
import { useWatchList } from "../hooks/useWatchList";


type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average:number;
  release_date:number;
  overview:string;
};

export function HeroCard() {
  const { hero } = useAppContext();
  const [collectMovie,setCollectMovie]=useState<Movie | null>(null)
const {setAdded}=useAppContext();
const {watchList,setWatchList}=useAppContext();
const { addMovie, removeMovie } = useWatchList();


   if (!hero || hero.length === 0) {
      return <div className="flex justify-center items-center w-full h-screen">
          <ColorRing
    visible={true}
    height="50"
    width="50"
    ariaLabel="loading"
    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />
      </div>
    }
  
  return (
 <div
  className="w-full max-w-full object-cover h-[90vh] bg-cover bg-center relative"
  style={{
    backgroundImage: `url(https://image.tmdb.org/t/p/original${hero[0].backdrop_path})`,
  }}
>
  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/70 to-black/60 flex flex-col justify-end p-6">
    <div className="sm:ml-10">
    <h2 className="text-white mb-5 sm:mb-9 font-bold! text-4xl! sm:text-6xl!">
      {hero[0].title}
    </h2>
    <p className="flex gap-3">
      <MdStar className="w-5 h-5 text-yellow-400" /> 
    {hero[0].vote_average.toFixed(1)}
    <MdEvent className="<w-5 h-5 text-white" /> 
{hero[0].release_date.slice(0,4)}
    </p>
    <div className="mt-5 sm:mt-9">
    <p className="sm:w-[70%] md:w-[60%]
     text-white/70 sm:text-[20px]">
{hero[0].overview.trim().length>250? hero[0].overview.slice(0,250)+"..." : hero[0].overview}
    </p>
    </div>
   <div className="flex sm:gap-10 max-sm:flex-col "> 
    <button type="button" aria-label="play movie" className="transsition-all
    duration-300 ease justify-center items-center
    shadow-[2px_2px_15px_5px_rgba(0,0,0,0.4)]
    hover:bg-gray-400 flex mt-5 sm:mt-8 bg-white
     text-black px-6 py-4 rounded-md font-semibold">
  <MdPlayArrow className="w-6 h-6 mr-3" />
  Watch Now
</button>
 <button type="button" aria-label="play movie" className={` transsition-all
    duration-300 ease justify-center items-center 
    hover:bg-gray-400 flex mt-5 sm:mt-8
      text-white px-6 py-4 rounded-md font-semibold 
     ${watchList.some(m => m.id == hero[0].id)? "cursor-not-allowed bg-black shadow-[2px_2px_15px_5px_rgba(255,255,255,0.2)]":"bg-blue-800 shadow-[2px_2px_15px_5px_rgba(0,0,0,0.4)]"}`}
      disabled={watchList.some(m => m.id ==hero[0].id)}  
     onClick={(e)=>{addMovie(hero[0]);
    setAdded(true);
  }}>
  <FaPlus className="w-6 h-6 mr-3" />
 {watchList.some(m => m.id ==hero[0].id)? "Added to WatchList":"Add to Watchlist"} 
</button></div>
</div>
  </div>
</div>
  );
}