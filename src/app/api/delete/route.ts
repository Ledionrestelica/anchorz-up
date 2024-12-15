import prisma from "@/app/lib/prisma";

// this is an api route that deletes a URL, and it has only one method allowed: DELETE

export async function DELETE(req: Request) {
  const { id } = await req.json();
  if (!id) {
    return Response.json({ error: "Missing id" });
  }
  try {
    const remove = await prisma.url.delete({
      where: { id },
    });
    if (!remove) {
      return Response.json({ error: "Failed to delete URL" });
    }
    return Response.json({ status: "200", message: "URL deleted" });
  } catch (error) {
    return Response.json({ status: "500", error: "Failed to delete URL" });
  }
}
