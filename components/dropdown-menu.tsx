import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img alt="App Icon" src="/app-icon.png" width={40} height={40} />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem>
          <Link href="/about">
            <span className="text-lg sm:text-base font-mono font-semibold sm:font-normal">
              About
            </span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/documentation">
            <span className="text-lg sm:text-base font-mono font-semibold sm:font-normal">
              Documentation
            </span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/contact">
            <span className="text-lg sm:text-base font-mono font-semibold sm:font-normal">
              Contact Us
            </span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/">
            <span className="text-lg sm:text-base font-mono font-semibold sm:font-normal">
              Home
            </span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
