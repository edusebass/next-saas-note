"use client"
import Link from 'next/link'
import React, { use } from 'react'
import { Button } from '../ui/button'
import { FaGithub } from "react-icons/fa";
import LoginForm from './LoginForm';
import { useUser } from '@/lib/store/user';
import Profile from './Profile';

export default function Navbar() {
  const user = useUser((state) => state.user)

  return (
    <nav className='flex items-center justify-between'>
        <div className='group'>
            <Link href="/" className='text-2xl font-bold'>Daily Blog</Link>
            <div className='h-1 w-0 group-hover:w-full transition-all bg-green-500'></div>
        </div>
        {user ? <Profile/> : <LoginForm />}
        
    </nav>
  )
}
