// pages/api/register.js
const baseURL = "https://cpd-admin.apexnile.com/api/create_new_user" 
export  async function POST(req) {
  const reqBody = await req.json()
 const result = await fetch(baseURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      first_name: reqBody.first_name,
      last_name: reqBody.last_name,
      email:  reqBody.email,
      password: reqBody.password,
      profession_title: reqBody.profession_title,
    }),
  });   
const body = await result.json()
console.log(body)
return new Response(JSON.stringify({ data: body }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
