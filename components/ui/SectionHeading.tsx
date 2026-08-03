import type { ReactNode } from "react";

type SectionHeadingProps = {
  children: ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return <h2 className="mb-5 text-xl font-bold text-white sm:text-2xl">{children}</h2>;
}