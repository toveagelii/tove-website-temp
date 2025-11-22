"use client";
import { useEffect } from "react";

export default function NoScrollIfNotNeeded() {
  useEffect(() => {
    function updateScroll() {
      if (document.documentElement.scrollHeight <= window.innerHeight) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    }
    updateScroll();
    window.addEventListener("resize", updateScroll);
    return () => window.removeEventListener("resize", updateScroll);
  }, []);
  return null;
}
