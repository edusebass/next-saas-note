import { EyeOpenIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

import React from 'react'

export default function BlogTable() {
    return (
        <>
            <div className="rounded-md bg-graident-dark">
				<div className="w-[800px] md:w-full">
					<div className="grid grid-cols-5 p-5 text-gray-500 border-b">
						<h1 className=" col-span-2">Title</h1>
						<h1>Premium</h1>
						<h1>Publish</h1>
					</div>
                </div>
                <div className=' grid grid-cols-5 p-5'>
                    <h1 className='col-span-2'>Bog title</h1>
                    <Switch checked={true}/>
                    <Switch checked={false}/>
                    <Actions/>
                </div>
            </div>
        </>
    )
}

const Actions = ( ) => {
    return (
        <div className=' flex items-center gap-2 flex-wrap'>
            <Button variant="outline" className='flex items-center gap-2'>
                <EyeOpenIcon/>
                View
            </Button>
            <Button variant="outline" className='flex items-center gap-2'>
                <TrashIcon/>
                Delete
            </Button>
            <Button variant="outline" className='flex items-center gap-2'>
                <Pencil1Icon/>
                Edit
            </Button>
        </div>
    )
}
