import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const response = await fetch(`http://localhost:3000/api/redirect/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Failed to fetch URL:", response.statusText);
    return <div>Error: {response.statusText}</div>;
  }

  const data = await response.json();

  if (!data || !data.originalUrl) {
    console.error("Original URL not found in response.");
    return <div>Error: Invalid response from the server.</div>;
  }

  redirect(data.originalUrl);

  return null;
};

export default Page;
