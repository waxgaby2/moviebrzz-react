//AppContext.tsx
import { createContext } from "react";
type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average:number;
};

type AppContextType = {
  hero: any | null;
  setHero: React.Dispatch<React.SetStateAction<any | null>>;
input:string|null;
setInput:React.Dispatch<React.SetStateAction<string | null>>;
searchResult:string[];
setSearchResult:React.Dispatch<React.SetStateAction<string[]>>;
addMovie:string;
setAddMovie:React.Dispatch<React.SetStateAction<string>>;
watchList: Movie[];
setWatchList:React.Dispatch<React.SetStateAction<Movie[]>>;
genreIds:number[];
setGenreIds:React.Dispatch<React.SetStateAction<number[]>>;
isAdded:boolean;
setAdded:React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext<AppContextType | null>(null);