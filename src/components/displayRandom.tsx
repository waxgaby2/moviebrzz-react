import { useEffect,useState,useRef } from "react";
 import { useAppContext } from "../context/useAppContext";
  import { randomMovies } from "../api/fetchMovie";
  import { Link } from "react-router-dom";
import { MdMoreVert } from "react-icons/md";


   type Movie = { 
    id: number; 
    title: string; 
    poster_path: string;
     vote_average:number; }; 

   export function RandomMov(){ 
    const {genreIds}=useAppContext(); 
    const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<string | null>(null); 
     const [movies,setMovies]= useState<Movie[]>([])
    const [randomMov,setRandomMov]=useState<Movie[]>([])
 const[isFocus,setFocus]=useState<boolean>(false)
    const scrollRef=useRef<HTMLDivElement | null>(null)  
    const [isScroll,setScroll]=useState<boolean>(false)
    const [isForwardScroll,setForwardScroll]=useState<boolean>(false)
   const {setAddMovie}=useAppContext();
    const [menuMovieId,setMenuMovieId]=useState<number|null>(null);
    const movieId=useRef([]);
    const [collectMovie,setCollectMovie]=useState<Movie | null>(null)
    const {watchList,setWatchList}=useAppContext();
    const {setAdded}=useAppContext();
    

     useEffect(() => {
  if (!genreIds || genreIds.length === 0) return;
  randomMovies(genreIds[0])
    .then(data => setMovies(data.results))
    .catch(err => {
      setError(err);
    })
    .finally(() => {
      setLoading(false);
     
    });
}, [genreIds]);


 useEffect(()=>{
    setRandomMov((prev)=>{
        const random=movies.sort(() => 0.5 - Math.random());
        return random;
    })
 },[movies])


useEffect(()=>{
   if (!collectMovie) return;
setWatchList((prev)=>{
  const exists = prev.some((m) => m.id === collectMovie.id);
    if (exists) {

      return prev;}
    return [...prev, collectMovie];
})
},[collectMovie])

useEffect(()=>{
localStorage.setItem("movielist", JSON.stringify(watchList));

},[watchList])




          return (<div className="my-15 sm:mx-5 mx-3"> 
          <h2 className="mb-4">You might also like</h2>
          <div className="flex flex-col w-full sm:place-items-center sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center">
 {randomMov.map((movie,index) =>{ 
    if(index>11){
        return;
    }
     return (<div key={movie.id} onFocus={()=> setFocus(true)} 
            onBlur={()=> setFocus(false)}
                className="m-4 h-[380px] w-[200px] flex-none inline-block relative rounded-[10px] pb-3
             shadow-[0_0_2px_1px_rgba(255,255,164,0.4)] cursor-pointer overflow-hidden
             hover:text-gray-400 transition-all duration-500 ease-in-out">
              <Link to={`/movie/${movie.id}`}>
        <p className="absolute top-2 left-2 z-10">
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
  <MdMoreVert size={24} className="hover:scale-125 hover:text-white transition-all duration-300 ease-in-out" />
</button>

      <div
  className={`absolute right-2 top-70 text-gray-700
     rounded-md shadow-lg p-2 
     transition-all duration-300
  ${menuMovieId === movie.id ? "opacity-100" : "opacity-0 pointer-events-none"}
   ${watchList.some(m => m.id == movie.id)? "bg-black  cursor-not-allowed":"bg-white hover:text-white hover:bg-blue-950"}
   `}>

  <button type="button" disabled={watchList.some(m => m.id == movie.id)}  className={`${watchList.some(m => m.id == movie.id)? "cursor-not-allowed":""}`}
   onClick={(e)=>{setCollectMovie(movie);
    setAdded(true);
  }}>Add to watchlist</button>
</div>
      </div>)
        }
                
        )}
        </div>
        </div>) }