import { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { useEventStore } from "../../feature/event/store";
import { useParams } from "react-router-dom";

export default function NewsPage() {
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const { eventId } = useParams();
  const sendNews = useEventStore((state) => state.sendNews);
  console.log(msg);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendNews(+eventId!, { title, msg });
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Event News</h1>
        <p className="text-sm text-muted-foreground">
          Share updates and announcements with your event participants.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border bg-card p-6"
      >
        <div className="space-y-2">
          <Label htmlFor="title">Announcement Title</Label>
          <Input
            id="title"
            placeholder="e.g. Event schedule updated"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Write your announcement here..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            rows={6}
            required
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={!title.trim() || !msg.trim()}>
            Publish Announcement
          </Button>
        </div>
      </form>
    </div>
  );
}
