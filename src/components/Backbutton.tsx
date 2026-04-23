import { Link } from "react-router-dom"
import {  FiArrowLeft } from "react-icons/fi";
import { IoArrowBackCircle } from "react-icons/io5"
export function HomeButton(){

    return (
       <Link className="fixed max-sm:bottom-6 max-sm:right-3 z-50 sm:top-20 sm:left-5 p-3 hover:bg-blue-950/60 
        transition-all duration-400
       ease-in-out bg-blue-950/40
       rounded-4xl" to="/">
        <FiArrowLeft className="w-10 h-10 hover:-translate-x-2.5  transition-all duration-400
       ease-in-out" />
       </Link>
    )
}