import { useEffect } from "react";
import { useAppContext } from "../context/useAppContext";
type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average:number;
};

export function useWatchList() {
  const { watchList, setWatchList } = useAppContext();

  const addMovie = (movie: Movie) => {
    setWatchList(prev => {
      const exists = prev.some(m => m.id === movie.id);
      if (exists) return prev;
      return [...prev, movie];
    });
  };

  const removeMovie = (movie: Movie) => {
    setWatchList(prev => prev.filter(m => m.id !== movie.id));
  };

  useEffect(() => {
    localStorage.setItem("movielist", JSON.stringify(watchList));
  }, [watchList]);

  return { watchList, addMovie, removeMovie };
}