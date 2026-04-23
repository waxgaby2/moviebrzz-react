import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { movieDetail } from "../api/fetchMovie";
import { useEffect,useState } from "react";
import { Header } from "../components/Header";
import { MdStar } from "react-icons/md";
import { MdEvent, MdPlayArrow } from "react-icons/md";
import { useAppContext } from "../context/useAppContext";
import { RandomMov } from "../components/displayRandom";
import { SearchMobile } from "../components/SearchMobile";
import { ColorRing } from "react-loader-spinner";
import { Success } from "../components/Successful";
import { casts } from "../api/fetchMovie";

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
  release_date:number;
  overview:string;
  backdrop_path:string;
  genres:any;
};
export function Details(){
    const [data, setData] = useState<Post[] | null>(null);
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);
      const [movie,setMovie]= useState<Movie[] | null>(null);
      const [genre,setGenre]=useState<any>([]);
const { id } = useParams();
      const [genreId,setGenreId]=useState<number[]>([])
const{genreIds,setGenreIds}=useAppContext();
const [cast,setCast]=useState<[]>([]);
const [castError,setCastError]=useState(false);
const [castLoading,setCastLoading]=useState<boolean>(false)
const [director,setDirector]=useState<string>('')
    useEffect(() => {
          if (!id) return;
      movieDetail(id).then(data => {
        setMovie(data);
        setGenre(data.genres)
              console.log(data);
    })
      .catch(err=>{
       setError("Error");
    setLoading(false) 
      }).finally(()=> {
      setLoading(false)
    });

     casts(id).then(data => {
        setCast(data.cast.slice(0, 6))
              setDirector(data.crew.find((p) => p.job === "Director"));
    })
      .catch(err=>{
       setCastError("Error");
    setCastLoading(false) 
      }).finally(()=> {
      setCastLoading(false)
    });

    }, [id])



    useEffect(() => {
  window.scrollTo(0, 0);
}, [id]);
   
useEffect(()=>{
    setGenreId((prev)=>{
        const genres=genre.map((g)=>g=g.id);

        return genres;
    })
},[genre])
useEffect(()=>{
    setGenreIds(genreId)
    console.log(genreId)
},[genreId])

if (error) {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-white px-4 text-center">
      <h2 className="text-2xl font-bold mb-3">
        Something went wrong
      </h2>
      <p className="text-white/70 mb-6">
        We couldn’t load this movie right now. Please try again.
      </p>

      <button type="button"
        onClick={() => window.location.reload()}
        className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-300 transition"
      >
        Retry
      </button>
    </div>
  );
}



 if(loading) return <div className="w-full h-screen flex justify-center items-center">
     <div className="w-full h-screen flex justify-center items-center">
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
 

    return (<div>
         <Header />
         <Success />
         <div className="pt-13">
        <div
  className="w-full  
  sm:grid sm:grid-cols-4 p-9 flex flex-col justify-center
  items-center bg-center relative"
>
  <div>
    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={`${movie?.title} picture`} 
className="rounded-lg shadow-[5px_5px_15px_5px_rgba(0,0,0,0.6)]" />
   <button type="button" aria-label="play movie" className="p-10 transsition-all
            duration-300 ease
            hover:bg-gray-400 flex mt-5 sm:mt-8 bg-white text-black px-6 py-4 rounded-md font-semibold">
          <MdPlayArrow className="w-6 h-6" />
          Watch Trailer
        </button>
        </div>
           <div className="sm:ml-10 sm:col-span-3 max-sm:mt-10">
            <h2 className="text-white mb-5 sm:mb-9 font-bold! text-2xl!">
              {movie?.title}
            </h2>
           <div className="flex mb-4 gap-2">
            <p className="flex bg-blue-800/20 py-1 px-2.5 rounded-[15px] text-gray-300  gap-1">
              <MdStar className="w-5 h-5 text-yellow-400" /> 
            {movie?.vote_average}
            </p>
            <p className="flex bg-blue-800/20 py-1 px-2.5 rounded-[15px] text-gray-300  gap-1">
            <MdEvent className="<w-5 h-5 text-white" /> 
        {movie?.release_date.slice(0,4)}
            </p>
            <p className="bg-blue-800/20 py-1 px-2.5 rounded-[15px] text-gray-300 ">{movie?.runtime}m</p>

</div>
<ul className="flex gap-2">
{movie?.genres.map((genre,index) => {
return <li key={genre?.name} className='bg-blue-800/20 py-1 px-2.5 rounded-[15px] text-gray-300 '>
  {genre?.name} 
</li>

})}
</ul>


            <div className="mt-5">
            <p className="
             text-white/70">
        {movie?.overview}
            </p>
            
<div className="mt-5 sm:flex sm:gap-8">
  <h3 className="font-bold!">Director:</h3>
  <p>{director?.name}</p>
</div>
<div className="mt-5 sm:flex sm:gap-8">
  <h3 className="font-bold!">Cast:</h3>
  <ul className=" flex flex-col sm:flex-row max-sm:justify-center max-sm:items-center">
    {cast.map((c,index)=>{
      console.log(c.name)
      return (<div className="sm:m-3 max-sm:mb-9">
      <img
      className="rounded-[7px] max-sm:w-40 mb-2  shadow-[0_0_1px_1px_rgba(255,255,255,0.6)]"
      src={`https://image.tmdb.org/t/p/w200${c.profile_path}`} alt="" />
      <li key={index} className="text-center">
        {c?.name}
      </li></div>)
    
    })}
  </ul>
</div>
<div className="mt-5 sm:flex sm:gap-8">
<h3  className="font-bold!">Budget: </h3>
<p>${movie?.budget.toLocaleString()}</p></div>
<div className="mt-5 sm:flex sm:gap-8">
<h3 className="font-bold!">Revenue: </h3>
<p>${movie?.revenue.toLocaleString()}</p></div>

            
            </div>
           
        </div>
          </div>
          </div>
          
          <SearchMobile />
          <RandomMov />
    </div>)
}