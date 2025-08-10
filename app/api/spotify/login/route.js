import querystring from "querystring";

export async function GET() {
  const scope = [
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-top-read",
    "user-follow-read"
  ].join(" ");

  const params = querystring.stringify({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI
  });

  return new Response(null, {
    status: 302,
    headers: { Location: `https://accounts.spotify.com/authorize?${params}` }
  });
}
