const querystring = require("querystring");

module.exports = async (req, res) => {
  const code = req.query.code || null;

  const basicAuth = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    }),
  });

  const data = await response.json();

  if (data.refresh_token) {
    console.log("Your refresh token:", data.refresh_token);
    return res.status(200).json({ refresh_token: data.refresh_token });
  }

  res.status(400).json({ error: "Failed to retrieve refresh token", data });
};
