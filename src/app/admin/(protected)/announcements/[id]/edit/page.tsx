import { notFound } from "next/navigation";
import { AnnouncementForm } from "@/components/admin/announcement-form";
import { updateAnnouncement } from "@/lib/actions/announcements";
import { prisma } from "@/lib/prisma";

export default async function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const announcement = await prisma.announcement.findUnique({ where: { id } });

  if (!announcement) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">Edit Announcement</h1>
      <div className="mt-8">
        <AnnouncementForm
          action={updateAnnouncement.bind(null, id)}
          announcement={announcement}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
