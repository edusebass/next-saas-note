export type IBlogDetail =  {
    created_at: string;
    id: string;
    image_url: string | null;
    is_premium: boolean | null;
    is_published: boolean | null;
    title: string | null;
    blog_content: {
        blog_id: string;
        content: string;
        created_at: string;
    } | null;
} | null