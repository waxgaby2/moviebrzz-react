import { useEffect, useState,useRef } from "react"
import { useAppContext } from "../context/useAppContext";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { MdMoreVert } from "react-icons/md";
import { Link } from "react-router-dom";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average:number;
};

export function WatchList(){
   const {addMovie}=useAppContext();
const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [trendMovies,setTrendMovies]= useState<Movie[]>([])
const[isFocus,setFocus]=useState<boolean>(false)
const scrollRef=useRef<HTMLDivElement | null>(null)  
const [isScroll,setScroll]=useState<boolean>(false)
const [isForwardScroll,setForwardScroll]=useState<boolean>(false)
const [menuMovieId,setMenuMovieId]=useState<number[]>([]);
const movieId=useRef([]);
const [collectMovie,setCollectMovie]=useState<Movie | null>(null)
const {watchList,setWatchList}=useAppContext();
const {setAddMovie}=useAppContext();

useEffect(() => {
  if (!collectMovie) return;

  setWatchList((prev) => {
    const result = prev.filter((m) => m.id !== collectMovie.id);

    return result;
  });
}, [collectMovie]);

useEffect(()=>{
localStorage.setItem("movielist", JSON.stringify(watchList));

},[watchList])



  

    function scroll(offsetMultiplier: number) {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({
      left: el.clientWidth * offsetMultiplier,
      behavior: "smooth",
    });
  }

    useEffect(()=>{
        const el: HTMLDivElement | null =scrollRef.current;
          if(!el) return;
        function handleScroll(){
            setScroll(el.scrollLeft>0);
            const atEnd =el.scrollLeft + el.clientWidth >= el.scrollWidth -5;
         setForwardScroll(!atEnd)   
        };
        el.addEventListener("scroll",handleScroll)
        handleScroll();
        return ()=> el.removeEventListener("scroll", handleScroll)
    })
    
 

if(watchList.length<1) return (<div></div>)

    return (<div className="relative m-3 max-sm:m-3">
  <div className="flex justify-between"><h2  className="sm:font-extrabold! ">My Watchlist</h2>
        </div>

 {isForwardScroll &&<button type="button" aria-label="scroll button" onClick={()=>scroll(1)}
            className="absolute  top-60
            -translate-y-1/2 
            h-15  w-7
             z-40 font-bold rounded-tr-md rounded-br-md
             right-0">
                <MdArrowForwardIos className="w-12 h-12 pr-2
                 hover:scale-120
                transition-all duration-300 ease-in-out" size={24} />
            </button>}
            <button type="button" aria-label="scroll button" onClick={()=>scroll(-1)}
            className={`absolute  top-60
        ${isScroll ? "opacity-100" : "opacity-0 pointer-events-none"}
            -translate-y-1/2 
             h-15  w-7
             z-40 font-bold rounded-tl-md rounded-bl-md
              left-0`}>
                <MdArrowBackIos className="w-12 h-12 pl-2 hover:scale-120
                transition-all duration-300 ease-in-out" size={24} />
            </button>
  <div  className="w-full relative scrollbar-hide [scrollbar-width:none] 
        [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
         mt-8 flex gap-2 overflow-x-scroll" ref={scrollRef}>
       
{[...watchList].reverse().map((movie,index)=>{
  
return (<div key={movie.id} 
                className="m-4 w-[200px] flex-none inline-block relative rounded-[10px] pb-3
             shadow-[0_0_2px_1px_rgba(255,255,164,0.4)] cursor-pointer overflow-hidden
             hover:text-gray-400 transition-all duration-500 ease-in-out">
              <Link to={`/movie/${movie.id}`}>
        <p className="absolute text-white top-2 left-2 z-10">
            <span className="text-lg">&#9733;</span> {movie.vote_average}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-t-[10px] hover:scale-105
              transition-all duration-300 ease object-fit"
            />
            
            <div className="flex relative justify-center w-full">
                          <p className="sm:font-bold px-6 py-3 text-center">{movie.title}</p>
           </div>
        
    </Link>  
    
     <button aria-label={`${movie.title} menu button`}
  onClick={() => {
   const el=movieId.current[index]
    if(menuMovieId[index]===index){
        el.style.opacity="0";
      setMenuMovieId(prev => {
      const array=[...prev]
      array.splice(index,1)
      return array; })
      return;
    } 
    el.style.opacity="100"
    setMenuMovieId(prev => {
      const array=[...prev]
      array[index]=index;
      return array;
    })
  }}
  type="button" className="cursor-pointer absolute bottom-10 right-1"
>
  <MdMoreVert size={24} className="hover:scale-125 hover:text-white transition-all duration-300 ease-in-out" />
</button>

        <div
ref={(e) => {
        movieId.current[index] = e;
      }}
  id={`menu-${movie.id}`}
  className="absolute opacity-0 hover:bg-blue-950 hover:text-white
  tansition-all duration-500 ease-in-out
  right-2 top-70 inset-auto bg-white text-gray-700 rounded-md shadow-lg  p-2"
>
  <button type="button" onClick={()=>{setCollectMovie(movie)}}>Remove</button>
</div>
    
        </div>)



})
}

</div>
    </div>)
}