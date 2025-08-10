import { getAccessToken } from "@/app/api/spotify/utils"

export async function GET() {
  try {
    const token = await getAccessToken();
    if (!token) {
      return new Response(JSON.stringify({ authenticated: false }), { status: 401 });
    }

    const res = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ authenticated: false }), { status: 401 });
    }

    const data = await res.json();
    return Response.json({ authenticated: true, user: data });
  } catch {
    return new Response(JSON.stringify({ authenticated: false }), { status: 401 });
  }
}
