import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Tove Agelii",
  description: "Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        {/* Logo/Header on top */}
        <header className="p-4">
          <Link href="/" className="block mb-2">
            <h1
              className="font-luminari text-xl tracking-wide hover:opacity-70 transition"
              style={{ fontFamily: "Luminari, serif" }}
            >
              Tove Agelii
            </h1>
          </Link>
        </header>

        <div className="flex flex-1">
          {/* Sidebar Menu */}
          <aside className="w-64 p-4">
            <nav className="flex flex-col gap-2 text-sm font-helvetica">
              <Link href="/discography">Discography</Link>
              <Link href="/score">Score & Sound</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </aside>

          {/* Main content area */}
          <main className="flex-1 pt-8 pl-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
