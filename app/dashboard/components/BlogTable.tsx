import { EyeOpenIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

import React from 'react'
import {readBlogAdmin, updateBlogById } from '@/lib/actions/blog'
import DeleteAlert from './DeleteAlert'
import SwitchForm from './SwitchForm'
import { BlogFormSchemaType } from '../schema'
import Link from 'next/link'

export default async function BlogTable() {
    const {data: blogs } = await readBlogAdmin()
    console.log(blogs)
    return (
        <>
            <div className="rounded-md bg-graident-dark border-[0.5px] overflow-y-scroll ">
				<div className="w-[800px] md:w-full">
					<div className="grid grid-cols-5 border-b p-5 dark:text-gray-500">
						<h1 className=" col-span-2">Title</h1>
						<h1>Premium</h1>
						<h1>Publish</h1>
					</div>
                </div>
                {blogs?.map((blog, index) => {
                    const updatePremium = updateBlogById.bind(null, blog.id, {is_premium: !blog.is_premium} as BlogFormSchemaType)
                    const updatePublish = updateBlogById.bind(null, blog.id, {is_published: !blog.is_published} as BlogFormSchemaType)
                    return (
                        <div className=' grid grid-cols-5 p-5' key={index}>
                            <h1 className='col-span-2'>{blog.title}</h1>
                            <SwitchForm checked={blog.is_premium} name='premium' onToggle={updatePremium} />
                            <SwitchForm checked={blog.is_published} name='published' onToggle={updatePublish} />
                            
                            <Actions id={blog.id} />
                        </div>
                    )
                })}
                
            </div>
        </>
    )
}

const Actions = ({id}:{id:string} ) => {
    return (
        <div className=' flex items-center gap-2 flex-wrap'>
            <Link href={"/blog/" + id}>
                <Button variant="outline" className='flex items-center gap-2'>
                    <EyeOpenIcon/>
                    View
                </Button>
            </Link>
            <DeleteAlert blogId={id}  />
            <Link href={"/dashboard/blog/edit/" + id}>
                <Button variant="outline" className='flex items-center gap-2'>
                    <Pencil1Icon/>
                    Edit
                </Button>
            </Link>
        </div>
    )
}
