import { GoogleMeetCardDemo } from "@/components/elevenlabs-demos";

export default function MeetUIPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-4 py-10">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Meet-style UI
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Glassmorphism card with one centered avatar, Google Meet style. Use the button to toggle the speaking state.
        </p>
      </div>
      <GoogleMeetCardDemo />
    </div>
  );
}
