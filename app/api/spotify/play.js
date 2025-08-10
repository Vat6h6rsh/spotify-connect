const { getAccessToken } = require("../../utils/spotify");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { trackUri } = req.body;
  if (!trackUri) return res.status(400).json({ error: "trackUri is required" });

  try {
    const token = await getAccessToken();
    await fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris: [trackUri] }),
    });

    res.status(200).json({ message: "Playback started" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
