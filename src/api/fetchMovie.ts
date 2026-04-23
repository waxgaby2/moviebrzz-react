//feacth.ts

const apiKey = import.meta.env.VITE_TMDB_API_KEY;


export const popularMovies = async()=>{
const res= await fetch (`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
return res.json();
}

export const trendingMovies = async ()=>{
    const res = await fetch (`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
    return res.json();
}


export const searchMovies = async (query: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
  );
  return res.json();
};


export const movieDetail = async (id: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
  );
  return res.json();
};

export const randomMovies = async (genre:number)=>{
  const res= await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&api_key=${apiKey}`)
  return res.json();
}