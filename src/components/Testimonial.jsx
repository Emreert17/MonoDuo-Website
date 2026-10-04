import { getTestimonialVideo } from "@/lib/testimonialVideo";
import VideoFrame from "./VideoFrame";
import Eyebrow from "./ui/Eyebrow";
import Reveal from "./ui/Reveal";

export default function Testimonial() {
  return (
    <section aria-labelledby="testimonial-title" className="section bg-ink text-paper">
      <div className="shell grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-7">
          <Eyebrow className="text-muted-dark">The creator&rsquo;s side</Eyebrow>
          <h2
            id="testimonial-title"
            className="mt-6 text-[clamp(2.25rem,5.4vw,4.5rem)] leading-[1.02] tracking-[-0.045em] text-balance"
          >
            The collaboration, <em className="text-accent-soft">as Mike tells it.</em>
          </h2>
          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-muted-dark">
            Mike knows the audience; we brought the research, the product work and the
            launch structure. Here is the pilot from the creator&rsquo;s side, in about a
            minute.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <VideoFrame {...getTestimonialVideo()} />
        </Reveal>
      </div>
    </section>
  );
}
