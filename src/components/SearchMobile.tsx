//search.tsx
import { useState, useEffect,useRef } from "react"
import { useAppContext } from "../context/useAppContext"
import { searchMovies } from "../api/fetchMovie";
import { MdSearch } from "react-icons/md"; 
import { SearchListMobile } from "./SearchListMobile";
import { ColorRing } from "react-loader-spinner";
import { FiX } from "react-icons/fi";

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
const searchRef=useRef<HTMLInputElement | null>(null) 
const [hideContainer,setHide]=useState<boolean>(false);
const {isSearchClick,setSearchClick}=useAppContext();
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
    
      useEffect(()=>{
setHidden(false)
      },[isSearchClick])

    return(
    <div className={`sm:hidden fixed w-full 
    flex justify-end 
    top-8 z-55 right-0`}
    >
     <div
     className={`flex fixed 
     -top-50 z-55  w-full flex-row
     justify-center transition-all
    duration-300 ease-in-out
    `}
    >
   <div
   className={`flex fixed
    bg-[#1e293b] -top-50 z-50  w-full 
    opacity-0 justify-center py-5 transition-all
    duration-300 ease-in-out
     ${isSearchClick ? "opacity-100 top-0":""}
    pl-3 pt-4`}>   
 
  <input
     ref={searchRef}
  type="search" onBlur={()=>{setHide(true); setLoading(false); setInput(null)} }
 value={input || ""} 
  onChange={(e) => {setInput(e.target.value);
    setLoading(true);}    
  }
  className={`pl-5 pr-10 outline-0 py-2 w-[90%] 
    rounded-md bg-white text-gray-500 
    m-0.5 sm:w-[40vw] opacity-0
     ${isSearchClick ? "opacity-100":""}
    shadow-[0_0_5px_5px_rgba(255,255,255,0.4)]`}
placeholder="Search here..."
/> {loading && <div className="absolute top-4 right-10">
        <ColorRing
  visible={true}
  height="40"
  width="50"
  ariaLabel="loading"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
    </div>}
    <button onClick={()=>{setHidden(false);
      setSearchClick(false);
    }}
     type="button" aria-label="Cancel Search button" 
    className={`cursor-pointer z-70 p-1 hover:scale-130 transition-all
duration-400  ease-in-out   ${isSearchClick ? "opacity-100":""}

`}>
<FiX className="w-8 h-8 text-gray-500" />
</button>
    </div>
    
<SearchListMobile /></div>
    <button onClick={()=>{setHidden(true);
    setSearchClick(true);
    searchRef.current.focus();}}
     type="button" aria-label="Search display button" 
    className={`cursor-pointer z-80 pr-4 hover:scale-130 
      opacity-100 transition-all
duration-400  ease-in-out ${!isSearchClick ? "":"opacity-0 fixed right-[-500px] top-0"}

`}>
<MdSearch className="w-6 h-6" />
</button>

    </div>)
}
