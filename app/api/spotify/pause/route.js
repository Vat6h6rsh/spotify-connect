import { getAccessToken } from "../utils";

export async function POST() {
  const { access_token } = await getAccessToken();

  await fetch("https://api.spotify.com/v1/me/player/pause", {
    method: "PUT",
    headers: { Authorization: `Bearer ${access_token}` }
  });

  return new Response(null, { status: 204 });
}
