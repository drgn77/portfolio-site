// Typed navigation helpers bound to our routing config.
// Import Link, useRouter, usePathname, redirect from here (not next/link) to get locale-aware behavior.
import { createNavigation } from "next-intl/navigation";
import { routing } from "./i18n/routing";

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
