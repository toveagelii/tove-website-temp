import "./globals.css";
import Link from "next/link";
import Navigation from "./components/Navigation";
import { sanityClient } from '@/lib/sanity.client';
import { homePageQuery } from '@/lib/queries';
import { urlFor } from '@/lib/image';
import Image from 'next/image';

export const metadata = {
  title: "Tove Agelii",
  description: "Portfolio",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const homePage = await sanityClient.fetch(homePageQuery).catch(() => null);
  const headerBgImage = homePage?.headerBackgroundImage;

  return (
    <html lang="en">
  <body className="flex min-h-screen flex-col">
        {/* Logo/Header on top - fixed */}
        <header className="fixed top-0 left-0 right-0 pt-4 pr-4 pb-2 pl-4 bg-white z-10">
          <Link href="/" className="inline-block mb-1">
            <div style={{ position: 'relative', display: 'inline-block', lineHeight: 1 }}>
              {headerBgImage && (
                <Image
                  src={urlFor(headerBgImage).url()}
                  alt=""
                  fill
                  style={{
                    objectFit: 'fill',
                    objectPosition: 'center',
                    zIndex: 0,
                    top: '-2px',
                    left: '1px'
                  }}
                  priority
                  sizes="400px"
                />
              )}
              <h1
                className="text-3xl tracking-tight"
                style={{ 
                  fontFamily: "'Neue Haas Grotesk', sans-serif", 
                  fontWeight: 500,
                  color: '#171717',
                  fontSize: '1.5rem', 
                  letterSpacing: '-0.02em',
                  position: 'relative',
                  zIndex: 1,
                  margin: 0,
                  padding: 0,
                  lineHeight: 1,
                  display: 'block'
                }}
              >
                Tove Agelii
              </h1>
            </div>
          </Link>
        </header>

        {/* Add top padding to body content to account for fixed header */}
        <div className="flex flex-1" style={{ paddingTop: '60px' }}>
          {/* Sidebar Menu - responsive */}
          <aside 
            className="navigation-sidebar"
            style={{ 
              position: 'fixed',
              left: 0,
              top: '60px',
              paddingLeft: '16px', 
              paddingRight: '16px', 
              paddingBottom: '16px',
              width: '256px'
            }}
          >
            <Navigation />
          </aside>

          {/* Main content area - responsive margins */}
          <main className="main-content" style={{ flex: 1, paddingLeft: '16px', marginLeft: '256px' }}>{children}</main>
        </div>
        
        <style jsx global>{`
          @media (max-width: 768px) {
            .navigation-sidebar {
              position: static !important;
              width: 100% !important;
              padding: 16px !important;
              margin-bottom: 20px;
            }
            .main-content {
              margin-left: 0 !important;
              padding-left: 16px !important;
              padding-right: 16px !important;
            }
          }
        `}</style>
      </body>
    </html>
  );
}
