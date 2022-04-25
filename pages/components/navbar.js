import { useEffect } from "react"
import { useState } from 'react';
import Link from "next/link"
import { supabase } from "../../utils/supabaseClient"
import { useRouter } from "next/router";

const Navbar = () => {
const [user, setUser] = useState(null);
const router = useRouter();

useEffect(() => {
    const getUser = async () => {
        const user = await supabase.auth.user();
        setUser(user);
    }
    getUser();
},[])

async function logout() {
    await supabase.auth.signOut();
    router.push('/signin');
} 

    return(
        <div className="fixed w-screen h-16 bg-stone-900">
            <div className="h-full px-6 flex items-center justify-between">
                <h1 className="text-white text-3xl">Weight Tracker</h1>
                <div className="flex gap-6 items-center text-white">
                {/* <Link href='/dashboard'>Home</Link>
                <Link href='/dashboard'>History</Link>
                <Link href='/dashboard'>Home</Link> */}
                 <button onClick={logout} className="bg-green-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2">Logout</button>
                {/* <button className="bg-green-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2">Login</button> */}
                
                </div>
            </div>
            
        </div>
    )
}



export default Navbar