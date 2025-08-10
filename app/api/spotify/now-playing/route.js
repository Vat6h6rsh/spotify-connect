import { getAccessToken } from "../utils";

export async function GET() {
  const { access_token } = await getAccessToken();

  const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${access_token}` }
  });

  if (res.status === 204 || res.status > 400) {
    return Response.json({ isPlaying: false });
  }

  const song = await res.json();
  return Response.json(song);
}
