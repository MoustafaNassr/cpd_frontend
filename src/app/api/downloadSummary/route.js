import { baseAPIURL } from "@/utils";

export async function GET(request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('user_token')
  try {
    const res = await fetch(`${baseAPIURL}download_cpd_summary`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
      next: {
        revalidate: 0,
      },
    });
    const result = await res.json();
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
} 