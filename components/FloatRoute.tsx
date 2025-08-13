"use client";
import { Code, HomeIcon, PhoneCall } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const routes = [
  {
    name: "Home",
    href: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: <Code />,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: <PhoneCall />,
  },
];
export const FloatRoute = () => {
  return (
    <>
      <div className="absolute bottom-[40%] right-3  flex flex-col gap-2 bg-[#f7f0e5] py-5 px-2 rounded-l-2xl tag">
        {routes.map((e, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  className="size-11 text-primary bg-secondary/20 backdrop-blur-lg rounded-full border border-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
                  href={e.href}
                >
                  {e.icon}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="left">{e.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      {/* <div className="absolute h-[50px] w-[300px] bg-[#f7f0e5] z-30 rounded-lg top-0 left-1/2 translate-x-[-50%] tag"></div> */}
    </>
  );
};
