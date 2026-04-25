import { NavLink } from "react-router-dom"
import { MdSearch } from "react-icons/md";
import { useState } from "react";
import { SearchMobile } from "./SearchMobile";
import { Search } from "./Search";
import { Link } from "react-router-dom";
import favicon from "../assets/favicon.png"

const navstyles: string='px-5 p-2.5 active:bg-amber-400 rounded-t-[7px] transition-all duration-400 inline-block hover:-translate-y-0.5 hover:bg-gray-300 border-none hover:text-amber-700 ease-in-out'
export function Header(){

    return ( <div className="fixed backdrop-blur-md bg-[#1e293b]/80 top-0 z-50  w-full px-3 pt-4 mb-2 sm:px-20 flex justify-between items-center">
 
<div className="flex">
<img src={favicon} className="w-10" alt="logo" />
<h1 className="m-0! p-0! font-bold! ">MovieBrzz</h1>
</div>
<Search />
    </div>)
}