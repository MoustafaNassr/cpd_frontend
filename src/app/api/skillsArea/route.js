import { baseAPIURL } from "@/utils";

export async function GET(request) {
  try {
    const res = await fetch(`${baseAPIURL}get_skills_area`, {
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