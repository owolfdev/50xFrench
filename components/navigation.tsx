import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

function Navigation() {
  return (
    <nav className="flex justify-between items-center p-2 w-full">
      <h1 className="font-bold text-3xl">
        <Link href="/">Répéter</Link>
      </h1>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <img alt="App Icon" src="/app-icon.png" width={40} height={40} />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem>
            <Link href="/about">
              <span className="text-lg sm:text-base font-mono">About</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/documentation">
              <span className="text-lg sm:text-base font-mono">
                Documentation
              </span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/contact">
              <span className="text-lg sm:text-base font-mono">Contact Us</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}

export default Navigation;
