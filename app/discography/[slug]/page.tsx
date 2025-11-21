import { sanityClient } from "@/lib/sanity.client";
import { projectBySlugQuery } from "@/lib/queries";
import { urlFor } from "@/lib/image";
import Image from "next/image";

// Helper function to extract YouTube video ID from URL
function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    let videoId = null;

    // Handle youtube.com/watch?v=VIDEO_ID
    if (urlObj.hostname.includes('youtube.com')) {
      videoId = urlObj.searchParams.get('v');
    }
    // Handle youtu.be/VIDEO_ID
    else if (urlObj.hostname.includes('youtu.be')) {
      videoId = urlObj.pathname.slice(1);
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch (e) {
    return null;
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await sanityClient.fetch(projectBySlugQuery(slug));

  if (!project) {
  return <div className="project-not-found">Project not found</div>;
  }

  return (
    <div className="content-aligned discography-project-detail" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 0 }}>
      {/* Artwork left-aligned above text */}
      {project.artwork && (
        <div style={{ width: '600px', marginBottom: '16px', marginLeft: 0 }}>
          <Image
            src={urlFor(project.artwork).auto("format").url()}
            alt={project.title}
            className="project-artwork-img"
            width={600}
            height={600}
            priority
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      )}
      {/* All text below artwork, left-aligned, menu font/size */}
      <div style={{ width: '600px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
  <div style={{ fontSize: '12px', fontFamily: "neue-haas-grotesk-display-pro-55-roman, Arial, Helvetica, sans-serif", margin: 0, marginBottom: '4px', color: '#171717' }}>{project.title}</div>
        {project.subtitle && (
          <div style={{ fontSize: '11px', color: '#666', margin: 0, marginBottom: '4px', fontFamily: "neue-haas-grotesk-display-pro-55-roman, Arial, Helvetica, sans-serif" }}>{project.subtitle}</div>
        )}
  <div style={{ fontSize: '10px', color: '#555', margin: 0, marginBottom: '8px', fontFamily: "neue-haas-grotesk-display-pro-55-roman, Arial, Helvetica, sans-serif" }}>{project.year}</div>
      </div>

  {/* Year is now styled above, remove duplicate */}

      {/* Description */}
      {project.description && (
        <div
          className="project-description"
          style={{ width: '600px', fontSize: '11px', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 400, color: '#666', margin: '0 0 24px 0', whiteSpace: 'pre-line', display: 'block' }}
        >
          {project.description}
        </div>
      )}

      {/* Links */}
      {project.links && project.links.length > 0 && (
        <div className="project-links" style={{ width: '600px', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '24px' }}>
          {project.links.map((link: { title: string; url: string }, index: number) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              style={{
                fontSize: '11px',
                color: '#666',
                textDecoration: 'underline',
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontWeight: 400,
                display: 'block',
                width: '100%'
              }}
            >
              {link.title || link.url}
            </a>
          ))}
        </div>
      )}

      {/* YouTube Videos Section */}
      {project.youtubeVideos && project.youtubeVideos.length > 0 && (
        <div className="project-videos" style={{ width: '600px', marginBottom: '24px' }}>
          <div className="project-videos-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {project.youtubeVideos.map((video: { url: string }, index: number) => {
              const embedUrl = getYouTubeEmbedUrl(video.url);
              if (!embedUrl) return null;

              return (
                <div key={index} className="project-video-container" style={{ width: '100%', maxWidth: '600px', height: '338px', position: 'relative' }}>
                  <iframe
                    src={embedUrl}
                    title={`YouTube video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="project-video-iframe"
                    style={{ width: '100%', maxWidth: '600px', height: '338px', display: 'block' }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
