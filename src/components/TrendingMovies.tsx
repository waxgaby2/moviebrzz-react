import { useEffect, useState, useRef } from "react";
import { trendingMovies } from "../api/fetchMovie";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { MdMoreVert } from "react-icons/md";
import { useAppContext } from "../context/useAppContext";
import { Link } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { useWatchList } from "../hooks/useWatchList";


interface Post {
  id: number;
  title: string;
  body: string;
}
type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average:number;
};


export function Trending(){
 const [data, setData] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [trendMovies,setTrendMovies]= useState<Movie[]>([])
const[isFocus,setFocus]=useState<boolean>(false)
const scrollRef=useRef<HTMLDivElement | null>(null)  
const [isScroll,setScroll]=useState<boolean>(false)
const [isForwardScroll,setForwardScroll]=useState<boolean>(false)
const [menuMovieId,setMenuMovieId]=useState<number|null>(null);
const movieId=useRef([]);
const [collectMovie,setCollectMovie]=useState<Movie | null>(null)

const {setAddMovie}=useAppContext();
const {watchList,setWatchList}=useAppContext();
const {setAdded}=useAppContext();
const { addMovie, removeMovie } = useWatchList();


  


useEffect(()=>{
    trendingMovies().then(data =>{
   setTrendMovies(data.results);     
    } ).catch(error=>{
        setError(error);
        setLoading(false);
    }).finally(()=>{
      setLoading(false);  
    })
},[])


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

 if(error) return (<div className="w-full h-screen flex justify-center items-center"><h1 className="">Error: ${error}</h1></div>)
 
 if(loading) return <div className="relative m-3 max-sm:m-3">
        <div className="flex justify-between"><h2  className="sm:font-extrabold!">Trending This Week</h2>
        </div> <div className="w-full h-screen flex justify-center items-center">
  <div className="flex justify-center items-center w-full h-screen">
        <ColorRing
  visible={true}
  height="50"
  width="50"
  ariaLabel="loading"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
    </div>
 </div></div>

return (
    <div className="relative m-3  sm:mt-14">
        <div className="flex justify-between"><h2  className="sm:font-extrabold! ">Trending This Week</h2>
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
          
     
        {trendMovies.map((movie,index)=>{
           
          
            return (<div key={movie.id} onFocus={()=> setFocus(true)} 
            onBlur={()=> setFocus(false)}
                className="m-4 w-[200px] flex-none inline-block relative rounded-[10px]
             shadow-[0_0_2px_1px_rgba(255,255,164,0.4)] cursor-pointer overflow-hidden
             hover:text-gray-400 transition-all duration-500 ease-in-out">
<Link to={`/movie/${movie.id}`}>
        <p className="absolute text-white top-2 left-2 z-10">
            <span className="text-lg">&#9733;</span> {movie.vote_average.toFixed(1)}</p>
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
     setMenuMovieId(prev => (prev === movie.id ? null : movie.id));
  }}
  type="button" className="cursor-pointer absolute bottom-7 right-1 m-2"
>
  <MdMoreVert size={24} className="hover:text-white hover:scale-125 transition-all duration-300 ease-in-out" />
</button>

             

      <div
  className={`absolute right-2 top-70 text-gray-700
     rounded-md shadow-lg p-2 
     transition-all duration-300
  ${menuMovieId === movie.id ? "opacity-100" : "opacity-0 pointer-events-none"}
   ${watchList.some(m => m.id == movie.id)? "bg-black  cursor-not-allowed":"bg-white hover:text-white hover:bg-blue-950"}
   `}>
  <button type="button" disabled={watchList.some(m => m.id == movie.id)}  className={`${watchList.some(m => m.id == movie.id)? "cursor-not-allowed":""}`}
   onClick={(e)=>{
    addMovie(movie);
    setAdded(true);
  }}>Add to watchlist</button>
</div>
          </div>)
        }
           
            
        )}
        
        </div>
    </div>
)
}