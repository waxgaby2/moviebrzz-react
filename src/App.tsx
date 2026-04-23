import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Details } from "./pages/MovieDetails";
import { AppContext } from "./context/Appcontext";
import { useState } from "react";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average:number;
};


function App() {
const [hero,setHero]=useState<any | null>(null)
const [input,setInput]=useState<string | null>(null)
const [searchResult,setSearchResult]=useState<string[]>([])
const [isAdded,setAdded]=useState<boolean>(false);
const [addMovie,setAddMovie]=useState<string>('')
const [watchList, setWatchList] = useState<Movie[]>(() => {
  try {
    const item = localStorage.getItem("movielist");
    return item ? JSON.parse(item) : [];
  } catch {
    return [];
  }
});
const [genreIds,setGenreIds]=useState<number[]>([])
  return (
    
      <BrowserRouter>
      <AppContext.Provider value={{isAdded,setAdded,genreIds,setGenreIds,watchList, setWatchList,hero,setHero,input,setInput,searchResult,setSearchResult,addMovie,setAddMovie}}>
       <div className="min-h-screen overflow-x-hidden
       bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#020617]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Details />} />
          </Routes>
        </div>
    </AppContext.Provider>
    </BrowserRouter>
    
  );
}

export default App;