"use client";
export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Spotify Connect Test</h1>
      <button
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#1DB954",
          border: "none",
          borderRadius: "5px",
          color: "white",
          cursor: "pointer",
        }}
        onClick={() => {
          window.location.href = "/api/spotify/login";
        }}
      >
        Connect Spotify
      </button>
    </main>
  );
}
