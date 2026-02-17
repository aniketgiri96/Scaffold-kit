"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Mic,
  Bell,
  X,
  Square,
  Copy,
  Download,
  MoreVertical,
  Video,
  FileText,
  MessageSquare,
  Headphones,
  MicOff,
  GraduationCap,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";

const rootTransition = { duration: 0.35, ease: "easeOut" as const };
const rootVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

const suggestionContainerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const suggestionItemVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
};

const sectionTransition = { duration: 0.28, ease: "easeOut" as const };
const headerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { delay: 0.06, ...sectionTransition } },
};
const mainLeftVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { delay: 0.1, ...sectionTransition } },
};
const sidebarVariants = {
  initial: { opacity: 0, x: 6 },
  animate: { opacity: 1, x: 0, transition: { delay: 0.14, ...sectionTransition } },
};
const footerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { delay: 0.2, ...sectionTransition } },
};

const defaultSuggestions = [
  { label: "Transcribe meeting", icon: MessageSquare, preview: "Welcome everyone to the Q3 planning call. Let's review the key metrics from last quarter and align on next steps..." },
  { label: "Dictate notes", icon: FileText, preview: "Action items: schedule follow-up with design by Friday, send draft to legal for review, update the project timeline in Notion." },
  { label: "Caption video", icon: Video, preview: "[00:01] In this tutorial we'll walk through the setup. [00:05] First, open your terminal and run the install command." },
  { label: "Interview", icon: Mic, preview: "Interviewer: Can you tell me about your experience with distributed systems? Candidate: Sure. I've led several projects at scale..." },
  { label: "Podcast", icon: Headphones, preview: "Host: Today we're joined by Dr. Smith to discuss climate tech. Guest: Thanks for having me. The field has changed dramatically in the last five years." },
  { label: "Voice memo", icon: MicOff, preview: "Reminder to self: pick up dry cleaning, call Mom this weekend, and finish the proposal by Tuesday. End of memo." },
  { label: "Lecture", icon: GraduationCap, preview: "So to summarize, the three main factors are cost, latency, and reliability. In the next section we'll look at how to measure each." },
  { label: "Customer call", icon: Phone, preview: "Agent: How can I help you today? Customer: I'm having trouble with my order. Agent: I'd be happy to look into that. Can I get your order number?" },
];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export interface SpeechToTextTemplateProps {
  onSuggestionSelect?: (label: string) => void;
  className?: string;
}

