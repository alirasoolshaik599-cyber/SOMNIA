import Link from "next/link";

type HubCardProps = {
  href: string;
  icon: string;
  title: string;
  description: string;
  stat?: string;
};

export default function HubCard({ href, icon, title, description, stat }: HubCardProps) {
  return (
    <Link
      href={href}
      className="block rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-[1.02] hover:border-[#5B6EFF]/30 hover:shadow-[0_0_35px_rgba(91,110,255,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6EFF]"
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl leading-none">{icon}</span>
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="mt-1 text-sm text-slate-400">{description}</p>
          {stat && <p className="mt-3 text-sm font-medium text-[#a9b3ff]">{stat}</p>}
        </div>
      </div>
    </Link>
  );
}