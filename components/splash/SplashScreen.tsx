import Background from "./Background";
import Stars from "./Stars";
import Hero from "./Hero";

export default function SplashScreen() {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      <Background />
      <Stars />
      <Hero />
    </main>
  );
}