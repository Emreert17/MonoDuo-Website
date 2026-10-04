import "server-only";
import { readdirSync } from "node:fs";
import path from "node:path";
import { testimonialVideo } from "./site";

const VIDEO_DIR = "videos";
const IMAGE_PATTERN = /\.(avif|webp|jpe?g|png)$/i;

// Uses an image in /public/videos as the cover: one named after the video
// (e.g. reference.jpg) wins, otherwise the first image found.
function findPoster() {
  let images;
  try {
    images = readdirSync(path.join(process.cwd(), "public", VIDEO_DIR))
      .filter((file) => IMAGE_PATTERN.test(file))
      .sort();
  } catch {
    return null;
  }

  const videoName = path.parse(testimonialVideo.src).name;
  const poster = images.find((file) => path.parse(file).name === videoName) ?? images[0];
  return poster ? `/${VIDEO_DIR}/${poster}` : null;
}

export function getTestimonialVideo() {
  return { ...testimonialVideo, poster: findPoster() };
}
