//searchlist.tsx
import { useAppContext } from "../context/useAppContext";
import { MdStar } from "react-icons/md";
import { Link } from "react-router-dom";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average:number;
};
type Props={
  hidden:boolean;
  onBlur:any;
}
export function SearchListMobile({hidden,onBlur}:Props){
    const {searchResult}=useAppContext();
    const {isSearchClick,setSearchClick}=useAppContext();
return (
    <div  className={` fixed top-19 z-80
    max-h-[500px] overflow-y-auto w-[99vw] opacity-0
    bg-white shado
    ${isSearchClick ? "opacity-100":""}
     backdrop-blur-md text-gray-500
     shadow-[0_0_2px_1px_rgba(255,255,164,0.4)]`}>

      {searchResult.length===0 ? (<div className="h-[100px] flex justify-center items-center">
        <p className="text-center">No Results found</p>
        </div>) : (
        <ul className="z-80">
          {searchResult.map((movie) => {
            
           return <li
              key={movie.id} onClick={()=>{setSearchClick(false)}}
              className="flex items-center p-3 
              hover:bg-gray-100 cursor-pointer
              transition-all duration-200
              active:bg-gray-600 active:text-white"
            ><Link className="w-full " to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                alt={movie.title}
                className="w-10 h-14 object-cover rounded"
              />

              <div>
                <p className="text-sm font-semibold line-clamp-1">
                  {movie.title}
                </p>
                <p className="text-xs text-gray-500">
                    <MdStar className="w-5 h-5 text-amber-400" />
                 {movie.vote_average.toFixed(1)}
                </p>
              </div>
           </Link> </li>
})}
        </ul>
      )}
    </div>
  );
}