"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Erro global capturado:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "1rem",
          background: "linear-gradient(to bottom, #ffffff 0%, #f3f4f6 100%)",
        }}>
          <div style={{
            maxWidth: "28rem",
            width: "100%",
            background: "white",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
            padding: "2rem",
            textAlign: "center",
          }}>
            <div style={{
              fontSize: "3rem",
              marginBottom: "1rem",
            }}>⚠️</div>
            <h1 style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
              color: "#111827",
            }}>
              Erro Crítico
            </h1>
            <p style={{
              color: "#6b7280",
              marginBottom: "1.5rem",
            }}>
              Ocorreu um erro crítico na aplicação. Por favor, recarregue a página.
            </p>

            {process.env.NODE_ENV === "development" && (
              <div style={{
                background: "#f3f4f6",
                padding: "0.75rem",
                borderRadius: "0.375rem",
                marginBottom: "1.5rem",
                textAlign: "left",
                fontSize: "0.75rem",
                fontFamily: "monospace",
              }}>
                <p style={{ color: "#dc2626", fontWeight: "600", marginBottom: "0.25rem" }}>
                  Erro (dev only):
                </p>
                <p style={{ color: "#4b5563", wordBreak: "break-word" }}>
                  {error.message || "Erro desconhecido"}
                </p>
                {error.digest && (
                  <p style={{ color: "#4b5563", marginTop: "0.5rem" }}>
                    Digest: {error.digest}
                  </p>
                )}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <button
                onClick={reset}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  background: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                🔄 Tentar Novamente
              </button>
              <button
                onClick={() => window.location.href = "/"}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  background: "white",
                  color: "#374151",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                🏠 Voltar para Início
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
