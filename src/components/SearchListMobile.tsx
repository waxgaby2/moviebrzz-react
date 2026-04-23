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
}
export function SearchListMobile({hidden}:Props){
    const {searchResult}=useAppContext();
return (
    <div className={`w-[95%]
    max-h-[300px] overflow-y-auto w-[90vw]
    bg-[#1e293b]  backdrop-blur-md text-white
     shadow-2xl border border-gray-200 ${hidden ? "hidden" : ""}`}>

      {searchResult.length===0 ? (<div className="h-[100px] flex justify-center items-center">
        <p className="text-center">No Results found</p>
        </div>) : (
        <ul>
          {searchResult.map((movie) => {
            
           return <li
              key={movie.id}
              className="flex items-center gap-3 p-3 
              hover:bg-gray-100 cursor-pointer 
              transition-all duration-200"
            ><Link to={`/movie/${movie.id}`}>
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