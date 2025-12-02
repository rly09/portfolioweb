import { Hero } from "@/components/features/Hero";
import { TimelineFeed } from "@/components/features/TimelineFeed";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />

      <div className="max-w-2xl">
        <TimelineFeed />
      </div>
    </div>
  );
}
