"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [authenticated, setAuthenticated] = useState(null);
  const [artists, setArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check authentication
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/spotify/me");
        if (res.status === 401) {
          setAuthenticated(false);
        } else {
          setAuthenticated(true);
          await fetchData();
        }
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  async function fetchData() {
    const [artistsRes, tracksRes] = await Promise.all([
      fetch("/api/spotify/followed-artists").then(res => res.json()),
      fetch("/api/spotify/top-tracks").then(res => res.json())
    ]);
    setArtists(artistsRes.artists?.items || []);
    setTopTracks(tracksRes.items || []);
  }

  const pauseSong = async () => {
    await fetch("/api/spotify/pause", { method: "POST" });
  };

  const playSong = async (uri) => {
    await fetch("/api/spotify/play", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uris: [uri] })
    });
  };

  if (loading) return <p className="p-6">Loading...</p>;

  // Not logged in
  if (!authenticated) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Connect to Spotify</h1>
        <a
          href="/api/spotify/login"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Log in with Spotify
        </a>
      </div>
    );
  }

  // Logged in dashboard
  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Your Spotify Dashboard</h1>

      {/* Artists */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Followed Artists</h2>
        {artists.length === 0 && <p>You are not following any artists.</p>}
        <ul className="space-y-1">
          {artists.map(artist => (
            <li key={artist.id} className="flex items-center gap-2">
              {artist.images?.[0] && (
                <img
                  src={artist.images[0].url}
                  alt={artist.name}
                  className="w-10 h-10 rounded-full"
                />
              )}
              {artist.name}
            </li>
          ))}
        </ul>
      </section>

      {/* Playback Controls */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Playback Controls</h2>
        <button
          onClick={pauseSong}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Pause Current Song
        </button>
      </section>

      {/* Top Tracks */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Top 10 Tracks</h2>
        <ul className="space-y-2">
          {topTracks.map(track => (
            <li key={track.id} className="flex items-center gap-4">
              {track.album.images?.[0] && (
                <img
                  src={track.album.images[0].url}
                  alt={track.name}
                  className="w-12 h-12 rounded"
                />
              )}
              <div className="flex-1">
                <p className="font-medium">{track.name}</p>
                <p className="text-sm text-gray-500">
                  {track.artists.map(a => a.name).join(", ")}
                </p>
              </div>
              <button
                onClick={() => playSong(track.uri)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Play
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
