import { getAccessToken } from "../../utils/spotify";

export default async function handler(req, res) {
  try {
    const token = await getAccessToken();
    const response = await fetch(
      "https://api.spotify.com/v1/me/following?type=artist&limit=50",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
