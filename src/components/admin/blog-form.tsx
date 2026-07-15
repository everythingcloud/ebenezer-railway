type BlogPost = {
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string | null;
  isPublished: boolean;
};

export function BlogForm({
  action,
  post,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  post?: BlogPost;
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6">
      <div>
        <label htmlFor="title" className="text-sm font-semibold">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={post?.title}
          className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="text-sm font-semibold">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={2}
          defaultValue={post?.excerpt}
          className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="content" className="text-sm font-semibold">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={12}
          defaultValue={post?.content}
          className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="coverImageUrl" className="text-sm font-semibold">
          Cover Image URL (optional)
        </label>
        <input
          id="coverImageUrl"
          name="coverImageUrl"
          defaultValue={post?.coverImageUrl ?? ""}
          className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="isPublished"
          type="checkbox"
          name="isPublished"
          defaultChecked={post?.isPublished ?? false}
          className="h-4 w-4 rounded border-border text-primary"
        />
        <label htmlFor="isPublished" className="text-sm">
          Published (visible on the public site)
        </label>
      </div>

      <button
        type="submit"
        className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
      >
        {submitLabel}
      </button>
    </form>
  );
}
