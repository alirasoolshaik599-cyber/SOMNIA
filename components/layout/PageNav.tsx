import type { ReactNode } from "react";

type PageNavProps = {
  left: ReactNode;
  right?: ReactNode;
};

export default function PageNav({ left, right }: PageNavProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-3">{left}</div>
      {right && <div className="flex flex-wrap gap-3 sm:justify-end">{right}</div>}
    </div>
  );
}