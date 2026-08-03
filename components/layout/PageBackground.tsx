import Image from "next/image";

export default function PageBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Image
        src="/images/dream-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#050816]/55" />
    </div>
  );
}