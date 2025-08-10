import { getAccessToken } from "../utils";

export async function POST(req) {
  const { access_token } = await getAccessToken();
  const body = await req.json();

  await fetch("https://api.spotify.com/v1/me/player/play", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  return new Response(null, { status: 204 });
}
