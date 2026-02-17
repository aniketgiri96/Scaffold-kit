import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

const VOICE_SLUGS = [
  "bar-visualizer",
  "conversation",
  "live-waveform",
  "message",
  "mic-selector",
  "orb",
  "response",
  "shimmering-text",
  "speech-input",
  "transcript-viewer",
  "voice-button",
  "voice-picker",
  "waveform",
] as const;

type VoiceSlug = (typeof VOICE_SLUGS)[number];

const SRC = join(process.cwd(), "src");

/** Metadata and file mapping for each Voice component. */
const VOICE_ENTRIES: Record<
  VoiceSlug,
  {
    title: string;
    description: string;
    files: { srcPath: string; path: string }[];
    registryDependencies: string[];
    dependencies: string[];
  }
> = {
  "bar-visualizer": {
    title: "Bar Visualizer",
    description:
      "Animated frequency bars for voice assistant states (listening, speaking, etc.).",
    files: [{ srcPath: "components/ui/bar-visualizer.tsx", path: "src/components/ui/bar-visualizer.tsx" }],
    registryDependencies: [],
    dependencies: ["lucide-react"],
  },
  conversation: {
    title: "Conversation",
    description:
      "Scrollable conversation container with stick-to-bottom and empty state.",
    files: [{ srcPath: "components/ui/conversation.tsx", path: "src/components/ui/conversation.tsx" }],
    registryDependencies: ["button"],
    dependencies: ["use-stick-to-bottom", "lucide-react"],
  },
  "live-waveform": {
    title: "Live Waveform",
    description: "Real-time waveform visualization from microphone or audio stream.",
    files: [{ srcPath: "components/ui/live-waveform.tsx", path: "src/components/ui/live-waveform.tsx" }],
    registryDependencies: [],
    dependencies: ["lucide-react"],
  },
  message: {
    title: "Message",
    description: "Chat message bubble with user/assistant variants and avatar.",
    files: [{ srcPath: "components/ui/message.tsx", path: "src/components/ui/message.tsx" }],
    registryDependencies: ["avatar"],
    dependencies: ["class-variance-authority", "lucide-react"],
  },
  "mic-selector": {
    title: "Mic Selector",
    description: "Dropdown to select microphone device with mute and live waveform.",
    files: [{ srcPath: "components/ui/mic-selector.tsx", path: "src/components/ui/mic-selector.tsx" }],
    registryDependencies: ["button", "dropdown-menu"],
    dependencies: ["lucide-react"],
  },
  orb: {
    title: "Orb",
    description: "3D orb visualization that reacts to agent state and volume.",
    files: [{ srcPath: "components/ui/orb.tsx", path: "src/components/ui/orb.tsx" }],
    registryDependencies: [],
    dependencies: ["@react-three/drei", "@react-three/fiber", "three", "lucide-react"],
  },
  response: {
    title: "Response",
    description: "Streaming markdown response renderer for AI replies.",
    files: [{ srcPath: "components/ui/response.tsx", path: "src/components/ui/response.tsx" }],
    registryDependencies: [],
    dependencies: ["streamdown"],
  },
  "shimmering-text": {
    title: "Shimmering Text",
    description: "Text with a shimmer animation effect.",
    files: [{ srcPath: "components/ui/shimmering-text.tsx", path: "src/components/ui/shimmering-text.tsx" }],
    registryDependencies: [],
    dependencies: ["motion", "lucide-react"],
  },
  "speech-input": {
    title: "Speech Input",
    description: "Microphone input with real-time transcription via ElevenLabs Scribe.",
    files: [
      { srcPath: "components/ui/speech-input.tsx", path: "src/components/ui/speech-input.tsx" },
      { srcPath: "hooks/use-scribe.ts", path: "src/hooks/use-scribe.ts" },
    ],
    registryDependencies: ["button"],
    dependencies: ["framer-motion", "lucide-react"],
  },
  "transcript-viewer": {
    title: "Transcript Viewer",
    description: "Word-level transcript viewer synced with audio playback.",
    files: [
      { srcPath: "components/ui/transcript-viewer.tsx", path: "src/components/ui/transcript-viewer.tsx" },
      { srcPath: "hooks/use-transcript-viewer.ts", path: "src/hooks/use-transcript-viewer.ts" },
      { srcPath: "components/ui/scrub-bar.tsx", path: "src/components/ui/scrub-bar.tsx" },
    ],
    registryDependencies: ["button", "progress"],
    dependencies: ["@elevenlabs/elevenlabs-js", "lucide-react"],
  },
  "voice-button": {
    title: "Voice Button",
    description: "Button for voice recording with state (idle, recording, processing).",
    files: [{ srcPath: "components/ui/voice-button.tsx", path: "src/components/ui/voice-button.tsx" }],
    registryDependencies: ["button"],
    dependencies: ["lucide-react"],
  },
  "voice-picker": {
    title: "Voice Picker",
    description: "Dropdown to select an ElevenLabs voice with preview.",
    files: [
      { srcPath: "components/ui/voice-picker.tsx", path: "src/components/ui/voice-picker.tsx" },
      { srcPath: "components/ui/audio-player.tsx", path: "src/components/ui/audio-player.tsx" },
    ],
    registryDependencies: ["button", "popover", "command"],
    dependencies: ["@elevenlabs/elevenlabs-js", "lucide-react"],
  },
  waveform: {
    title: "Waveform",
    description: "Static or scrolling waveform from numeric data.",
    files: [{ srcPath: "components/ui/waveform.tsx", path: "src/components/ui/waveform.tsx" }],
    registryDependencies: [],
    dependencies: ["lucide-react"],
  },
};

function isVoiceSlug(name: string): name is VoiceSlug {
  return (VOICE_SLUGS as readonly string[]).includes(name);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name: rawName } = await params;
  const name = rawName.replace(/\.json$/i, "");

  if (!isVoiceSlug(name)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const entry = VOICE_ENTRIES[name];
  const files: { path: string; type: "registry:block"; content: string }[] = [];

  for (const { srcPath, path: outPath } of entry.files) {
    const fullPath = join(SRC, srcPath);
    if (!existsSync(fullPath)) {
      return NextResponse.json(
        { error: `Source file missing: ${srcPath}` },
        { status: 500 }
      );
    }
    const content = readFileSync(fullPath, "utf8");
    files.push({
      path: outPath,
      type: "registry:block",
      content,
    });
  }

  const registryItem = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type: "registry:block" as const,
    title: entry.title,
    description: entry.description,
    registryDependencies: entry.registryDependencies,
    dependencies: entry.dependencies,
    files,
  };

  return NextResponse.json(registryItem, {
    headers: { "Content-Type": "application/json" },
  });
}
