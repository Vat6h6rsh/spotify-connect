const { getAccessToken } = require("../../utils/spotify");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const token = await getAccessToken();
    await fetch("https://api.spotify.com/v1/me/player/pause", {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });

    res.status(200).json({ message: "Playback paused" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
