//search.tsx
import { useState, useEffect } from "react"
import { useAppContext } from "../context/useAppContext"
import { searchMovies } from "../api/fetchMovie";
import { MdSearch } from "react-icons/md"; 
import { SearchListMobile } from "./SearchListMobile";
import { ColorRing } from "react-loader-spinner";

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


export function SearchMobile(){
    const {input,setInput}=useAppContext();
const [data, setData] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result,setResult]= useState<Movie[]>([])
  const {setSearchResult}=useAppContext();
const [isHidden,setHidden]=useState<boolean>(false);
const [isResultHidden,setResultHidden]=useState<boolean>(true)
  useEffect(()=>{
    if(!input) return;
          searchMovies(input).then(data => {
             setSearchResult(data.results)

   }).catch(err=>{
  setError(err);
  setLoading(false)
   }).finally(()=> {
    setLoading(false)
setResultHidden(false);
  })
      },[input])
    

    return(<div className="relative my-10 sm:hidden items-center flex flex-col justify-center">
      
  <input
  type="search" onBlur={()=>{setHidden(false); setResultHidden(true); setLoading(false); setInput(null)} }
  value={input || ""}
  onChange={(e) => {setInput(e.target.value);
    setLoading(true);}
  }
  className="pl-5 pr-10 outline-0 py-2 w-[90%] rounded-[30px] bg-white text-gray-500 m-0.5 sm:w-[40vw] shadow-[0_0_5px_5px_rgba(255,255,255,0.4)]"
placeholder="Search here..."
/> {loading && <div className="absolute top-0 right-5">
        <ColorRing
  visible={true}
  height="40"
  width="50"
  ariaLabel="loading"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
    </div>}
<SearchListMobile hidden={isResultHidden} />

    </div>)
}
