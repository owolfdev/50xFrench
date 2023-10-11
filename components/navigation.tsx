import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Navigation() {
  return (
    <nav className="flex justify-between items-center p-2 w-full">
      <h1 className="font-bold text-3xl">Répéter</h1>
      <div className="pr-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <img
              alt="App Icon"
              src="/app-icon.png"
              width={40}
              height={40}
              className="rounded-lg"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem>About Répéter</DropdownMenuItem>
            <DropdownMenuItem>Documentation</DropdownMenuItem>
            <DropdownMenuItem>Contact Us</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default Navigation;
