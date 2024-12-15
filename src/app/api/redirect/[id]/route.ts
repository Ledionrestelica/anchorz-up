import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

//this is an api route that gets the id of the URL and returns the original URL. so we can redirect the user to the original URL.

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // destructure the id from the params object

  try {
    const url = await prisma.url.findUnique({
      where: { shortId: id },
    });
    if (url?.expiration && new Date() > url.expiration) {
      // check if the URL has expired and if so, delete it
      await prisma.url.delete({
        where: { shortId: id },
      });
      return NextResponse.json({ error: "URL has expired" }, { status: 410 });
    }
    if (!url) {
      // if the URL is not found, return a 404 error
      return NextResponse.json({ error: "URL not found" }, { status: 404 });
    } else {
      await prisma.url.update({
        where: { shortId: id },
        data: { clicks: url.clicks + 1 },
      });
    }

    return NextResponse.json({ originalUrl: url.originalUrl }); // we send back to the frontend the original URL
  } catch (error) {
    console.error("Error fetching URL:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
