import { useState } from "react";
import { useAppContext } from "../context/useAppContext";
import { MdStar } from "react-icons/md";
import { MdEvent, MdPlayArrow } from "react-icons/md";

import { ColorRing } from "react-loader-spinner";
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
     text-white/70">
{hero[0].overview.trim().length>250? hero[0].overview.slice(0,250)+"..." : hero[0].overview}
    </p>
    </div>
    <button type="button" aria-label="play movie" className="w-[170px] transsition-all
    duration-300 ease
    hover:bg-gray-400 flex mt-5 sm:mt-8 bg-white text-black px-6 py-4 rounded-md font-semibold">
  <MdPlayArrow className="w-6 h-6" />
  Watch Now
</button>
</div>
  </div>
</div>
  );
}