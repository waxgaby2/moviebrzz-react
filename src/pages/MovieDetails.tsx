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
const{setGenreIds}=useAppContext();



    useEffect(() => {
          if (!id) return;
      movieDetail(id).then(data => {
        setMovie(data);
        setGenre(data.genres)
    })
      .catch(err=>{
       setError("Error");
    setLoading(false) 
      }).finally(()=> {
      setLoading(false)
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
  className="w-full max-w-full object-cover h-[90vh] bg-cover bg-center relative"
  style={{
    backgroundImage: movie?.backdrop_path
  ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
  : "none",
  }}
>
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/70 to-black/60 flex flex-col justify-end p-6">
            <div className="sm:ml-10">
            <h2 className="text-white mb-5 sm:mb-9 font-bold! text-4xl! sm:text-6xl!">
              {movie?.title}
            </h2>
            <p className="flex gap-3">
              <MdStar className="w-5 h-5 text-yellow-400" /> 
            {movie?.vote_average}
            <MdEvent className="<w-5 h-5 text-white" /> 
        {movie?.release_date}
            </p>
            <div className="mt-5 sm:mt-9">
            <p className="
             text-white/70">
        {movie?.overview}
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
          </div>
          <SearchMobile />
          <RandomMov />
    </div>)
}