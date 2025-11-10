export const revalidate = 0;

import { sanityClient } from '@/lib/sanity.client';
import { homePageQuery } from '@/lib/queries';

export default async function HomePage() {
  // Fetch from dedicated Home Page singleton
  const homePage = await sanityClient.fetch(homePageQuery).catch(() => null);
  const intro = homePage?.aboutText || '';
  const instagramHref = homePage?.instagramUrl || '';
  const youtubeHref = homePage?.youtubeUrl || '';
  const spotifyHref = homePage?.spotifyUrl || '';
  const soundcloudHref = homePage?.soundcloudUrl || '';
  const bandcampHref = homePage?.bandcampUrl || '';

  return (
    <div style={{ paddingTop: 0, paddingRight: '20px' }}>
      {intro && (
        <>
          <p
            style={{
              fontFamily: "'Neue Haas Grotesk', sans-serif",
              fontSize: '12px',
              color: 'var(--foreground)',
              marginBottom: 0,
            }}
          >
            {intro}
          </p>
          <a
            href="https://www.instagram.com/_toxe_/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Neue Haas Grotesk', sans-serif",
              fontSize: '12px',
              color: '#666',
              textDecoration: 'underline',
              display: 'block',
              lineHeight: '1.5'
            }}
          >
            @_toxe_
          </a>
        </>
      )}

      {/* Social links from Sanity (now on Home page) */}
      <div style={{ marginTop: '24px' }}>
        {instagramHref && (
          <a
            href={instagramHref}
            aria-label="Instagram"
            className="hover:opacity-70 transition-opacity"
            style={{
              fontFamily: "'Neue Haas Grotesk', sans-serif",
              color: '#666',
              textDecoration: 'underline',
              fontSize: '11px',
              display: 'block',
              marginBottom: '8px',
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        )}
        {youtubeHref && (
          <a
            href={youtubeHref}
            aria-label="YouTube"
            className="hover:opacity-70 transition-opacity"
            style={{
              fontFamily: "'Neue Haas Grotesk', sans-serif",
              color: '#666',
              textDecoration: 'underline',
              fontSize: '11px',
              display: 'block',
              marginBottom: '8px',
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </a>
        )}
        {spotifyHref && (
          <a
            href={spotifyHref}
            aria-label="Spotify"
            className="hover:opacity-70 transition-opacity"
            style={{
              fontFamily: "'Neue Haas Grotesk', sans-serif",
              color: '#666',
              textDecoration: 'underline',
              fontSize: '11px',
              display: 'block',
              marginBottom: '8px',
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Spotify
          </a>
        )}
        {soundcloudHref && (
          <a
            href={soundcloudHref}
            aria-label="SoundCloud"
            className="hover:opacity-70 transition-opacity"
            style={{
              fontFamily: "'Neue Haas Grotesk', sans-serif",
              color: '#666',
              textDecoration: 'underline',
              fontSize: '11px',
              display: 'block',
              marginBottom: '8px',
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            SoundCloud
          </a>
        )}
        {bandcampHref && (
          <a
            href={bandcampHref}
            aria-label="Bandcamp"
            className="hover:opacity-70 transition-opacity"
            style={{
              fontFamily: "'Neue Haas Grotesk', sans-serif",
              color: '#666',
              textDecoration: 'underline',
              fontSize: '11px',
              display: 'block',
              marginBottom: '8px',
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Bandcamp
          </a>
        )}
      </div>
    </div>
  );
}