import { cn } from '@/lib/utils'
import React from 'react'
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/agate.css"
import CopyButton from './CopyButton'
import { BsTerminal } from 'react-icons/bs'

export default function MarkdownPreview({
    content, className
}:{
    content: string,
    className?:string
}) {
    return (
        <Markdown 
            rehypePlugins={[rehypeHighlight]}
            className={cn("space-y-6", className)}
            components={{
                h1:({node, ...props}) => {
                    return <h1 {...props} className='text-3xl font-bold'/>
                },
                h2:({node, ...props}) => {
                    return <h1 {...props} className='text-2xl font-bold'/>
                },
                h3:({node, ...props}) => {
                    return <h1 {...props} className='text-xl font-bold'/>
                },
                code: ({node, className, children, ...props}) => {
                    
                    const match = /language-(\w+)/.exec(className || "")
                    if(match?.length){
                        let Icon = BsTerminal
                        return (
                            <div className='bg-gradient-dark text-gray-300 border rounded-md'>
                                <div className='px-5 py-2 border-b flex items-center justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <Icon/>
                                        <span>
                                            {
                                                //@ts-ignore
                                                node?.data?.meta
                                            }
                                        </span>
                                    </div>
                                </div>
                                <CopyButton />
                                <div className='overflow-x-auto w-full'>
                                    <div className='p-5'>
                                        {children}
                                    </div>
                                </div>
                            </div>
                        )
                    } else {

                        return (
                                <code className='bg-zinc-700 rounded-md 
                                px-2'>
                                    {children}
                                </code>
                            )
                            
                    }
                }
            }}
        >
            {content}
        </Markdown>
    )
}
