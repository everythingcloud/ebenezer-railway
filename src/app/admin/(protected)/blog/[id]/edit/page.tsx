import { notFound } from "next/navigation";
import { BlogForm } from "@/components/admin/blog-form";
import { updateBlogPost } from "@/lib/actions/blog";
import { prisma } from "@/lib/prisma";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">Edit Blog Post</h1>
      <div className="mt-8">
        <BlogForm
          action={updateBlogPost.bind(null, id)}
          post={post}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
