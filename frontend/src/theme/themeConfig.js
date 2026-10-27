import { createTheme } from "@mui/material";

export const getMuiTheme = (mode = "dark") => {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#ec4899", // Modern rose-pink (Tailwind pink-500)
        light: "#f472b6",
        dark: "#db2777",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#8b5cf6", // Violet accent
        light: "#a78bfa",
        dark: "#7c3aed",
      },
      background: {
        default: isDark ? "#090d16" : "#f8fafc",
        paper: isDark ? "#111827" : "#ffffff",
      },
      text: {
        primary: isDark ? "#f8fafc" : "#0f172a",
        secondary: isDark ? "#94a3b8" : "#64748b",
      },
      divider: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
    },
    typography: {
      fontFamily: '"General Sans", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      button: {
        textTransform: "none",
        fontWeight: 600,
        letterSpacing: "0.02em",
      },
    },
    shape: {
      borderRadius: 14,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 9999, // Pill style
            boxShadow: "none",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              boxShadow: isDark
                ? "0 4px 20px -2px rgba(236, 72, 153, 0.4)"
                : "0 4px 14px -2px rgba(236, 72, 153, 0.3)",
              transform: "translateY(-1px)",
            },
          },
          containedPrimary: {
            background: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
          },
          outlined: {
            borderColor: isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.15)",
            "&:hover": {
              borderColor: "#ec4899",
              backgroundColor: isDark ? "rgba(236, 72, 153, 0.08)" : "rgba(236, 72, 153, 0.04)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderRadius: 16,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
          },
        },
      },
    },
  });
};
