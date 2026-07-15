import { BlogForm } from "@/components/admin/blog-form";
import { createBlogPost } from "@/lib/actions/blog";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">New Blog Post</h1>
      <div className="mt-8">
        <BlogForm action={createBlogPost} submitLabel="Create Post" />
      </div>
    </div>
  );
}
