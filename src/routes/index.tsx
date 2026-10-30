import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { startGame } from "@/game/main.js";
import "@/game/styles/main.css";
import "@/game/styles/board.css";
import "@/game/styles/ui.css";
import "@/game/styles/animations.css";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,900&family=Nunito:wght@600;700;800&display=swap",
      },
    ],
  }),
});

function Home() {
  useEffect(() => {
    void startGame();
  }, []);

  return (
    <>
      <div id="loading-overlay" className="loading-overlay">
        <div className="loading-box">
          <h1>🧄 LOVEC UPÍRŮ</h1>
          <p>Venca Česnekáč chystá dubové kolíky a hasičskou stříkačku...</p>
          <div className="loading-bar-track">
            <div id="loading-progress-fill" className="loading-bar-fill" />
          </div>
          <div id="loading-progress-text">Inicializuji hradní kroniku...</div>
        </div>
      </div>
      <div id="app-shell">
        <header id="hud-root" />
        <main id="center-stage" />
        <section id="bottom-root" />
        <footer id="log-root" />
      </div>
      <div id="modal-root" className="hidden" />
    </>
  );
}
