import { baseAPIURL } from "@/utils";


export async function GET(request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('user_token');
  try {
    const res = await fetch(`${baseAPIURL}list_my_cpd_plans`, {
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

export async function POST(request) {
  const url = new URL(request.url);
  const body = await request.json();
  const userToken = url.searchParams.get("user_token");
  try {
    const resp = await fetch(`${baseAPIURL}create_cpd_plan`, {
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

export async function PUT(request) {
  const url = new URL(request.url);
  const body = await request.json();
  const userToken = url.searchParams.get("user_token");
  try {
    const resp = await fetch(`${baseAPIURL}change_cpd_plan_status`, {
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

export async function DELETE(request) {
  const url = new URL(request.url);
  const body = await request.json();
  const userToken = url.searchParams.get("user_token");
  try {
    const resp = await fetch(`${baseAPIURL}delete_cpd_plan`, {
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