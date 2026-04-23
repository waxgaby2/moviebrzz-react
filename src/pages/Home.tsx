import { PopularMovies } from "../components/PopularMovies"
import { Trending } from "../components/TrendingMovies"
import { Header } from "../components/Header"
import { HeroCard } from "../components/HeroCard"
import { SearchList } from "../components/SearchList"
import { SearchMobile } from "../components/SearchMobile"
import { WatchList } from "../components/Watchlist"
import { useAppContext } from "../context/useAppContext"
import { Success } from "../components/Successful"

export function Home(){
    
  const { hero } = useAppContext();

  


    return (<div className="relative min-h-screen">
        
    <Header />
    
 <div className="pt-13">
    <HeroCard />
    </div>
<SearchMobile />
<Success />
<WatchList />
    <PopularMovies />
    <Trending />
    
    </div>)
}