import { useEffect, useState } from "react"
import { useAppContext } from "../context/useAppContext"
export function Success(){
const {isAdded,setAdded}=useAppContext()


const [time,setTime]=useState(1);

useEffect(()=>{



if(isAdded===false){
    setTime(1)
    return;
}
if(time===0){
    setAdded(false);
}
const timeInterval=setInterval(()=>{
setTime((prev) => (prev > 0 ? prev - 1 : 0));
},1000);
console.log(time);

return ()=>clearInterval(timeInterval);
},[isAdded,time])



    return (<div className={`${isAdded ? 'opacity-100':''} opacity-0  top-20 bg-lime-600 pointer-events-none  fixed flex  rounded-[10px] transition-all 
    duration-500 ease-in-out right-10 z-70 text-white p-3`}>
<p>Successfully Added</p>
 </div>)
}