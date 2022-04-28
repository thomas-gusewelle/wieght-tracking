import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { supabase } from '../utils/supabaseClient';

import Link from 'next/link'


const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()  => {
    const user = supabase.auth.user();
    if (user) {
      router.push("dashboard");
    }
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      alert(JSON.stringify(error));
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="wrapper">
    <div className='flex justify-center'>
      <div className="max-w-lg w-full">
      <h1 className="text-3xl font-semibold text-center text-white">
          Welcome to Weight Tracker!
        </h1>
        <h1 className="text-3xl mt-2 font-semibold text-center text-white">
          Sign in to your account
        </h1>

        <div className="flex flex-col">
          <form className="flex flex-col p-6" onSubmit={handleSignIn}>
            <label htmlFor="email" className="text-gray-200">
              Email
            </label>
            <input
              className="py-2 px-4 rounded-md focus:outline-none focus:ring-2"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="mt-6 text-gray-200 ">
              Password
            </label>
            <input
              className="py-2 px-4 rounded-md focus:outline-none focus:ring-2"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="mt-10 text-lg text-white font-semibold bg-green-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2"
              type="submit"
            >
              Sign In
            </button>
          </form>
          <p className='mt-2 text-center text-white'>Dont have an account?
          <Link href='/signup'><span className='ml-1 cursor-pointer underline decoration-solid hover:text-green-500'>Sign Up</span></Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SignIn;
