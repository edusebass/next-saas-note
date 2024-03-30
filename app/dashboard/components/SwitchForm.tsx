"use client"
import { toast } from '@/components/ui/use-toast'
import { Switch } from '@/components/ui/switch'

import React from 'react'

export default function SwitchForm({
    checked, onToggle, name
}:{
    checked:boolean | null, 
    onToggle:()=>Promise<string>,
    name:string
}) {
    const onSubmit = async (e:any) => {
        e.preventDefault()
        const { error } =  JSON.parse(await onToggle())
        if(error?.message) {
            toast({
                title: "Failed update" +  name,
                description: (
                    <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                        <code className="text-white">{error?.message}</code>
                    </pre>
                ),
            })
        } else {
            toast({
                title: "Succesfully update" + name
            })
        }
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <Switch checked={checked || undefined} type='submit'/>
            </form>
        </>
    )
}
