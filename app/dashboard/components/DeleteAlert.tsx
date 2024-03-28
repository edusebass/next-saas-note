"use client"
import { Button } from '@/components/ui/button'
import { TrashIcon } from '@radix-ui/react-icons'
import React, { startTransition, useTransition } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { deleteBlogById } from '@/lib/actions/blog'
import { toast } from '@/components/ui/use-toast'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { cn } from '@/lib/utils'

export default function DeleteAlert({ blogId }: { blogId:string }) {
    const [ispending, startTransition] = useTransition()

    const onSubmit = async (e:any) => {
        e.preventDefault()
        startTransition(async () => {
            const result = await deleteBlogById(blogId)
            const {error} = JSON.parse(result)
            if(error?.message) {
                toast({
                    title: "Failed delete blog",
                    description: (
                        <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                            <code className="text-white">{error?.message}</code>
                        </pre>
                    ),
                })
            } else {
                toast({
                    title: "Succesfully delete"
                })
            }

        })
    }

  return (
    <>
        <AlertDialog>
            <AlertDialogTrigger>
                <Button variant="outline" className='flex items-center gap-2'>
                    <TrashIcon/>
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>
                    <form onSubmit={onSubmit}>
                        <Button className='flex items-center gap-2'>
                            <AiOutlineLoading3Quarters 
                                className={cn("animate-spin",
                                {
                                    hidden: !ispending
                                })}
                            />
                            Continue
                        </Button>
                    </form>
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
        
  )
}
