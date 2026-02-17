"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import type { CharacterAlignmentResponseModel } from "@elevenlabs/elevenlabs-js/api/types/CharacterAlignmentResponseModel";

export interface TranscriptWord {
  text: string;
  start: number;
  end: number;
  segmentIndex: number;
}

export type TranscriptSegment =
  | { kind: "word"; segmentIndex: number; text: string; start: number; end: number }
  | { kind: "gap"; segmentIndex: number; text: string };

export type SegmentComposer = (
  segments: TranscriptSegment[]
) => TranscriptSegment[];

export interface UseTranscriptViewerOptions {
  alignment: CharacterAlignmentResponseModel;
  segmentComposer?: SegmentComposer;
  hideAudioTags?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onTimeUpdate?: (time: number) => void;
  onEnded?: () => void;
  onDurationChange?: (duration: number) => void;
}

export interface UseTranscriptViewerResult {
  audioRef: RefObject<HTMLAudioElement | null>;
  spokenSegments: TranscriptSegment[];
  unspokenSegments: TranscriptSegment[];
  currentWord: (TranscriptSegment & { kind: "word" }) | null;
  segments: TranscriptSegment[];
  words: TranscriptWord[];
  duration: number;
  currentTime: number;
  currentWordIndex: number;
  currentSegmentIndex: number;
  isPlaying: boolean;
  isScrubbing: boolean;
  play: () => void;
  pause: () => void;
  seekToTime: (time: number) => void;
  seekToWord: (word: TranscriptWord) => void;
  startScrubbing: () => void;
  endScrubbing: () => void;
}

function alignmentToSegments(
  alignment: CharacterAlignmentResponseModel,
  hideAudioTags: boolean
): TranscriptSegment[] {
  const chars = alignment.characters ?? [];
  const starts =
    (alignment as unknown as { character_start_times_seconds?: number[] })
      .character_start_times_seconds ??
    alignment.characterStartTimesSeconds ??
    [];
  const ends =
    (alignment as unknown as { character_end_times_seconds?: number[] })
      .character_end_times_seconds ??
    alignment.characterEndTimesSeconds ??
    [];

  const segments: TranscriptSegment[] = [];
  let wordStart = -1;
  let wordStartTime = 0;
  let segmentIndex = 0;

  for (let i = 0; i <= chars.length; i++) {
    const isSpace = i < chars.length && /\s/.test(chars[i]!);
    const char = i < chars.length ? chars[i]! : "";

    if (isSpace || i === chars.length) {
      if (wordStart >= 0) {
        const text = chars
          .slice(wordStart, i)
          .join("")
          .replace(/\[[\w\s]+\]/g, hideAudioTags ? () => "" : (m: string) => m);
        if (text.length > 0) {
          segments.push({
            kind: "word",
            segmentIndex: segmentIndex++,
            text,
            start: starts[wordStart] ?? 0,
            end: ends[i - 1] ?? 0,
          });
        }
        wordStart = -1;
      }
      if (char && (i < chars.length || segments.length > 0)) {
        segments.push({
          kind: "gap",
          segmentIndex: segmentIndex++,
          text: char,
        });
      }
    } else if (wordStart < 0) {
      wordStart = i;
      wordStartTime = starts[i] ?? 0;
    }
  }

  return segments;
}

