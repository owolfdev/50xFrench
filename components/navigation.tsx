import React from "react";
import Link from "next/link";
import { DropdownMenuDemo } from "./dropdown-menu";

function Navigation() {
  return (
    <nav className="flex justify-between items-center p-2 w-full">
      <h1 className="font-bold text-3xl">
        <Link href="/">Répéter</Link>
      </h1>
      <DropdownMenuDemo />
    </nav>
  );
}

export default Navigation;
