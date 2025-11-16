type BrowserWindow = typeof window & {
  webkitAudioContext?: typeof AudioContext;
};

let audioContext: AudioContext | null = null;
let audioUnlocked = false;

const ensureAudioContext = () => {
  if (typeof window === "undefined") return null;

  if (!audioContext) {
    const HasAudioContext = typeof window.AudioContext !== "undefined";
    const HasWebkitAudioContext =
      typeof (window as BrowserWindow).webkitAudioContext !== "undefined";

    if (HasAudioContext) {
      audioContext = new AudioContext();
    } else if (HasWebkitAudioContext) {
      audioContext = new (window as BrowserWindow).webkitAudioContext!();
    } else {
      audioContext = null;
    }
  }

  return audioContext;
};

export const requestSoundPermission = async () => {
  const ctx = ensureAudioContext();
  if (!ctx || audioUnlocked) return;

  if (ctx.state === "suspended") {
    await ctx.resume();
  }
  audioUnlocked = ctx.state === "running";
};

const audioCache = new Map<string, HTMLAudioElement>();

export const playSound = async (src: string) => {
  if (typeof window === "undefined") return;

  await requestSoundPermission();

  const element =
    audioCache.get(src) ??
    (() => {
      const audio = new Audio(src);
      audio.preload = "auto";
      audioCache.set(src, audio);
      return audio;
    })();

  try {
    element.currentTime = 0;
    await element.play();
  } catch (error) {
    console.warn("Failed to play sound:", error);
  }
};
