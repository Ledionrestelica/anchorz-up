import prisma from "@/app/lib/prisma";

//This is an api route that returns all of the URLs in the db.

export async function GET() {
  try {
    const urls = await prisma.url.findMany({
      select: {
        id: true,
        originalUrl: true,
        shortId: true,
        clicks: true,
        expiration: true,
      },
    });
    if (!urls) {
      return Response.json([]);
    }
    return Response.json(urls);
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return Response.json({ error: "Failed to fetch URLs" }, { status: 500 });
  }
}
