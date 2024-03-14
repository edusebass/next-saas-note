"use client"
import { cn } from '@/lib/utils'
import { PersonIcon, ReaderIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function NavLinks() {
    // This is for obtaining of pathanem actual
    const pathname = usePathname()

    // links for the table
    const links = [
        {
            href: "/dashboard",
            text: "dashboard",
            Icon: ReaderIcon
        },
        {
            href: "/dashboard/user",
            text: "user",
            Icon: PersonIcon
        },
    ]

    return (
        <div className='flex items-center gap-5 border-b-2 pb-2 '>
            {links.map(({href, text, Icon}, index)=>{
                return (
                    <Link 
                        href={href} 
                        key={index} 
                        className={cn("flex items-center gap-1 hover:underl ine transition-all",{"text-green-500 underline" : pathname === href})}>
                        <Icon/>
                        {text}
                    </Link>
                )
            })}
        </div>
    )
}
