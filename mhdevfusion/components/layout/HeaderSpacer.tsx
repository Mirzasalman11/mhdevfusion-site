"use client";

import { usePathname } from "next/navigation";

export default function HeaderSpacer() {
  const pathname = usePathname();

  const isTransparentRoute = pathname === "/";

  if (isTransparentRoute) {
    return null;
  }

  return <div className="h-20 w-full" />;
}
