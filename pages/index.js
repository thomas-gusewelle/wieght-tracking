import { useRouter } from "next/router"
import { useEffect } from "react"
import { supabase } from "../utils/supabaseClient"

const Index = () => {
  const router = useRouter();


useEffect(() => {
  const getUser = () => {
    const user = supabase.auth.user();
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/signin')
    }
  }
  getUser()
}, [])


  return (
    <></>
  )
}

export default Index
