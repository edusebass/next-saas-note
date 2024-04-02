"use server"
import { BlogFormSchemaType } from "@/app/dashboard/schema"
import { revalidatePath } from "next/cache"
import createServerClientSupabase from "../supabase"

export async function createBlog (data: BlogFormSchemaType) {
  // this create the blog but only blog 
  const {["content"]:excludedKey, ...blog} = data
  const supabase = await createServerClientSupabase()

  const resultBlog = await supabase.from("blog").insert(blog).select("id").single()

  if(resultBlog.error) {
      return JSON.stringify(resultBlog)
  } else {
      const result = await supabase.from("blog_content").
      insert({blog_id:resultBlog.data.id!, content:data.content})

      revalidatePath(DASHBOARD)
      return JSON.stringify(result)     
  }
}

export async function readBlog() {
  // read the blogs
  const supabase = await createServerClientSupabase()
  return supabase.from("blog").select("*").eq("is_published", true).order("created_at", {ascending: true})
}

export async function readBlogAdmin() {
  // read the blogs
  const supabase = await createServerClientSupabase()
  return supabase.from("blog").select("*").order("created_at", {ascending: true})
}

const DASHBOARD = "/dashboard"
export async function deleteBlogById(blogId:string) {
  // this delete blog by id
  const supabase = await createServerClientSupabase()
  const result = await supabase.from("blog").delete().eq("id", blogId)
  revalidatePath(DASHBOARD)
  revalidatePath("/blog/" +  blogId)

  return JSON.stringify(result)
}

export async function updateBlogById(blogId:string, data:BlogFormSchemaType) {
  // this update blog for id
  const supabase = await createServerClientSupabase()
  const result = await supabase.from("blog").update(data).eq("id", blogId)
  revalidatePath(DASHBOARD)
  revalidatePath("/blog/" +  blogId)
  return JSON.stringify(result)
}

export async function readBlogContentById(blogId:string) {
  // this get read of the blog
  const supabase = await createServerClientSupabase()
  return supabase.from("blog").select("*, blog_content(*)").eq("id", blogId).single()
}

export async function updateBlogDetailById(blogId:string, data:BlogFormSchemaType) {
  const supabase = await createServerClientSupabase()
  const {["content"]:excludedKey, ...blog} = data

  // this get of dates of blog details
  const resultBlog = await supabase.from("blog").update(blog).eq("id", blogId)

  if (resultBlog.error) {
    return JSON.stringify(resultBlog)
  } else {
    // this update the blog
    const result = await supabase.from("blog_content").update({content: data.content}).eq("blog_id", blogId)
    revalidatePath(DASHBOARD)
    revalidatePath("/blog/" + blogId)
    return JSON.stringify(result)
  }
}


