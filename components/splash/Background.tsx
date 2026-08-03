export default function Background() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Deep Space */}
      <div className="absolute inset-0 bg-[#050816]" />

      {/* Main Nebula */}
      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[180px]" />

      {/* Left Glow */}
      <div className="absolute left-[12%] top-[28%] h-[450px] w-[450px] rounded-full bg-cyan-400/8 blur-[160px]" />

      {/* Right Glow */}
      <div className="absolute right-[10%] bottom-[18%] h-[500px] w-[500px] rounded-full bg-indigo-500/8 blur-[180px]" />

      {/* Purple Dream Glow */}
      <div className="absolute left-[65%] top-[18%] h-[320px] w-[320px] rounded-full bg-violet-500/6 blur-[160px]" />

      {/* Bottom Blue Mist */}
      <div className="absolute bottom-[-180px] left-1/2 h-[700px] w-[1000px] -translate-x-1/2 rounded-full bg-sky-400/5 blur-[220px]" />
    </div>
  );
}