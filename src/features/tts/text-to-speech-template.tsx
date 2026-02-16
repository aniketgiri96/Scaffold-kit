"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Volume2,
  ChevronUp,
  Bell,
  BookOpen,
  Smile,
  Mic,
  Languages,
  Film,
  Gamepad2,
  Radio,
  Flower2,
  X,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Download,
  MoreVertical,
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
  { label: "Narrate a story", icon: BookOpen, preview: "Once upon a time, in a land far away, there lived a brave knight who set out on a great adventure..." },
  { label: "Tell a silly joke", icon: Smile, preview: "Why did the scarecrow win an award? He was outstanding in his field." },
  { label: "Record an advertisement", icon: Mic, preview: "Introducing the all-new product that will change your life. Limited time offer—get yours today!" },
  { label: "Speak in different languages", icon: Languages, preview: "Hello, welcome! Bonjour, bienvenue! Hola, bienvenido! Discover the world in every language." },
  { label: "Direct a dramatic movie scene", icon: Film, preview: "The hero stands at the edge of the cliff. The wind howls. He turns slowly. 'This ends now.'" },
  { label: "Hear from a video game character", icon: Gamepad2, preview: "Player, the fate of the realm rests on your shoulders. Will you accept this quest?" },
  { label: "Introduce your podcast", icon: Radio, preview: "Welcome to the show! Today we're diving into a topic that will surprise you. Let's get started." },
  { label: "Guide a meditation class", icon: Flower2, preview: "Find a comfortable seat. Close your eyes. Take a deep breath in... and slowly release. Let your body relax." },
];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export interface TextToSpeechTemplateProps {
  onSuggestionSelect?: (label: string) => void;
  className?: string;
}