export function SpeechToTextTemplate({
  onSuggestionSelect,
  className,
}: SpeechToTextTemplateProps) {
  const [transcript, setTranscript] = useState("");
  const [hoveredSuggestion, setHoveredSuggestion] = useState<string | null>(null);
  const [language, setLanguage] = useState("en");
  const [model, setModel] = useState("whisper_large");
  const [recording, setRecording] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [promoDismissed, setPromoDismissed] = useState(false);

  const tick = useCallback(() => {
    setElapsedSeconds((s) => s + 1);
  }, []);

  useEffect(() => {
    if (!recording) return;
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [recording, tick]);

  const handleSuggestionClick = (label: string) => {
    const preview = defaultSuggestions.find((s) => s.label === label)?.preview ?? "";
    setTranscript((prev) => (prev ? `${prev}\n\n${preview}` : preview));
    setHoveredSuggestion(null);
    onSuggestionSelect?.(label);
  };

  const handleRecordToggle = () => {
    if (recording) {
      setRecording(false);
      setTranscript((prev) =>
        prev
          ? `${prev}\n\n[Recording ${formatTime(elapsedSeconds)} — transcript would appear here when using a real STT API.]`
          : `[Recording ${formatTime(elapsedSeconds)} — transcript would appear here when using a real STT API.]`
      );
      setElapsedSeconds(0);
    } else {
      setRecording(true);
      setElapsedSeconds(0);
    }
  };

  const handleCopy = () => {
    if (transcript) void navigator.clipboard.writeText(transcript);
  };

  const handleDownload = () => {
    if (!transcript) return;
    const blob = new Blob([transcript], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transcript-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const previewFor = (label: string) =>
    defaultSuggestions.find((s) => s.label === label)?.preview ?? "";
  const displayValue = hoveredSuggestion ? previewFor(hoveredSuggestion) : transcript;
  const hasTranscript = transcript.length > 0;

  return (
    <motion.div
      initial={rootVariants.initial}
      animate={rootVariants.animate}
      transition={rootTransition}
      className={cn(
        "flex w-full max-w-5xl flex-col rounded-xl overflow-hidden shadow-lg border border-border",
        "bg-gradient-to-b from-background to-muted/20",
        "min-h-[400px] h-[100dvh] md:h-[600px] md:min-h-0",
        "mx-auto",
        className
      )}
    >
      {/* Header */}
      <motion.header
        initial="initial"
        animate="animate"
        variants={headerVariants}
        className="flex items-center justify-between border-b border-border px-2 py-1.5 sm:px-4 sm:py-3 shrink-0"
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md bg-primary/20 shrink-0">
            <Mic className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          </div>
          <h1 className="font-semibold text-sm sm:text-base truncate">Speech to Text</h1>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 text-muted-foreground" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
          <Avatar className="h-7 w-7 sm:h-8 sm:w-8 border border-border">
            <AvatarFallback className="text-xs bg-muted text-muted-foreground">U</AvatarFallback>
          </Avatar>
        </div>
      </motion.header>

      {/* Main: stack on mobile, row on md+ */}
      <div className="flex flex-1 min-h-0 overflow-hidden flex-col md:flex-row">
        <motion.div
          initial="initial"
          animate="animate"
          variants={mainLeftVariants}
          className="flex flex-1 flex-col min-w-0 min-h-0 p-2 sm:p-4 gap-2 sm:gap-3 overflow-hidden"
        >
          <div className="flex-1 min-h-[120px] flex flex-col">
            <Textarea
              placeholder="Start speaking or paste a recording—your transcript will appear here."
              className="h-full min-h-[80px] sm:min-h-[100px] resize-none rounded-lg border border-border bg-muted/20 bg-gradient-to-b from-muted/10 to-muted/20 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 text-sm sm:text-base"
              value={displayValue}
              onChange={(e) => {
                setHoveredSuggestion(null);
                setTranscript(e.target.value);
              }}
              onFocus={() => setHoveredSuggestion(null)}
              readOnly={!!hoveredSuggestion}
            />
          </div>
          <div className="shrink-0 space-y-1 sm:space-y-1.5">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground">Get started with</p>
            <motion.div
              className="flex flex-wrap gap-1.5 sm:gap-2 max-h-[88px] sm:max-h-none overflow-y-auto overflow-x-hidden"
              variants={suggestionContainerVariants}
              initial="initial"
              animate="animate"
            >
              {defaultSuggestions.map(({ label, icon: Icon }) => (
                <motion.div key={label} variants={suggestionItemVariants}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full gap-1 sm:gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm h-8 sm:h-9 px-2.5 sm:px-3"
                    onClick={() => handleSuggestionClick(label)}
                    onMouseEnter={() => setHoveredSuggestion(label)}
                    onMouseLeave={() => setHoveredSuggestion(null)}
                  >
                    <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                    <span className="truncate max-w-[140px] sm:max-w-none">{label}</span>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.aside
          initial="initial"
          animate="animate"
          variants={sidebarVariants}
          className="w-full md:w-[280px] md:min-w-[280px] md:h-full shrink-0 border-t md:border-t-0 md:border-l border-border flex flex-col overflow-hidden bg-gradient-to-b from-muted/10 to-muted/30 max-h-[240px] md:max-h-none"
        >
          <Tabs defaultValue="settings" className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="shrink-0 px-2 sm:px-3 pt-1.5 sm:pt-3 pb-0 border-border">
              <TabsList className="w-full grid grid-cols-2 h-8 sm:h-9">
                <TabsTrigger value="settings" className="text-xs">Settings</TabsTrigger>
                <TabsTrigger value="history" className="text-xs">History</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="settings" className="m-0 p-1.5 sm:p-2 flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col gap-2">
              <AnimatePresence>
                {!promoDismissed && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <Card className="overflow-hidden border-border bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
                      <CardContent className="p-2 flex items-start gap-2">
                        <div className="h-10 w-10 rounded-lg bg-primary/20 shrink-0 flex items-center justify-center">
                          <Mic className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">Pro tip</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Choose a language or use Auto for best accuracy across mixed speech.
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 shrink-0 text-muted-foreground hover:text-foreground"
                          onClick={() => setPromoDismissed(true)}
                          aria-label="Dismiss"
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="shrink-0 space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Language</p>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="h-10 w-full rounded-lg">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="shrink-0 space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Model</p>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger className="h-10 w-full rounded-lg">
                    <SelectValue placeholder="Model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whisper_large">Whisper large</SelectItem>
                    <SelectItem value="whisper_base">Whisper base</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            <TabsContent value="history" className="m-0 p-1.5 sm:p-2 flex-1 min-h-0 overflow-hidden flex items-center justify-center">
              <p className="text-sm text-muted-foreground text-center">No transcriptions yet.</p>
            </TabsContent>
          </Tabs>
        </motion.aside>
      </div>

      {/* Bottom recording bar */}
      <motion.footer
        initial="initial"
        animate="animate"
        variants={footerVariants}
        className="flex items-center gap-2 sm:gap-4 border-t border-border px-2 py-1.5 sm:px-4 sm:py-3 shrink-0 bg-gradient-to-r from-muted/20 via-muted/30 to-muted/20"
      >
        <div className="min-w-0 shrink hidden sm:block w-20 md:w-auto">
          <p className="text-xs sm:text-sm font-medium truncate">
            {recording ? "Recording" : "Default model"}
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
            {recording ? formatTime(elapsedSeconds) : "Speech to text"}
          </p>
        </div>
        <div className="flex flex-1 flex-col items-center gap-0.5 min-w-0 justify-center">
          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-10 w-10 shrink-0 rounded-full",
                recording
                  ? "bg-destructive/20 hover:bg-destructive/30"
                  : "bg-primary/20 hover:bg-primary/30"
              )}
              onClick={handleRecordToggle}
              aria-label={recording ? "Stop recording" : "Start recording"}
            >
              {recording ? (
                <Square className="h-5 w-5 text-destructive fill-destructive" />
              ) : (
                <Mic className="h-5 w-5 text-primary" />
              )}
            </Button>
          </motion.div>
          <p className="text-[10px] text-muted-foreground tabular-nums sm:hidden">
            {recording ? formatTime(elapsedSeconds) : "STT"}
          </p>
        </div>
        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9"
            aria-label="Copy transcript"
            disabled={!hasTranscript}
            onClick={handleCopy}
          >
            <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9"
            aria-label="Download transcript"
            disabled={!hasTranscript}
            onClick={handleDownload}
          >
            <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" aria-label="More options">
                <MoreVertical className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.footer>
    </motion.div>
  );
}
