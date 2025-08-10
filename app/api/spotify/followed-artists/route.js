import { getAccessToken } from "../utils";

export async function GET() {
  const { access_token } = await getAccessToken();

  const res = await fetch("https://api.spotify.com/v1/me/following?type=artist", {
    headers: { Authorization: `Bearer ${access_token}` }
  });

  const artists = await res.json();
  return Response.json(artists);
}
