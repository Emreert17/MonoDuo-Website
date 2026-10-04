"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

const CONTROL_CLASS =
  "grid size-10 shrink-0 place-items-center rounded-full text-paper transition-colors duration-200 hover:bg-paper/10";

// How much of the viewport height the frame may take, so a portrait clip stays on screen.
const MAX_VIEWPORT_HEIGHT = 80;

const METADATA_EVENTS = ["loadedmetadata", "durationchange"];

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const whole = Math.floor(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

export default function VideoFrame({ src, poster, width, height, title, credit }) {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);

  // Duration and aspect ratio are read from the element rather than from an event
  // handler, because the metadata can finish loading before React hydrates.
  const subscribe = useCallback((notify) => {
    const video = videoRef.current;
    METADATA_EVENTS.forEach((event) => video.addEventListener(event, notify));
    return () => METADATA_EVENTS.forEach((event) => video.removeEventListener(event, notify));
  }, []);
  const duration = useSyncExternalStore(
    subscribe,
    () => videoRef.current?.duration || 0,
    () => 0,
  );
  const ratio = useSyncExternalStore(
    subscribe,
    () => {
      const video = videoRef.current;
      return video?.videoHeight ? video.videoWidth / video.videoHeight : width / height;
    },
    () => width / height,
  );

  const toggle = () => {
    const video = videoRef.current;
    if (video.paused) video.play();
    else video.pause();
  };

  const seek = (event) => {
    const next = Number(event.target.value);
    videoRef.current.currentTime = next;
    setTime(next);
  };

  const progress = duration ? (time / duration) * 100 : 0;

  return (
    <figure
      style={{ width: `min(100%, max(19rem, ${MAX_VIEWPORT_HEIGHT * ratio}vh))` }}
      className={`mx-auto lg:mr-0 ${ratio < 1 ? "max-w-[21rem] lg:max-w-[26rem]" : ""}`}
    >
      <figcaption className="label flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pb-3 text-muted-dark">
        <span className="flex items-center gap-2 whitespace-nowrap">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-soft" />
          {title}
        </span>
        <span className="whitespace-nowrap text-paper">{credit}</span>
      </figcaption>

      <div style={{ aspectRatio: ratio }} className="relative overflow-hidden bg-[#131415]">
        {/* The #t fragment makes browsers without a poster paint the first frame. */}
        <video
          ref={videoRef}
          src={poster ? src : `${src}#t=0.001`}
          poster={poster ?? undefined}
          playsInline
          preload="metadata"
          aria-label={`${title} — ${credit}`}
          className="absolute inset-0 size-full cursor-pointer object-cover"
          onClick={toggle}
          onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
          onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
          onPlay={() => {
            setStarted(true);
            setPlaying(true);
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => setStarted(false)}
        />

        {!started && (
          <button
            type="button"
            onClick={toggle}
            aria-label={`Play ${title.toLowerCase()}`}
            className="group absolute inset-0 grid place-items-center bg-ink/25 transition-colors duration-200 hover:bg-ink/10"
          >
            <span className="grid size-18 place-items-center rounded-full bg-paper text-ink transition-colors duration-200 group-hover:bg-accent group-hover:text-paper">
              <Play aria-hidden="true" size={22} fill="currentColor" className="ml-1" />
            </span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 border-b border-line-dark py-2">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className={`${CONTROL_CLASS} -ml-2.5`}
        >
          {playing ? (
            <Pause aria-hidden="true" size={16} fill="currentColor" />
          ) : (
            <Play aria-hidden="true" size={16} fill="currentColor" />
          )}
        </button>

        {/* A visible bar with an invisible range input on top for pointer and keyboard seeking. */}
        <div className="relative flex h-10 grow items-center">
          <div className="h-px w-full bg-paper/25">
            <div style={{ width: `${progress}%` }} className="h-px bg-paper" />
          </div>
          <span
            aria-hidden="true"
            style={{ left: `${progress}%` }}
            className="absolute size-2 -translate-x-1/2 rounded-full bg-accent-soft"
          />
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={time}
            onChange={seek}
            aria-label="Seek"
            aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`}
            className="peer absolute inset-0 size-full cursor-pointer opacity-0"
          />
          <span className="pointer-events-none absolute inset-x-0 inset-y-2 hidden outline-2 outline-offset-2 outline-accent-soft peer-focus-visible:block" />
        </div>

        <span className="label shrink-0 pl-1 text-muted-dark tabular-nums">
          {formatTime(time)} / {formatTime(duration)}
        </span>

        <button
          type="button"
          onClick={() => (videoRef.current.muted = !videoRef.current.muted)}
          aria-label={muted ? "Unmute" : "Mute"}
          aria-pressed={muted}
          className={`${CONTROL_CLASS} -mr-2.5`}
        >
          {muted ? (
            <VolumeX aria-hidden="true" size={16} />
          ) : (
            <Volume2 aria-hidden="true" size={16} />
          )}
        </button>
      </div>
    </figure>
  );
}
