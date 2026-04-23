//search.tsx
import { useState, useEffect,useRef } from "react"
import { useAppContext } from "../context/useAppContext"
import { searchMovies } from "../api/fetchMovie";
import { MdSearch } from "react-icons/md"; 
import { SearchList } from "./SearchList";
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


export function Search(){
    const {input,setInput}=useAppContext();
const [data, setData] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false);
  const [error, setError] = useState<string | null>(null);
  const [result,setResult]= useState<Movie[]>([])
  const {setSearchResult}=useAppContext();
const [isHidden,setHidden]=useState<boolean>(false);
const [isResultHidden,setResultHidden]=useState<boolean>(true)
const searchRef=useRef<HTMLInputElement | null>(null) 

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

      useEffect(() => {
  if (isHidden) {
    searchRef.current?.focus();
  }
}, [isHidden]);
    

    return(<div className="sm:w-[40vw] flex justify-end">
      
      {isHidden &&<div className="relative"  onMouseLeave={()=>{setHidden(false);setLoading(false); setResultHidden(true); setInput(null)} }>
         <input ref={searchRef}
  type="search"
  value={input || ""}
  onChange={(e) => {setInput(e.target.value)
    setLoading(true);
  }}
  className="p-2 pl-4 pr-10 bg-white text-black sm:w-[40vw] shadow-[0_0_5px_5px_rgba(255,255,255,0.4)]"
  placeholder="Movie name..."
/>
 {loading && <div className="absolute top-[-6px] right-[-2px]">
        <ColorRing
  visible={true}
  height="50"
  width="50"
  ariaLabel="loading"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
    </div>}
<SearchList hidden={isResultHidden} />
</div>}
 <button onClick={()=>{setHidden(true);searchRef.current.focus();}} type="button" aria-label="Search display button" className={`cursor-pointer hover:scale-130 transition-all
duration-400 max-sm:hidden ease-in-out ${!isHidden ? "":"hidden"}`}>
<MdSearch className="w-6 h-6" />
</button>

    </div>)
}
