"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { tracks } from "@/lib/data";

export default function MusicSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const currentTrack = tracks[currentIndex];

  // ── ScrollTrigger entrance ──
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".music-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current, start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".music-player",
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: {
            trigger: ".music-player", start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".music-playlist",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.15,
          scrollTrigger: {
            trigger: ".music-playlist", start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Batch reveal — no per-item stagger for long lists
      gsap.fromTo(
        ".music-track-row",
        { opacity: 0 },
        {
          opacity: 1, duration: 0.4, ease: "power2.out",
          scrollTrigger: {
            trigger: ".music-playlist", start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Audio playback ──
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentIndex]);

  // ── Volume ──
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // ── Reset on track change ──
  useEffect(() => {
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
  }, [currentIndex]);

  const togglePlay = () => setIsPlaying((prev) => !prev);

  const playNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  }, []);

  const playPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const selectTrack = (index: number) => {
    if (index === currentIndex) {
      togglePlay();
    } else {
      setCurrentIndex(index);
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration || 0);
    setProgress(
      audio.duration ? (audio.currentTime / audio.duration) * 100 : 0
    );
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const newTime = (Number(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setProgress(Number(e.target.value));
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <section ref={sectionRef} className="relative py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        {/* Heading */}
        <div className="music-heading mb-16 text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.4em] text-accent">
            <span className="h-px w-8 bg-accent/50" />
            Now Playing
            <span className="h-px w-8 bg-accent/50" />
          </div>
          <h2 className="text-4xl font-light tracking-tight text-fg sm:text-5xl md:text-6xl">
            音乐
          </h2>
          <p className="mt-4 text-sm text-muted">一些喜欢的歌</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
          {/* ══ LEFT: Glass Player ══ */}
          <div className="music-player glass-card rounded-3xl p-6 sm:p-8 lg:col-span-3">
            {/* Cover + Info */}
            <div className="mb-6 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
              {/* Cover art */}
              <div className="relative h-44 w-44 flex-shrink-0 overflow-hidden rounded-2xl sm:h-52 sm:w-52">
                <img
                  key={currentTrack.id}
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ animation: "fade-cover 0.6s ease-out" }}
                />
                {/* Subtle dark gradient at bottom for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* Playing indicator overlay */}
                {isPlaying && (
                  <div className="absolute bottom-3 right-3 flex items-end gap-0.5 rounded-lg bg-black/40 px-2 py-1.5 backdrop-blur-sm" style={{ height: "22px" }}>
                    <span className="inline-block w-0.5 bg-accent" style={{ height: "4px", animation: "eq1 0.8s ease-in-out infinite" }} />
                    <span className="inline-block w-0.5 bg-accent" style={{ height: "10px", animation: "eq2 0.8s ease-in-out infinite" }} />
                    <span className="inline-block w-0.5 bg-accent" style={{ height: "7px", animation: "eq3 0.8s ease-in-out infinite" }} />
                  </div>
                )}
              </div>

              {/* Track info */}
              <div className="flex min-w-0 flex-1 flex-col justify-center text-center sm:pt-4 sm:text-left">
                <h3 className="truncate text-xl font-medium text-fg sm:text-2xl">
                  {currentTrack.title}
                </h3>
                <p className="mt-1.5 truncate text-sm text-muted">
                  {currentTrack.artist}
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-5">
              <input
                type="range"
                value={progress}
                onChange={handleSeek}
                min={0}
                max={100}
                step={0.1}
                className="h-1 w-full cursor-pointer"
              />
              <div className="mt-2 flex justify-between text-[11px] font-mono text-muted">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-5">
              <button
                onClick={playPrev}
                className="rounded-full p-2.5 text-fg/70 transition-all hover:bg-white/[0.06] hover:text-fg"
                aria-label="上一首"
              >
                <SkipBack size={22} />
              </button>
              <button
                onClick={togglePlay}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-bg shadow-lg shadow-accent/20 transition-all duration-200 hover:scale-105 hover:shadow-accent/40 active:scale-95"
                aria-label={isPlaying ? "暂停" : "播放"}
              >
                {isPlaying ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
              </button>
              <button
                onClick={playNext}
                className="rounded-full p-2.5 text-fg/70 transition-all hover:bg-white/[0.06] hover:text-fg"
                aria-label="下一首"
              >
                <SkipForward size={22} />
              </button>
            </div>

            {/* Volume */}
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => setIsMuted((prev) => !prev)}
                className="text-muted transition-colors hover:text-fg"
                aria-label={isMuted ? "取消静音" : "静音"}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <input
                type="range"
                value={isMuted ? 0 : volume * 100}
                onChange={(e) => {
                  const v = Number(e.target.value) / 100;
                  if (!isNaN(v)) {
                    setVolume(v);
                    if (isMuted) setIsMuted(false);
                  }
                }}
                min={0}
                max={100}
                className="h-1 flex-1 cursor-pointer"
              />
            </div>
          </div>

          {/* ══ RIGHT: Glass Playlist ══ */}
          <div className="music-playlist glass-card flex flex-col rounded-3xl p-5 sm:p-6 lg:col-span-2">
            <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-medium tracking-wide text-fg">
                播放列表
              </h3>
              <span className="text-xs font-mono text-muted">
                {tracks.length} 首
              </span>
            </div>

            <div className="-mr-1 flex max-h-[300px] flex-col gap-0.5 overflow-y-auto pr-1 sm:max-h-[420px]" style={{ scrollbarWidth: "thin" }}>
              {tracks.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => selectTrack(index)}
                  className={`music-track-row group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-accent/15 text-fg"
                      : "text-fg/70 hover:bg-white/[0.06] hover:text-fg"
                  }`}
                >
                  {/* Mini cover */}
                  <img
                    src={track.cover}
                    alt={track.title}
                    className={`h-8 w-8 flex-shrink-0 rounded-md object-cover transition-all ${
                      index === currentIndex
                        ? "ring-2 ring-accent/50"
                        : "opacity-70 group-hover:opacity-100"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-medium leading-tight">{track.title}</div>
                    <div className="truncate text-[11px] text-muted">{track.artist}</div>
                  </div>
                  {index === currentIndex && isPlaying && (
                    <span className="flex items-end gap-0.5" style={{ height: "12px" }}>
                      <span className="inline-block w-0.5 bg-accent" style={{ height: "4px", animation: "eq1 0.8s ease-in-out infinite" }} />
                      <span className="inline-block w-0.5 bg-accent" style={{ height: "8px", animation: "eq2 0.8s ease-in-out infinite" }} />
                      <span className="inline-block w-0.5 bg-accent" style={{ height: "6px", animation: "eq3 0.8s ease-in-out infinite" }} />
                    </span>
                  )}
                </button>
              ))}
            </div>

            <p className="mt-3 border-t border-white/10 pt-3 text-center text-[11px] font-mono text-muted">
              — More to come —
            </p>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={playNext}
        onLoadedMetadata={handleTimeUpdate}
        preload="metadata"
      />
    </section>
  );
}
