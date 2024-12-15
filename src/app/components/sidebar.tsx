import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import Image from "next/image";
import { Url } from "@prisma/client";
import Link from "next/link";
import { Menu } from "lucide-react";
import DeleteButton from "./delete-button";
import GenerateButton from "./generate-button";

async function getAllUrls() {
  try {
    const response = await fetch("http://localhost:3000/api/all", {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch URLs");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return [];
  }
}

function readableDate(date: Date | string | null): string {
  // this is a function that takes in a date and returns a human-readable string
  if (!date) {
    return "You have to set an expiration date";
  }

  const validDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(validDate.getTime())) {
    return "Invalid date";
  }

  return validDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

const Sidebar = async () => {
  const urls: Url[] = await getAllUrls();
  return (
    <div className="bg-[#efefef] w-[500px] flex flex-col py-4 px-4 h-screen">
      <Image
        className="mx-auto"
        src="/logo.png"
        alt="logo"
        width={200}
        height={200}
      />
      <h2 className="pt-10 font-bold text-2xl">My shortened URLs</h2>
      {urls.map((url, index) => (
        <div className="flex flex-col gap-2 py-2" key={index}>
          <div className="border flex justify-between items-center border-gray-300 rounded-sm py-2 px-1">
            <div>
              <Link
                className="text-black text-lg"
                href={`http://localhost:3000/${url.shortId}`}
              >{`http://localhost:3000/${url.shortId}`}</Link>
              {url.clicks > 0 && (
                <p className="text-[#9bb7f4] text-[14px]">
                  This link has been clicked {url.clicks} times
                </p>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:ring-0 border border-gray-400 rounded-md p-0.5 px-1 mx-2">
                <Menu></Menu>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  Expires: {readableDate(url.expiration)}
                </DropdownMenuLabel>
                <DropdownMenuItem className="flex justify-between "></DropdownMenuItem>
                <DropdownMenuItem className="flex justify-between "></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DeleteButton id={url.id} />
            <GenerateButton shortUrl={`http://localhost:3000/${url.shortId}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
