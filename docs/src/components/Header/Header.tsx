import React from "react";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Icons } from "../Icons/Icons";
import { ModeToggle } from "./ModeToggle";
import { EDIT_URL, TWITTER_URL } from "@/consts";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4  sm:container  flex-row flex h-14 items-center justify-between">
        <MainNav />
        <div className="flex flex-row space-x-3">
          <a href={EDIT_URL} target="_blank" rel="noreferrer" className="flex sm:hidden">
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-9 px-0",
              )}
            >
              <Icons.gitHub className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </div>
          </a>
          <MobileNav />
        </div>

        <div className="hidden sm:flex flex-1 items-center space-x-2 justify-end">
          <nav className="flex flex-row items-center space-x-1">
            <a href={EDIT_URL} target="_blank" rel="noreferrer">
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0",
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </a>
            <a href={TWITTER_URL} target="_blank" rel="noreferrer">
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0",
                )}
              >
                <Icons.twitter className="h-3 w-3 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </a>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