export function useTranscriptViewer(
  options: UseTranscriptViewerOptions
): UseTranscriptViewerResult {
  const {
    alignment,
    segmentComposer,
    hideAudioTags = true,
    onPlay,
    onPause,
    onTimeUpdate,
    onEnded,
    onDurationChange,
  } = options;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);

  const segments = useMemo(() => {
    let s = alignmentToSegments(alignment, hideAudioTags);
    if (segmentComposer) s = segmentComposer(s);
    return s;
  }, [alignment, hideAudioTags, segmentComposer]);

  const words = useMemo(
    () =>
      segments
        .filter((s): s is TranscriptSegment & { kind: "word" } => s.kind === "word")
        .map((s) => ({
          text: s.text,
          start: s.start,
          end: s.end,
          segmentIndex: s.segmentIndex,
        })),
    [segments]
  );

  const { spokenSegments, unspokenSegments, currentWord, currentWordIndex, currentSegmentIndex } =
    useMemo(() => {
      let spoken: TranscriptSegment[] = [];
      let unspoken: TranscriptSegment[] = [];
      let current: (TranscriptSegment & { kind: "word" }) | null = null;
      let wordIdx = -1;
      let segIdx = -1;

      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i]!;
        if (seg.kind === "word") {
          if (currentTime >= seg.end - 0.05) {
            spoken.push(seg);
            wordIdx = words.findIndex((w) => w.segmentIndex === seg.segmentIndex);
            segIdx = i;
          } else if (currentTime >= seg.start && currentTime < seg.end) {
            current = seg;
            wordIdx = words.findIndex((w) => w.segmentIndex === seg.segmentIndex);
            segIdx = i;
            unspoken = segments.slice(i + 1);
            break;
          } else {
            unspoken.push(seg);
          }
        } else {
          if (current) {
            unspoken.push(seg);
          } else {
            spoken.push(seg);
          }
        }
      }

      if (!current && unspoken.length === 0 && segments.length > 0) {
        spoken = [...segments];
      }

      return {
        spokenSegments: spoken,
        unspokenSegments: unspoken,
        currentWord: current,
        currentWordIndex: wordIdx >= 0 ? wordIdx : 0,
        currentSegmentIndex: segIdx >= 0 ? segIdx : 0,
      };
    }, [segments, words, currentTime]);

  const play = useCallback(() => {
    audioRef.current?.play();
    setIsPlaying(true);
    onPlay?.();
  }, [onPlay]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
    onPause?.();
  }, [onPause]);

  const seekToTime = useCallback(
    (time: number) => {
      const el = audioRef.current;
      if (el) {
        el.currentTime = Math.max(0, Math.min(time, duration || 0));
        setCurrentTime(el.currentTime);
        onTimeUpdate?.(el.currentTime);
      }
    },
    [duration, onTimeUpdate]
  );

  const seekToWord = useCallback(
    (word: TranscriptWord) => {
      seekToTime(word.start);
    },
    [seekToTime]
  );

  const startScrubbing = useCallback(() => setIsScrubbing(true), []);
  const endScrubbing = useCallback(() => setIsScrubbing(false), []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onTimeUpdateHandler = () => {
      if (!isScrubbing) {
        setCurrentTime(el.currentTime);
        onTimeUpdate?.(el.currentTime);
      }
    };
    const onDurationChangeHandler = () => {
      setDuration(el.duration);
      onDurationChange?.(el.duration);
    };
    const onEndedHandler = () => {
      setIsPlaying(false);
      onEnded?.();
    };
    const onPlayHandler = () => {
      setIsPlaying(true);
      onPlay?.();
    };
    const onPauseHandler = () => {
      setIsPlaying(false);
      onPause?.();
    };

    el.addEventListener("timeupdate", onTimeUpdateHandler);
    el.addEventListener("durationchange", onDurationChangeHandler);
    el.addEventListener("ended", onEndedHandler);
    el.addEventListener("play", onPlayHandler);
    el.addEventListener("pause", onPauseHandler);

    return () => {
      el.removeEventListener("timeupdate", onTimeUpdateHandler);
      el.removeEventListener("durationchange", onDurationChangeHandler);
      el.removeEventListener("ended", onEndedHandler);
      el.removeEventListener("play", onPlayHandler);
      el.removeEventListener("pause", onPauseHandler);
    };
  }, [isScrubbing, onTimeUpdate, onDurationChange, onEnded, onPlay, onPause]);

  return {
    audioRef,
    spokenSegments,
    unspokenSegments,
    currentWord,
    segments,
    words,
    duration,
    currentTime,
    currentWordIndex,
    currentSegmentIndex,
    isPlaying,
    isScrubbing,
    play,
    pause,
    seekToTime,
    seekToWord,
    startScrubbing,
    endScrubbing,
  };
}
