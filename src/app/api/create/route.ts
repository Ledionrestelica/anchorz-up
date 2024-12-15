import { nanoid } from "nanoid";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

// This is an api route that creates a new URL.

export async function POST(req: Request) {
  try {
    const { originalUrl, expiration } = await req.json();

    if (!originalUrl) {
      // check if parameter is provided
      return Response.json({ status: "400", message: "Original URL Required" });
    }

    const shortId = nanoid(6); // generate a random 6 character string
    const expiryDate = expiration ? new Date(expiration) : null; // parse expiration date

    const url = await prisma.url.create({
      data: {
        originalUrl: originalUrl,
        shortId: shortId,
        expiration: expiryDate,
        clicks: 0,
      },
    });
    revalidatePath("/"); //invalidate the cache for the home page

    return Response.json({ originalUrl, shortId, expiryDate });
  } catch (error) {
    return Response.json({ status: 500, message: "An Error occured" });
  }
}
