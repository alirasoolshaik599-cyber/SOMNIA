import { redirect } from "next/navigation";

export default function DreamPageRedirect() {
  redirect("/journal");
}