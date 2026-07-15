import { AnnouncementForm } from "@/components/admin/announcement-form";
import { createAnnouncement } from "@/lib/actions/announcements";

export default function NewAnnouncementPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">New Announcement</h1>
      <div className="mt-8">
        <AnnouncementForm action={createAnnouncement} submitLabel="Publish" />
      </div>
    </div>
  );
}
