import { useEffect } from 'react'
import { useState } from 'react'

import Head from "next/head"

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
    <Head>
      <link rel='shortcut icon' href='images/Asset 2.png'></link>
    </Head>

  {user && <Navbar></Navbar>}
 <Component {...pageProps} />
    </>

  ) 
 
}

export default MyApp
