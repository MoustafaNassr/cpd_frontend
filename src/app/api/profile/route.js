import { baseAPIURL } from "@/utils";

export async function POST(request) {
  const url = new URL(request.url);
  const body = await request.json();
  const userToken = url.searchParams.get("user_token");
  try {
    const resp = await fetch(`${baseAPIURL}edit_profile`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        'Authorization': `Token ${userToken}`,
      },
      body: JSON.stringify(body),
      next: {
        revalidate: 0,
      },
    });
    const result = await resp.json();
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}