export function TextToSpeechTemplate({
  onSuggestionSelect,
  className,
}: TextToSpeechTemplateProps) {
  const [text, setText] = useState("");
  const [hoveredSuggestion, setHoveredSuggestion] = useState<string | null>(null);
  const [voice, setVoice] = useState("rachel");
  const [model, setModel] = useState("multilingual_v2");
  const [speed, setSpeed] = useState([50]);
  const [stability, setStability] = useState([50]);
  const [similarity, setSimilarity] = useState([75]);
  const [styleExaggeration, setStyleExaggeration] = useState([50]);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(3);
  const [duration] = useState(9);
  const [promoDismissed, setPromoDismissed] = useState(false);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSuggestionClick = (label: string) => {
    setText((prev) => (prev ? `${prev}\n\n` : "") + `Try: ${label.toLowerCase()}.`);
    onSuggestionSelect?.(label);
  };

  const handleRewind = () => setCurrentTime((t) => Math.max(0, t - 10));
  const handleForward = () => setCurrentTime((t) => Math.min(duration, t + 10));
  const handlePlayPause = () => setPlaying((p) => !p);

  const previewFor = (label: string) => defaultSuggestions.find((s) => s.label === label)?.preview ?? "";
  const displayValue = hoveredSuggestion ? previewFor(hoveredSuggestion) : text;

  return (
    <motion.div
      initial={rootVariants.initial}
      animate={rootVariants.animate}
      transition={rootTransition}
      className={cn(
        "flex w-full max-w-5xl flex-col rounded-xl overflow-hidden shadow-lg border border-border",
        "bg-gradient-to-b from-background to-muted/20",
        "min-h-[400px] h-[100dvh] md:h-[600px] md:min-h-0 mx-auto",
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
            <Volume2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          </div>
          <h1 className="font-semibold text-sm sm:text-base truncate">Text to Speech</h1>
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
              placeholder="Start typing here or paste any text you want to turn into lifelike speech..."
              className="h-full min-h-[80px] sm:min-h-[100px] resize-none rounded-lg border border-border bg-muted/20 bg-gradient-to-b from-muted/10 to-muted/20 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 text-sm sm:text-base"
              value={displayValue}
              onChange={(e) => {
                setHoveredSuggestion(null);
                setText(e.target.value);
              }}
              onFocus={() => setHoveredSuggestion(null)}
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

        {/* Right: Settings sidebar — full width when stacked on mobile */}
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
                            <Volume2 className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">Pro tip</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Adjust sliders to fine-tune expression and clarity.
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
                  <p className="text-xs font-medium text-muted-foreground">Voice</p>
                  <Select value={voice} onValueChange={setVoice}>
                    <SelectTrigger className="h-10 w-full rounded-lg">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 rounded-full bg-pink-500/20">
                          <AvatarFallback className="text-[10px] text-pink-600">R</AvatarFallback>
                        </Avatar>
                        <SelectValue placeholder="Voice" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rachel">Rachel</SelectItem>
                      <SelectItem value="adam">Adam</SelectItem>
                      <SelectItem value="bella">Bella</SelectItem>
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
                      <SelectItem value="multilingual_v2">Multilingual v2</SelectItem>
                      <SelectItem value="turbo_v2">Turbo v2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Speed</span>
                      <span className="text-foreground text-[10px]">Slower — Faster</span>
                    </div>
                    <Slider value={speed} onValueChange={setSpeed} max={100} step={1} className="w-full" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Stability</span>
                      <span className="text-foreground text-[10px]">More variable — More stable</span>
                    </div>
                    <Slider value={stability} onValueChange={setStability} max={100} step={1} className="w-full" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Similarity</span>
                      <span className="text-foreground text-[10px]">Low — High</span>
                    </div>
                    <Slider value={similarity} onValueChange={setSimilarity} max={100} step={1} className="w-full" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-xs font-medium text-muted-foreground">Style Exaggeration</p>
                    <Slider value={styleExaggeration} onValueChange={setStyleExaggeration} max={100} step={1} className="w-full" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="history" className="m-0 p-1.5 sm:p-2 flex-1 min-h-0 overflow-hidden flex items-center justify-center">
                <p className="text-sm text-muted-foreground text-center">No history yet.</p>
              </TabsContent>
          </Tabs>
        </motion.aside>
      </div>

      {/* Bottom audio bar */}
      <motion.footer
        initial="initial"
        animate="animate"
        variants={footerVariants}
        className="flex items-center gap-2 sm:gap-4 border-t border-border px-2 py-1.5 sm:px-4 sm:py-3 shrink-0 bg-gradient-to-r from-muted/20 via-muted/30 to-muted/20"
      >
        <div className="min-w-0 shrink hidden sm:block w-20 md:w-auto">
          <p className="text-xs sm:text-sm font-medium truncate">Default voice</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground truncate">Preview</p>
        </div>
        <div className="flex flex-1 flex-col items-center gap-1 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 w-full max-w-md justify-center">
            <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 shrink-0" onClick={handleRewind} aria-label="Rewind 10s">
              <SkipBack className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full bg-primary/20 hover:bg-primary/30" onClick={handlePlayPause} aria-label={playing ? "Pause" : "Play"}>
                {playing ? <Pause className="h-4 w-4 sm:h-5 sm:w-5 text-primary" /> : <Play className="h-4 w-4 sm:h-5 sm:w-5 text-primary ml-0.5" />}
              </Button>
            </motion.div>
            <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 shrink-0" onClick={handleForward} aria-label="Forward 10s">
              <SkipForward className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 w-full max-w-md">
            <span className="text-[10px] sm:text-xs text-muted-foreground tabular-nums w-6 sm:w-8">{formatTime(currentTime)}</span>
            <motion.div
              className="flex-1 rounded-full overflow-hidden min-w-0"
              animate={{
                boxShadow: playing ? "0 0 12px hsl(var(--primary) / 0.25)" : "0 0 0 transparent",
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Progress value={progressPercent} className="h-1.5" />
            </motion.div>
            <span className="text-[10px] sm:text-xs text-muted-foreground tabular-nums w-6 sm:w-8">{formatTime(duration)}</span>
          </div>
        </div>
        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" aria-label="Download">
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
