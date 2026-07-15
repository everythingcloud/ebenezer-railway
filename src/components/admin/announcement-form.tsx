type Announcement = {
  title: string;
  body: string;
  isPublished: boolean;
  expiresAt: Date | null;
};

export function AnnouncementForm({
  action,
  announcement,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  announcement?: Announcement;
  submitLabel: string;
}) {
  const expiresValue = announcement?.expiresAt
    ? new Date(announcement.expiresAt).toISOString().slice(0, 10)
    : "";

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
          defaultValue={announcement?.title}
          className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="body" className="text-sm font-semibold">
          Message
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={6}
          defaultValue={announcement?.body}
          className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="expiresAt" className="text-sm font-semibold">
          Expires (optional)
        </label>
        <input
          id="expiresAt"
          type="date"
          name="expiresAt"
          defaultValue={expiresValue}
          className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="isPublished"
          type="checkbox"
          name="isPublished"
          defaultChecked={announcement?.isPublished ?? true}
          className="h-4 w-4 rounded border-border text-primary"
        />
        <label htmlFor="isPublished" className="text-sm">
          Visible on the public site
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
