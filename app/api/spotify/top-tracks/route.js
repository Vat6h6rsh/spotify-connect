import { getAccessToken } from "../utils";

export async function GET() {
  const { access_token } = await getAccessToken();

  const res = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", {
    headers: { Authorization: `Bearer ${access_token}` }
  });

  const tracks = await res.json();
  return Response.json(tracks);
}
