import { useEffect } from 'react'
import { useState } from 'react'
import '../styles/globals.css'
import { supabase } from '../utils/supabaseClient'
import Navbar from './components/navbar'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      const user = supabase.auth.user();
      setUser(user);
    }
    getUser();
  },)

  return (
    <>
  {user && <Navbar></Navbar>}
 <Component {...pageProps} />
    </>

  ) 
 
}

export default MyApp
