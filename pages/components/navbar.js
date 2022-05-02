import { useEffect } from "react"
import { useState } from 'react';
import Link from "next/link"
import { supabase } from "../../utils/supabaseClient"
import { useRouter } from "next/router";

import { AiOutlineMenu, AiOutlineClose } from  "react-icons/ai";

const Navbar = () => {
const [user, setUser] = useState(null);
const router = useRouter();

const [showMobileNav, setShowMobileNav] = useState(false);

useEffect(() => {
    const getUser = async () => {
        const user = supabase.auth.user();
        setUser(user);
    }
    getUser();
},[])

async function logout() {
    setShowMobileNav(false);
    await supabase.auth.signOut();
    router.push('/signin');
} 

    return(
        <div className="fixed w-screen h-16 bg-stone-900">
            <div className="h-full relative px-6 flex items-center md:justify-between">
                <Link  onClick={() => setShowMobileNav(false)} href={"/dashboard"}>
                    <div className="flex items-center gap-2 hover:cursor-pointer">
                        <img className="h-10" src="images/Asset 2.png"></img>               
                        <h1 className="text-white text-3xl font-light">Lossive</h1>
                    </div>
                </Link>
                
                <div className={`${showMobileNav ? "translate-x-0" : "translate-x-full" } absolute top-16 right-0 h-screen w-2/3 flex flex-col items-center px-6 gap-4 pt-8 bg-stone-900 text-white transition-all duration-75 ease-in-out md:flex md:items-center md:gap-6 md:static md:flex-row md:h-auto md:w-auto md:pt-0 md:translate-x-0`}>
                <Link  href='/dashboard'><a onClick={() => setShowMobileNav(false)} className="hover:text-green-500 cursor-pointer">Home</a></Link>
                <Link  href='/history'><a onClick={() => setShowMobileNav(false)} className="hover:text-green-500 cursor-pointer">History</a></Link>
                 <button onClick={logout} className="bg-green-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 hover:bg-green-600">Logout</button>  
                {/* <button className="bg-green-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2">Login</button> */}
                </div>
                <button onClick={() => setShowMobileNav(!showMobileNav)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-green-500 md:hidden">{showMobileNav ? <AiOutlineClose size={24}/> :<AiOutlineMenu size={24}/>}</button>
            </div>
            
        </div>
    )
}



export default Navbar