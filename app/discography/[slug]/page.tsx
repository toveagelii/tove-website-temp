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
  <div className="discography-project-detail">
      {/* Artwork */}
      {project.artwork && (
        <div className="project-artwork-simple">
          <Image
            src={urlFor(project.artwork).width(800).height(800).auto("format").url()}
            alt={project.title}
            className="project-artwork-img"
            priority
          />
        </div>
      )}

      {/* Project Title */}
      <h1 className="project-title">{project.title}</h1>

      {/* Subtitle */}
      {project.subtitle && (
        <p className="project-subtitle">{project.subtitle}</p>
      )}

      {/* Year */}
      <p className="project-year">{project.year}</p>

      {/* Description */}
      {project.description && (
        <p className="project-description">{project.description}</p>
      )}

      {/* Links */}
      {project.links && project.links.length > 0 && (
        <div className="project-links">
          {project.links.map((link: { title: string; url: string }, index: number) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              {link.title || link.url}
            </a>
          ))}
        </div>
      )}

      {/* YouTube Videos Section */}
      {project.youtubeVideos && project.youtubeVideos.length > 0 && (
        <div className="project-videos">
          <div className="project-videos-list">
            {project.youtubeVideos.map((video: { url: string }, index: number) => {
              const embedUrl = getYouTubeEmbedUrl(video.url);
              if (!embedUrl) return null;

              return (
                <div key={index} className="project-video-container">
                  <iframe
                    src={embedUrl}
                    title={`YouTube video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="project-video-iframe"
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
