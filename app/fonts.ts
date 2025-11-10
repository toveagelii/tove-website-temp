import localFont from "next/font/local";

// Neue Haas Grotesk (Display Pro) – loaded locally from /public/fonts
export const nhg = localFont({
  src: [
    {
      path: "../public/fonts/neue-haas-grotesk-display-pro-45-light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/neue-haas-grotesk-display-pro-55-roman.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/neue-haas-grotesk-display-pro-65-medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
});
