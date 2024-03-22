"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { EyeOpenIcon, Pencil1Icon, StarIcon } from "@radix-ui/react-icons"
import { Switch } from "@/components/ui/switch"
import { BsCopy, BsSave} from "react-icons/bs"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea"
import MarkdownPreview from "@/components/markdown/MarkdownPreview"

const FormSchema = z.object({
	title: z.string().min(2, {
		message: "Title must be at least 2 characters.",
	}),
	image_url: z.string().url({
		message: "Invalid url.",
	}),
	content: z.string().min(2, {
		message: "Content must be at least 2 characters.",
	}),
	is_Published: z.boolean(),
	is_premium: z.boolean(),
	
})

export default function BlogForm() {

	const [isPreview, setPreview] = useState(false)

	const form = useForm<z.infer<typeof FormSchema>>({
        mode: "all",
		resolver: zodResolver(FormSchema),
		defaultValues: {
			title: "",
			content: "",
			image_url: "",
			is_premium: false,
			is_Published: true,
		},
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} 
				className="w-full border rounded-md space-y-6"
			>
				<div className="p-5 flex gap-5 items-center flex-wrap justify-between border-b ">
					<div className="flex gap-5 items-center">
						<span 
							role="button" 
							tabIndex={0} 
							className="flex items-center gap-1 border bg-zinc-700 p-2 rounded-md hover:ring-2 hover:ring-zinc-400"
							onClick={() => setPreview(!isPreview)}
						>
							{isPreview ? (
								<>
									<Pencil1Icon/>
									Edit
								</>
							) : (
								<>
									<EyeOpenIcon/>
									Preview
								</>
							) }
							
						</span>

						<FormField
							control={form.control}
							name="is_premium"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className="flex items-center gap-1 border bg-zinc-700 p-2 rounded-md">
											<StarIcon/>
											<span>Premium</span>
											<Switch 
                                                checked={field.value} 
                                                onCheckedChange={field.onChange} 
                                            />
										</div>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="is_Published"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className="flex items-center gap-1 border bg-zinc-700 p-2 rounded-md">
											<StarIcon/>
											<span>Publish</span>
											<Switch 
                                                checked={field.value} 
                                                onCheckedChange={field.onChange} 
                                            />
										</div>
									</FormControl>
								</FormItem>
							)}
							/>  
						</div>
					<Button 
                        className="flex items-center gap-1"
                        disabled={form.formState.isValid}
                    >
						<BsSave/>
						Save
					</Button>
				</div>


				{/* this is for the input */}
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormControl>
                                <div className={cn("p-2 w-full flex break-words gap-2", isPreview ? "divide-x-0" : "divide-x")}>
                                    <Input placeholder="title" {...field} 
                                        className={cn("border-none text-lg font-medium leading-relaxed", 
                                        isPreview 
                                            ? "w-0 p-0" 
                                            : "w-full lg:w-1/2")}
                                    />
                                    <div className={cn("lg:px-10", isPreview 
                                        ? "mx-auto w-full lg:w-4/5"
                                        : "w-1/2 lg:block hidden")}
                                    >
                                        <h1 className="text-3xl font-medium">{form.getValues().title}</h1>
                                    </div>
                                </div>
							</FormControl>
							{form.getFieldState("title").invalid &&
                                form.getValues().title && <FormMessage/>}
							<FormMessage />
						</FormItem>
					)}
				/>
                <FormField
					control={form.control}
					name="image_url"
					render={({ field }) => (
						<FormItem>
							<FormControl>
                                <div className={cn("p-2 w-full flex break-words gap-2", isPreview ? "divide-x-0" : "divide-x")}>
                                    <Input placeholder="url" {...field} 
                                        className={cn("border-none text-lg font-medium leading-relaxed", 
                                        isPreview 
                                            ? "w-0 p-0" 
                                            : "w-full lg:w-1/2")}
                                    />
                                    <div className={cn("lg:px-10", isPreview 
                                        ? "mx-auto w-full lg:w-4/5"
                                        : "w-1/2 lg:block hidden")}
                                    >
                                        {!isPreview ? 
										<>Clik o preview iamge</>
										: 
										<>
											<div className="relative h-80 mt-10 border rounded-md">
												<Image src={form.getValues().image_url} alt="preview" 
													fill className="object-cover object-center rounded-md"
												/>
											</div>
										</>}
                                    </div>
                                </div>
							</FormControl>
							{form.getFieldState("image_url").invalid &&
                                form.getValues().image_url && 
								<div className="p-2">
									<FormMessage/>
								</div>
								
								}
							<FormMessage />
						</FormItem>
					)}
				/>
				 <FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormControl>
                                <div className={cn(
									"p-2 w-full flex break-words gap-2", 
									isPreview ? "divide-x-0" : "divide-x h-70vh"
									)}
								>
                                    <Textarea placeholder="url" {...field} 
                                        className={
											cn("border-none text-lg font-medium leading-relaxed resize-none h-full", 
                                        isPreview 
                                            ? "w-0 p-0" 
                                            : "w-full lg:w-1/2")}
                                    />
                                     <div className={cn("lg:px-10", isPreview 
                                        ? "mx-auto w-full lg:w-4/5"
                                        : "w-1/2 lg:block hidden")}
                                    >
                                        <MarkdownPreview content={form.getValues().content} />
										
                                    </div>
                                </div>
							</FormControl>
							{form.getFieldState("content").invalid &&
                                form.getValues().content && 
								<div className="p-2">
									<FormMessage/>
								</div>
								
								}
							<FormMessage />
						</FormItem>
					)}
				/>


			</form>
		</Form>
	)
}
