import { z } from "zod"

export const BlogFormSchema = z.object({
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
	is_Premium: z.boolean(),
	
}).refine((data) => {
	const image_url = data.image_url
	try {
		const url = new URL(image_url)
		return url.hostname === "images.unsplash.com"
	} catch {
		return false
	}
}, {
	message: "Only we are supoort only the image wrom pixabay",
	path: ["image_url"]
})


export type BlogFormSchemaType = z.infer<typeof BlogFormSchema>
