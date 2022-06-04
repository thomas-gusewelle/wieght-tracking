import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

import { AiOutlineLineChart } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { GiStairsGoal } from "react-icons/gi";

import { IoScale } from "react-icons/io5";
import TestimonalSlider from "../src/components/index/testimonal-slider";
import Accordian from "../src/components/accordian";

const Index = () => {
  const router = useRouter();

  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
    const getUser = () => {
      const user = supabase.auth.user();
      if (user) {
        router.push("/dashboard");
      }
    };
    getUser();
  }, [router]);

  return (
    <>
      <Head>
        <title> Lossize </title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'></meta>
      </Head>
      <nav>
        <div className='fixed w-screen h-16 bg-stone-900 z-50'>
          <div className='h-full relative px-6 flex items-center md:justify-between'>
            <Link onClick={() => setShowMobileNav(false)} href={"/"}>
              <div className='flex items-center gap-2 hover:cursor-pointer'>
                <img className='h-10' src='images/Asset 2.png'></img>
                <h1 className='text-white text-3xl font-light'>Lossize</h1>
              </div>
            </Link>
            <div className='text-white w-full flex items-end justify-end pr-2'>
              <Link href={"/signin"}>
                <button className='bg-green-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2'>
                  Login
                </button>
              </Link>
            </div>
            {/* <div className={`${showMobileNav ? "translate-x-0" : "translate-x-full" } absolute top-16 right-0 h-screen w-2/3 flex flex-col items-center px-6 gap-4 pt-8 bg-stone-900 text-white transition-all duration-75 ease-in-out md:flex md:items-center md:gap-6 md:static md:flex-row md:h-auto md:w-auto md:pt-0 md:translate-x-0`}> */}
            {/* <button onClick={logout} className="bg-green-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 hover:bg-green-600">Logout</button>   */}
            {/* <Link href={'signin'}>
                              <button className="bg-green-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2">Login</button>
                              </Link>
                              </div>
                              <button onClick={() => setShowMobileNav(!showMobileNav)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-green-500 md:hidden">
                              {showMobileNav ? <AiOutlineClose size={24}/> :<AiOutlineMenu size={24}/>}</button> */}
          </div>
        </div>
      </nav>
      <div className='pt-16 text-white'>
        <div className='relative py-12 px-4 flex flex-col items-center gap-6 overflow-hidden lg:flex-row-reverse lg:justify-center md:py-24'>
          <div className='flex flex-col items-center justify-center gap-1 z-10 pb-4 max-w-prose'>
            <h1 className='text-5xl text-center'>
              Simple and Easy Weight Tracking
            </h1>
            <h3 className='text-lg text-center'>
              Visually track your weight loss journey
            </h3>
            <Link href={"/signup"}>
              <button className='mt-4 px-2 py-4 rounded-xl shadow-xl bg-green-500 hover:-translate-y-1 hover:bg-green-600 transition-all duration-200 ease-in-out'>
                Sign Up for Free
              </button>
            </Link>
          </div>
          <img
            className='z-10 rounded-lg drop-shadow-2xl shadow-2xl'
            src='images/index_graph.png'></img>
          <svg
            className='absolute bottom-0 z-0 min-w-[150rem] max-w-max'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 1440 320'>
            <path
              fill='#22c55e'
              fillOpacity='1'
              d='M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'></path>
          </svg>
        </div>
        <div className=''>
          <div className='container mx-auto py-12 flex flex-col items-center gap-3'>
            <h2 className='text-3xl'> Tracking Made Simple </h2>
            <div className='flex flex-col gap-4 items-center sm:flex-row'>
              <div className='flex flex-col items-center p-2 text-center gap-2 max-w-sm'>
                <h3 className='text-green-500 text-lg'>Know Where You Stand</h3>
                <IoScale size={50} />
                <p>
                  Your weight is logged once per day allowing you to see exactly
                  where you stand on your journey!
                </p>
              </div>
              <div className='flex flex-col items-center p-2 text-center gap-2 max-w-sm'>
                <h3 className='text-green-500 text-lg'> Set Goals </h3>
                <GiStairsGoal size={50} />
                <p>
                  Simply set your weight goal, choose to see it on your graph or
                  not, and watch over time as you begin to reach your goals!
                </p>
              </div>
              <div className='flex flex-col items-center p-2 text-center gap-2 max-w-sm'>
                <h3 className='text-green-500 text-lg'>Track Your Progress</h3>
                <AiOutlineLineChart size={50} />
                <p>
                  Watch as your progress is magically graphed out so that you
                  can visually see your journey.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='pt-12 pb-6 bg-stone-900'>
          <h2 className='text-center text-3xl'> Lossize Stories </h2>
          <TestimonalSlider />
        </div>
      </div>
      <div className=''>
        <div className='container mx-auto px-6 py-6 text-white md:px-24'>
          <h3 className='text-center text-3xl pb-6'>
            Frequently Asked Questions
          </h3>
          <Accordian
            title={"How much does Lossize cost?"}
            body={
              "Lossize is actually a completely free to use and open source program!"
            }
          />
          <Accordian
            title={"How does Lossize make money?"}
            body={
              "Lossize currently only makes money from user donations. If you would like to contribute to Lossize feel free to do so using the button at the bottom of the page."
            }
          />
          <Accordian
            title={"What about my data?"}
            body={
              "Lossize is proud to say that all of our user data is safe, secure, and will never be used for anything but your experience in Lossize! Feel free to reach out to us via email at contact@gkwmedia.com"
            }
          />
        </div>
      </div>
      <div className='flex flex-col items-center justify-center py-12 text-white bg-stone-900'>
        <h3 className='text-3xl pb-4'> Get Started Today! </h3>
        <Link href={"/signup"}>
          <button className='px-2 py-4 bg-green-500 rounded-xl'>
            Sign Up for Free
          </button>
        </Link>
      </div>
      <footer>
        <div className=' flex justify- items-center pb-6 text-white bg-stone-900'>
          <div className='mx-auto flex flex-col justify-center'>
            <Link onClick={() => setShowMobileNav(false)} href={"/"}>
              <div className='flex items-center gap-2 hover:cursor-pointer'>
                <img className='h-10' src='images/Asset 2.png'></img>
                <h1 className='text-white text-3xl font-light'> Lossize </h1>
              </div>
            </Link>
            <p className='pt-4'> & copy; 2022 | GKW Media </p>
            <form
              className='mx-auto'
              action='https://www.paypal.com/donate'
              method='post'
              target='_blank'>
              <input
                type='hidden'
                name='hosted_button_id'
                value='6CPZ8SGGKXBJ4'
              />
              <button
                type='submit'
                className='mx-auto w-min px-2 py-1 rounded-xl mt-2 bg-stone-900'>
                Donate
              </button>
            </form>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
